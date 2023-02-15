const express = require('express');
// const mongodb = require('mongodb');
// const got = require('got');
// var http = require('http');
const axios = require('axios')
const router = express.Router();

const nodeService = require('./services/nodeProcessService')


// const EventEmitter = require('events');

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();
// const myEmitter = new MyEmitter();
// const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';

// express.use((req, res, next) => {
//   res.header('Access-Control-Allow-Origin', '*');
//   next();
// });
// Request URL: http://localhost:8080/v2/find-concepts

const queryurl = 'http://localhost:8080/v2/query'

// const formData = {
//   "message": {
//     "query_graph": {
//       "nodes": {
//         "n1": {
//           "category": "gene"
//         },
//         "n2": {
//           "id": "UMLS:C1417026"
//         },

//         "n4": {
//           "category": "chem"
//         }
//       },
//       "edges": {
//         "e0": {
//           "subject": "n1",
//           "object": "n2"
//         },
//         "e1": {
//           "subject": "n4",
//           "object": "n1"
//         }
//       }
//     }
//   }
// }
const formData = {
  "message": {
    "query_graph": {
      "nodes": {
        "n2": {
          "id": "UMLS:C1417026"
        },

        "n4": {
          "category": "chem"
        }
      },
      "edges": {
        "e0": {
          "subject": "n4",
          "object": "n2"
        }
      }
    }
  }
}



// const resultProcess = new Promise((resolve, reject) => {

// })
function processDataset(result, terms) {
  // let processedResults = []
  console.log("processDataset")
  // console.log("result")
  // console.log(result)
  let counter = 0
  return new Promise(async function(resolve, reject) {
    // console.log("result.promise")
    // console.log("await" )
    // console.log(await nodeService.umlsClean("data"))
    let processedResults = []

    try {
        // GET EDGESS AND NODES TO COMBINE TO RETURN RESULTS 
          let getnodes = result.message["knowledge_graph"]["nodes"];
          let getedges = result.message["knowledge_graph"]["edges"];

          let edgekeys = Object.keys(getedges);
          // console.log("edgekeys")
          // console.log(edgekeys)
        // CHECK FOR RESULTS -SOME EDGES DO NOT HAVE RESULTS AND PROCESSING WILL FAIL 
          if (edgekeys.length != 0){
        
            let nodekeys = Object.keys(getnodes);
            let edgekeys = Object.keys(getedges);

            let unique_nodekeys = []
            for (let n = 0; n < nodekeys.length; n++) {
              const element = getnodes[nodekeys[n]]
              const el = nodekeys[n].substring(0,4);
              // if (el == "PR:0") {
              //   console.log("element")
              //   console.log(element)
              // }
              
              // let node = 
              // console.log(element)
              // console.log(unique_nodekeys.indexOf(element))
              if(unique_nodekeys.indexOf(el) == -1){
                unique_nodekeys.push(el)
                // console.log("element")
                // console.log(element)
              }
              if(n == nodekeys.length -1){
                console.log("*********** ***********")
                console.log(terms)
                console.log(unique_nodekeys)
              }
              
            }
            // console.log(nodekeys);
            // console.log(edgekeys);
            let edgeLength = edgekeys.length
            let counter = 1
            edgekeys.forEach((edgekey, index )=> {
              // console.log("counter")
              // console.log(counter)
              counter++
            // TAKE ONLY THE INFO THAT IS NEEDED TO SAVE ON SIZE
              let edge = getedges[edgekey];
              
              // console.log(edgekey)

              let edgeInfo = {};
            // EVERY EDGE IS FORMATTED THE SAME - GET SAME DATA terms
              // ONLY GET SENTENCE INFO FOR TEXTMINING EDGES
              edgeInfo.sentenceId = ""
              if(edgekey.startsWith("text")){

                // console.log("edge")
                // console.log(edge)
                let attributes = edge.attributes
                for (let index = 0; index < attributes.length; index++) {
                  const attribute = attributes[index];
                  if(attribute.name == "has_evidence"){
                    edgeInfo.sentenceId = attribute.value
                  }
                  
                }
              }
              // DEFAULT VALUES - UNLESS DATA FOUNG THEN WILL RETURN THIS
              edgeInfo.term = terms;
              edgeInfo.key = edgekey;
              edgeInfo.relation = edge.relation;
              edgeInfo.subject = edge.subject;
              edgeInfo.object = edge.object;
              edgeInfo.predicate = edge.predicate;

              edgeInfo.subject_description = ""
              edgeInfo.drugbankId = ""
              edgeInfo.rxnormId = ""
              edgeInfo.chemblId = ""
              // edgeInfo.chemblInfo = {}
              edgeInfo.chebilId = ""
              edgeInfo.drugbank = false
              edgeInfo.rxnorm = false
              edgeInfo.chembl = false
              edgeInfo.chebi = false
              edgeInfo.fdaApproved = false
              edgeInfo.fdaPhase = 0
              edgeInfo.pubLength = 0
              

              let attributes = edge.attributes;
              attributes.forEach(attribute => {
                if (attribute.name == "provided_by") {
                  edgeInfo.provided_by = attribute.value;
                }
                if (attribute.name == "publications") {
                  edgeInfo.publications = attribute.value;
                try {
                  edgeInfo.publications = edgeInfo.publications.replace("(''", "")
                  edgeInfo.publications = edgeInfo.publications.replace("'')", "")
                  if(edgeInfo.publications.indexOf("|") != -1){
                    edgeInfo.publications = edgeInfo.publications.split("|")
                  } else {
                    edgeInfo.publications = edgeInfo.publications.split("'' ''")
                  }  
                  edgeInfo.pubLength =  edgeInfo.publications.length
                  if(!Array.isArray(edgeInfo.publications)) {
                    edgeInfo.publications = []
                    edgeInfo.pubLength = 0
                  } 
                }
                catch {
                  edgeInfo.publications = []
                  edgeInfo.pubLength = 0                 
                }
              
                }
              });

            // NODES ARE DIFFERENT DEPENDING ON WHERE THEY CAME FROM
            // UMLS NODES INCLUDE - ATTRIIBUTE CALLED 'extra-result' 
              let foundsubject = false;
              let foundobject = false;
              // console.log("edgeInfo")
              // console.log(edgeInfo)
            


          // START UMLS
            if(edgeInfo.subject.startsWith("UMLS")){
              // console.log("was umls - index = ", index = " - edgelength = " , edgeLength)
              for (let index = 0; index < nodekeys.length; index++) {
                const nodekey = nodekeys[index]; 
            
                if (edgeInfo.subject == nodekey){
                    let node = getnodes[nodekey]
                    
                    nodeService.umlsClean(edgeInfo, node)
                    .then((edgeCleaned) => {
                      edgeInfo.object_category = "category";
                      edgeInfo.object_name = "name"
                      processedResults.push(edgeCleaned)

                      counter++

                    })
                    .catch((err)=>{
                      console.log("broke getting UMLS node data " ,err)
                    })
                }  
                                
              }
            }
          // END UMLS 
          // START CHEMBL
           else if(edgeInfo.subject.startsWith("CHEM" || edgeInfo.subject.startsWith("GTPI"))){
              // console.log("was umls - index = ", index = " - edgelength = " , edgeLength)
              for (let index = 0; index < nodekeys.length; index++) {
                const nodekey = nodekeys[index]; 
                // let counter = 0
                // console.log("nodekey")               
                // console.log(nodekey)               
                if (edgeInfo.subject == nodekey){
                    let node = getnodes[nodekey]
                    
                    // let cleanNode = await nodeService.umlsClean(edgeinfo, node)
                    nodeService.chemblClean(edgeInfo, node)
                    .then((edgeCleaned) => {
                      edgeCleaned.object_category = "category";
                      edgeCleaned.object_name = "name"
                      processedResults.push(edgeCleaned)
                      counter++

                    })
                    .catch((err)=>{
                      console.log("broke getting CHEM node data " ,err)
                    })
                }  
                if (edge.object == nodekey) {
                  let node = getnodes[nodekey]
                  edgeInfo.object_category = node["category"];
                  edgeInfo.object_name = node["name"];
          
                }                               
              }
            }
          // END CHEMBL
          // START CHEBI
         else if(edgeInfo.subject.startsWith("CHEB")){
            // console.log("was umls - index = ", index = " - edgelength = " , edgeLength)
            for (let index = 0; index < nodekeys.length; index++) {
              const nodekey = nodekeys[index]; 

              if (edgeInfo.subject == nodekey){
                // let node = getnodes[nodekey]
                // console.log(edgeInfo)
                edgeInfo.chebi = true;
                edgeInfo.chebilId = nodekey
                let chebiId = nodekey.split(":")[1]
            // GET CHEMBLE INFO FROM UNICHEM VIA CHEBI
              nodeService.getChembl(chebiId)
              .then((chemblID) => {
            // CHECK TO SEE IF THERE IS CHEMBL 
                edgeInfo.object_category = "category";
                edgeInfo.object_name = "name"
              // IF NO CHEMBLID THEN PUSH
                if(chemblID == "NONE"){
                  // console.log("chemblID = NONE")
                  processedResults.push(edgeInfo)                  
                } else {
              // IF THERE IS A CHEMBLID THEN CHECK MONGO FOR FDA APPROVAL
                  // console.log("nodekey")
                  // console.log(nodekey)
                  // console.log("chemblID")
                  // console.log(chemblID)
                  edgeInfo.chemblId = chemblID
                  edgeInfo.chembl = true

                  nodeService.chembl2fda(chemblID)
                  .then((chembldata) => {
                    // console.log("******* chembldata")
                    // console.log(chembldata)
                    if(chembldata.length == 0){
                  // IF NOT FOUND IN APPROVAL DB - THEN PUSH
                      processedResults.push(edgeInfo)
                    }
                    else {
                  // IF THERE IS APPROVAL INFO THEN UPDATE AND PUSH
                  // console.log(" chembldata[0][max_phas] ")
                  // console.log( chembldata )
                  // console.log( chembldata[0]["max_phase"] )
                      edgeInfo.fdaPhase = chembldata[0]["max_phase"] 
                      edgeInfo.fdaApproved = true
                      processedResults.push(edgeInfo)
                    }                                            
                  })
                  processedResults.push(edgeInfo)
                }
                counter++
              })
              .catch((err)=>{
                console.log("broke getting CHEB node data " ,err)
              })
              } 
              if (edge.object == nodekey) {
                let node = getnodes[nodekey]
                edgeInfo.object_category = node["category"];
                edgeInfo.object_name = node["name"];
              }                               
            }
          }
        // END CHEBI
            else {   
                // console.log("was not umls - index = ",index, "edgelength = " , edgeLength)           
                try {
                  nodekeys.every(nodekey => {
                    let node = getnodes[nodekey];
                    if (edge.subject == nodekey) {
                      // console.log("nodekey]")
                      // console.log(nodekey)
                      edgeInfo.subject_category = node["category"];
                      edgeInfo.subject_name = node["name"];
                      let attributes = node["attributes"]
                      edgeInfo.subject_description = ""
                      edgeInfo.drugbankId = ""
                      edgeInfo.rxnormId = ""
                      edgeInfo.chemblId = ""
                      edgeInfo.drugbank = false
                      edgeInfo.rxnorm = false
                      edgeInfo.chembl = false
                      // if(edge.subject == "UMLS:C0038706"){
                      //   console.log("Testing service")
                      //   nodeService.umlsClean(node)
                      //    .then((result) => console.log("umlsClean", result))
                      //   console.log("node")
                      //   console.log(node)
                      //   // console.log("edge")
                      //   // console.log(edge)
                      // }
                      // console.log("node")
                      // console.log(node)
                      attributes.forEach(attribute => {
                        if( attribute["name"] == "xrefs"){
                          let xref = attribute["value"]
                          edgeInfo.subject_xref =  xref.split("|")
                          edgeInfo.subject_xref_tag =  xref.split(/\||:/)
                          if(edgeInfo.subject_xref_tag.indexOf('DRUGBANK') != -1){
                            let idindex = subject_xref_tag.indexOf('DRUGBANK') + 1
                            edgeInfo.drugbank = true
                            edgenfo.drugbankId = subject_xref_tag[idindex]
                          } else {
                            edgeInfo.drugbank = false
                          }
                          if(edgeInfo.subject_xref_tag.indexOf('RXNORM') != -1){
                            let idindex = subject_xref_tag.indexOf('RXNORM') + 1
                            edgeInfo.rxnorm = true
                            edgenfo.rxnormId = subject_xref_tag[idindex]
                          } else {
                            edgeInfo.rxnorm = false
                          }
                          if(edgeInfo.subject_xref_tag.indexOf('CHEMBL') != -1){
                            let idindex = subject_xref_tag.indexOf('CHEMBL') + 1
                            edgeInfo.chembl = true
                            edgenfo.chemblId = subject_xref_tag[idindex]
                          } else {
                            edgeInfo.chembl = false
                          }
                        } else if (nodekey.includes("CHEMBL")){
                          edgeInfo.chembl = nodekey.split(":")[1]
                        }
                      });
                      foundsubject = true;
                    }
                    if (edge.object == nodekey) {
                      edgeInfo.object_category = node["category"];
                      edgeInfo.object_name = node["name"];
                      foundobject = true;
                      let attributes = node["attributes"]
                      attributes.forEach(attribute => {
                        if( attribute["name"] == "xrefs"){
                          let xref = attribute["value"]
                          edgeInfo.object_xref =  xref.split("|")
                        }
                      });
                    }
                    // console.log(foundobject)
                    if ( foundsubject && foundobject) {
                      // queryData[edgekey] = edgeInfo
                      // console.log("finished edge")
                      // console.log("counter")
                      // console.log(counter)
                      processedResults.push(edgeInfo);
                      counter++
                      foundsubject = false
                      foundobject = false

                      return false;
                      // throw BreakException
                    }
                    return true;
                });
                } catch (e) {
                  console.error(e);
                }
              }
              // console.log( processedResults.length, "edgeLength = ", edgeLength)
              if(edgeLength -1 == index){
                console.log("***** group completed")
                // console.log("processedResults = " + edgeLength)
                // console.log(processedResults)
                resolve(processedResults)
              }
    
            });           
          } else {
            console.log("edgekeys = 0")
            resolve([])
          }

      
    } catch(error) {
      console.error(error)
      reject(error)
    }  


  })

}


// DELAYED LOOP THROUGH TERMS
router.post('/', async (req, res) => {
  console.log("posting with medikQuery - after cleaned")
  let terms = req.body.concepts
  // console.log(terms)


  // THIS CATCHES THE DATA RETURNED IN THE LOOP
  // THE LOOP PUTS EACH SEARCH TERM INTO JSON FORMAT THEN POSTS TO UNSECRRET AGENT
  // 
  // let queryData = []

  // async function loopWithAwait() {
    console.log(" starting loopWithAwait")
    // let processing = []

    // USE EMITTER INSIDE FUNCTION INDUCED BY EMMITER TO ACHIEVE LOOP
    // USE COMPARISON TO LENGTH OF ARRAY TO EITHER LOOP OR PROCESS DATA
    
    // START THIS FUNCTION WHEN EMITTED
    // let index = 0
    // eventEmitter.on("getSynonyn", function () {
        // console.log(data, "- ON");
        // console.log("terms")
        // console.log(terms)
        // console.log()
        // console.log("[index]")
        // console.log(index)
        // ADD THE TERM TO THE QUERY
        // let term = terms[index].id
        formData["message"]["query_graph"]["nodes"]["n2"]["id"] = terms;

        let termtest = (typeof formData["message"]["query_graph"]["nodes"]["n2"]["id"])

      // console.log(formData)
        
        
      if(termtest = "text") {
        console.dir(new Date())
        // console.log("about to send formdata to api - index = " + index);
        console.log(JSON.stringify(formData) )
        // console.log("terms.length = " + terms.length)
        // POST TO UNSECRET API
        axios.post(queryurl, formData) // WAIT FOR RESULTS
          .then( async response => {

            let processedResults = await processDataset(response.data, terms)
            console.log("processedResults")
            // console.log(processedResults)
            res.send(processedResults)
            return;
     
          })
          .catch(error => {
            console.error("there was an error getting the drugs");
            console.error(error.message);
            res.send(error)
            
          });

      } else {
        console.log("THE TERM WAS NOT OF TYPE TEXT - REQUEST TO MEDIK NOT MADE")
        res.send("THE TERM WAS NOT OF TYPE TEXT - REQUEST TO MEDIK NOT MADE")
      }






});


  module.exports = router;