const axios = require('axios')
const parser = require('fast-xml-parser')

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
class ncbiService{

    static getChembl(chebi) {
        console.log("started CHEMBL");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          try {
            
            let unichemurl = "https://www.ebi.ac.uk/unichem/rest/src_compound_id_all/" + chebi + "/7/1"
            const res = await axios.get(unichemurl);
            const chembl = res.data;
            // var pmjson = parser.parse(xmlData);
            // console.log(pmjson.PubmedArticleSet.PubmedArticle);
            // let pub = {[pmID]: pmjson.PubmedArticleSet.PubmedArticle.MedlineCitation.Article}
            // let pub = pmjson.PubmedArticleSet.PubmedArticle.MedlineCitation.Article
            // pub.pmid = pmID
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
            resolve(chembl);
          } catch (err) {
            // IF IT CAN'T BE FOUND THEN RETURN AN EMPTY SET OF DATA TO ALLOW FORMATING ON TABLE
            resolve( [ { "_id": "", "availability_type": null, "black_box_warning": 0, "first_approval": null, "max_phase": 0, "molecule_chembl_id": "", "pref_name": "" } ])
            // resolve( []);
          }
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

module.exports = ncbiService;