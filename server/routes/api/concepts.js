const express = require('express');
const mongodb = require('mongodb');
const got = require('got');

const router = express.Router();

// Get Posts
// USING '/' ACTUALLY MEANS '/API/POSTS' - BC APP.USE('/API/POSTS', POSTS) IN INDEX.JS DIRECTS TO THIS FILE
router.get('/:id/', async (req, res) => {
  let concept = req.params.id
  console.log("GETTING CONCEPTS FROM CONCEPTS.JS")
  console.log("req.params.id is the concept that is being sent to find-concept api")
  console.log(req.params.id)

  try {
    (async () => {
      const {body} = await got.post("http://localhost:8080/v2/find-concepts", {
        json: concept,
        responseType: 'json'
      })
      console.log("GOT CONCEPTS - ABOUT TO RETURN")
      console.log("body")
      console.log(body)
      res.send(body)
      //=> {hello: 'world'}
    })();
} catch(err) {
    // reject("error occured trying get concept" + err)
    console.log("THERE WAS AN ERROR GETTING THE CONCEPTS")
    res.send(err)
}
  // const posts = await loadPostsCollection();
  // res.send(await posts.find({}).toArray());
});

router.get('/concepts', async (req, res) => {

  console.log("got concepts")

//   try {
//     (async () => {
//       const {body} = await got.post(mediurl, {
//         json: formData,
//         responseType: 'json'
//       })
//       // res.send(body.data)
//       console.log("body.data");
//       console.log(body.data);
//       console.log(JSON.stringify(body.message));
//       res.send(body)
//       //=> {hello: 'world'}
//     })();
// } catch(err) {
//     reject(err)
// }
  // const posts = await loadPostsCollection();
  // res.send(await posts.find({}).toArray());
});

// Add Post
router.post('/', async (req, res) => {
  const posts = await loadPostsCollection();
  await posts.insertOne({
    name: req.body.text,
    createdAt: new Date()
  });
  res.status(201).send();
});

// Delete Post
// router.delete('/:id', async (req, res) => {
//   const posts = await loadPostsCollection();
//   await posts.deleteOne({ _id: new mongodb.ObjectID(req.params.id) });
//   res.status(200).send({});
// });

// Replace the uri string with your MongoDB deployment's connection string.
// const client = new MongoClient(uri);



// async function loadPostsCollection() {
//     const client = await mongodb.MongoClient.connect(
//         uri,
//       {
//         useUnifiedTopology: true
//       }
//     );
//     return client.db('vue_express').collection('posts');

//     // return client.db('sample_mflix').collection('users');
//   }
  
  module.exports = router;