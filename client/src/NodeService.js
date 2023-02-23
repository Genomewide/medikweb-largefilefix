import axios from 'axios';

// let testData = ""
class NodeService {

  // static getAllSynOrtho (){
  //   let symbol = this.concept_search
  //   symbol = "mapk8ip3"
  //   console.log(symbol)
  //   let symbolEnsemblURL = "https://rest.ensembl.org/homology/symbol/human/" +  +" ?content-type=application/json;format=condensed;type=orthologues;target_species=caenorhabditis_elegans;target_species=mus_musculus;target_species=danio_rerio;target_species=rattus_norvegicus;targe_species=human;"
  //   console.log(symbolEnsemblURL)
  // }


  static getHGNCMouseOrtho = (symbol) => {

    let headers = "Accept:application/json"
    let url = "https://rest.genenames.org/fetch/symbol/ZNF3"
    console.log(url + ' ' + symbol + ' ' + headers)


    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // let symbol = this.concept_search
      // symbol = "mapk8ip3"
      // console.log(symbol)

    // GET ENSEMBL IDS FOR ORTHOLOGS
      // let symbolEnsemblURL = "https://rest.ensembl.org/homology/symbol/human/" + symbol +"?content-type=application/json;format=condensed;type=orthologues;target_species=caenorhabditis_elegans;target_species=mus_musculus;target_species=danio_rerio;target_species=rattus_norvegicus;targe_species=human;"
      // console.log(symbolEnsemblURL)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        console.log("getHGNCMouseOrtho RAN")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getAllSynOrtho = (symbol) => {

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // let symbol = this.concept_search
      symbol = "mapk8ip3"
      console.log(symbol)

    // GET ENSEMBL IDS FOR ORTHOLOGS
      let symbolEnsemblURL = "https://rest.ensembl.org/homology/symbol/human/" + symbol +"?content-type=application/json;format=condensed;type=orthologues;target_species=caenorhabditis_elegans;target_species=mus_musculus;target_species=danio_rerio;target_species=rattus_norvegicus;targe_species=human;"
      console.log(symbolEnsemblURL)
      try {
        const res = await axios.get(symbolEnsemblURL);
        const data = res.data;
        // });
  
        console.log("getAllSynOrtho RAN")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static getXrefs = (ensemblid) => {

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // let symbol = this.concept_search
      // symbol = "mapk8ip3"
      console.log(ensemblid)

    // USE ENSEMBL IDS TO GET XREFS
    // "https://rest.ensembl.org/xrefs/id/" + ensemblid + "?content-type=application/json"
      let ensemblidURL = "https://rest.ensembl.org/xrefs/id/" + ensemblid + "?content-type=application/json"

      console.log(ensemblidURL)
      try {
        const res = await axios.get(ensemblidURL);
        const data = res.data;
        // });
  
        console.log("getXrefs RAN")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

// https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=RGD%3A1563691&conflate=true

static nodeNormalization = (id) => {

  return new Promise(async (resolve, reject) => { // eslint-disable-line
    // let symbol = this.concept_search
    // symbol = "mapk8ip3"
    console.log(id)

  // USE ENSEMBL IDS TO GET XREFS
  // "https://rest.ensembl.org/xrefs/id/" + ensemblid + "?content-type=application/json"
    let normalURL = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=" + id + "&conflate=true"

    console.log(normalURL)
    try {
      const res = await axios.get(normalURL);
      const data = res.data;
      // });

      console.log("nodeNormalization RAN")
      console.log(data)
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

static nodeNormalizationPost = (idArray) => {

  return new Promise(async (resolve, reject) => { // eslint-disable-line
    // let symbol = this.concept_search
    // symbol = "mapk8ip3"
    console.log(idArray)
    let postPacket = {
      "curies": [
        "ENSEMBL:ENSG00000132153"
       
      ],
      "conflate": true
    }
    
    postPacket.curies = idArray

  // USE ENSEMBL IDS TO GET XREFS
  // "https://rest.ensembl.org/xrefs/id/" + ensemblid + "?content-type=application/json"
    // 'https://nodenorm.transltr.io/1.3/get_normalized_nodes
    // let normalURL = "https://nodenorm.transltr.io/nodenormalization-sri.renci.org/1.3"
    let normalURL = "https://nodenorm.transltr.io/1.3/get_normalized_nodes"

    console.log(normalURL)
    try {
      const res = await axios.post(normalURL, postPacket);
        const data = res.data;
        console.log("nodeNormalizationPost RAN")
        console.log(data)
        resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

  // static araxQuery_dg = (searchterm) => {
  //   console.log(searchterm) 
  //   console.log(ARAXquery_dg) 
  //   // console.log("started getSynonyms");
  //   return new Promise(async (resolve, reject) => { // eslint-disable-line
  //     ARAXquery_dg.message.query_graph.nodes.n00.ids = [searchterm]
  //     // console.log(ARAXquery_gg)
  //     let url = "https://arax.ncats.io/beta/api/arax/v1.2/query"
  //     // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
  //     // console.log(ARAXquery_gg)
  //     try {
  //       const res = await axios.post(url, ARAXquery_dg);
  //       const data = res.data;
  //       // });
  
  //       console.log("ARAXquery_dg ran")
  //       // console.log(data)
  //       resolve(data);
  //     } catch (err) {
  //       reject(err);
  //     }
  //   });
  // }
    static getSynonyms = (searchterm) => {
        // console.log("started getSynonyms");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
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
    
      static getCooccurance = (query) => {
        console.log("started getCooccurance");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://cooccurrence-p36smkc6hq-uc.a.run.app/query" 
          // query = {
          //   "message": {
          //     "query_graph": {
          //       "edges": {
          //         "e00": {
          //           "object": "n01",
          //           "predicates": [
          //             "biolink:occurs_together_in_literature_with"
          //           ],
          //           "subject": "n00"
          //         }
          //       },
          //       "nodes": {
          //         "n00": {
          //           "categories": [
          //             "biolink:AnatomicalEntity"
          //           ]
          //         },
          //         "n01": {
          //           "ids": [
          //             "NCBITaxon:33746"
          //           ]
          //         }
          //       }
          //     }
          //   }
          // }
          try {
            const res = await axios.post(url, query);
              const data = res.data;
              // let testData = res
              console.log("getCooccurance RAN")
              console.log(res)
              console.log(data)
              resolve(data);
          } catch (err) {
            // console.log("testData")
            // console.log(testData)
            reject(err);
          }
        });
      }

}


export default NodeService;