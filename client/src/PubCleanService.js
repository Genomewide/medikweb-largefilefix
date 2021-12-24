class PubCleanService {


  static cleanPubmed(prResults) {
    console.log("started PubCleanService");

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("prResults")
      console.log(prResults)
      // console.log(prResults.length)
      try {
        // console.log(pmID)
        // for (let index = 0; index < prResults.length; index++) { 
            // 1. FIX ABSTRACT TEXT FROM ARRAY TO PARAGRAPHS
            // 2. GET SENTENCE AND COORDINATES 
            // 3. TRY SETTING UP HIGHLIGHT TEXT IN ABSTRACT
            // 3. TRY CREATE JOURNAL INFO TEXT
            // const results = prResults
            for (let i = 0; i < prResults.length; i++) {
            
              prResults[i].pmid = prResults[i].MedlineCitation.PMID

              // GET ABSTRACT
                const publciation = prResults[i].MedlineCitation.Article
                // console.log("publciation")
                // console.log(publciation)
                // console.log(publciation.Abstract.AbstractText)

                // FIX PARAGRAPHS
                if(Array.isArray(publciation.Abstract.AbstractText)){ // IF ABSTRACT HAS SECTIONS THIS DIVIDES THEM INTO PARAGRAPHS
                    let text  = ""
                    for (let n = 0; n < publciation.Abstract.AbstractText.length; n++) {
                        const paragraph = publciation.Abstract.AbstractText[n];
                        text = text + "<p>" + paragraph  + "</p>"
                        if(n == publciation.Abstract.AbstractText.length - 1){
                          prResults[i].abstractFixed = text
                            
                        }
                        
                        
                    }
                } else {
                  prResults[i].abstractFixed = publciation.Abstract.AbstractText // THIS RETURNS THE TEXT  UNALTERED IF THERE ARE NO SECTIONS
                    
                }

                // GET REST OF JOURNAL INFO
                prResults[i].title = publciation.ArticleTitle
                prResults[i].pubDate = publciation.Journal.JournalIssue.PubDate
                prResults[i].journalTitle = publciation.Journal.Title
                // prResults[i].journalTitle = publciation.Journal.title
                // prResults[i].journalTitle = publciation.Journal.title
                     

                if(i == prResults.length - 1){
                  resolve(prResults);
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


            // if(index ==  prResults.length - 1) {// AFTER FIXING THE PARAGRAPHS - THEN DO THE UNERLINING AND HIGHLIGHTING
            //     for (let index = 0; index < prResults.length; index++) { 
            //         // 1. FIX ABSTRACT TEXT FROM ARRAY TO PARAGRAPHS
            //         // 2. GET SENTENCE AND COORDINATES 
            //         // 3. TRY SETTING UP HIGHLIGHT TEXT IN ABSTRACT
            //         // 3. TRY CREATE JOURNAL INFO TEXT
            //         const result = prResults[index];
            //         for (let i = 0; i < result.publications.length; i++) {
     
            //             // GET COORDINATES (example: "start: 0, end: 10")
            //             // FIX STRING VALUE TO MAKE OBJECT
            //             let sub_coor_text = result.publications[i].subject_spans.replace('start','{"start"')
            //             sub_coor_text = sub_coor_text.replace('end','"end"').concat('}')
            //             let obj_coor_text = result.publications[i].object_spans.replace('start','{"start"')
            //             obj_coor_text = obj_coor_text.replace('end','"end"').concat('}')
                        
            //             // console.log("obj_coor_text")
            //             // console.log(obj_coor_text)
            //             let subject_coord = JSON.parse(sub_coor_text) 
            //             let object_coord = JSON.parse(obj_coor_text) 
            //             result.publications[i].object_spans = subject_coord
            //             result.publications[i].object_spans = object_coord
            //             result.publications[i].subject = result.publications[i].sentence.substring(subject_coord.start, subject_coord.end)
            //             result.publications[i].object = result.publications[i].sentence.substring(object_coord.start, object_coord.end)
    
            //             // console.log("result.publications[i].subject")
            //             // console.log(result.publications[i].subject)                    
            //             // console.log("result.publications[i].object")
            //             // console.log(result.publications[i].object)
    
            //             let sentence = result.publications[i].sentence
            //             // console.log(sentence)
                
            //             let subject = result.publications[i].subject
            //             let object = result.publications[i].object
            //             // console.log(result.publications[i].subject)
            //             // console.log(result.publications[i].object)
    
            //             // REPLACE TEXT IN TITLE AND ABSTRACT WITH HIGHLIGHTED STYLE // <span style="background-color: #FFFF00">
            //             // SENTENCE
            //             try {
    
            //                 // let replacethis = sentence
            //                 // console.log(sentence.slice(0,10))
            //                 let sentencefrag_length = 30
            //                 let sentence_start = sentence.slice(0,sentencefrag_length)
            //                 let sentence_end = sentence.slice(sentencefrag_length * -1)
            //                 let abstract_length = result.publications[i].abstract_fixed.length
            //                 // console.log("sentence_start")
            //                 // console.log(sentence_start)
            //                 // console.log("sentence_end")
            //                 // console.log(sentence_end)
            //                 // console.log(abstract_length)
            //                 // console.log(result.publications[i].abstract_fixed)
            //                 // console.log("sentence.index(sentence_start)")
            //                 // console.log(result.publications[i].abstract_fixed.indexOf(sentence_start))
            //                 let sentence_start_loc = result.publications[i].abstract_fixed.indexOf(sentence_start)
            //                 let sentence_end_loc = result.publications[i].abstract_fixed.indexOf(sentence_end) + sentencefrag_length
            //                 // console.log(sentence_start_loc)
            //                 // console.log(sentence_end_loc)
            //                 let abstract_start = result.publications[i].abstract_fixed.slice(0,sentence_start_loc)
            //                 // let mid_length = sentence_end_loc - sentence_start_loc
            //                 let abstract_mid = result.publications[i].abstract_fixed.slice(sentence_start_loc,sentence_end_loc )
            //                 let abstract_end = result.publications[i].abstract_fixed.slice(sentence_end_loc,  abstract_length)
            //                 result.publications[i].abstract_fixed = abstract_start + "<u>" +abstract_mid + "</u>" + abstract_end
            //                 // console.log("sentence_end_loc - sentence_start_loc")
            //                 // console.log(sentence_end_loc - sentence_start_loc)
            //                 // console.log("abstract_start.length")
            //                 // console.log(abstract_start.length)
            //                 // console.log("abstract_mid.length")
            //                 // console.log(abstract_mid.length)
            //                 // console.log("abstract_end.length")
            //                 // console.log(abstract_end.length) 
            //                 // console.log("abstract_start")
            //                 // console.log(abstract_start)
            //                 // console.log("abstract_mid")
            //                 // console.log(abstract_mid)
            //                 // console.log("abstract_end")
            //                 // console.log(abstract_end)
    
            //                 // console.log("")
            //                 // console.log("result.publications[i].abstract_fixed_undelined")
            //                 // console.log(result.publications[i].abstract_fixed)
                       
            //             } catch(err) {
            //                 console.log(err)
            //             }
            //             // SUBJECT
            //             try {
    
            //                 let replacethis = subject
            //                 // var replacethis = result.publications[i].subject;
            //                 let re = new RegExp(replacethis,"g");
            //                 // let replacewith = '<u>' + sentence +   '</u>'
            //                 let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
            //                 result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
            //             } catch(err) {
            //                 console.log(err)
            //             }
    
            //             // OBJECT
            //             try {
            //                 let replacethis = object
            //                 // var replacethis = result.publications[i].subject;
            //                 let re = new RegExp(replacethis,"g");
            //                 // let replacewith = '<u>' + sentence +   '</u>'
            //                 let replacewith = '<span style="background-color: #FFFF00">' + replacethis +   '</span>'
            //                 result.publications[i].abstract_fixed = result.publications[i].abstract_fixed.replace(re, replacewith)
            //             } catch(err) {
            //                 console.log(err)
            //             }

            //         }
    
            //         // console.log("index")
            //         // console.log(index)
            //         // console.log("prResults.length")
            //         // console.log(prResults.length-1)
            //         if (index == prResults.length - 1){
            //             resolve(prResults);
            //         }
            //     }



            // }



        // }

        
      } catch (err) {
        reject(err);
      }
    });

  }
}

export default PubCleanService;
