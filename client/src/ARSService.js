import axios from 'axios';

class ARSService {

  static ARSQuery = (query) => {
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line

      let url = "https://ars.transltr.io/ars/api/submit"

      try {
        const res = await axios.post(url, query);
        const data = res.data;
        // });
  
        console.log("ARSquery ran")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static ARSStatus = (queryID) => {
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg)
      let url = "https://arax.ncats.io/api/arax/v1.2/response/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      // console.log(ARAXquery_gg)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static ARSResultCheck = (queryID) => {

    return new Promise(async (resolve, reject) => { // eslint-disable-line

      let url = "https://arax.ncats.io/api/arax/v1.2/response/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      // console.log(ARAXquery_gg)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        console.log("ARSStatus ran")
        // console.log(data)
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


export default ARSService;