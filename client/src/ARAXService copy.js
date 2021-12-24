import axios from 'axios';

// const url = 'api/posts/';
// https://arax.ncats.io/api/arax/v1.2/entity?q=NCBIGene%3A203547&q=HGNC%3A6884


class ARAXService {

  static araxQuery = (searchterm) => {
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