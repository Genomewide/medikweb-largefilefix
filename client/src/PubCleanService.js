class PubCleanService {


  static cleanPubmed(prResults) {
    console.log("started PubCleanService");

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("prResults")
      console.log(prResults)
      console.log(prResults[0])
      // console.log(prResults.length)

      if(prResults[0] == null ){
        // if(prResults[0] == null || prResults == [null] || prResults == [undefined]){
          console.log("FOUND NULL - WHY IS NOT FIXED")
        let combinedInfo = {}
        combinedInfo.abstractFixed = "ABSTRACT NOT FOUND - CHECK PUBMED "
        combinedInfo.journalTitle = "ABSTRACT NOT FOUND - CHECK PUBMED "
        combinedInfo.pmid = "https://pubmed.ncbi.nlm.nih.gov/" 
        console.log("prResults WAS NULL AND THIS RETURNS BLANK OBJECT")
        resolve([combinedInfo])
      } else {
          try {
            // console.log(pmID)
            // for (let index = 0; index < prResults.length; index++) { 
                // 1. FIX ABSTRACT TEXT FROM ARRAY TO PARAGRAPHS
                // 2. GET SENTENCE AND COORDINATES 
                // 3. TRY SETTING UP HIGHLIGHT TEXT IN ABSTRACT
                // 3. TRY CREATE JOURNAL INFO TEXT
                // const results = prResults
                console.log("PASSED BY THE CECK FOR NULL")
                for (let i = 0; i < prResults.length; i++) {
                
                  prResults[i].pmid = prResults[i].MedlineCitation.PMID
    
                  // GET ABSTRACT
                    const publciation = prResults[i].MedlineCitation.Article
                    console.log("publciation")
                    console.log(publciation)
                    // console.log(publciation.Abstract.AbstractText)
    
                    // FIX PARAGRAPHS
                    if(Object.prototype.hasOwnProperty.call(publciation, "Abstract")){ // CHECK IF ABSTRACT SECTION EXISTS
                      if(Object.prototype.hasOwnProperty.call(publciation.Abstract, "AbstractText")){ // CHECK IF ABSTRACT SECTION EXISTS
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
                    } else {
                      prResults[i].abstractFixed = "NO ABSTRACT RETURNED - CHECK PUBMED"
                    }
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
                    
                }
    
          } catch (err) {
    
            this.stopTime = new Date()
            reject([]);
          }
      }

    });

  }

  static createPubReviewTable(cleanedPubs, edgeInfo) {
    console.log("started createPubReviewTable");
    console.log(cleanedPubs);
    console.log(edgeInfo);
    let pubTable = []
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      try{
        for (let i = 0; i < cleanedPubs.length; i++) {
          console.log("started combined info")
          let combinedInfo = edgeInfo
          const pub = cleanedPubs[i];
          combinedInfo.abstract = pub.abstractFixed
          combinedInfo.journalTitle = pub.journalTitle
          combinedInfo.link = "https://pubmed.ncbi.nlm.nih.gov/" + pub.pmid
          pubTable.push(combinedInfo)
          console.log("combinedInfo")
          console.log(combinedInfo)
          if(i == cleanedPubs.length - 1){
            resolve(pubTable)
          } 
        }
      } catch (err){
        console.error(err)
        reject([])
      }

      



    })
  }
  
}

export default PubCleanService;
