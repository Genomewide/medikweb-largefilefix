import axios from 'axios';

// const url = 'api/posts/';
// https://arax.ncats.io/api/arax/v1.2/entity?q=NCBIGene%3A203547&q=HGNC%3A6884




let getARAXSynonyms = (searchterm) => {
  // console.log("**** started getARAXSynonyms  - seatrchterm = ", searchterm)
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let url = "https://arax.ncats.io/api/arax/v1.2/entity?q=" + searchterm
    try {
      const res = await axios.get(url);

      const data = res.data;
      // });

      console.log("Synonyms")
      console.log(data)
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

let getSynonyms = (searchterm) => {
  // console.log("#### started getSynonyms  - seatrchterm = ", searchterm)
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let url = "https://nodenormalization-sri.renci.org/1.2/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
    try {
      const res = await axios.get(url);

      const data = res.data;

      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

class synonymService {

  static normalizedSynonyms = (searchterm) => {
    console.log("#### started getSynonyms  - seatrchterm = ", searchterm)
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let url = "https://arax.ncats.io/api/arax/v1.2/entity"

      // let url = "https://nodenormalization-sri.renci.org/1.2/get_normalized_nodes?curie=" + searchterm + "&conflate=true" 
      console.log("url")
      console.log(url)
      try {
        // const res = await axios.get(url);
        // const res = await axios.post(url, {"terms":["HGNC:6884", "HGNC:1388"]});
        const res = await axios.post(url, {"terms":[searchterm]});
        const data = res.data;  
        // console.log(" normalizedSynonyms data = ")
        // console.log(data)
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
      console.log("postPacket")
      console.log(postPacket)
  
    // POST TO NODENORMALIZER
    // "https://rest.ensembl.org/xrefs/id/" + ensemblid + "?content-type=application/json"
      let normalURL = "https://nodenorm.transltr.io/1.2/get_normalized_nodes"
  
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

  static chemSynonyms = (searchterm) => {
    console.log("started allSynonyms - seatrchterm ");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      try {
        getARAXSynonyms(searchterm)
        .then(async(araxsyns) =>{
          // console.log("araxsyns")
          // console.log(araxsyns)
          resolve(araxsyns)
        })
      }
      catch (err){
        resolve(err)
      }

    });
  }

  static synonymsData = (searchterm) => {
    console.log("started allSynonyms - seatrchterm ");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      try {
        getARAXSynonyms(searchterm)
        .then(async(araxsyns) =>{
          // console.log("araxsyns")
          // console.log(araxsyns)
          resolve(araxsyns)
        })
      }
      catch (err){
        resolve(err)
      }

    });
  }

      static allSynonyms = (searchterm) => {
        console.log("started allSynonyms - seatrchterm = ", searchterm);
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          // try {

            getARAXSynonyms(searchterm)
            .then(async(araxsyns) =>{
              // console.log("getaraxsyns")
              // console.log(araxsyns)
              let arax = {}
              // CHECK IF NO RESULTS THEN SKIP
              if(araxsyns[searchterm] == null || araxsyns[searchterm] == undefined){
                // console.log("@@@@@@@ SKIPPED BC NULL")
                resolve([])
              } 
              else {
                // console.log("arax was not null or undefined!!!!!")
                let araxSynonyms_equivalentids = araxsyns[searchterm].equivalent_identifiers
                let araxSynonyms_nodes = araxsyns[searchterm].nodes
                // console.log("araxSynonyms_equivalentids")
                // console.log(araxSynonyms_equivalentids)
                // console.log("araxSynonyms_nodes")
                // console.log(araxSynonyms_nodes)
                
                arax.araxSynonyms_nodes = araxSynonyms_nodes
                arax.searchterm = searchterm
                arax.id = araxsyns[searchterm].id
                // console.log(araxSynonyms_equivalentids)
                arax.araxSynonyms_equivalentids = araxSynonyms_equivalentids
                return arax                 
              }

            })
            .then(async (arax)=>{
              if(arax == null || arax == undefined){
                // console.log("SKIPPED BC NULL @@@@@@@ ")
                resolve([])
              } 
              else {
                // console.log("about to getSynonyms with ...")
                // console.log("arax")
                // console.log(arax)
                arax.nodeNormalSyn = await getSynonyms(arax.searchterm)
                return arax                
              }

            })
            .then((arax) => {

              //START WITH ARAX SYNONYMS - EQUIVALENT IDS
              arax.araxSynonyms_nodes_list = arax.araxSynonyms_nodes.map(node => node.identifier)
              // console.log(arax)
              // console.log(arax.araxSynonyms_nodes_list)
              arax.allSynonyms = []

              // STORE THE IDS IN ARRAY TO CHECK FOR DUPLICATES WHEN GETTING THE NEXT SET OF SYNONYMS FRM THE NODE NORMALIZER
              let synonymIdArray = []
              for (let i = 0; i < arax.araxSynonyms_equivalentids.length; i++) {
                const synData = arax.araxSynonyms_equivalentids[i];
                
                // GET NAME AND ID OF EACH
                let syn = {}
                syn.id = synData.identifier
                syn.name = synData.name
                synonymIdArray.push(synData.identifier)
      
                // TAG IF IT IS A NODE (FROM ARAX) TO SEE IF THINGS THAT ARE NOT NODES EVER HAVE RESULTS
                if(arax.araxSynonyms_nodes_list.indexOf(synData.identifier)){
                  syn.isnode = true
                } else {
                  syn.isnode = false
                }
                arax.allSynonyms.push(syn)
      
                if(i == arax.araxSynonyms_equivalentids.length - 1){
                  // console.log("arax about to do node normalizer")
                  // console.log(arax)
                  let searchterm = arax.searchterm
                  let identifiers = arax.nodeNormalSyn[searchterm].equivalent_identifiers
                  // GO THROUGH THE NODE NORMALIZER SYNONYMS AND ADD IF ID NOT ALREADY THERE
                  for (let n = 0; n < identifiers.length; n++) {
                    const synDataTwo = identifiers[n]
                    syn.id = synDataTwo.identifier
                    syn.id = synDataTwo.label
                    // console.log("LENGTH = ", identifiers.length)
                    // console.log("N = ", n)

                    if(synonymIdArray.indexOf(synDataTwo.identifier) == -1){
                      synonymIdArray.push(synDataTwo.identifier)

                      if(arax.araxSynonyms_nodes_list.indexOf(synDataTwo.identifier)){
                        syn.isnode = true
                      } else {
                        syn.isnode = false
                      }
                      arax.allSynonyms.push(syn)
                    }


                    if(n == identifiers.length - 1){
                      // EXPECT COMPLLETE LIST OF SYNONYMS
                      // console.log("### FINISHED NODE NORMALIZER SYNS")
                      arax.synonymIdArray = synonymIdArray
                      resolve(arax)
                    }
      
                  }
                }
                
              }
            })
            // .then((arax)=>{
            //   // console.log("arax")
            //   // console.log(arax)
            //   resolve(arax)
            // })
            .catch(()=> {
              console.log("YOU REMEMBERED CATCH EVENTUALLY AND HERE WE ARE")
              resolve([])
            })
                        
          // } catch (err) {
          //   reject([err]);
          // }
        });
      }      
    


}


export default synonymService;