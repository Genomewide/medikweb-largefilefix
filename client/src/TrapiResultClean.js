class TrapiResultClean {


  static TrapiResultClean(TrapiResults) {
    // console.log("started PubCleanService");

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start TrapiResultClean")
      console.log("TrapiResults")
      console.log(TrapiResults)
      // console.log(prResults.length)
      let clenaedData = []

      try {
        let nodes = TrapiResults.message.knowledge_graph.nodes
        let edges = TrapiResults.message.knowledge_graph.edges 
        let edgeKeys = Object.keys(edges)

        // console.log("length = ", edgeKeys.length)

        if(edgeKeys.length > 0){

          for (let index = 0; index < edgeKeys.length; index++) {
            // console.log(index)
            let data = {}
            const key = edgeKeys[index];
            // console.log("key = ", key)
            let edge = edges[key]
  
            let subject = edge.subject
            let object = edge.object
            data.edgeinfo = edge
            data.object = edge.object
            data.predicate = edge.predicate
            data.relation = edge.relation
            data.subject = edge.subject
            data.subjectName = nodes[subject].name
            data.subjectCat = nodes[subject].category
            data.objectName = nodes[object].name
            data.objectCat = nodes[object].category
            data.objectAtt = nodes[object].attributes
            data.subjectAtt = nodes[subject].attributes
            //
            data.edgepubInfo = null
            data.edgen_pmids = 0
            data.edgeprovider = ""
            data.edgepublicationsText = {}
            data.edgepublications= []

            for (let index = 0; index < data.edgeinfo.attributes.length; index++) {
              const att = data.edgeinfo.attributes[index];
              if(att.name == "provided_by"){
                data.edgeprovider = att.value
              }
              if(att.name == "n_pmids"){
                data.edgen_pmids = att.value
              }
              if(att.name == 'pmids' || att.name == "publications"){
                let regex = /\d+/gm
                let cleanPMID = att.value.match(regex)
                // console.log(cleanPMID)
                data.edgepublications = cleanPMID
                
    
              }

              else if(att.name == "publications_info"){
                


                let pubInfotext = att.value.replace(/"/g, "'")
                pubInfotext = pubInfotext.replace(/'object score': '/g, '"object score": "')
                pubInfotext = pubInfotext.replace(/'object score': /g, '"object score": ')
                pubInfotext = pubInfotext.replace(/, 'subject score': '/g, '", "subject score": "')
                pubInfotext = pubInfotext.replace(/, 'subject score': /g, '", "subject score": ')
                pubInfotext = pubInfotext.replace(/{'PMID/g, '{"PMID')
                pubInfotext = pubInfotext.replace(/': {'publication date': '/g, '": {"publication date": "')
                pubInfotext = pubInfotext.replace(/': {'publication date': /g, '": {"publication date": ')
                pubInfotext = pubInfotext.replace(/', 'sentence': '/g, '", "sentence": "')
                pubInfotext = pubInfotext.replace(/'sentence': '/g, '"sentence":')
                pubInfotext = pubInfotext.replace(/'PMID/g, '"PMID')
                pubInfotext = pubInfotext.replace(/ None,/g, ' "None",')
                pubInfotext = pubInfotext.replace(/ None",/g, ' "None",')
                pubInfotext = pubInfotext.replace(/'}}/g, '"}}')
                pubInfotext = pubInfotext.replace(/'CHEMBL/g, '"CHEMBL')
                pubInfotext = pubInfotext.replace(/\\/g, "")
                pubInfotext = pubInfotext.replace(/'sentence'/g, '"sentence"')
                // data.edgepublicationsText = JSON.parse(att.value) 
                
              try{
                // console.log(JSON.parse(pubInfotext)) att.value
                data.pubInfo = JSON.parse(pubInfotext)
              } catch(err){
                
                console.log("att.value = ", att.value)
                console.log("pubInfotext = ", pubInfotext)
                console.log("/'PMID:/g found = ", pubInfotext.includes("'PMID:"))
                console.log("/PMID/g found = ", pubInfotext.includes("PMID"))
                let sentenceindex = pubInfotext.indexOf('"sentence": ')
                console.log(pubInfotext.substring(0,sentenceindex))
                console.log("sentenceindex = ", sentenceindex)
                // console.log(pubInfotext.includes(/PMID/g))
                console.log(err)
              }

                // let pubInfotext = att.value.replace(/"/g, "'")
                // pubInfotext = pubInfotext.replace(/'PMID:/g, '"PMID:')
                // pubInfotext = pubInfotext.replace(/': {'publication date': '/g, '": {"publication date": "')
                // pubInfotext = pubInfotext.replace(/', 'sentence': '/g, '", "sentence": "')
                // pubInfotext = pubInfotext.replace(/', 'subject score'/g, '", "subject score"')
                // pubInfotext = pubInfotext.replace(/'object score'/g, '"object score"')
                // // pubInfotext = pubInfotext.replace(/'object score'/g, '"object score"')
                // // pubInfotext = pubInfotext.replace(/{'/g, '{"')
                // pubInfotext = pubInfotext.replace(/\\/g, "")
                // // console.log(att.value)
                // // console.log(pubInfotext)
                // try{
                //   // console.log(JSON.parse(pubInfotext))
                //   data.pubInfo = JSON.parse(pubInfotext)
                // } catch(err){
                //   console.log(err)
                //   console.log()
                //   console.log("/'PMID:/g found = ", pubInfotext.includes(/'PMID:/g))
                //   console.log("/PMID/g found = ", pubInfotext.includes(/PMID/g))
                //   // console.log(pubInfotext.includes(/PMID/g))
                // }
              }
              if(index == data.edgeinfo.attributes.length - 1){
                // withDrugHits[i].geneToGeneResultShown.push(result)
                clenaedData.push(data)
              } 
              // if(typeof result.publications == 'undefined'){
              //   result.publications = []
 
              // }
              
            }
            
            // console.log("data = ", data)
  
            if(index == edgeKeys.length -1){
              // console.log({clenaedData})
              resolve(clenaedData)
            }
            
          }
        } else{
          // console.log("no results")
          resolve(clenaedData)
        }

      //  resolve(nodes)
      } catch (err) {
        console.error("ERROR IN TrapiResultClean")
        
        console.error(err)
        reject({});
      }
    });

  }

  static TrapiResultGroup(list, key) {
    // console.log("started PubCleanService");
    console.log("list = ", list)
    console.log("key = ", key)
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start TrapiResultGroup")
   

      try {
        let groupArrayOfObjects = function (list, key) {
          return list.reduce(function(rv, x) {
            (rv[x[key]] = rv[x[key]] || []).push(x);
            return rv;
          }, {});
        }
        
        var groupedResults = groupArrayOfObjects(list, key);
        console.log("groupedResults")
        console.log(groupedResults)
       resolve(groupedResults)

      } catch (err) {
        console.error("ERROR IN TrapiResultGroup")
        console.error(err)
        reject({});
      }
    });

  }

  static geneDataPubBreakout(pubInfo, pubs) {
    // console.log("started PubCleanService");
    console.log("pubInfo = ", pubInfo)
    console.log("pubs = ", pubs)
    let returnArray = []
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start geneDataPubBreakout")
   

      try {
        for (let i = 0; i < pubs.length; i++) {
          const pub = pubs[i];
          
          console.log("pub = ", pub)
          let pubInfoRow = pubInfo
          pubInfoRow.pub = ""
          pubInfoRow.pub = pub
          console.log("pubInfoRow = ", pubInfoRow)
          returnArray.push(pubInfoRow)
          if(i == pubs.length - 1){
            resolve(returnArray)
          }
        }

       

      } catch (err) {
        console.error("ERROR IN geneDataPubBreakout")
        console.error(err)
        reject([]);
      }
    });

  }
  
}



export default TrapiResultClean;
