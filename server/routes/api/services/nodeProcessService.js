const axios = require('axios')
const parser = require('fast-xml-parser')

const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';

// import axios from "axios";
// import parser from "fast-xml-parser"

// const sleep = () => {
//     // console.log(new Date())
//     return new Promise(resolve => setTimeout(resolve, 1000))
//   }

// async function wait(ms) {
//     return new Promise(resolve => {
//       setTimeout(resolve, ms);
//     });
//   }
class nodeProcessService{

    static umlsClean(edgeInfo, node) {
        // console.log("started umlsClean");
        // console.log(node)
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          // SET ALL OF THE VALUES TO THE DEFAULT SO THAT REFERENCEING THEM DOES NOT RETURN UNDEFINED
            edgeInfo.subject_category = node["category"];
            edgeInfo.subject_name = node["name"];

            try {
            let attributes = node["attributes"] 
            for (let index = 0; index < attributes.length; index++) {
              const att = attributes[index];
              // console.log("length = ", attributes.length, " and index = ", index)
            // CHECK FOR THE EXTRA-RESULT SECTION - GET XREF AND DESCRIPTION IF THERE
              if(att.name == "extra-result"){
                // console.log("has extra-result")
                // console.log(att.value)
                // let extra_result_value = att.value
                let extra_atts = att.value.attributes
                // console.log("extra_atts")
                // console.log(extra_atts)
                for (let i = 0; i < extra_atts.length; i++) {
                  let extra_att = extra_atts[i];
                  if(extra_att.name == "discription"){
                    edgeInfo.subject_description = extra_att.value
                  }
                  if(extra_att.name == "xrefs"){
                  // cCODE TO PROCESS XREFS - SAME CODE WILL BE USED IF TO PROCESS IN THE 
                    let xref = extra_att["value"]
                    edgeInfo.subject_xref =  xref.split("|")
                    let subject_xref_tag =  xref.split(/\||:/)
                    // console.log("subject_xref_tag")
                    // console.log(subject_xref_tag)
                    if(subject_xref_tag.indexOf('DRUGBANK') != -1){
                      let idindex = subject_xref_tag.indexOf('DRUGBANK') + 1
                      edgeInfo.drugbankId = subject_xref_tag[idindex]
                      edgeInfo.drugbank = true
                    } 
                    if(subject_xref_tag.indexOf('RXNORM') != -1){
                      let idindex = subject_xref_tag.indexOf('RXNORM') + 1
                      edgeInfo.rxnormId = subject_xref_tag[idindex]
                      edgeInfo.rxnorm = true
                    } 
                    if(subject_xref_tag.indexOf('CHEMBL') != -1){
                      let idindex = subject_xref_tag.indexOf('RXNORM') + 1
                      edgeInfo.chemblId = subject_xref_tag[idindex]
                      edgeInfo.chembl = true
                    } 
                  }              
                }
              }
              if(att.name == "description"){
                edgeInfo.subject_description = att.value
              }
              if(att.name == "xrefs"){
                // CODE TO PROCESS XREFS - ANY CHANGES HERE SHOULG BE MADE ABOVE 
                  let xref = att["value"]

                  edgeInfo.subject_xref =  xref.split("|")
                  let subject_xref_tag =  xref.split(/\||:/)
                  if(subject_xref_tag.indexOf('DRUGBANK') != -1){
                    let idindex = subject_xref_tag.indexOf('DRUGBANK') + 1
                    edgeInfo.drugbankId = subject_xref_tag[idindex]
                    edgeInfo.drugbank = true
                  } 
                  if(subject_xref_tag.indexOf('RXNORM') != -1){
                    let idindex = subject_xref_tag.indexOf('RXNORM') + 1
                    edgeInfo.rxnormId = subject_xref_tag[idindex]
                    edgeInfo.rxnorm = true
                  } 
                  if(subject_xref_tag.indexOf('CHEMBL') != -1){
                    let idindex = subject_xref_tag.indexOf('RXNORM') + 1
                    edgeInfo.chemblId = subject_xref_tag[idindex]
                    edgeInfo.chembl = true
                  } 
                } 
                
                if(index == attributes.length - 1 ){
                  // console.log("finished umls clean")
                  resolve(edgeInfo);
                }           
            }          
 
            
          } catch (err) {
            // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
            console.error(err)
            // console.log("xref")
            //     console.log(xref)
            // console.log("edge = ", edgeInfo)
            console.log("***** DID NOT WORK ***** node = ", node)
            // console.log("***** DID NOT WORK ***** node.attributes = ", extra_result_value)
            resolve(edgeInfo);
            // resolve( []);
          }
        });

      }

    static chemblClean(edgeInfo, node) {
        // console.log("started umlsClean");
        // console.log(node)
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          // SET ALL OF THE VALUES TO THE DEFAULT SO THAT REFERENCEING THEM DOES NOT RETURN UNDEFINED
            edgeInfo.subject_category = node["category"];
            edgeInfo.subject_name = node["name"];

            try {
            let attributes = node["attributes"] 
            for (let index = 0; index < attributes.length; index++) {
              const att = attributes[index];

              if(att.name == "description"){
                edgeInfo.subject_description = att.value
                let splitDesc = att.value.split(";")
                for (let index = 0; index < splitDesc.length; index++) {
                  const element = splitDesc[index];
                  // console.log("element1")
                  // console.log(element)
                  // console.log(element.startsWith(" MAX_FDA"))
                  if(element.startsWith(" MAX_FDA")){
                    // console.log("element")
                    // console.log(element)
                    // console.log(element.split(":"))
                    edgeInfo.fdaPhase =  parseInt(element.split(":")[1])
                    // console.log(edgeInfo.fdaPhase)
                    // console.log("edgeInfo.fdaPhase > 0")
                    // console.log(edgeInfo.fdaPhase > 0)
                    if(edgeInfo.fdaPhase > 0){
                      // console.log("fda approved")
                      edgeInfo.fdaApproved = true
                    }
                  }                  
                }
              }
              if(att.name == "id"){
                edgeInfo.chemblId = att.value.split(":")[1]
                edgeInfo.chembl = true
              }
                
              if(index == attributes.length - 1 ){
                // console.log("finished umls clean")
                resolve(edgeInfo);
              }           
            }          
 
            
          } catch (err) {
            // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
            console.error(err)
            // console.log("xref")
            //     console.log(xref)
            // console.log("edge = ", edgeInfo)
            console.log("***** DID NOT WORK ***** node = ", node)
            // console.log("***** DID NOT WORK ***** node.attributes = ", extra_result_value)
            resolve(edgeInfo);
            // resolve( []);
          }
        });

      }

    static uniprotClean(edgeInfo, node) {
        // console.log("started umlsClean");
        // console.log(node)
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          // SET ALL OF THE VALUES TO THE DEFAULT SO THAT REFERENCEING THEM DOES NOT RETURN UNDEFINED
            edgeInfo.subject_category = node["category"];
            edgeInfo.subject_name = node["name"];

            try {

                resolve(edgeInfo);

          } catch (err) {
            // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
            console.error(err)
            // console.log("xref")
            //     console.log(xref)
            // console.log("edge = ", edgeInfo)
            console.log("***** DID NOT WORK ***** node = ", node)
            // console.log("***** DID NOT WORK ***** node.attributes = ", extra_result_value)
            resolve(edgeInfo);
            // resolve( []);
          }
        });

      }

      static getChembl(chebi) {
        // console.log("started CHEBI2CHEMBL");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          try {
            
            let unichemurl = "https://www.ebi.ac.uk/unichem/rest/src_compound_id_all/" + chebi + "/7/1"
            // console.log(unichemurl)
            const res = await axios.get(unichemurl);
            // console.log("chebi2chembl")
            
            const chembl = res.data;

            if(chembl == []){
              // console.log("results = []")
              resolve("NONE")
            } else {
    
              resolve(chembl[0]["src_compound_id"])
            }
            
            
          } catch (error) {
            // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
            // console.log(error)
            resolve("NONE")
            // resolve( []);
          }
        });

      }

      static chembl2fda(chemblid) {
        // console.log("started CHEMBL2FDA");
        return new Promise(async (resolve, reject) => { // eslint-disable-line

          let client;
          let chembldata;
          try {
            // Use connect method to connect to the Server
            client = await MongoClient.connect(uri, { useUnifiedTopology: true });
        
            const drugs = client.db('synonyms').collection('hgnc2umls');
            // results = await drugs.find({HGNC: { $in : ids }}).toArray()
            chembldata = await drugs.find({molecule_chembl_id: chemblid}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
            // console.log("chembldata")
            // console.log(chembldata)
            resolve(chembldata)
    
          } catch (err) {
            console.log(err.stack);
            resolve("NONE")
          }
        
          if (client) {
            client.close();
          }



          // try {

          //     // console.log("starting else - about to try getting chembl info")
          //     const drugs = await loadFDACollection();
        
          //     let chembldata = await drugs.find({molecule_chembl_id: chemblid}).project({molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
          //     drugs.close()

          //     resolve(chembldata)
            
            
          // } catch (error) {
          //   // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
          //   // console.log(error)
          //   drugs.close()
          //   resolve("NONE")
          //   // resolve( []);
          // }
        });

      }

    static getPubmed(pmID) {
        console.log("started getPubmed");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          try {
            let pubmedurl =
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" + pmID + "&retmode=xml&api_key=3164038b9b88adef161172a783ea32602708";
            const res = await axios.get(pubmedurl);
            const xmlData = res.data;
            var pmjson = parser.parse(xmlData);
            // console.log(pmjson.PubmedArticleSet.PubmedArticle);
            // let pub = {[pmID]: pmjson.PubmedArticleSet.PubmedArticle.MedlineCitation.Article}
            let pub = pmjson.PubmedArticleSet.PubmedArticle.MedlineCitation.Article
            pub.pmid = pmID
            // console.log("pub")
            // console.log(pub)
            // pub.PMID = pmID

            // let pubmed = {pmID : pub.Article}
            // pubmed[key] = pmID
            // pubmed.PMID = pub.PMID
            // pubmed.article = pub.Article
            // pubmed.article.PMID = pub.PMID
            // console.log("pubmed")
            // console.log(pubmed)
            // await wait(1000)
            // sleep()
            // setTimeout(resolve(pmjson), 2000)
            // await new Promise(resolve => setTimeout(resolve, 2000))
            resolve(pub);
          } catch (err) {
            reject(err);
          }
        });

      }


      static cleanPubmed(prResults) {
        console.log("started getPubmed");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          try {
            // console.log(pmID)
            for (let index = 0; index < prResults.length; index++) { 
                // 1. FIX ABSTRACT TEXT FROM ARRAY TO PARAGRAPHS
                // 2. GET SENTENCE AND COORDINATES 
                // 3. TRY SETTING UP HIGHLIGHT TEXT IN ABSTRACT
                // 3. TRY CREATE JOURNAL INFO TEXT
                const result = prResults[index];
                for (let i = 0; i < result.publications.length; i++) {
                    // FIX PARAGRAPHS
                    const publciation = result.publications[i];
                    // console.log("publciation.Abstract.AbstractText")
                    // console.log(Array.isArray(publciation.Abstract.AbstractText))
                    if(Array.isArray(publciation.Abstract.AbstractText)){ // IF ABSTRACT HAS SECTIONS THIS DIVIDES THEM INTO PARAGRAPHS
                        let text  = ""
                        for (let n = 0; n < publciation.Abstract.AbstractText.length; n++) {
                            const paragraph = publciation.Abstract.AbstractText[n];
                            text = text + "<p>" + paragraph  + "</p>"
                            if(n == publciation.Abstract.AbstractText.length - 1){
                                result.publications[i].abstract_fixed = text
                            }
                            
                            
                        }
                    } else {
                        result.publications[i].abstract_fixed = result.publications[i].Abstract.AbstractText // THIS RETURNS THE TEXT  UNALTERED IF THERE ARE NO SECTIONS
                    }
                    // GET COORDINATES (example: "start: 0, end: 10")
                    // FIX STRING VALUE TO MAKE OBJECT
                    // let sub_coor_text = result.publications[i].subject_spans.replace('start','{"start"')
                    // sub_coor_text = sub_coor_text.replace('end','"end"').concat('}')
                    // let obj_coor_text = result.publications[i].object_spans.replace('start','{"start"')
                    // obj_coor_text = obj_coor_text.replace('end','"end"').concat('}')
                    
                    // // console.log("obj_coor_text")
                    // // console.log(obj_coor_text)
                    // let subject_coord = JSON.parse(sub_coor_text) 
                    // let object_coord = JSON.parse(obj_coor_text) 
                    // result.publications[i].object_spans = subject_coord
                    // result.publications[i].object_spans = object_coord
                    // result.publications[i].subject = result.publications[i].sentence.substring(subject_coord.start, subject_coord.end)
                    // result.publications[i].object = result.publications[i].sentence.substring(object_coord.start, object_coord.end)

                    // // console.log("result.publications[i].subject")
                    // // console.log(result.publications[i].subject)                    
                    // // console.log("result.publications[i].object")
                    // // console.log(result.publications[i].object)

                    // let sentence = result.publications[i].sentence
                    // console.log(sentence)
            
                    // let subject = result.publications[i].subject
                    // let object = result.publications[i].object
                    // // console.log(result.publications[i].subject)
                    // // console.log(result.publications[i].object)

                    // // REPLACE TEXT IN TITLE AND ABSTRACT WITH HIGHLIGHTED STYLE // <span style="background-color: #FFFF00">
                    // // SENTENCE
                    // try {

                    //     // let replacethis = sentence
                    //     // console.log(sentence.slice(0,10))
                    //     let sentencefrag_length = 30
                    //     let sentence_start = sentence.slice(0,sentencefrag_length)
                    //     let sentence_end = sentence.slice(sentencefrag_length * -1)
                    //     let abstract_length = result.publications[i].abstract_fixed.length
                    //     // console.log("sentence_start")
                    //     // console.log(sentence_start)
                    //     // console.log("sentence_end")
                    //     // console.log(sentence_end)
                    //     // console.log(abstract_length)
                    //     // console.log(result.publications[i].abstract_fixed)
                    //     console.log("sentence.index(sentence_start)")
                    //     // console.log(result.publications[i].abstract_fixed.indexOf(sentence_start))
                    //     let sentence_start_loc = result.publications[i].abstract_fixed.indexOf(sentence_start)
                    //     let sentence_end_loc = result.publications[i].abstract_fixed.indexOf(sentence_end) + sentencefrag_length
                    //     console.log(sentence_start_loc)
                    //     console.log(sentence_end_loc)
                    //     let abstract_start = result.publications[i].abstract_fixed.slice(0,sentence_start_loc)
                    //     let mid_length = sentence_end_loc - sentence_start_loc
                    //     let abstract_mid = result.publications[i].abstract_fixed.slice(sentence_start_loc,sentence_end_loc )
                    //     let abstract_end = result.publications[i].abstract_fixed.slice(sentence_end_loc +sentencefrag_length,  abstract_length)
                    //     result.publications[i].abstract_fixed = abstract_start + "<u>" +abstract_mid + "</u>" + abstract_end
                    //     // console.log("sentence_end_loc - sentence_start_loc")
                    //     // console.log(sentence_end_loc - sentence_start_loc)
                    //     // console.log("abstract_start.length")
                    //     // console.log(abstract_start.length)
                    //     // console.log("abstract_mid.length")
                    //     // console.log(abstract_mid.length)
                    //     // console.log("abstract_end.length")
                    //     // console.log(abstract_end.length) 
                    //     // console.log("abstract_start")
                    //     // console.log(abstract_start)
                    //     // console.log("abstract_mid")
                    //     // console.log(abstract_mid)
                    //     // console.log("abstract_end")
                    //     // console.log(abstract_end)

                    //     // console.log("")
                    //     // console.log("result.publications[i].abstract_fixed_undelined")
                    //     // console.log(result.publications[i].abstract_fixed)
                   
                    // } catch(err) {
                    //     console.log(err)
                    // }
                    // // SUBJECT
                    // try {

                    //     let replacethis = subject
                    //     // var replacethis = result.publications[i].subject;
                    //     let re = new RegExp(replacethis,"g");
                    //     // let replacewith = '<u>' + sentence +   '</u>'
                    //     let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
                    //     result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
                    // } catch(err) {
                    //     console.log(err)
                    // }

                    // // OBJECT
                    // try {
                    //     let replacethis = object
                    //     // var replacethis = result.publications[i].subject;
                    //     let re = new RegExp(replacethis,"g");
                    //     // let replacewith = '<u>' + sentence +   '</u>'
                    //     let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
                    //     result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
                    // } catch(err) {
                    //     console.log(err)
                    // }


                        // console.log("result.publications[i].abstract_fixed")
                        // console.log(result.publications[i].abstract_fixed)




                    
                }

                // console.log("index")
                // console.log(index)
                // console.log("prResults.length")
                // console.log(prResults.length-1)
                // if (index == prResults.length - 1){
                //     resolve(prResults);
                // }


                if(index ==  prResults.length - 1) {// AFTER FIXING THE PARAGRAPHS - THEN DO THE UNERLINING AND HIGHLIGHTING
                    for (let index = 0; index < prResults.length; index++) { 
                        // 1. FIX ABSTRACT TEXT FROM ARRAY TO PARAGRAPHS
                        // 2. GET SENTENCE AND COORDINATES 
                        // 3. TRY SETTING UP HIGHLIGHT TEXT IN ABSTRACT
                        // 3. TRY CREATE JOURNAL INFO TEXT
                        const result = prResults[index];
                        for (let i = 0; i < result.publications.length; i++) {
         
                            // GET COORDINATES (example: "start: 0, end: 10")
                            // FIX STRING VALUE TO MAKE OBJECT
                            let sub_coor_text = result.publications[i].subject_spans.replace('start','{"start"')
                            sub_coor_text = sub_coor_text.replace('end','"end"').concat('}')
                            let obj_coor_text = result.publications[i].object_spans.replace('start','{"start"')
                            obj_coor_text = obj_coor_text.replace('end','"end"').concat('}')
                            
                            // console.log("obj_coor_text")
                            // console.log(obj_coor_text)
                            let subject_coord = JSON.parse(sub_coor_text) 
                            let object_coord = JSON.parse(obj_coor_text) 
                            result.publications[i].object_spans = subject_coord
                            result.publications[i].object_spans = object_coord
                            result.publications[i].subject = result.publications[i].sentence.substring(subject_coord.start, subject_coord.end)
                            result.publications[i].object = result.publications[i].sentence.substring(object_coord.start, object_coord.end)
        
                            // console.log("result.publications[i].subject")
                            // console.log(result.publications[i].subject)                    
                            // console.log("result.publications[i].object")
                            // console.log(result.publications[i].object)
        
                            let sentence = result.publications[i].sentence
                            // console.log(sentence)
                    
                            let subject = result.publications[i].subject
                            let object = result.publications[i].object
                            // console.log(result.publications[i].subject)
                            // console.log(result.publications[i].object)
        
                            // REPLACE TEXT IN TITLE AND ABSTRACT WITH HIGHLIGHTED STYLE // <span style="background-color: #FFFF00">
                            // SENTENCE
                            try {
        
                                // let replacethis = sentence
                                // console.log(sentence.slice(0,10))
                                let sentencefrag_length = 30
                                let sentence_start = sentence.slice(0,sentencefrag_length)
                                let sentence_end = sentence.slice(sentencefrag_length * -1)
                                let abstract_length = result.publications[i].abstract_fixed.length
                                // console.log("sentence_start")
                                // console.log(sentence_start)
                                // console.log("sentence_end")
                                // console.log(sentence_end)
                                // console.log(abstract_length)
                                // console.log(result.publications[i].abstract_fixed)
                                // console.log("sentence.index(sentence_start)")
                                // console.log(result.publications[i].abstract_fixed.indexOf(sentence_start))
                                let sentence_start_loc = result.publications[i].abstract_fixed.indexOf(sentence_start)
                                let sentence_end_loc = result.publications[i].abstract_fixed.indexOf(sentence_end) + sentencefrag_length
                                // console.log(sentence_start_loc)
                                // console.log(sentence_end_loc)
                                let abstract_start = result.publications[i].abstract_fixed.slice(0,sentence_start_loc)
                                let mid_length = sentence_end_loc - sentence_start_loc
                                let abstract_mid = result.publications[i].abstract_fixed.slice(sentence_start_loc,sentence_end_loc )
                                let abstract_end = result.publications[i].abstract_fixed.slice(sentence_end_loc,  abstract_length)
                                result.publications[i].abstract_fixed = abstract_start + "<u>" +abstract_mid + "</u>" + abstract_end
                                // console.log("sentence_end_loc - sentence_start_loc")
                                // console.log(sentence_end_loc - sentence_start_loc)
                                // console.log("abstract_start.length")
                                // console.log(abstract_start.length)
                                // console.log("abstract_mid.length")
                                // console.log(abstract_mid.length)
                                // console.log("abstract_end.length")
                                // console.log(abstract_end.length) 
                                // console.log("abstract_start")
                                // console.log(abstract_start)
                                // console.log("abstract_mid")
                                // console.log(abstract_mid)
                                // console.log("abstract_end")
                                // console.log(abstract_end)
        
                                // console.log("")
                                // console.log("result.publications[i].abstract_fixed_undelined")
                                // console.log(result.publications[i].abstract_fixed)
                           
                            } catch(err) {
                                console.log(err)
                            }
                            // SUBJECT
                            try {
        
                                let replacethis = subject
                                // var replacethis = result.publications[i].subject;
                                let re = new RegExp(replacethis,"g");
                                // let replacewith = '<u>' + sentence +   '</u>'
                                let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
                                result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
                            } catch(err) {
                                console.log(err)
                            }
        
                            // OBJECT
                            try {
                                let replacethis = object
                                // var replacethis = result.publications[i].subject;
                                let re = new RegExp(replacethis,"g");
                                // let replacewith = '<u>' + sentence +   '</u>'
                                let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
                                result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
                            } catch(err) {
                                console.log(err)
                            }
        
        
                                // console.log("result.publications[i].abstract_fixed")
                                // console.log(result.publications[i].abstract_fixed)
        
        
        
        
                            
                        }
        
                        // console.log("index")
                        // console.log(index)
                        // console.log("prResults.length")
                        // console.log(prResults.length-1)
                        if (index == prResults.length - 1){
                            resolve(prResults);
                        }
                    }



                }



            }

            
          } catch (err) {
            reject(err);
          }
        });

      }

}

async function loadFDACollection() {
  const client = await mongodb.MongoClient.connect(
      uri,
    {
      useUnifiedTopology: true
    }
  );
  return client.db('chembl').collection('fdaApproved');

  // return client.db('sample_mflix').collection('users');
}

module.exports = nodeProcessService;