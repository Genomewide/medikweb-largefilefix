import axios from 'axios';

let ARAXquery_gg = {
  "enforce_edge_directionality": true,
  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "subject": "n00",
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
                  "object": "n01"
              }
          },
          "nodes": {
                "n00": {
                  "categories": [
                      "biolink:Protein",
                      "biolink:Gene"
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
              }

          }
      }
  },
  "return_minimal_metadata": false,

  "submitter": "UI Team ABC"
}

let ARAXquery_dg = {

  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "subject": "n00",
                  
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
                  "object": "n01"
                  
              }
 
          },
          "nodes": {
            "n00": {
              "categories": [
                  "biolink:Drug",
                  "biolink:Chemical"
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
                    "HGNC:11098"
                ],
                "is_set": false
            }

          }
      }
  },
  "return_minimal_metadata": false,

  "submitter": "UI Team ABC"
}


class ARAXService {

  static araxQuery_gg = (searchterm) => {
    console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      ARAXquery_gg.message.query_graph.nodes.n01.ids = searchterm
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
        console.log(data)
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
      ARAXquery_dg.message.query_graph.nodes.n01.ids = searchterm
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