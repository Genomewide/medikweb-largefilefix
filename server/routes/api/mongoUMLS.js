const express = require('express');
const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

// const got = require('got');

const router = express.Router();

const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';

// router.post('/', async (req, res) => {
//   console.log("starting new format for mongodb")

//   mongodb.MongoClient.connect(uri, (err, client) => {
//     console.log("server post")
//     console.log("req.body.concepts")
//     console.log(req.body.concepts)
//     let ids = req.body.concepts
//     console.log("start to get umls synonyms info")
//     // if (err) {
//     //     throw err
//     // }
//     //2. Operate the database
//     const drugs =client.db('synonyms').collection('hgnc2umls')
//     let results = drugs.find({HGNC: { $in : ids }}).toArray()
//     console.log(" UMLS HGNC results")
//     console.log(results)
//     //3. Close the connection
//     client.close()
//     res.send(results)
// })
    
// });

router.post('/', async (req, res) => {
  // const posts = await loadPostsCollection();
  // await posts.insertOne({
    console.log("server post")
    console.log("req.body.concepts")
    console.log(req.body.concepts)
    let ids = req.body.concepts
    console.log("start to get umls synonyms info")
    // const drugs = await loadFDACollection();
    // console.log(drugs)


    // try {
      // const drugs = await loadFDACollection();
      console.log("Mongo link for UMLS 2drugs")
      // console.log(drugs)
      // console.log(await drugs.find({HGNC: { $in : ids }}).toArray())

      let client;
      let results;
      try {
        // Use connect method to connect to the Server
        client = await MongoClient.connect(uri, { useUnifiedTopology: true });
    
        const drugs = client.db('synonyms').collection('hgnc2umls');
        results = await drugs.find({HGNC: { $in : ids }}).toArray()
        console.log("results")
        console.log(results)


      } catch (err) {
        console.log(err.stack);
      }
    
      if (client) {
        client.close();
      }

      res.send(results)



    //   let results = await drugs.find({HGNC: { $in : ids }}).toArray()
    //   console.log(" UMLS HGNC results")
    //   console.log(results)
    //   console.log("drugs")
    //   console.log(drugs)
    //   drugs.client.close()
    //   res.send(results)

    // } catch(err) {
    //   console.dir("UMLS HGNC results failed"); // TypeError: failed to fetch
    //   console.dir(err); // TypeError: failed to fetch
    //   // client.close()
    // }
    
});

router.get('/:id/', async (req, res) => {

  let chemblids = req.params.id
  console.log("req.params.id")
  console.log(req.params.id)
// router.get('/', async (req, res) => {
  console.log("start to get drug info")
  const drugs = await loadFDACollection();
  // console.log(drugs)
  console.log(await drugs.find({molecule_chembl_id: { $in : chemblids }}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray())
  res.send(await drugs.find({molecule_chembl_id: { $in : chemblids }}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray())

  // let druginfo = await drugs.find({ molecule_chembl_id: "CHEMBL5"})
  // await posts.insertOne({
    // console.log("server posst")
    // console.log("druginfo")
    // console.log(druginfo)
    
    
  // });
  // res.status(201).send();
});





async function loadFDACollection() {
    const client = await mongodb.MongoClient.connect(
        uri,
      {
        useUnifiedTopology: true
      }
    );
    return client.db('synonyms').collection('hgnc2umls');

    // return client.db('sample_mflix').collection('users');
  }
  
  module.exports = router;