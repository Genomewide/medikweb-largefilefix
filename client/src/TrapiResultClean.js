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


  static ARAXResultClean(TrapiResults) {
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
            data.edgeOriginalSource = ""
            data.edgeSentences = {}
// "biolink:original_knowledge_source"
            for (let index = 0; index < data.edgeinfo.attributes.length; index++) {
              const att = data.edgeinfo.attributes[index];
              if(att.attribute_type_id == "biolink:aggregator_knowledge_source"){
                data.edgeprovider = att.value
              }
              if(att.attribute_type_id == "biolink:original_knowledge_source"){
                data.edgeOriginalSource = att.value
              }

              if(att.attribute_type_id == "n_pmids"){
                data.edgen_pmids = att.value
              }

              if(att.attribute_type_id == "biolink:supporting_document"){
                data.edgepublications = att.value.split("|")  
                data.edgen_pmids = att.value.split("|").length   
              }
              if(att.attribute_type_id == "biolink:publications"){
                data.edgepublications = att.value 
                data.edgen_pmids = att.value.length   
              }
              if(att.attribute_type_id == "bts:sentence" || att.attribute_type_id == "publications"){
                data.edgeSentences= att.value  
                data.edgen_pmids = att.value.length
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
        console.error("ERROR IN ARAXResultClean")
        
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

  static createTwoHopObject(hopOne, hopTwo) {
    // console.log("started PubCleanService");
    // console.log("pubInfo = ", pubInfo)
    // console.log("pubs = ", pubs)
    // let returnArray = []
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start createTwoHopObject")
      let tableDataArray = []
   

      try {
        for (let i = 0; i < hopTwo.length; i++) {
          const hop2res = hopTwo[i];
          // console.log(hop2res)
          
          for (let n = 0; n < hopOne.length; n++) {
            
            let row = {}
            const hop1res = hopOne[n];
            if(hop1res.subjectName == hop2res.objectName){
              // HOPE 1 INFO
              row.direction_gg = hop1res.direction
              row.edgen_pmids_gg = []
              row.edgen_pmids_gg_len = hop1res.edgepublications.length
              row.edgen_pmids_gg = hop1res.edgepublications
              row.object_gg = hop1res.object
              row.objectName_gg = hop1res.objectName
              row.predicate_gg = hop1res.predicate
              row.subject_gg = hop1res.subject
              row.subjectName_gg = hop1res.subjectName
              // HOP 2 INFO
              row.direction_dg = hop2res.direction
              row.edgen_pmids_dg = []
              row.edgen_pmids_dg_len = hop2res.edgepublications.length
              row.edgen_pmids_dg = hop2res.edgepublications
              row.object_dg = hop2res.object
              row.objectName_dg = hop2res.objectName
              row.predicate_dg = hop2res.predicate
              row.subject_dg = hop2res.subject
              row.subjectName_dg = hop2res.subjectName

              row.direction_combined = ""

              if( (hop1res.direction == "Increase" && hop2res.direction == "Increase") || (hop1res.direction == "Decrease" && hop2res.direction == "Decrease")){
                row.direction_combined = "Increase"
              } else if ((hop1res.direction == "Decrease" && hop2res.direction == "Increase") || (hop1res.direction == "Increase" && hop2res.direction == "Decrease")){
                row.direction_combined = "Decrease"
              } else {
                row.direction_combined = "Ambiguos"
              }


              // console.log("combined row = ")
              // console.log(row)
              tableDataArray.push(row)
            }
            if( n == hopOne.length - 1 && i == hopTwo.length - 1){
              console.log("########## END createTwoHop Result Table")
              resolve(tableDataArray)
            } 
          }
        }
      } catch (err) {
        console.error("ERROR IN createTwoHopObject")
        console.log("Results got here then failed", tableDataArray)
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
