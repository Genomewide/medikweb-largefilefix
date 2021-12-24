const express = require('express');
const router = express.Router();

// const mongodb = require('mongodb');
const got = require('got');
const axios = require('axios')
const parser = require('fast-xml-parser')

const queryurl = 'http://localhost:8080/v2/query'
let conceptsurl = "http://localhost:8080/v2/find-concepts"
const ncbiService = require('./services/ncbiService')

// import ncbiService from "./services/ncbiService.js";


const formData = 
{
  "message": {
    "query_graph": {
      "nodes": {
        "n1": { "category": "chem" },
        "n2": { "id": "PR:0000queryjs10162" }
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

// const sleep = () => {
//   console.log(new Date())
//   return new Promise(resolve => setTimeout(resolve, 1000))
// }

const querymedik = (url, packet) => {
  console.log("started queryPR server side");
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    // console.log()
    try {
      (async () => {
        const {body} = await got.post(url, {
          json: packet,
          // json: formData,
          responseType: 'json'
        })
        console.log("got results")
        // console.log(body)
        resolve(body)

      })();
  } catch(err) {
      reject(err)
  }

  });
}

router.post('/', async (req, res) => {
  // const posts = await loadPostsCollection();
  // await posts.insertOne({
    // "PR:000010162"
    console.log("server query post")
    console.log("incoming req.body.concepts")
    // console.log(req.body.concepts)
    let search_concept = req.body.concepts
    // console.log(JSON.stringify(search_concept))

    querymedik(queryurl,search_concept)
    .then(result => {
      console.log("result")
      console.log(result)
      res.send(result)
     

    })
    .catch(err => {
      console.error(err)
    })


});


router.post('/pr/', async (req, res) => { 
// PROCESS THE TEXTMINING RESULTS AND GET ALL OF THE OUTSIDE DATABASE DATA TO SUPPORT THE DISPLAY TABLE

    console.log("/pr/ server query post")
    console.log("incoming req.body.concepts")
    // console.log(req.body.concepts)
    let search_concept = req.body.concepts
    // console.log(JSON.stringify(search_concept))

    querymedik(queryurl,search_concept)
    .then(result => {
      // console.log("result")
      // console.log(result)
      // res.send(response)
      let getnodes = result.message["knowledge_graph"]["nodes"];
      let getedges = result.message["knowledge_graph"]["edges"];

      let edgekeys = Object.keys(getedges);
      let textmine_edges = []
      let return_textmine_edges = []

      for (let index = 0; index < edgekeys.length; index++) {
        const key = edgekeys[index];
        // console.log("key")
        // console.log(key)
        // console.log("index = ", index, " - length = ", edgekeys.length - 1)
        // console.log(key)
        // console.log(key.startsWith("textminingprovider"))
        // console.log("textmine_edges.length > 0")
        // console.log(textmine_edges.length > 0)
        // console.log("index == edgekeys.length - 1" )
        // console.log(index == edgekeys.length - 1 )
        if(key.startsWith("textminingprovider")){
          // console.log("found one")
          // console.log("index = ", index, " - length = ", edgekeys.length)
          textmine_edges.push(getedges[key])
        }
        if(index == edgekeys.length - 1 && textmine_edges.length > 0){//CHECKED ALL EDGES FOR SOURCE = TEXTMINING 
          // console.log("textmine_edges") // AFTER CHECKED ALL EDGES
          // console.log(textmine_edges)
          for (let i = 0; i < textmine_edges.length; i++) { // CHECK THE FILTERED SET OF EDGES AND GET THE NODE INFO WITH HUMAN READABLE NAMES
            console.log("i = ", i)
            let textmine_edge = textmine_edges[i];
            let subject = textmine_edge.subject
            let object = textmine_edge.object
            console.log("about to use name")
            textmine_edge.subject_name = getnodes[subject]["name"]
            textmine_edge.object_node = getnodes[object]["name"]
            return_textmine_edges.push(textmine_edge)
            if(i == textmine_edges.length - 1){
              // console.log("return_textmine_edges")
              // console.log(return_textmine_edges)
              return return_textmine_edges
            }

          }

        } 
      }

    })
    .then(textmining_edges => { //GET THE CONCEPTS WITH INFO ON SENTENCES.  
      // console.log("textmining_edges")
      // console.log(textmining_edges)
      for (let i = 0; i < textmining_edges.length; i++) {
        const element = textmining_edges[i];
        console.log(element.attributes)
        let attributes = element.attributes
        for (let n = 0; n < attributes.length; n++) {
          const attribute = attributes[n];
          if (attribute.name == "has_evidence"){
            textmining_edges[i].evidence_ids = attribute.value.split("|")
            textmining_edges[i].pub_count = attribute.value.split("|").length
          }
          if(i == textmining_edges.length - 1 && n == attributes.length - 1){
            return textmining_edges
          }         
        }

      }
    })
    .then(async (textmining_edges) => {
      // console.log("textmining_edges")
      // console.log(textmining_edges)
      for (let index = 0; index < textmining_edges.length; index++) {
        const edge = textmining_edges[index];
        // console.log("textmining_edges[index]")
        // console.log(textmining_edges[index])
        textmining_edges[index].evidence = []
        for (let i = 0; i < edge.evidence_ids.length; i++) {
          const concept_id = edge.evidence_ids[i];
          // console.log(concept_id)
          let conceptinfo = await querymedik(conceptsurl, concept_id)
          // textmining_edges[index] = await ncbiService.getChembl()
          // console.log("conceptinfo")
          // console.log(conceptinfo)
          textmining_edges[index].curie_source = "pr"
          textmining_edges[index].evidence.push(conceptinfo)
          if(index == textmining_edges.length - 1 && i == edge.evidence_ids.length - 1){
            return textmining_edges
          }
        }        
      }
    })
    .then(async (textmining_edges) => {
    // GET CHEMBL FROM CHEBI
      console.log("starting to get chembl")
      // console.log(textmining_edges)
      for (let index = 0; index < textmining_edges.length; index++) {
        const edge = textmining_edges[index];
        // console.log("textmining_edges[index]")
        // console.log(textmining_edges[index])
      // GET CHEMBL FROM CHEBI_IDS
        let chebi = edge.subject.split(':')

        // textmining_edges[index].chembl  = await ncbiService.getChembl(chebi[1])
        let chembl  = await ncbiService.getChembl(chebi[1])
        try {
          textmining_edges[index].chembl = chembl[0].src_compound_id
        } catch (err){
          console.log("setting chembl = []" ,err)
          textmining_edges[index].chembl = []
        }

        if(index == textmining_edges.length - 1 ){
          return textmining_edges
        }
      }
    })
    .then( async textmining_edges => { //GET PUBMED INFO
  

      // const displaytime = () => {
      //   console.log(new Date())
      // }

      textmining_edges.forEach(async (text, index) => {
        textmining_edges[index].publications = []
        setTimeout(() => {
          
          console.log("other time", new Date())
          const edge = textmining_edges[index];
          let concepts = edge.evidence
          for (let i = 0; i < concepts.length; i++) {
            let ids = Object.keys(concepts[i]["concepts"]["textminingprovider"]);
            let id = ids[0]
            // console.log("id = " , id)
            let attributes = concepts[i]["concepts"]["textminingprovider"][id]["attributes"]
            // console.log("attributes")
            // console.log(attributes)
            
            // for (let n = 0; n < attributes.length; n++) {
              attributes.forEach(async (attribute, n) => {
              // for (let n = 0; n < attributes.length; n++) {
                // const attribute = attributes[n];
              if(attribute.name == "publications"){
                let pmid_info = attribute["value"].split(":")
                let  pmid = pmid_info[1]
                // console.log("pmid")
                // console.log(pmid)
                // sleep()
                // ######### REMOVE THIS
                // return textmining_edges
                // ######### REMOVE THIS
                
                let pubmedInfo = await ncbiService.getPubmed(pmid)
                for (let n = 0; n < attributes.length; n++) { // GET PUBMED INFO FIRST THEN ADD IN SENTENCE AND COORDINATES
                  const attribute = attributes[n];
                  if(attribute.name == "sentence"){
                    pubmedInfo.sentence = attribute.value
                  }
                  if(attribute.name == "subject_spans"){
                    pubmedInfo.subject_spans = attribute.value
                  }
                  if(attribute.name == "object_spans"){
                    pubmedInfo.object_spans = attribute.value
                  }                       
                  if(n == attributes.length -1){
                    textmining_edges[index].publications.push(pubmedInfo)
                    if(index == textmining_edges.length -1 ){
                      let allPRresults = await ncbiService.cleanPubmed(textmining_edges)
                      // console.log("allPRresults")
                      // console.log(allPRresults)
                      // return allPRresults
                      res.send(allPRresults)
                      // return textmining_edges
                    }
                  }
                }  
              }
              
            })            
          }
        }, index * 120); // DELAY TO ENSURE IT DOES NOT HIT PUBMED SERVER TOO QUICKLY
  
      });
    })
    // .then(result_data => {
    //   conssole.log("result_data")
    //   conssole.log(result_data)

    // })
    .catch(err => {
      console.error(err)
    })


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

// router.get('/concepts', async (req, res) => {

//   console.log("got concepts")

// //   try {
// //     (async () => {
// //       const {body} = await got.post(mediurl, {
// //         json: formData,
// //         responseType: 'json'
// //       })
// //       // res.send(body.data)
// //       console.log("body.data");
// //       console.log(body.data);
// //       console.log(JSON.stringify(body.message));
// //       res.send(body)
// //       //=> {hello: 'world'}
// //     })();
// // } catch(err) {
// //     reject(err)
// // }
//   // const posts = await loadPostsCollection();
//   // res.send(await posts.find({}).toArray());
// });

// Add Post


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