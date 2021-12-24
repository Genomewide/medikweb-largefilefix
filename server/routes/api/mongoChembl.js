const express = require('express');
const mongodb = require('mongodb');
// const got = require('got');

const router = express.Router();

const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';


// let ids = ["CHEMBL1292", "CHEMBL405", "CHEMBL501", "CHEMBL750"]

router.post('/', async (req, res) => {
  // const posts = await loadPostsCollection();
  // await posts.insertOne({
    console.log("server post")
    console.log("req.body.concepts")
    console.log(req.body.concepts)
    let chemblids = req.body.concepts
    console.log("start to get drug info")
    const drugs = await loadFDACollection();
    // console.log(drugs)
    let results = await drugs.find({molecule_chembl_id: { $in : chemblids }}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
    console.log(results)
    res.send(results)

});


router.post('/chebi/', async (req, res) => {
  // const posts = await loadPostsCollection();
  // await posts.insertOne({
    console.log("chebi post")
    console.log("req.body.concepts")
    console.log(req.body.concepts)
    let chebi_ids = req.body.concepts
    console.log("start to get drug info")
    const drugs = await loadFDACollection();
    // console.log(drugs) chebi_par_id
    let result = await drugs.find({chebi_par_id: { $in : chebi_ids }}).project({chebi_par_id:1, molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
    drugs.close()
    console.log(result)

    res.send(result)

    drugs.close()
  // });
  // res.status(201).send();
});

router.get('/:id/', async (req, res) => {

  let chemblids = req.params.id
  console.log("req.params.id")
  console.log(req.params.id)
// router.get('/', async (req, res) => {
  console.log("start to get drug info")

  try {
    console.log(" get /id/ - with loadFDACollection")
    const drugs = await loadFDACollection();
    let result = await drugs.find({molecule_chembl_id: { $in : chemblids }}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
    drugs.close()
    res.send(result)

  } catch(err) {
    drugs.close()
    console.dir("drugs mongo error"); // TypeError: failed to fetch
    console.dir(err); // TypeError: failed to fetch
  }
});





async function loadFDACollection() {
    const client = await mongodb.MongoClient.connect(
        uri,
      {
        useUnifiedTopology: true
      }
    );
    return client.db('chembl').collection('fdaApproved');

  }
  
  module.exports = router;