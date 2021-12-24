const express = require('express');
// const mongodb = require('mongodb');
const got = require('got');

const router = express.Router();

// const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';

// express.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// Request URL: http://localhost:8080/v2/find-concepts

const queryurl = 'http://localhost:8080/v2/query'

const formData = {
  "message": {
    "query_graph": {
      "nodes": {
        "n1": {
          "category": "gene"
        },
        "n2": {
          "id": "UMLS:C1417026"
        },
 
        "n4": {
          "category": "chem"
        }
      },
      "edges": {
        "e0": {
          "subject": "n1",
          "object": "n2"
        }
      }
    }
  }
}


router.post('/', async (req, res) => {
  // const posts = await loadPostsCollection();
  // await posts.insertOne({
    console.log("server posst")
    console.log("req.body.concepts")
    console.log(req.body.concepts)
    
    
  // });
  res.status(201).send();
});


// Get Posts
// USING '/' ACTUALLY MEANS '/API/POSTS' - BC APP.USE('/API/POSTS', POSTS) IN INDEX.JS DIRECTS TO THIS FILE
router.get('/', async (req, res) => {

  console.log("req.query")
  console.log(req.params)

  console.log("got medikPosts.js")
  let queryData = []
  try {
    (async () => {
      const {body} = await got.post(queryurl, {
        json: formData,
        responseType: 'json'
      })
      // res.send(body.data)
      // console.log("body");
      // console.log(body);

      let getnodes = body.message["knowledge_graph"]["nodes"];
        let getedges = body.message["knowledge_graph"]["edges"];
        // set = [];
        let nodekeys = Object.keys(getnodes);
        let edgekeys = Object.keys(getedges);
        // console.log(nodekeys);
        // console.log(edgekeys);
        let edgeLength = edgekeys.length
        edgekeys.forEach(edgekey => {
          // TAKE ONLY THE INFO THAT IS NEEDED TO SAVE ON SIZE
          // console.log("edgekey")
          // console.log(edgekey)
          let edge = getedges[edgekey];
          let edgeInfo = {};
          edgeInfo.key = edgekey;
          edgeInfo.relation = edge.relation;
          edgeInfo.subject = edge.subject;
          edgeInfo.object = edge.object;
          edgeInfo.predicate = edge.predicate;

          let attributes = edge.attributes;
          attributes.forEach(attribute => {
            if (attribute.name == "provided_by") {
              edgeInfo.provided_by = attribute.value;
            }
            if (attribute.name == "publications") {
              edgeInfo.publications = attribute.value;
            }
          });
          let foundsubject = false;
          let foundobject = false;
          // console.log("edgeInfo")
          // console.log(edgeInfo)
          try {
            nodekeys.every(nodekey => {
              let node = getnodes[nodekey];
              if (edge.subject == nodekey) {
                edgeInfo.subject_category = node["category"];
                edgeInfo.subject_name = node["name"];
                foundsubject = true;
              }
              if (edge.object == nodekey) {
                edgeInfo.object_category = node["category"];
                edgeInfo.object_name = node["name"];
                foundobject = true;
              }
              // console.log(foundobject)
              if ( foundsubject && foundobject) {
                // queryData[edgekey] = edgeInfo
                queryData.push(edgeInfo);
                // console.log("queryData.length")
                // console.log(queryData.length)
                // console.log("edgeLength")
                // console.log(edgeLength)
                return false;
                // throw BreakException
              }
              return true;
              // console.log(nodekey + "," + edgekey);
          });
          } catch (e) {
             console.error(e);
          }


        });
      // console.log((body.message));
      // if (queryData.length == edgeLength) {
        console.log("data processed")
        res.send(queryData)

      // }
      
      //=> {hello: 'world'}
    })();
} catch(err) {
    reject(err)
}
  // const posts = await loadPostsCollection();
  // res.send(await posts.find({}).toArray());
});


  
  module.exports = router;