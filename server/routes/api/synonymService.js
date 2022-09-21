const express = require('express');
const router = express.Router();

// const mongodb = require('mongodb');
const got = require('got');
const axios = require('axios')
const parser = require('fast-xml-parser')

const queryurl = 'http://localhost:8080/v2/query'
let conceptsurl = "http://localhost:8080/v2/find-concepts"
const ncbiService = require('./services/ncbiService')

// let getARAXSynonyms = (searchterm) => {
//   console.log("**** started getARAXSynonyms  - seatrchterm = ", searchterm)
//   return new Promise(async (resolve, reject) => { // eslint-disable-line
//     let url = "https://arax.ncats.io/api/arax/v1.2/entity?q=" + searchterm
//     try {
//       const res = await axios.get(url);

//       const data = res.data;
//       // });

//       // console.log("***2")
//       // console.log(data)
//       resolve(data);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

    // static postSynonymService = (packet) => {
    //   console.log("started postSynonymService");
    //   return new Promise(async (resolve, reject) => { // eslint-disable-line
    //     url = url + "/synonymservice"
    //     try {
    //       const res = await axios.post(url, {
    //         concepts: packet,
  
    //       });
    //       const data = res.data;
    //       // });
  
    //       // console.log("***2")
    //       // console.log(data)
    //       resolve(data);
    //     } catch (err) {
    //       reject(err);
    //     }
    //   });
    // }

// let getSynonyms = (searchterm) => {
//   console.log("#### started getSynonyms  - seatrchterm = ", searchterm)
//   return new Promise(async (resolve, reject) => { // eslint-disable-line
//     let url = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
//     try {
//       const res = await axios.get(url);

//       const data = res.data;
//       // });

//       // console.log(" ARAX***2")
//       // console.log(data)
//       resolve(data);
//     } catch (err) {
//       reject(err);
//     }
//   });
// }

let getSynonymsServer = (searchterm) => {
  console.log("#### started getSynonymsServer  - seatrchterm = ", searchterm)
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let url = '/api/posts/synonymservice'
    try {
      const res = await axios.post(url, {
        concepts: searchterm,

      });
      const data = res.data;
      // });

      console.log("***2 getSynonymsServer")
      console.log(data)
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

router.post('/',  (req, res) => {
  console.log("********** posting with query_raw - server side")
  let searchterm = req.body.concepts
  console.log("req.body = ", JSON.stringify(req.body))
  console.log("terms = ", JSON.stringify(terms))

// ################ - trying new - ################

getSynonymsServer(searchterm)
.then((results)=>{
  console.log("################ getSynonymsServer ################")
  console.log(results)
})


// ################ - end trying new - ################

  // let url = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 

  // getARAXSynonyms(searchterm)
  // .then(async(araxsyns) =>{
  //   // console.log("getaraxsyns")
  //   // console.log(araxsyns)
  //   let arax = {}
  //   // CHECK IF NO RESULTS THEN SKIP
  //   if(araxsyns[searchterm] == null || araxsyns[searchterm] == undefined){
  //     // console.log("@@@@@@@ SKIPPED BC NULL")
  //     resolve([])
  //   } 
  //   else {
  //     // console.log("arax was not null or undefined!!!!!")
  //     let araxSynonyms_equivalentids = araxsyns[searchterm].equivalent_identifiers
  //     let araxSynonyms_nodes = araxsyns[searchterm].nodes
  //     // console.log("araxSynonyms_equivalentids")
  //     // console.log(araxSynonyms_equivalentids)
  //     // console.log("araxSynonyms_nodes")
  //     // console.log(araxSynonyms_nodes)
      
  //     arax.araxSynonyms_nodes = araxSynonyms_nodes
  //     arax.searchterm = searchterm
  //     // console.log(araxSynonyms_equivalentids)
  //     arax.araxSynonyms_equivalentids = araxSynonyms_equivalentids
  //     return arax                 
  //   }

  // })
  // .then(async (arax)=>{
  //   if(arax == null || arax == undefined){
  //     // console.log("SKIPPED BC NULL @@@@@@@ ")
  //     resolve([])
  //   } 
  //   else {
  //     // console.log("about to getSynonyms with ...")
  //     // console.log("arax")
  //     // console.log(arax)
  //     arax.nodeNormalSyn = await getSynonyms(arax.searchterm)
  //     return arax                
  //   }

  // })
  // .then((arax) => {

  //   //START WITH ARAX SYNONYMS - EQUIVALENT IDS
  //   arax.araxSynonyms_nodes_list = arax.araxSynonyms_nodes.map(node => node.identifier)
  //   // console.log(arax)
  //   // console.log(arax.araxSynonyms_nodes_list)
  //   arax.allSynonyms = []

  //   // STORE THE IDS IN ARRAY TO CHECK FOR DUPLICATES WHEN GETTING THE NEXT SET OF SYNONYMS FRM THE NODE NORMALIZER
  //   let synonymIdArray = []
  //   for (let i = 0; i < arax.araxSynonyms_equivalentids.length; i++) {
  //     const synData = arax.araxSynonyms_equivalentids[i];
      
  //     // GET NAME AND ID OF EACH
  //     let syn = {}
  //     syn.id = synData.identifier
  //     syn.name = synData.name
  //     synonymIdArray.push(synData.identifier)

  //     // TAG IF IT IS A NODE (FROM ARAX) TO SEE IF THINGS THAT ARE NOT NODES EVER HAVE RESULTS
  //     if(arax.araxSynonyms_nodes_list.indexOf(synData.identifier)){
  //       syn.isnode = true
  //     } else {
  //       syn.isnode = false
  //     }
  //     arax.allSynonyms.push(syn)

  //     if(i == arax.araxSynonyms_equivalentids.length - 1){
  //       // console.log("arax about to do node normalizer")
  //       // console.log(arax)
  //       let searchterm = arax.searchterm
  //       let identifiers = arax.nodeNormalSyn[searchterm].equivalent_identifiers
  //       // GO THROUGH THE NODE NORMALIZER SYNONYMS AND ADD IF ID NOT ALREADY THERE
  //       for (let n = 0; n < identifiers.length; n++) {
  //         const synDataTwo = identifiers[n]
  //         syn.id = synDataTwo.identifier
  //         syn.id = synDataTwo.label
  //         // console.log("LENGTH = ", identifiers.length)
  //         // console.log("N = ", n)

  //         if(synonymIdArray.indexOf(synDataTwo.identifier) == -1){
  //           synonymIdArray.push(synDataTwo.identifier)

  //           if(arax.araxSynonyms_nodes_list.indexOf(synDataTwo.identifier)){
  //             syn.isnode = true
  //           } else {
  //             syn.isnode = false
  //           }
  //           arax.allSynonyms.push(syn)
  //         }


  //         if(n == identifiers.length - 1){
  //           // EXPECT COMPLLETE LIST OF SYNONYMS
  //           // console.log("### FINISHED NODE NORMALIZER SYNS")
  //           arax.synonymIdArray = synonymIdArray
  //           resolve(arax)
  //         }

  //       }
  //     }
      
  //   }
  // })
  // // .then((arax)=>{
  // //   // console.log("arax")
  // //   // console.log(arax)
  // //   resolve(arax)
  // // })
  // .catch(()=> {
  //   console.log("YOU REMEMBERED CATCH EVENTUALLY AND HERE WE ARE")
  //   resolve([])
  // })
 
});

  
  module.exports = router;