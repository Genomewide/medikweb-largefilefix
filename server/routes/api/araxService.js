const express = require('express');
const router = express.Router();

// const mongodb = require('mongodb');
// const got = require('got');
const axios = require('axios')
// const parser = require('fast-xml-parser')

// const queryurl = 'http://localhost:8080/v2/query'
// let conceptsurl = "http://localhost:8080/v2/find-concepts"
// const ncbiService = require('./services/ncbiService')

let query = {
  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "object": "n01",
                  "predicates": [
                      "biolink:decreases_degradation_of",
                      "biolink:increases_activity_of",
                      "biolink:increases_expression_of",
                      "biolink:increases_stability_of",
                      "biolink:increases_synthesis_of",
                      "biolink:activator",
                      "biolink:agonist",
                      "biolink:inducer",
                      "biolink:inverse_agonist",
                      "biolink:partial_agonist",
                      "biolink:positive_allosteric_modulator",
                      "biolink:stimulates",
                      "biolink:stimulator",
                      "biolink:positively_regulates"
                  ],
                  "subject": "n00"
              }
          },
          "nodes": {
              "n00": {
                  "categories": [
                      "biolink:SmallMolecule",
                      "biolink:Drug",
                      "biolink:ChemicalEntityOrGeneOrGeneProduct",
                      "biolink:Chemical",
                      "biolink:MolecularMixture"
                  ],
                  "constraints": [],
                  "is_set": false
              },
              "n01": {
                  "categories": [
                      "biolink:Protein",
                      "biolink:Gene"
                  ],
                  "constraints": [],
                  "ids": [
                      "HGNC:11098",
                      "NCBIGene:6595",
                      "UMLS:C1335841",
                      "UMLS:C0246454",
                      "UniProtKB:P51531",
                      "PR:P51531",
                      "PR:000029762",
                      "UniProtKB:P51531"
                  ],
                  "is_set": false
              }
          }
      }
  },
  "submitter": "UI Team ABC",
  "stream_progress": true
}

let getSynonymsServer = (searchterm) => {
  console.log("#### started getSynonymsServer  - seatrchterm = ", searchterm)
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let url = 'https://arax.ncats.io/api/arax/v1.2/query'
    try {
      const res = await axios.post(url, query);
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

 
});

  
  module.exports = router;