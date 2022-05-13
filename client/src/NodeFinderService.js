import axios from 'axios';



class NodeFinderService {

  static textMatch = (searchterm) => {
    console.log("NodeFinderService started")
    // https://name-resolution-sri.renci.org/lookup?string=covid&offset=0&limit=1000

    let url = "https://name-resolution-sri.renci.org/lookup?offset=0&limit=1000&string=" + searchterm
    console.log(searchterm) 
    console.log(url) 

    return new Promise(async (resolve, reject) => { // eslint-disable-line
  
      try {
        const res = await axios.post(url);
        const data = res.data;
        // });
  
        console.log("NodeFinderService ran")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static nodeNormalizer = (searchterm) => {
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let url = "https://nodenormalization-sri.renci.org/1.2/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
      try {
        const res = await axios.get(url);

        const data = res.data;
        // });

        // console.log(" nodeNormalizer ***2")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
  static nodeNormalizerBulk = (searchterms) => {
    // console.log("started getSynonyms");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let url = "https://nodenormalization-sri.renci.org/1.2/get_normalized_nodes?&conflate=true" 
      try {
        const res = await axios.post(url, searchterms);

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


export default NodeFinderService;