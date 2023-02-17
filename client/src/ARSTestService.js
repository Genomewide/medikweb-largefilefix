import axios from 'axios';

class ARSService {

  static ARSQuery = (query) => {
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line

      // https://ars-prod.transltr.io/ars/api/submit
      let url = "https://ars-prod.transltr.io/ars/api/submit"

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
    //https://arax.ncats.io/api/arax/v1.2/response/4423a078-f43e-4935-ad72-5938ab0bc7a5
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg)
      let url = "https://ars.test.transltr.io/ars/api/messages/" + queryID + "?trace=y"
      // let url = "https://ars-prod.transltr.io/ars/api/messages/" + queryID + "?trace=y"
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      console.log("ARSStatus url = ", url)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }


  // https://ars.test.transltr.io/ars/api/messages/4de7052a-51e8-4967-ab52-9d76ee1bf2c3?trace=y

  static pkQueryDataTest = (queryID) => {
    //https://arax.ncats.io/api/arax/v1.2/response/4423a078-f43e-4935-ad72-5938ab0bc7a5
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg)
      let url = "https://ars.test.transltr.io/ars/api/messages/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      console.log("ARSStatus url = ", url)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static pkQueryData = (queryID) => {
    console.log("start pkQueryData")
    //https://arax.ncats.io/api/arax/v1.2/response/4423a078-f43e-4935-ad72-5938ab0bc7a5
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg)
                //  https://ars.test.transltr.io/ars/api/messages/
      let url = "https://ars.test.transltr.io/ars/api/messages/" + queryID
      // let url = "https://ars-prod.transltr.io/ars/api/messages/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      console.log("ARSStatus url = ", url)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static pkQueryData = (queryID) => {
    //https://arax.ncats.io/api/arax/v1.2/response/4423a078-f43e-4935-ad72-5938ab0bc7a5
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg) 
      let url = "https://ars.test.transltr.io/ars/api/messages/" + queryID
      // let url = "https://ars-prod.transltr.io/ars/api/messages/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      console.log("ARSStatus url = ", url)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static ARSResult = (queryID) => {
    //https://arax.ncats.io/api/arax/v1.2/response/4423a078-f43e-4935-ad72-5938ab0bc7a5
    // console.log(searchterm) 
    // console.log(ARAXquery_gg) 
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // ARAXquery_gg.message.query_graph.nodes.n00.ids = [searchterm]
      // console.log(ARAXquery_gg)
      let url = "https://ars.test.transltr.io/ars/api/messages/" + queryID
      // let url = "https://ars-prod.transltr.io/ars/api/messages/" + queryID
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      // console.log(ARAXquery_gg)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("ARSStatus ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static ARSResultCheck = (queryID) => {
    console.log("start ARSResultCheck")

    return new Promise(async (resolve, reject) => { // eslint-disable-line

      let url = "https://arax.ncats.io/api/arax/v1.2/response/" + queryID
      // let url = "https://arax.ncats.io/api/arax/v1.2/response/" + queryID
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
      
      static getSynonymsArray = (searchtermArray) => {
        // console.log("started getSynonyms");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes"
          
            try {
              const res = await axios.post(url, {"curies": searchtermArray, "conflate" : true});
              const data = res.data;
              // });
        
              console.log("getSynonymsArray ran")
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
          let url = "https://arax.ncats.io/api/arax/v1.3/entity?q=" + searchterm
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
    
      static getARAXSynonymsArray = (searchterms) => {
        console.log("started getARAXSynonymsArray");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          let url = "https://arax.transltr.io/api/arax/v1.3/entity"
          try {
            const res = await axios.post(url,{"terms" : searchterms} );
            const data = res.data;
            // });
      
            console.log("getARAXSynonymsArray ran")
            console.log(data)
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }


}


export default ARSService;