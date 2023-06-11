import axios from "axios";

const chemblurl = "/api/posts/chembl";
const concepturl = "api/posts/concepts/"; // GETS CONCEPTS
const medikQueryurl = "api/posts/medikquery/";
const chemblQueryurl = "api/posts/chembl/";
const synonymQueryurl = "api/posts/synonyms/";
const Queryurl = "api/posts/query/";
const Queryurl_raw = "api/posts/query_raw/";
const mongoumlsurl = "api/posts/mongoumls/";
const robokopurl = "https://automat.renci.org/robokopkg/"

const formData = 
{
    "message": {
      "query_graph": {
        "nodes": {
          "n1": { "category": "chem" },
          "n2": { "id": "PR:00000test6121" }
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
// '/api/posts/mongoumlsurl'



const pingmedik = (url, packet) => {
    console.log("started pingmedik");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      
      try {
        const res = await axios.post(url, {
          concepts: packet,

        });
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

class PostService {

  static robokopGet(subjectID, subjectCat, objectCat) {
    let url = robokopurl + subjectCat + "/" + objectCat + "/" + subjectID
    console.log("started robokopGet")
    console.log(url)
    // USE AXIOS TO GET FROM A URL LIKE THIS: https://automat.renci.org/robokopkg/biolink:Disease/biolink:ChemicalEntity/MONDO:0001234
    url = "https://automat.renci.org/robokopkg/biolink:Gene/biolink:PhenotypicFeature/NCBIGene:7157"
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      try {
        const res = await axios.get(url);
        console.log("robokopGet response")
        console.log(res)
        const data = res.data;
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });


    // return new Promise(async (resolve, reject) => {// eslint-disable-line
    //   try {
    //     const res = await axios.get(url);

    //     const data = res.data;

    //     resolve(data);
    //   } catch (err) {
    //     reject(err);
    //   }
    // });
  }
    static queryPR() {
      console.log("started queryPR - const formData input")
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        // debugger; // eslint-disable-line
        try {
        console.log("started queryPR");
        pingmedik("api/posts/query/pr/", formData)
        .then(response => {
          resolve(response)
            // console.log(response)
        })
      } catch (err) {
        reject(err);
      }
      
    });
  }
    static queryConcept = (packet) => {
      console.log("started queryConcept");
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        
        try {
          const res = await axios.post(concepturl, {
            concepts: packet,
  
          });
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

      static pingmedik = (url, packet) => {
        console.log("started pingmedik");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          
          try {
            const res = await axios.post(url, {
              concepts: packet,
    
            });
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
  static mongoumls(concepts) {
    console.log("started mongoumls");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(mongoumlsurl, {
          concepts: concepts,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
        const data = res.data;
        // });
        console.log("res")
        console.log(res)

        console.log("***mongoumls data")
        console.log(data)

        resolve(data);
      } catch (err) {
        console.log("***mongoumls error in PostService")
        reject(err);
      }
    });
  }

  static queryMedik(concepts) {
    console.log("started queryMedik");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(Queryurl, {
          concepts: concepts,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
        const data = res.data;
        // });

        console.log("***2")
        console.log(data)
        resolve(data);

      } catch (err) {
        reject(err);
      }
    });
  }

  static getPRparent(PRidquery) {
    console.log("started getPRparent");
    console.log(PRidquery)
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(Queryurl, {
          concepts: PRidquery,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
        const data = res.data;
        // });

        console.log("***2")
        console.log(data)

        let PRid = PRidquery["message"]["query_graph"]["nodes"]["n2"]["id"]
        let nodes = data["message"]["knowledge_graph"]["nodes"]; // returns 3 nodes that include the search term and the two parents
        let node_ids = Object.keys(nodes);
        let PRparent

        for (let index = 0; index < node_ids.length; index++) {
          //exclude the unwnated parent and the original search term
          const parent_id = node_ids[index];

          if (parent_id != "PR:000029067" && parent_id != PRid) {
            // EXCLUDE HUMAN PROTEIN AND ORIGINAL SEARCH TERM
            // resolve(parent_id)
            PRparent = parent_id;
            // PR:000029067 is the id for all human proteins
          }

          if (index == node_ids.length - 1) {
            console.log("checked for parent and returning");
            resolve(PRparent);
          }
        }

        
        

      } catch (err) {
        reject(err);
      }
    });
  }

  static query_raw(concepts) {
    // console.log("started query_raw");
    // console.log(concepts)
    // concepts = formData
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(Queryurl_raw, {
          concepts: concepts,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
        const data = res.data;
        // console.log("axios for Postservices done")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static query_ars() {
    // console.log("started query_raw");
    // console.log(concepts)
    // concepts = formData
    let arsurl = "https://ars.transltr.io/ars/api/submit"
    // let query = '{"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n1","object": "n2"}}}}}'
    // let query_example = ' {"message": {"query_graph": {"edges": {"e01": {"subject": "n0","predicate": "biolink:treats","object": "n1"}},"nodes": {"n0": {"category": "biolink:Drug","id": "DRUGBANK:DB00394"},"n1": {"category": "biolink:Disease"}}}}}"'
    let query_example = '{"message": {"query_graph": {"edges": {"e01": {"subject": "n0","predicate": "biolink:treats","object": "n1"}},"nodes": {"n0": {"category": "biolink:Drug","id": "DRUGBANK:DB00394"},"n1": {"category": "biolink:Disease"}}}}}'
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      
      try {
        // terms.array.forEach(element => {
          console.log("query_example = ", query_example)
          let query = JSON.parse(query_example)

          console.log("query = ", query)
          // let query = JSON.parse(query_example)
        const res = await axios.post(arsurl, 
          query
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        );
        const data = res.data;
        console.log("ARS axios for Postservices done")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static mongo_postChebi(drugs) {
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.post("/api/posts/chembl/chebi", {
          concepts: drugs,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
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

  static mongoDrug(drugs) {
    console.log("starting mongoDug")
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(chemblurl, {
          concepts: drugs,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
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

  static queryPost(concepts) {
    console.log("queryPost")
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.post(medikQueryurl, {
          concepts: concepts,
          // name: "test text",
          // email:"sean_bean@gameofthron.es",
          // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
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

  static getConcept(concept) {
    // console.log("start getConcept")
    // GETS CONCEPTS
    // /*eslint no-promise-executor-return: "error"*/
    // console.log(concept);
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // eslint-disable-line
      // console.log("concept = ", concept)
      // console.log("length = ", concept.length)
      try {
        ///cooncepts
        concept = concept.replace(/\//g, "%2F")
        const res = await axios.get(`${concepturl}${concept}`);
        const data = res.data;
        // console.log("***2")
        // console.log(data)
        resolve(data);
      } catch (err) {
        console.log("concept causing error = ", concept)
        reject(err);
      }
    });
  }

  static getGeneSynonyms(concept) {
    // console.log("start getConcept")
    // GETS CONCEPTS
    // /*eslint no-promise-executor-return: "error"*/
    // console.log(concept);
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // eslint-disable-line
      // console.log("concept = ", concept)
      // console.log("length = ", concept.length)
      try {
        ///cooncepts
        concept = concept.replace(/\//g, "%2F")
        const res = await axios.get(`${concepturl}${concept}`);
        const data = res.data;

        let allSynIDs = Object.keys(data.synonyms);
        let synIDsReturn = {}
        // synIDsReturn.push({"geneSymbol" : data.synonyms[concept]})
        synIDsReturn["geneSymbol"] = data.synonyms[concept]

        for (let index = 0; index < allSynIDs.length; index++) {
          const id = allSynIDs[index];
          if(id.startsWith("NCBI")) {
            synIDsReturn["NCBI"] = id
            synIDsReturn["geneName"] =  data.synonyms[id]
          }
          if(id.startsWith("UniProtKB")) {
            synIDsReturn["UniProtKB"] =  id
          }
          if(id.startsWith("PR")) {
            synIDsReturn["PR"] =  id
          }
          // if(id.startsWith("NCBI")) {
          //   synIDsReturn.push({ "NCBI" :id})
          //   synIDsReturn.push({ "geneName" :data.synonyms[id]})
          // }
          // if(id.startsWith("UniProtKB")) {
          //   synIDsReturn.push({"UniProtKB" : id})
          // }
          // if(id.startsWith("PR")) {
          //   synIDsReturn.push({"PR" : id})
          // }
          if(index == allSynIDs.length -1){
            console.log({synIDsReturn})
            resolve(synIDsReturn);
          }
        }
  
        
      } catch (err) {
        console.log("concept causing error = ", concept)
        reject(err);
      }
    });
  }


  static getSynonyms(concept) {
    // /*eslint no-promise-executor-return: "error"*/
    // console.log("service concept")
    // console.log(concept)

    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        ///cooncepts
        const res = await axios.get(`${concepturl}${concept}`);
        const data = res.data;
        // console.log("data");
        // console.log(data);
        // console.log("synonym data")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  
  static chemblQuery() {
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.get(`${chemblQueryurl}`);
        //     {
        //     // concepts: concepts
        //     // name: "test text",
        //     // email:"sean_bean@gameofthron.es",
        //     // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        // });
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


  
  static synonymsQuery() {
    return new Promise(async (resolve, reject) => {// eslint-disable-line
      // eslint-disable-line
      try {
        // terms.array.forEach(element => {
        const res = await axios.get(`${synonymQueryurl}`);
        //     {
        //     // concepts: concepts
        //     // name: "test text",
        //     // email:"sean_bean@gameofthron.es",
        //     // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        // });
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

export default PostService;
