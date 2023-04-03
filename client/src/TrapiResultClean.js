class TrapiResultClean {


  static TrapiResultClean(TrapiResults, agent) {
    // console.log("started PubCleanService");
    console.log(agent)
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start TrapiResultClean")
      // console.log("TrapiResults")
      // console.log(TrapiResults)
      // console.log(prResults.length)
      let clenaedData = []
      let edgeCheck = ""
      let nodeCheck = ""
      let nodesCheck = ""

      try {
        console.log(TrapiResults)
        let results = TrapiResults.message.results
        let nodes = TrapiResults.message.knowledge_graph.nodes
        let edges = TrapiResults.message.knowledge_graph.edges 
        let edgeKeys = Object.keys(edges)
        nodesCheck = nodes
        // let nodeKeys = Object.keys(nodes)
        console.log("edges")
        console.log(edges)

        // console.log("length = ", edgeKeys.length)

        if(edgeKeys.length > 0){
          
          for (let x = 0; x < results.length; x++) {
            // FOR EACH RESULT
            const resultData = results[x];
            let resultEdges = resultData.edge_bindings
            // GET THE EDGES THAT ARE BOUND AND 
            let boundEdgeKeyArray = Object.keys(resultEdges)
            for (let index = 0; index < boundEdgeKeyArray.length; index++) {
              // LOOP THROUGH ALL EDGES
              // console.log("geting info clean")
              let data = {}
              
              data.diseaseKey = ""
              data.diseaseKeyName = ""
              data.drugKey = ""
              data.drugKeyName = ""
              data.resNodeCount = 0
              data.normalizedScore = resultData.normalized_score
              try{
                // data.diseaseKey = resultData.node_bindings.disease[0].id
                data.diseaseKey = resultData.node_bindings.on[0].id
                // data.drugKey = resultData.node_bindings.drug[0].id
                data.drugKey = resultData.node_bindings.sn[0].id
                data.diseaseKeyName = nodes[data.diseaseKey].name
                data.drugKeyName = nodes[data.drugKey].name
                let nodeBindingKeys = Object.keys(resultData.node_bindings)
                data.resNodeCount = nodeBindingKeys.length
              } catch {
                data.diseaseKey = "NA"
                data.drugKey =  "NA"
                data.diseaseKeyName = "NA"
                data.drugKeyName = "NA"
                resultData.node_bindings = 0
              }
              // if(x <10){
              //   console.log("resultData")
              //   console.log(resultData)
              //   console.log(resultData.node_bindings)
              //   console.log(resultData.node_bindings.disease)
              //   console.log(resultData.node_bindings.disease[0].id)
              //   // console.log(resultData)
              // }


              let edgeKey = boundEdgeKeyArray[index];
              // console.log("edgeKey")
              // console.log(edgeKey)
              // console.log("key = ", edgeKey)
              let edge = {...resultEdges[edgeKey]}
              edgeCheck = edge
              let secondaryEdgeKeys = Object.keys(edge)



              // if(x < 10){
                // console.log(x, "=", index)
                // console.log("edgeKey = ", edgeKey)
                // console.log()
                // console.log("edge")
                // console.log(edge)
                // console.log("data")
                // console.log(data)
                // console.log("secondaryEdgeKeys")
                // console.log(secondaryEdgeKeys)
                for (let q = 0; q < secondaryEdgeKeys.length; q++) {
                  const secondEdge = secondaryEdgeKeys[q];
                  // if(q < 10){
                    // console.log("secondEdge")
                    // console.log(secondEdge)
                    // console.log(edge[secondEdge].id)
                    let id = edge[secondEdge].id
                    // console.log("edges[id]")
                    // console.log(edges[id])
                    let secondEdgeData = {...edges[id]}
                    let subject = secondEdgeData.subject
                    let object = secondEdgeData.object
                    // data.edgeGroup = ""
                    data.ResultGroupID = ""
                    data.edgeKey = ""
                    data.edgeId = ""
                    data.agent = ""
                    data.edgeinfo = ""
                    data.object = ""
                    data.predicate = ""
                    // data.relation = edge.relation
                    data.subject = ""
                    nodeCheck = ""
                    data.subjectName = ""
                    data.subjectCats = ""
                    data.subjectCat = ""
                    nodeCheck = ""
                    data.objectName = ""
                    data.objectCats = ""
                    data.objectCat = ""
                    data.objectAtt = ""
                    data.subjectAtt = ""    
                    try {
                      data.edgeKey = edgeKey
                      data.ResultGroupID = x
                      data.ResultGroup = x + '-' + agent
                      data.agent = agent
                      data.edgeinfo = secondEdgeData 
                      data.edgeId = id 
                      data.object = secondEdgeData.object
                      data.predicate = secondEdgeData.predicate
                      // data.relation = edge.relation
                      data.subject = secondEdgeData.subject
                      nodeCheck = nodes[subject]
                      // console.log("nodes[subject]")
                      // console.log(nodes[subject])
                      if(nodes[subject].name != null){
                        data.subjectName = nodes[subject].name
                      }
                      
                      data.subjectCats = nodes[subject].categories
                      data.subjectCat = nodes[subject].categories[nodes[subject].categories.length - 1]
                      nodeCheck = nodes[object]

                      if(nodes[object].name != null){
                        data.objectName = nodes[object].name
                      }
                      
                      data.objectCats = nodes[object].categories
                      data.objectCat = nodes[object].categories[nodes[object].categories.length - 1]

                      if(nodes[object].attributes != null){
                        data.objectAtt = nodes[object].attributes
                      }
                      
                      if(nodes[subject].attributes != null){
                        data.subjectAtt = nodes[subject].attributes
                      }
                      // console.log("data no error")
                      // console.log(data)

                      clenaedData.push({...data})
                      

                    } catch (error){
                      console.error(error)
                      console.log("data")
                      console.log(data)
                      console.log("subject")
                      console.log(subject)
                      console.log("nodes[subject]")
                      console.log(nodes[subject])

                    }                
                  // }
                  
                }
              // }

                // if(n == data.edgeinfo.attributes.length - 1){
                //   // withDrugHits[i].geneToGeneResultShown.push(result)
                //   clenaedData.push(data)
                // } 
                
              // }
              
              // console.log("data = ", data)
    
              if(x == results.length -1){
                // console.log({clenaedData})
                resolve(clenaedData)
              }
              
            }
            // console.log(x)
            if(x == results.length -1){
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
        // console.log("nodes = ", nodes)
        console.log("nodeCheck = ", nodeCheck)
        console.log("nodesCheck = ", nodesCheck)
        console.log("edgeCheck = ", edgeCheck)
        // console.log("current cleaned data = ",  data)        
        console.error(err)
        reject({});
      }
    });

  }

  static TrapiResultClean_old(TrapiResults, agent) {
    // console.log("started PubCleanService");
    
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("########## Start TrapiResultClean")
      // console.log("TrapiResults")
      // console.log(TrapiResults)
      // console.log(prResults.length)
      let clenaedData = []
      let edgeCheck = ""
      let nodeCheck = ""
      let nodesCheck = ""

      try {
        console.log(TrapiResults)
        // let results = TrapiResults.message.results
        let nodes = TrapiResults.message.knowledge_graph.nodes
        let edges = TrapiResults.message.knowledge_graph.edges 
        let edgeKeys = Object.keys(edges)
        nodesCheck = nodes
        // let nodeKeys = Object.keys(nodes)
        console.log("edges")
        console.log(edges)

        // console.log("length = ", edgeKeys.length)

        if(edgeKeys.length > 0){

          for (let index = 0; index < edgeKeys.length; index++) {
            // console.log("geting info clean")
            let data = {}
            let edgeKey = edgeKeys[index];
            // console.log("key = ", edgeKey)
            let edge = {...edges[edgeKey]}
            edgeCheck = edge
            // console.log("edge = ", edge)
  
            let subject = edge.subject
            let object = edge.object

            data.edgeKey = ""
            data.agent = ""
            data.edgeinfo = ""
            data.object = ""
            data.predicate = ""
            // data.relation = edge.relation
            data.subject = ""
            nodeCheck = ""
            data.subjectName = ""
            data.subjectCats = ""
            data.subjectCat = ""
            nodeCheck = ""
            data.objectName = ""
            data.objectCats = ""
            data.objectCat = ""
            data.objectAtt = ""
            data.subjectAtt = ""

          try {
            data.edgeKey = edgeKey
            data.agent = agent
            data.edgeinfo = edge
            data.object = edge.object
            data.predicate = edge.predicate
            // data.relation = edge.relation
            data.subject = edge.subject
            nodeCheck = nodes[subject]
            if(nodes[subject].name != null){
              data.subjectName = nodes[subject].name
            }
            
            data.subjectCats = nodes[subject].categories
            data.subjectCat = nodes[subject].categories[nodes[subject].categories.length - 1]
            nodeCheck = nodes[object]

            if(nodes[object].name != null){
              data.objectName = nodes[object].name
            }
            
            data.objectCats = nodes[object].categories
            data.objectCat = nodes[object].categories[nodes[object].categories.length - 1]

            if(nodes[object].attributes != null){
              data.objectAtt = nodes[object].attributes
            }
            
            if(nodes[subject].attributes != null){
              data.subjectAtt = nodes[subject].attributes
            }
            

          } catch (error){
            console.error(error)
          }
            //
            data.edgepubInfo = null
            data.edgen_pmids = 0
            data.edgeprovider = ""
            data.edgepublicationsText = {}
            data.edgepublications= []


            for (let n = 0; n < data.edgeinfo.attributes.length; n++) {
              const att = data.edgeinfo.attributes[n];
              // if(att.attribute_type_id == "biolink:original_knowledge_source" && att.value == "infores:text-mining-provider-targeted"){
              //   console.log(edge)
              // }
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

              // else if(att.name == "publications_info"){
                
              //   let pubInfotext = att.value.replace(/"/g, "'")
              //   pubInfotext = pubInfotext.replace(/'object score': '/g, '"object score": "')
              //   pubInfotext = pubInfotext.replace(/'object score': /g, '"object score": ')
              //   pubInfotext = pubInfotext.replace(/, 'subject score': '/g, '", "subject score": "')
              //   pubInfotext = pubInfotext.replace(/, 'subject score': /g, '", "subject score": ')
              //   pubInfotext = pubInfotext.replace(/{'PMID/g, '{"PMID')
              //   pubInfotext = pubInfotext.replace(/': {'publication date': '/g, '": {"publication date": "')
              //   pubInfotext = pubInfotext.replace(/': {'publication date': /g, '": {"publication date": ')
              //   pubInfotext = pubInfotext.replace(/', 'sentence': '/g, '", "sentence": "')
              //   pubInfotext = pubInfotext.replace(/'sentence': '/g, '"sentence":')
              //   pubInfotext = pubInfotext.replace(/'PMID/g, '"PMID')
              //   pubInfotext = pubInfotext.replace(/ None,/g, ' "None",')
              //   pubInfotext = pubInfotext.replace(/ None",/g, ' "None",')
              //   pubInfotext = pubInfotext.replace(/'}}/g, '"}}')
              //   pubInfotext = pubInfotext.replace(/'CHEMBL/g, '"CHEMBL')
              //   pubInfotext = pubInfotext.replace(/\\/g, "")
              //   pubInfotext = pubInfotext.replace(/'sentence'/g, '"sentence"')
              //   // data.edgepublicationsText = JSON.parse(att.value) 
                
              // try{
              //   // console.log(JSON.parse(pubInfotext)) att.value
              //   data.pubInfo = JSON.parse(pubInfotext)
              // } catch(err){
                
              //   console.log("att.value = ", att.value)
              //   console.log("pubInfotext = ", pubInfotext)
              //   console.log("/'PMID:/g found = ", pubInfotext.includes("'PMID:"))
              //   console.log("/PMID/g found = ", pubInfotext.includes("PMID"))
              //   let sentenceindex = pubInfotext.indexOf('"sentence": ')
              //   console.log(pubInfotext.substring(0,sentenceindex))
              //   console.log("sentenceindex = ", sentenceindex)
              //   // console.log(pubInfotext.includes(/PMID/g))
              //   console.log(err)
              // }

              // }
              if(n == data.edgeinfo.attributes.length - 1){
                // withDrugHits[i].geneToGeneResultShown.push(result)
                clenaedData.push({...data})
              } 
              
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
        // console.log("nodes = ", nodes)
        console.log("nodeCheck = ", nodeCheck)
        console.log("nodesCheck = ", nodesCheck)
        console.log("edgeCheck = ", edgeCheck)
        // console.log("current cleaned data = ",  data)        
        console.error(err)
        reject({});
      }
    });

  }

  static flattenGetPublications(cleanTrapiResults) {
    // console.log("started PubCleanService");
    // ["agent","aggKS","knowledgeSource" ,"primaryKS","originalKS", "PMID_PMCID", "sentence"]

    let flatResults = []
    let flatResultsPUBS = []
    let flatResults_textminer = []
    let flatResults_semmeddb = []
    let flatResults_Other = []
    let flatResults_pfocr = []

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      for (let i = 0; i < cleanTrapiResults.length; i++) {
        const res = {...cleanTrapiResults[i]}

        let checPubEdge = []
        let edgeAtts = res["edgeinfo"]["attributes"]
        let objectAtts = res["objectAtt"]
        let subjectAtts = res["subjectAtt"]

        res.KSagg = ""
        res.KSaggAll = ""
        res.KS = ""
        res.KSprimary = ""
        res.KSoriginal = ""
        // res.KSprimary = ""
        res.KSoriginal = ""
        res.pubSentence = ""
        res.pubType = ""
        res.pubID = ""
        res.pubSubject = ""
        res.pubObject = ""
        res.pubUrl = ""
        res.pubSentLocation = ""
        res.pubSubjectCoord = ""
        res.pubObjectCoord = ""
        res.pubSemmedPredicate = ""
        
        res.objectDescription = ""
        res.subjectDescription = ""
        res.group = ""
        res.figureLink = ""
        res.figureTitle = ""

        res.pvalue = ""
        res.zscore = ""
        
        // ################# pfocr
        // GET KNOWLEDGE SOURCE INFO FROM EDGE
        // ################# 
        let attAggregattorAll = edgeAtts.filter(x =>  x.attribute_type_id == "biolink:aggregator_knowledge_source" )
        res.KSaggAll = attAggregattorAll.map(x => x.value)
        // res.KSaggAllnew = res.KSaggAll.toString()
        res.KSaggAll = res.KSaggAll.toString().replace(/[[\]]+/g,'').split(',')
        // res.KSaggAllreplace = res.KSaggAllstring.replace(/[[\]]+/g,'') 
        // res.KSaggAllstring = 
        // res.KSaggAllnew = res.KSaggAll.split( ";")
        // res.KSaggAllnew = res.KSaggAllreplace.split(',')
        // console.log("res.KSaggAllnew")
        // console.log(res.KSaggAllnew)
        
        let attAggregattor = edgeAtts.filter(x =>  x.attribute_type_id == "biolink:aggregator_knowledge_source" && ["infores:aragorn","infores:arax", "infores:biothings-explorer"].indexOf(x.value) == -1)
        res.KSagg = attAggregattor.map(x => x.value)
        res.KSagg = res.KSagg.toString().replace(/[[\]]+/g,'').split(',')


        let attPrimaryKS = edgeAtts.filter(x =>  x.attribute_type_id == "biolink:primary_knowledge_source" )
        res.KSprimary = attPrimaryKS.map(x => x.value)
        res.KSprimary = res.KSprimary.toString().replace(/[[\]]+/g,'').split(',')

        
        let attKS = edgeAtts.filter(x =>  x.attribute_type_id == "biolink:knowledge_source" )
        res.KS = attKS.map(x => x.value)
        res.KS = res.KS.toString().replace(/[[\]]+/g,'').split(',')


        let attOriginalKS = edgeAtts.filter(x =>  x.attribute_type_id == "biolink:original_knowledge_source" )
        res.KSoriginal = attOriginalKS.map(x => x.value)
        res.KSoriginal = res.KSoriginal.toString().replace(/[[\]]+/g,'').split(',')

        // #################
        // GET DESCRPTION FROM SUBJECT AND OBJECT
        // ################# 
        try {
          if(Array.isArray(subjectAtts)){
            let subjectDesAtt = subjectAtts.filter(x => x.attribute_type_id == "biolink:description")
            if(subjectDesAtt.length > 0){
              res.subjectDescription = subjectDesAtt[0].value
            }
          }
          if(Array.isArray(objectAtts)){
            let objectDesAtt = objectAtts.filter(x => x.attribute_type_id == "biolink:description")
            if(objectDesAtt.length > 0){
              res.objectDescription = objectDesAtt[0].value
            } 
          }
 
        } catch (err){
          console.log("res")
          console.log(res)
          console.error(err)
          console.log("subjectAtts != null")
          console.log(subjectAtts != null)
          console.log(subjectAtts)
          console.log("objectAtts != null")
          console.log(objectAtts != null)
          console.log(objectAtts)
        }
      


        let attPublicationID = edgeAtts.filter(x => ["biolink:Publication","biolink:publication", "biolink:supporting_document"].indexOf(x.attribute_type_id) > -1)


        // ################# 
        // GET RESULS WITH SEMMED PROVIDER DATA
        // ################# 
        if(Array.isArray(res.KSprimary)){
          // if(Array.isArray(res.KSprimary[0])){
            if(res.KSprimary[0] == "infores:semmeddb"){
              // if(res.KSprimary[0][0] == "infores:semmeddb"){
                // console.log("res infores:semmeddb")
              // console.log(res)
              res.group = "semmeddb"
              flatResults_semmeddb.push({...res})
              checPubEdge.push(res.edgeId)
            }
          // }
        } 
        // ################# 
        // GET RESULTS WITH TEXT MINING PROVIDER DATA
        // ################# 
        if(Array.isArray(res.KSoriginal)){
          // console.log("Array.isArray(res.attOriginalKS)")
          
          if(res.KSoriginal[0] == "infores:text-mining-provider-targeted"){
            res.group = "text-miner"
            flatResults_textminer.push({...res})
            checPubEdge.push(res.edgeId)
          }
        } 
        // ################# pfocr
        // CHECK TO SEE IF THE SET OF ATTRIBUTES INCLUDES PUBLICATION INFORMATION
        // ################# 
        if(attPublicationID.length > 0){
          res.pubID = attPublicationID.map(x => x.value)
          res.group = "otherPub"
          if(  checPubEdge.indexOf(res.edgeId) == -1){
            flatResultsPUBS.push({...res})
          } 
          

        } else {
          res.group = "noPub"
          flatResults_Other.push({...res})
        }
        // ################# 
        // GET THE infores:pfocr SO THE IMAGES AND LINKS CAN BE PULLED OUT
        // ################# 
        let checkpfocr = res.KSprimary.toString()
        if(checkpfocr.includes("pfocr")){
          flatResults_pfocr.push({...res}) 
        }
        // if(res.KSprimary.indexOf("infores:pfocr") > -1){
        //   flatResults_pfocr.push({...res}) 
        // }


        flatResults.push({...res})

        if(i == cleanTrapiResults.length - 1){
          // #################
          // GET SET THAT IS FROM kp-cohd
          // ################# 
          let flatResults_COHD = flatResults.filter(x => x.agent == "kp-cohd")
          console.log("flatResults_COHD")
          console.log(flatResults_COHD)

          // #################
          // REMOVE NODE ATTRIBUTES BC THEY ARE TOO LONG FOR EXCEL SOMETIMES AND BREAK THE FORMAT
          // ################# 

          for (let n = 0; n < flatResults.length; n++) {

            // const flatResult = flatResults[n];
            // flatResults[n].objectAtt = null
            // flatResults[n].subjectAtt = null
            // flatResults[n].edgeinfo = null
            if(n == flatResults.length - 1){
              resolve({"flatResults": flatResults, "flatResultsPUBS": flatResultsPUBS, "flatResults_semmeddb": flatResults_semmeddb, "flatResults_textminer" : flatResults_textminer, "flatResults_pfocr": flatResults_pfocr,"flatResults_Other" : flatResults_Other, "flatResults_COHD": flatResults_COHD})
            }
          }
          
        }


      }
    });

  }

// fixPublicationsCOHD
static fixPublicationsCOHD(TrapiResults) {
  console.log("started fixPublicationspfocr");
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let resultWithPvalueArray = []
    for (let i = 0; i < TrapiResults.length; i++) {
      const res = {...TrapiResults[i]}
      res.dataSet = ""
      res.concept_pair_count = ""
      res.concept_count_subject = ""
      res.concept_count_object = ""
      res.dataset_id = ""
      res.unadjusted_p_value = ""
      res.bonferonni_adjusted_p_value = ""
      res.supporting_data_set = ""
      res.expected_count = ""
      res.ln_ratio = ""
      res.ln_ratio_confidence_interval = ""
      res.relative_frequency_subject = ""
      res.relative_frequency_subject_confidence_interval = ""
      res.relative_frequency_object = ""
      res.relative_frequency_object_confidence_interval = ""

      let edgeinfoAtt = res.edgeinfo.attributes
      // CONSOLE LOG RES IF I < 10
      if(i < 10){
        console.log("##### res")
        console.log(res)
      }


      //CHECK EACH ATTRIBUTE TO LOOK FOR STUDY PVALUE INFORMATION
      for (let x = 0; x < edgeinfoAtt.length; x++) {
        const att = edgeinfoAtt[x];


        if(att.attribute_type_id == "biolink:has_supporting_study_result"){
          let attAtts = att.attributes
          //GET ALL FIELDS ABOVE FROM ATTRIBUTES OF EDGEINFO
          for (let n = 0; n < attAtts.length; n++) {
            const attAtt = attAtts[n];
            let attName = attAtt.attribute_type_id.split(":")[1]

            if(i < 10){
              console.log("attAtts")
              console.log(attAtts)
              console.log("attAtt")
              console.log(attAtt)
            }
            
            switch(attName){
              case "dataset_id":
                res.dataset_id = attAtt.value
                break;
              case "concept_pair_count":
                res.concept_pair_count = attAtt.value
                break;
              case "concept_count_subject":
                res.concept_count_subject = attAtt.value
                break;
              case "concept_count_object":
                res.concept_count_object = attAtt.value
                break;
              case "unadjusted_p_value":
                res.unadjusted_p_value = attAtt.value
                break;
              case "bonferonni_adjusted_p_value":
                res.bonferonni_adjusted_p_value = attAtt.value
                break;
              case "supporting_data_set":
                res.supporting_data_set = attAtt.value
                break;
              case "expected_count":
                res.expected_count = attAtt.value
                break;
              case "ln_ratio":
                res.ln_ratio = attAtt.value
                break;
              case "ln_ratio_confidence_interval":
                res.ln_ratio_confidence_interval = attAtt.value
                break;
              case "relative_frequency_subject":
                res.relative_frequency_subject = attAtt.value
                break;
              case "relative_frequency_subject_confidence_interval":
                res.relative_frequency_subject_confidence_interval = attAtt.value
                break;
              case "relative_frequency_object":
                res.relative_frequency_object = attAtt.value
                break;
              case "relative_frequency_object_confidence_interval":
                res.relative_frequency_object_confidence_interval = attAtt.value
                break;
            }
          }
  
        }
        if(x == edgeinfoAtt.length - 1){
          resultWithPvalueArray.push({...res})
        }
        
      }
      if(i == TrapiResults.length - 1){
        resolve(resultWithPvalueArray)
      }
    }
  })
}



//infores:pfocr flatTitle_remainingPubs
  static fixPublicationsRemainingPubs(TrapiResults) {
    console.log("started fixPublicationspfocr");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let resultPerPub = []
      for (let i = 0; i < TrapiResults.length; i++) {
        const res = {...TrapiResults[i]}

        let pubs = res.pubID
        if(pubs.length >0){
          for (let n = 0; n < pubs.length; n++) {
            const pub = pubs[n];
            res.pubID = pub
            let checkPubType = pub.substring(0,3)
            switch(checkPubType){
              case "htt":
                res.pubUrl = pub
              break;
              case "PMI":
                
              res.pubUrl = "https://pubmed.ncbi.nlm.nih.gov/" + pub.split(":")[1] +"/"
              // res.pubUrl = "https://pubmed.ncbi.nlm.nih.gov/" + pub.split("|")[1] +"/"
              // res.figureTitle = pubData.value
                // res.pubUrl = pubData.value_url
              break;
              case "PMC":
                res.pubUrl = "https://www.ncbi.nlm.nih.gov/pmc/articles/" + pub +"/"
              break;
            }   
            resultPerPub.push(res)
          }
        }
        
        if(i == TrapiResults.length - 1){
          console.log("pfocr - resultPerPub")
          // console.log(resultPerPub)
          resolve(resultPerPub)
        }
      }
    })
  }


  static fixPublicationspfocr(TrapiResults) {
    console.log("started fixPublicationspfocr");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let resultPerPub = []
      for (let i = 0; i < TrapiResults.length; i++) {
        const res = {...TrapiResults[i]}
        // res.pubSentence = ""
        // res.pubID = ""
        // res.pubSubject = ""
        // res.pubObject = ""
        // res.pubUrl = ""
        // res.pubSentLocation = ""
        let pubAttsArray = res.edgeinfo.attributes
        // let pubAttsArray = edgeAtts.filter(x => x.attribute_type_id == "biolink:supporting_study_result")
        try{
          for (let n = 0; n < pubAttsArray.length; n++) {
            // const pubAtt = pubAttsArray[n].attributes
    
            // for (let x = 0; x < pubAtt.length; x++) {
              const pubData = {...pubAttsArray[n]}
    
              switch(pubData.attribute_type_id){
                case "figure_download_url":
                  res.figureLink = pubData.value
                break;
                case "figure_title":
                  res.figureTitle = pubData.value
                  // res.pubUrl = pubData.value_url
                break;
                case "pmc_reference":
                  res.pubID = pubData.value
                break;
              }
    
              if(n == pubAttsArray.length - 1){
                // console.log("results processed = ", i)
                try{
                  // const pubID = pubs[n];
                  // res.pubID = pubID
                  // let pubUrlID = pubID.split("|")
                  res.pubUrl = "https://pubmed.ncbi.nlm.nih.gov/" + res.pubID +"/"
                  resultPerPub.push({...res})
                } catch (err) {
                  console.log(res)
                }
    
              }
    
              
            // }
    
            
          }
        } catch(err) {
          console.log("pubAttsArray")
          console.log(pubAttsArray)
        }
        
        if(i == TrapiResults.length - 1){
          console.log("pfocr - resultPerPub")
          // console.log(resultPerPub)
          resolve(resultPerPub)
        }
      }
    })
  }

  static fixPublicationsTextminer(TrapiResults) {
    console.log("started PubCleanService");
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let resultPerPub = []
      for (let i = 0; i < TrapiResults.length; i++) {
        
        let resCheck = TrapiResults[i]
        const res = {...resCheck}
        
        // res.pubSentence = ""
        // res.pubID = ""
        // res.pubSubject = ""
        // res.pubObject = ""
        // res.pubUrl = ""
        // res.pubSentLocation = ""
        let edgeAtts = res.edgeinfo.attributes
        let pubAttsArray = edgeAtts.filter(x => x.attribute_type_id == "biolink:supporting_study_result")
        // if(i < 5){console.log(pubAttsArray)}
        for (let n = 0; n < pubAttsArray.length; n++) {
          const pubAtt = pubAttsArray[n].attributes

          for (let x = 0; x < pubAtt.length; x++) {
            const pubDataAtt = pubAtt[x]
            const pubData = {...pubDataAtt}
            // if(i < 5){console.log("pubDataAtt")}
            // if(i < 5){console.log(pubDataAtt)}
            // if(i < 5){console.log("pubData")}
            // if(i < 5){console.log(pubData)}
            switch(pubData.attribute_type_id){
              case "biolink:supporting_text":
                res.pubSentence = pubData.value
              break;
              case "biolink:supporting_document":
                res.pubID = pubData.value
                res.pubUrl = pubData.value_url
              break;
              case "biolink:supporting_text_located_in":
                res.pubSentLocation = pubData.value
              break;
              case "biolink:subject_location_in_text":
                res.pubSubjectCoord = pubData.value
              break;
              case "biolink:object_location_in_text":
                res.pubObjectCoord = pubData.value
              break;
            }

            if(x == pubAtt.length - 1){
              // console.log("results processed = ", i)
              try{
                let resSplit = {...res}
                let subCoord = resSplit.pubSubjectCoord.split("|")
                res.pubSubject = resSplit.pubSentence.substring(subCoord[0], subCoord[1])
                let objCoord = resSplit.pubObjectCoord.split("|")
                res.pubObject = resSplit.pubSentence.substring(objCoord[0], objCoord[1])
                // if(res.ResultGroup == 25){
                //   console.log("res 25")
                //   console.log(res)
                // }
                // if(i < 25){ console.log(res)}
                resultPerPub.push({...res})
              } catch (err) {
                console.log(res)
              }

            }

            
          }

          
        }
        if(i == TrapiResults.length - 1){
          console.log("text mine - resultPerPub")
          // console.log(resultPerPub)
          resolve(resultPerPub)
        }
      }
    })
  }

  static fixPublicationsSemmeddb(TrapiResults) {
    console.log("started fixPublicationsSemmeddb");
    console.log(TrapiResults)
    return new Promise(async (resolve, reject) => { // eslint-disable-line
      let resultPerPub = []
      for (let i = 0; i < TrapiResults.length; i++) {
        const res = {...TrapiResults[i]}
        
        // res.pubSentence = ""
        // res.pubID = ""
        // res.pubSubject = ""
        // res.pubObject = ""
        // res.pubUrl = ""
        // res.pubSentLocation = ""
        let edgeAtts = res.edgeinfo.attributes
        
        let pubArray = edgeAtts.filter(x => x.attribute_type_id == "biolink:publications") // GETS ARRAY WITH PMIDS
        let pubs = pubArray[0].value
        // for (let n = 0; n < pubAttsArray.length; n++) {
        //   const pubAtt = pubAttsArray[n].attributes

          for (let x = 0; x < edgeAtts.length; x++) {
            const pubData = {...edgeAtts[x]}

            switch(pubData.attribute_type_id){
              case "original_object_name":
                res.pubObject = pubData.value
              break;
              case "original_subject_name":
                res.pubSubject = pubData.value
                // res.pubUrl = pubData.value_url
              break;
              case "biolink:original_predicate":
                res.pubSemmedPredicate = pubData.value
              break;
        
            }

            if(x == edgeAtts.length - 1){
              try{
                for (let n = 0; n < pubs.length; n++) {
                  const pubID = pubs[n];
                  res.pubID = pubID
                  let pubUrlID = pubID.split("|")
                  res.pubUrl = "https://pubmed.ncbi.nlm.nih.gov/" + pubUrlID[pubUrlID.length - 1] +"/"
                  resultPerPub.push({...res})
  
                  if(i == TrapiResults.length - 1){
                    console.log("semmeddb done")
                    // console.log(resultPerPub)
                    resolve(resultPerPub)
                  }
                  
                }
              } catch (err) {
                console.log("semmeddb error doing res")
                if( i < 10){
                  console.error(err)
                  console.log(res)
                  console.log(pubArray) // pubArray
                  console.log(pubs) // pubArray
                }
                
              }


            }

            
          }
          if(i == TrapiResults.length - 1){
            console.log("semmeddb done")
            // console.log(resultPerPub)
            resolve(resultPerPub)
          }
          
        // }
        // if(i == TrapiResults.length - 1){
        //   console.log("text mine - resultPerPub")
        //   console.log(resultPerPub)
        // }
      }
    })
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
            // console.log("nodes[subject]")
            // console.log(nodes[subject])
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
                clenaedData.push({...data})
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
