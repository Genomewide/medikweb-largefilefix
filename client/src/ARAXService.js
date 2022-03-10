import axios from 'axios';

// const url = 'api/posts/';
// https://arax.ncats.io/api/arax/v1.2/entity?q=NCBIGene%3A203547&q=HGNC%3A6884

// let query = {
//   "message": {
//       "query_graph": {
//           "edges": {
//               "e00": {
//                   "constraints": [],
//                   "object": "n00",
//                   "predicates": [
//                       "biolink:decreases_degradation_of",
//                       "biolink:increases_activity_of",
//                       "biolink:increases_expression_of",
//                       "biolink:increases_stability_of",
//                       "biolink:increases_synthesis_of",
//                       "biolink:activator",
//                       "biolink:agonist",
//                       "biolink:inducer",
//                       "biolink:inverse_agonist",
//                       "biolink:partial_agonist",
//                       "biolink:positive_allosteric_modulator",
//                       "biolink:stimulates",
//                       "biolink:stimulator",
//                       "biolink:positively_regulates"
//                   ],
//                   "subject": "n02"
//               },
//               "e01": {
//                 "constraints": [],
//                 "object": "n02",
//                 "predicates": [
//                     "biolink:decreases_degradation_of",
//                     "biolink:increases_activity_of",
//                     "biolink:increases_expression_of",
//                     "biolink:increases_stability_of",
//                     "biolink:increases_synthesis_of",
//                     "biolink:activator",
//                     "biolink:agonist",
//                     "biolink:inducer",
//                     "biolink:inverse_agonist",
//                     "biolink:partial_agonist",
//                     "biolink:positive_allosteric_modulator",
//                     "biolink:stimulates",
//                     "biolink:stimulator",
//                     "biolink:positively_regulates"
//                 ],
//                 "subject": "n01"
//             }
//           },
//           "nodes": {
//               "n00": {
//                   "categories": [
//                       "biolink:SmallMolecule",
//                       "biolink:Drug",
//                       "biolink:Chemical",
//                       "biolink:MolecularMixture"
//                   ],
//                   "constraints": [],
//                   "is_set": false
//               },
//               "n01": {
//                   "categories": [
//                       "biolink:Protein",
//                       "biolink:Gene"
//                   ],
//                   "constraints": [],
//                   "ids": [
//                       "HGNC:11098",
//                       "NCBIGene:6595",
//                       "UMLS:C1335841",
//                       "UMLS:C0246454",
//                       "UniProtKB:P51531",
//                       "PR:P51531",
//                       "PR:000029762",
//                       "UniProtKB:P51531"
//                   ],
//                   "is_set": false
//               },
//               "n02": {
//                 "categories": [
//                     "biolink:Protein",
//                     "biolink:Gene"
//                 ],
//                 "constraints": [],
          
//                 "is_set": false
//             }
//           }
//       }
//   },
//   "submitter": "UI Team ABC",
//   "stream_progress": true
// }

let ARAXquery_gg = {
  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "object": "n01",
                  "predicates": [
                    "biolink:entity_negatively_regulates_entity",
                    "biolink:entity_positively_regulates_entity",
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
                      "biolink:Protein",
                      "biolink:Gene"
                  ],
                  "constraints": [],
                  "ids": 
                  
                    [
                        "UMLS:C1417026",
                        "NCBIGene:23162",
                        "ENSEMBL:ENSG00000138834",
                        "HGNC:6884",
                        "OMIM:605431",
                        "RGD:1563691",
                        "NCBIGene:302983",
                        "ENSEMBL:ENSRNOG00000033568",
                        "MGI:1353598",
                        "NCBIGene:30957",
                        "ENSEMBL:ENSMUSG00000024163",
                        "PR:Q9UPT6",
                        "UniProtKB:Q9UPT6",
                        "PR:000010162",
                        "UniProtKB:A0A087WYG2",
                        "ENSEMBL:ENSP00000481780",
                        "UniProtKB:B7ZMF3",
                        "UniProtKB:E9PFH7",
                        "ENSEMBL:ENSP00000348290"
                    ]
                ,
                  "is_set": false
              },
              "n01": {
                "categories": [
                    "biolink:Protein",
                    "biolink:Gene"
                ],
                "constraints": [],
          
                "is_set": false
            }
          }
      }
  },
  "submitter": "UI Team ABC",
  "stream_progress": true
}

let ARAXquery_dg = {

  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "object": "n01",
                  "predicates": [
                    "biolink:entity_negatively_regulates_entity",
                    "biolink:entity_positively_regulates_entity",
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
                      "biolink:Protein",
                      "biolink:Gene"
                  ],
                  "constraints": [],
                  "ids": [
                      "HGNC:11098"
                  ],
                  "is_set": false
              },
              "n01": {
                "categories": [
                    "biolink:Drug",
                    "biolink:Chemical"
                ],
                "constraints": [],
          
                "is_set": false
            }
          }
      }
  },
  "submitter": "UI Team ABC",
  "stream_progress": true
}

// let query_onehop = {
//   "message": {
//       "query_graph": {
//           "edges": {
//               "e00": {
//                   "constraints": [],
//                   "object": "n01",
//                   "predicates": [
//                       "biolink:decreases_degradation_of",
//                       "biolink:increases_activity_of",
//                       "biolink:increases_expression_of",
//                       "biolink:increases_stability_of",
//                       "biolink:increases_synthesis_of",
//                       "biolink:activator",
//                       "biolink:agonist",
//                       "biolink:inducer",
//                       "biolink:inverse_agonist",
//                       "biolink:partial_agonist",
//                       "biolink:positive_allosteric_modulator",
//                       "biolink:stimulates",
//                       "biolink:stimulator",
//                       "biolink:positively_regulates"
//                   ],
//                   "subject": "n00"
//               }
//           },
//           "nodes": {
//               "n00": {
//                   "categories": [
//                       "biolink:SmallMolecule",
//                       "biolink:Drug",
//                       "biolink:ChemicalEntityOrGeneOrGeneProduct",
//                       "biolink:Chemical",
//                       "biolink:MolecularMixture"
//                   ],
//                   "constraints": [],
//                   "is_set": false
//               },
//               "n01": {
//                   "categories": [
//                       "biolink:Protein",
//                       "biolink:Gene"
//                   ],
//                   "constraints": [],
//                   "ids": [
//                       "HGNC:11098",
//                       "NCBIGene:6595",
//                       "UMLS:C1335841",
//                       "UMLS:C0246454",
//                       "UniProtKB:P51531",
//                       "PR:P51531",
//                       "PR:000029762",
//                       "UniProtKB:P51531"
//                   ],
//                   "is_set": false
//               }
//           }
//       }
//   },
//   "submitter": "UI Team ABC",
//   "stream_progress": true
// }

// let queryB = {
//   "message": {
//       "query_graph": {
//           "nodes": {
//               "n0": {
//                    "ids": ["MONDO:0005359", "SNOMEDCT:197354009"],
//                    "categories": ["biolink:DiseaseOrPhenotypicFeature"]
//               },
//               "n1": {
//                   "categories": ["biolink:DiseaseOrPhenotypicFeature"]
//               },
//               "n2": {
//                   "categories": ["biolink:Gene"]
//               },
//               "n3": {
//                   "categories": ["biolink:Drug"]
//               }
//           },
//           "edges": {
//               "e01": {
//                   "subject": "n0",
//                   "object": "n1",
//                   "predicates": ["biolink:has_real_world_evidence_of_association_with"]
//               },
//               "e02": {
//                   "subject": "n2",
//                   "object": "n1",
//                   "predicates": ["biolink:gene_associated_with_condition"]
//               },
//               "e03": {
//                   "subject": "n3",
//                   "object": "n2",
//                   "predicates": ["biolink:affects"]
//               }
//           }
//       }
//   }
// } 

class ARAXService {

  static araxQuery_gg = (searchterm) => {
    console.log(searchterm) 
    console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      ARAXquery_gg.message.query_graph.nodes.n00.ids = searchterm
      console.log( ARAXquery_gg)
      console.log(JSON.stringify(ARAXquery_gg))

      let url = "https://arax.ncats.io/beta/api/arax/v1.2/query"
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      // console.log(ARAXquery_gg)
      try {
        const res = await axios.post(url, ARAXquery_gg);
        const data = res.data;
        // });
  
        console.log("ARAXquery_gg ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static araxQuery_dg = (searchterm) => {
    // console.log(searchterm) 
    console.log("########### araxQuery_dg") 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      ARAXquery_dg.message.query_graph.nodes.n00.ids = searchterm
      console.log(ARAXquery_dg)
      let url = "https://arax.ncats.io/beta/api/arax/v1.2/query"
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      try {
        const res = await axios.post(url, ARAXquery_dg);
        const data = res.data;
        // });
  
        console.log("ARAXquery_dg ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
    static getSynonyms = (searchterm) => {
        // console.log("started getSynonyms");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://nodenormalization-sri.renci.org/1.2/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
          try {
            const res = await axios.get(url);

            const data = res.data;
            // });
    
            console.log(" ARAX***2")
            console.log(data)
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }
      
      static getARAXSynonyms = (searchterm) => {
        console.log("started getSynonyms");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://arax.ncats.io/api/arax/v1.2/entity?q=" + searchterm
          try {
            const res = await axios.get(url);

            const data = res.data;
            // });
    
            // console.log("***2")
            // console.log(data)
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }
    


}


export default ARAXService;