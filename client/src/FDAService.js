import axios from 'axios';

class FDAService {

  static fdaBulk = (limit, offset) => {
    let append = "&limit=" + limit + "&offset=" + offset
    console.log(append) 

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      // https://www.ebi.ac.uk/chembl/api/data/molecule.json?max_phase=4&limit=20

      let url = "https://www.ebi.ac.uk/chembl/api/data/molecule.json?max_phase=4" + append

      try {
        const res = await axios.get(url);
        const data = res.data;
  
        console.log("fdaBulk ran")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static MOA = (id) => {
    console.log("started MOA")

    return new Promise(async (resolve, reject) => { // eslint-disable-line
// https://www.ebi.ac.uk/chembl/api/data/mechanism?molecule_chembl_id=CHEMBL998

      let url = "https://www.ebi.ac.uk/chembl/api/data/mechanism.json?molecule_chembl_id=" + id

      try {
        const res = await axios.get(url);
        const data = res.data;
  
        console.log("MOA ran")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static myChemInfo = (curie) => {
    console.log(curie) 

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let id = curie.split(":")[1]
      let url = "https://mychem.info/v1/chem/" + id + "?fields=unii"
      // let url = 'https://arax.ncats.io/api/arax/v1.2/query'
      // console.log(ARAXquery_gg)
      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        console.log("myChemInfo ran")
        console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static openFDA = (unii) => {
    console.log(unii) 

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let url = "https://api.fda.gov/drug/drugsfda.json?api_key=EWKpb1cjDAJYTwDcQNmAuCYTFtf99kIWb67KnI1m&search=openfda.unii:" + unii 

      // console.log(url)

      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("openFDA ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }

  static openFDAGetUnii = (name) => {
    console.log(name) 

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let url = "https://api.fda.gov/other/substance.json?search=names.name:%22" + name + "%22"  

      // console.log(url)

      try {
        const res = await axios.get(url);
        const data = res.data;
        // });
  
        // console.log("openFDAGetUnii ran")
        // console.log(data)
        resolve(data);
      } catch (err) {
        reject(err);
      }
    });
  }
    // static getSynonyms = (searchterm) => { https://api.fda.gov/drug/drugsfda.json?search=openfda.unii:31C4KY9ESH
    //     // console.log("started getSynonyms");
    //     return new Promise(async (resolve, reject) => { // eslint-disable-line
    //       let url = "https://nodenormalization-sri.renci.org/1.3/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
    //       try {
    //         const res = await axios.get(url);

    //         const data = res.data;
    //         // });
    
    //         console.log(" ARAX***2")
    //         console.log(data)
    //         resolve(data);
    //       } catch (err) {
    //         reject(err);
    //       }
    //     });
    //   }
      

    //   static getARAXSynonyms = (searchterm) => {
    //     console.log("started getSynonyms");
    //     return new Promise(async (resolve, reject) => { // eslint-disable-line
    //       let url = "https://arax.ncats.io/api/arax/v1.2/entity?q=" + searchterm
    //       try {
    //         const res = await axios.get(url);

    //         const data = res.data;
    //         // });
    
    //         // console.log("***2")
    //         // console.log(data)
    //         resolve(data);
    //       } catch (err) {
    //         reject(err);
    //       }
    //     });
    //   }
    


}


export default FDAService;