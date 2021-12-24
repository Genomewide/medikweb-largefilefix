const express = require('express');
const router = express.Router();

// const mongodb = require('mongodb');
const got = require('got');
const axios = require('axios')
const parser = require('fast-xml-parser')

const queryurl = 'http://localhost:8080/v2/query'
let conceptsurl = "http://localhost:8080/v2/find-concepts"
const ncbiService = require('./services/ncbiService')



router.post('/',  (req, res) => {
  console.log("********** posting with query_raw - server side")
  let terms = req.body.concepts
  console.log("req.body = ", JSON.stringify(req.body))
  console.log("terms = ", JSON.stringify(terms))

    // console.log(" starting test loop for new page")
    // formData = {"message":{"query_graph":{"nodes":{"n2":{"id":"UMLS:C1332830"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2"}}}}}

    // formData["message"]["query_graph"]["nodes"]["n2"]["id"] = terms;
    // console.log("typeof formData")
    // console.log(typeof formData)
    // let termtest = (typeof formData["message"]["query_graph"]["nodes"]["n2"]["id"])
    // let textarea = '{ "message": { "query_graph": { "nodes": {"n0": {"ids": ["UMLS:C0221347"], "categories": ["biolink:PhenotypicFeature"]}, "n1": { "categories": ["biolink:NamedThing"] } }, "edges": { "e01": { "subject": "n0", "object": "n1" } } } }}',
      // console.log(formData)
        
      // console.log("termtest")
      // console.log(termtest)
      // if(termtest == "string") {
        console.dir(new Date())
        // console.log("about to send formdata to api - index = " + index);
        // console.log(JSON.stringify(formData) )
        // console.log("terms.length = " + terms.length)
        // POST TO UNSECRET API
        
        // axios.post(queryurl, formData) // WAIT FOR RESULTS


        // START ################# ----  PREVIOUSLY WORKING CODE ---- #################
        axios.post(queryurl, terms) // WAIT FOR RESULTS
          .then( async response => {
            
            // let processedResults = await processDataset(response.data, terms)
            console.log("response.data")
            console.log(response.data)
            res.send(response.data)
            return;
     
          })
          .catch(error => {
            console.error("there was an error getting the concepts");
            // console.error(error);
            console.error(error.message);
            res.send(error)
            
          });
        // END ################# ----  PREVIOUSLY WORKING CODE ---- #################


 
});

  
  module.exports = router;