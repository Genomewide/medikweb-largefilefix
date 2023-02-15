<template>
  <div class="container" style="margin-bottom: 100px">
    <b-row>
      <h1 class="text-center">CYTOSCAPE TESTING</h1>
    </b-row>
    <b-row>
      <b-col cols="3">
        <div class="border border-secondary rounded" style="height: 100%">
          <b-button class="mt-3" variant="primary" block @click="selectResult2"
            >selectResult2</b-button
          >
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="movePrimaryNodestoSide"
            >movePrimaryNodestoSide
          </b-button>
            <!-- countPaths -->
          <b-button class="mt-3" variant="primary" block @click="allPaths()"
            >allPaths
          </b-button>
          <!-- <br> -->
          <b-button class="mt-3" variant="primary" block @click="getComplexResults"
        >getComplexResults 
      </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="collapseChildNodes"
            >collapseChildNodes
          </b-button>
          <!-- <br>  -->
          <!-- <b-button class="mt-3" variant="primary" block @click="getElbow"
        >getElbow
      </b-button> -->
          <!-- <br>  -->

          <br />
          <b-button class="mt-3" variant="primary" block @click="klayLayout"
            >klayLayout
          </b-button>
          <b-button class="mt-3" variant="primary" block @click="coseLayout"
            >coseLayout
          </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="breadthfirstLayout"
            >breadthfirstLayout
          </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="breadthfirstLayoutCircle"
            >Circular breadthfirst
          </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="gridLayout"
            >gridLayout
          </b-button>
          <!-- <b-button class="mt-3" variant="primary" block @click="cola">cola </b-button> -->
          <br />
          <b-button class="mt-3" variant="secondary" block @click="sizeByDegree"
            >sizeByDegree
          </b-button>
          <b-button class="mt-3" variant="secondary" block @click="paths"
            >paths
          </b-button>
          <b-button class="mt-3" variant="secondary" block @click="countPaths"
            >countPaths
          </b-button>
          <b-button class="mt-3" variant="secondary" block @click="getNodesPerResult">getNodesPerResult </b-button>    
        </div>
      </b-col>
      <b-col cols="9">
        <div class="border border-primary rounded">
          <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
          <!-- <cytoscape :key="keyCounter" ref="cyto" :config="config" :preConfig="preConfig" :afterCreated="updateGraph"> -->
            <!-- v-on:mousemove="updateXY" -->
          <!-- <cytoscape
            
            :key="keyCounter"
            ref="cyto"
            :config="config"
            :preConfig="preConfig"
          > -->
          <cytoscape
            
            :key="keyCounter"
            ref="cyto"
            :config="config"
            :preConfig="preConfig"
          >
            <cy-element
              id="cytoscape1"
              ref="cy"
              v-for="def in elements"
              :key="`${def.data.id}`"
              :definition="def"
              v-on:mouseover="hoverGraph($event, def, def.data, def.data.id)"
              v-on:mousedown="moveToModal($event, def, def.data, def.data.id)"
            />
          </cytoscape>
        </div>
      </b-col>
    </b-row>
    <br />
    <!-- ########################################################################
    CYTOSCAPE AND CONTROLS ABOVE
    REVIEW AND INFO WINDOWS BELOW
    ######################################################################## -->
    <b-row>
      <b-col cols="4">
        <div class="border border-secondary rounded" style="height: 50%; min-height: 1500px;">
          <div>
            <!-- <b-form-group label="Radios using options" v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="radio-group-1"
                v-model="radioDrug"
                :options="dataMenu"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
              ></b-form-radio-group>
            </b-form-group> -->
            <b-form-group label="Radios using options " v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="radio-group-1"
                v-model="radioDrug"
                :options="dataMenu"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
                stacked
              > </b-form-radio-group>
            </b-form-group>



    <div class="mt-3">Selected: <strong>{{ radioDrug }}</strong></div>
            <!-- radioDrug = {{radioDrug}}}
            <b-form-radio
                v-for="(drug, index) in dataMenu"
                :key="index"
                v-model="radioDrug"
                :value="drug.drugKey"
                name="checkbox"
                >
                {{drug.name}} ({{drug.count}})
            </b-form-radio> -->
            </div>
          <!-- <cytoscape
            
            :key="keyCounter"
            ref="cyto"
            :config="config"
            :preConfig="preConfig"
          >
            <cy-element
              id="cytoscape2"
              ref="cy"
              v-for="def in elements"
              :key="`${def.data.id}`"
              :definition="def"
              v-on:mouseover="deleteNode($event, def, def.data, def.data.id)"
            />
          </cytoscape> -->
        </div>
      </b-col>
      <!-- ######################################################################## -->
      <b-col cols="4">
        <div class="border border-secondary rounded" style="height: 50%; min-height: 300px;">
          <div>
            <b-button v-b-modal.modal-xl variant="primary">xl modal</b-button>
            <b-modal id="modal-xl" size="xl" title="Extra Large Modal">Hello Extra Large Modal!
              <div class="border border-secondary rounded" style="height: 50%">
                          <b-button
            class="mt-3"
            variant="success"
            block
            @click="testModal"
            >testModal
          </b-button>
                <!-- <cytoscape
                  
                  :key="keyCounter"
                  ref="modalCyto"
                  :config="config"
                  :preConfig="preConfig"
                >
                  <cy-element
                  id="cytoscapeModal"
                    ref="modalCy"
                    v-for="def in modalElements"
                    :key="`${def.data.id}`"
                    :definition="def"
                    v-on:mouseover="deleteNode($event, def, def.data, def.data.id)"
                  />
                </cytoscape> -->
              </div>
            </b-modal>
            
          </div>
       
        </div>
      </b-col>
      <!-- ######################################################################## -->
      <b-col cols="4">
        <div class="border border-secondary rounded" style="height: 50%; min-height: 300px;">
          <!-- <div>
      SAME AS BIG GRAPH MODAL
          </div>
          <div>
            <b-button v-b-modal.modal-xl2 variant="primary">xl modal</b-button>
            

            <b-modal id="modal-xl2" size="xl" title="Extra Large Modal">Hello Extra Large Modal!
              <div class="border border-secondary rounded" style="height: 50%">
                <cytoscape
                  
                  :key="keyCounter"
                  ref="cyto"
                  :config="config"
                  :preConfig="preConfig"
                >
                  <cy-element
                    ref="cy"
                    v-for="def in elements"
                    :key="`${def.data.id}`"
                    :definition="def"
                    v-on:mouseover="hoverGraph($event, def, def.data, def.data.id)"
                    v-on:mousedown="moveToModal($event, def, def.data, def.data.id)"
                  />
                </cytoscape>
              </div>
            </b-modal>
            
          </div> -->
          <!-- <cytoscape
            :key="keyCounter"
            ref="cyto"
            :config="config"
            :preConfig="preConfig"
          >
            <cy-element
              ref="cy"
              v-for="def in elements"
              :key="`${def.data.id}`"
              :definition="def"
              v-on:mouseover="deleteNode($event, def, def.data, def.data.id)"
            />
          </cytoscape> -->
        </div>
      </b-col>
    </b-row>
    <!-- ########################################################################
    END --- REVIEW AND INFO WINDOWS 
    ######################################################################## -->
    <div>
      <!-- <b-button class="mt-3" variant="primary" block @click="selectResult">CHEMBL.COMPOUND:CHEMBL408 </b-button> -->

      <!-- <b-collapse :id="'table-collapse' + index + result.name"> -->
      <b-card-text>
        <b-form style="margin-top: 20px; margin-bottom: 20px">
          <b-form-group
            label="Filter"
            label-for="filter-input"
            label-cols-sm="1"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-input-group size="sm">
              <b-form-input
                id="filter-input"
                v-model="filter"
                type="search"
                placeholder="Type to Search"
              ></b-form-input>

              <b-input-group-append>
                <b-button :disabled="!filter" @click="filter = ''"
                  >Clear</b-button
                >
              </b-input-group-append>
            </b-input-group>
          </b-form-group>
        </b-form>
        <b-pagination
          style="padding-bottom: 20px"
          v-model="currentPage"
          :total-rows="cytoData.length"
          :per-page="10"
          align="fill"
          size="sm"
          class="my-0"
        ></b-pagination>

        <b-table
          bordered
          striped
          hover
          ref="selectableTable"
          responsive="true"
          table-layout:
          fixed
          :current-page="currentPage"
          :per-page="10"
          :fields="resultFields"
          :items="cytoData"
          :filter="filter"
          :filter-include-fields="[]"
          @filtered="onFiltered"
        >
        </b-table>
      </b-card-text>
      <!-- </b-collapse> -->
    </div>
  </div>
</template>

<script>
import klay from "cytoscape-klay";
import config from "./cytoscapeData/CytoConfig";
import config2 from "./cytoscapeData/CytoConfig2";
import dataMenu from "./cytoscapeData/cytoscapeExampleResults.json";
import pathData from "./cytoscapeData/pathsData.json";
import cytoData from "../assets/diabetesTreatsCleaned.json";
// import dataMenu from "../assets/cytoscapeExampleResults.json";
import cytoscape from "cytoscape";
// cytoscapeExampleResults
// import cytoscapeAllPaths from 'cytoscape-all-paths';
// cytoscape.use( cytoscapeAllPaths );

// cytoscape.use(klay)
console.log("config");
console.log(config);
const elements = [...config.elements];
const modalElements = [...config2.elements];
delete config.elements;
delete config2.elements;
console.log("cytoData");
console.log(cytoData);



// ADDED TO CHECK ON CENTER AND UPDATE LAYOUT
// let resolveCy = null
// export const cyPromise = new Promise(resolve => (resolveCy = resolve))

export default {
  data() {
    return {
      klay: klay,
      config,
      cytoscape,
      elements,
      modalElements,
      dataMenu,
      currentPage: 1,
      keyCounter: 1,
      cytoData: cytoData,
      filter: null,
      resultFields: [
        {
          key: "resNodeCount",
          label: "#Nodes",
          sortable: true,
        },
        {
          key: "drugKey",
          label: "Drug",
          sortable: true,
        },
        {
          key: "objectName",
          label: "Object",
          sortable: true,
          tdClass: "colwidth",
        },

        {
          key: "object",
          label: "object ID",
        },
        {
          key: "predicate",
          label: "Predicate",
        },
        {
          key: "subjectName",
          label: "Subject",
          sortable: true,
        },
        {
          key: "subject",
          label: "Subject ID",
          sortable: true,
          tdClass: "colwidth",
        },
      ],
      gotNodes: [],
      nodeToSelect: "",
      theDrug: "",
      theDisease: "",
      startingNodeData: {},
      startOrTarget: "",
      parentGroupPrefix: "target",
      // parentGroup: parentGroupPrefix + "parentGroup"
      nodePaths: {},
      xy: {},
      selectedDrug: [],
      selectDrugData: [
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL2103841",
        "count": 133,
        "objectName": "CANAGLIFLOZIN"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL408",
        "count": 133,
        "objectName": "TROGLITAZONE"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL1697838",
        "count": 125,
        "objectName": "GLYMIDINE"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL2018096",
        "count": 119,
        "objectName": "IPRAGLIFLOZIN"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL2104391",
        "count": 101,
        "objectName": "INSULIN DETEMIR"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL2107869",
        "count": 99,
        "objectName": "INSULIN DEGLUDEC"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL249263",
        "count": 95,
        "objectName": "type 2 diabetes mellitus"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL476960",
        "count": 93,
        "objectName": "VOGLIBOSE"
    },
    {
        "drugKey": "ATC:A10AB05",
        "count": 91,
        "objectName": "INSULIN ASPART"
    },
    {
        "drugKey": "CHEMBL.COMPOUND:CHEMBL427216",
        "count": 85,
        "objectName": "GLICLAZIDE"
    }
      ],
      radioDrug: "CHEMBL.COMPOUND:CHEMBL408"
      
    };
  },
  methods: {
    getNodesPerResult(){
      // console.log("getNodesPerResult")
      //GET ARRAY OF NODES PER RESULT IN pathData
      let pathsData = cytoData
      let cleanPathData = {}
      let drugKeyArray = []
      let allNodesArray = []
      // GET ALL SUBJECT AND OBJECTS FROM PATHDATA AND GROUP BY DRUGKEY
      for (let i = 0; i < pathsData.length; i++) {
        const edgeData = pathsData[i];
        let drugKey = edgeData.drugKey
        if(!drugKeyArray.includes(drugKey)){
          drugKeyArray.push(drugKey)
          cleanPathData[drugKey] = {
            "drugKey" : drugKey,
            "nodes" : []
          }
        }

        if(edgeData.object != edgeData.drugKey){
          cleanPathData[drugKey].nodes.push(edgeData.object)
        }
        
        if(edgeData.subject != edgeData.diseaseKey){
          cleanPathData[drugKey].nodes.push(edgeData.object)
        }
        
        allNodesArray.push(edgeData.subject)
        allNodesArray.push(edgeData.object)
        
      }
      console.log(cleanPathData)
      // GET SUBJECT AS ID, SUBJECTNAME AS NAME, AND, OBJECT AS ID, OBJECTNAME AS NAME
      // let nameKeys = Object.keys(cleanPathData)
      let nameKey = {}
      for (let index = 0; index < pathsData.length; index++) {
        const edge = pathsData[index];
        let nameObject = {}
        nameObject.id = edge.subject
        nameObject.name = edge.subjectName   
        nameKey[edge.subject] = nameObject
        
        nameObject = {}
        nameObject.id = edge.object
        nameObject.name = edge.objectName  
        nameKey[edge.object] = nameObject
      }


      // GET UNIQUE NODES PER DRUGKEY IN cleanPathData
      let keys = Object.keys(cleanPathData)
      for(let i = 0; i < keys.length; i++){
        let drugKey = keys[i]
        let nodes = cleanPathData[drugKey].nodes
        let uniqueNodes = [...new Set(nodes)]
        cleanPathData[drugKey].uniqueNodes = uniqueNodes
      }
      console.log("cleanPathData")
      console.log(cleanPathData)

      console.log("allNodesArray")
      console.log(allNodesArray)
      allNodesArray = [...new Set(allNodesArray)]
      console.log("allNodesArray")
      console.log(allNodesArray)

      // GET CLEANED PATHDATA WITH > 5 UNIQUE NODES
      let cleanPathData2 = {}
      let keys2 = Object.keys(cleanPathData)
      for(let i = 0; i < keys2.length; i++){
        let drugKey = keys2[i]
        let uniqueNodes = cleanPathData[drugKey].uniqueNodes
        if(uniqueNodes.length > 4){
          cleanPathData2[drugKey] = cleanPathData[drugKey]
        }
      }
      console.log("cleanPathData2")
      console.log(cleanPathData2)
      console.log(Object.keys(cleanPathData2).length)

      // GET all UNIQUE NODES IN cleanPathData
      let allNodesArray2 = []
      let keys3 = Object.keys(cleanPathData2)
      for(let i = 0; i < keys3.length; i++){
        let drugKey = keys3[i]
        let uniqueNodes = cleanPathData2[drugKey].uniqueNodes
        for(let j = 0; j < uniqueNodes.length; j++){
          let node = uniqueNodes[j]
          allNodesArray2.push(node)
        }
      }
      // let keys = Object.keys(cleanPathData2)
      allNodesArray2 = [...new Set(allNodesArray2)]
      console.log("allNodesArray2")
      console.log(allNodesArray2)

      // CHECK EACH OBJECT IN cleanPathData2 TO SEE IF EACH NODE IN allNodesArray2 IS PRESENT
      let keys4 = Object.keys(cleanPathData2)
      let expressionArray = {}
      // let headers = ["headers", ...allNodesArray2]
      let headers = ["headers"]
      for(let i = 0; i < allNodesArray2.length; i++){
        let node = allNodesArray2[i]
        let name = nameKey[node].name.replace(/,/gi, ";");
        if(name.length == ""){
          name = node
        }
        console.log("name = ", name)
        headers.push(name)
      }
      console.log("headers")
      console.log(headers)
      

      expressionArray.headers = headers
      for(let i = 0; i < keys4.length; i++){
        let drugKey = keys4[i]
        let uniqueNodes = cleanPathData2[drugKey].uniqueNodes
        let expressionArray2 = []
        // expressionArray2.push(drugKey)
        let name = nameKey[drugKey].name.replace(/,/gi, ";");
        // console.log("drugKey")
        // console.log(drugKey)
        // console.log("nameKey[drugKey].name")
        // console.log(nameKey[drugKey].name)
        if(name.length < 2){
          name = drugKey
        }
        expressionArray2.push(name)
        for(let j = 0; j < allNodesArray2.length; j++){
          let node = allNodesArray2[j]
          if(uniqueNodes.includes(node)){
            expressionArray2.push(1)
          }else{
            expressionArray2.push(0)
          }
        }
        expressionArray[drugKey] = expressionArray2
      }

      console.log("expressionArray")
      console.log(expressionArray)

      let saveText = expressionArray.headers + "\r\n"
      for(let i = 0; i < keys4.length; i++){
        let drugKey = keys4[i]
        let expressionArray2 = expressionArray[drugKey].toString()
        saveText += expressionArray2 + "\r\n"
      }
      
      let filename = "test.csv"
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(saveText)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
      console.log("file saved!!");






      

    },
    paths(){
      console.log(pathData)
      let pathsData = pathData
      let cleanPathData = []
      // get elements from array of paths from pathData
      for (let i = 0; i < pathsData.length; i++) {
        const path = pathsData[i]
        let cleanData = {
          "id" : path.id,
          "name" : path.name,
          // "allTriples" : [],
          "allNodes" : [],
          uniqueNodes: [],
          // "paths" : [],
        }
        let subgraphs = path.paths
        for (let n = 0; n < subgraphs.length; n++) {
          const subgraphArray = subgraphs[n];

          for (let j = 1; j < subgraphArray.length; j++) {
            const subgraph = subgraphArray[j];
            let subject = subgraph.subject.names[0]
            let object = subgraph.object.names[0]
            cleanData.allNodes.push(subject)
            cleanData.allNodes.push(object)
          }
          
        }
        // GET UNIQUE NODES
        cleanData.uniqueNodes = [...new Set(cleanData.allNodes)];
        cleanPathData.push(cleanData)
        
      }
      console.log(cleanPathData)


    },
    countPaths(){
      console.log(pathData)
      let pathsData = pathData
      // COUNT THE NUMBER OF TIMES EACH NAME IS USED IN pathsData
      let pathNames = pathsData.map((x) => x.name);
      let uniquePathNames = [...new Set(pathNames)];
      let pathNameCounts = uniquePathNames.map((x) => {
        return {
          name: x,
          count: pathNames.filter((y) => y === x).length,
        };
      });
      console.log(pathNameCounts)
      // GET THOSE WITH COUNT > 1
      let pathNameCounts2 = pathNameCounts.filter((x) => x.count > 1);
      console.log(pathNameCounts2)


    },
    testModal(){

      console.log("this.$refs.modalCyto")
      console.log(this.$refs.modalCyto)
      // 
      console.log("this.$refs.cyto")
      console.log(this.$refs.cyto)
    },

    modalResults() {
      console.log("modalResults");
      console.log(this.modalElements);
      this.$refs.modal.show();
    },
    // @remind selectResult2
    getComplexResults(){
      console.log("starting getComplexResults")
      // GET UNIQUE VALUES OF DRUG KEY FROM CYTODATA
      let uniqueDrugKeys = [...new Set(cytoData.map((x) => x.drugKey))];
      // GET COUNT OF EACH UNIQUE DRUG KEY
      let drugKeyCounts = uniqueDrugKeys.map((x) => {
        return {
          drugKey: x,
          count: cytoData.filter((y) => y.drugKey == x).length,
        };
      });
      // SORT DRUG KEY COUNTS BY COUNT
      drugKeyCounts.sort((a, b) => b.count - a.count);
      // GET DRUGS WITH COUNT > 20 AND LESS THAN 50
      let drugKeyCountsFiltered20_50 = drugKeyCounts.filter(
        (x) => x.count > 20 && x.count < 50
      );
      console.log("drugKeyCountsFiltered20_50")
      console.log(drugKeyCountsFiltered20_50)

      let menuItems = []
      // let getNames20_50 = []


      for (let i = 0; i < drugKeyCountsFiltered20_50.length; i++) {
        const drug = drugKeyCountsFiltered20_50[i]

        let drugmatch = cytoData.filter((y) => y.object == drug.drugKey)
        console.log("drugmatch.length")
        console.log(drugmatch.length)
        if(drugmatch.length > 0){
          drug.text = drugmatch[0].objectName + " (" + drug.count + ")"
          drug.value = drug.drugKey
          menuItems.push(drug)
        }
        // drugKeyCountsFiltered20_50[i].name = drugmatch[0].object
        
      }
      console.log("getNames after ")
      console.log(menuItems)

      // GET TOP 10 DRUG KEYS
      let top10DrugKeys = drugKeyCounts.slice(0, 10);
      console.log("top10DrugKeys");
      console.log(top10DrugKeys);


      let top10DrugKeysdata = []
      for (let i = 0; i < top10DrugKeys.length; i++) {
        const drug = top10DrugKeys[i]

        let drugmatch = cytoData.filter((y) => y.object == drug.drugKey)
        console.log("drugmatch.length")
        console.log(drugmatch.length)
        if(drugmatch.length > 0){
          drug.text = drugmatch[0].objectName+ " (" + drug.count + ")"
          drug.value = drug.drugKey
          menuItems.push(drug)
        }
        // drugKeyCountsFiltered20_50[i].name = drugmatch[0].object
        
      }
      console.log("top10DrugKeysdata after ")
      console.log(top10DrugKeysdata)

      // put menuItems in order of count
      menuItems.sort((a, b) => b.count - a.count);
      console.log("menuItems")
      console.log(menuItems)

      this. dataMenu = menuItems
      
    },
    selectResult2() {
      this.cyInstance.selectionType("additive");
      // Set the selection type.
      // type The selection type string; one of 'single' (default) or 'additive'.

      console.log("this.keyCounter");
      console.log(this.keyCounter);
      // console.log("config2")
      // console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(
        (x) => x.drugKey == this.radioDrug
      );

      console.log("filterCytoData");
      console.log(filterCytoData);
      // let newElements = []
      let nodes = this.genNodes(filterCytoData);
      let edges = this.genEdges(filterCytoData);
      let addElements = [...nodes, ...edges];
      console.log("addElements = ", addElements);
      this.cyInstance.add(addElements);

      console.log("this.elements");
      console.log(this.elements);
      this.cyInstance.remove(this.cyInstance.$("#a"));
      this.cyInstance.remove(this.cyInstance.$("#b"));
      this.cyInstance.remove(this.cyInstance.$("#c"));

      // ###############################################################
      // ###############################################################
      // USE THIS TO ADD SO THAT CLICKING ON NODES WORKS - WILL SHOW ERROR IN CONSOLE BUT WORKS
      // ###############################################################
      // ###############################################################
      this.elements = [...nodes, ...edges];

      console.log("after adding elements");
      console.log(this.elements);
      this.updateGraph();
      // console.log(this.cyInstance.$('#a'))
      this.cyInstance.makeLayout({ name: "klay", animate: true }).run();

      // #####################################################################
      // GET PARENT AND GRANPARENT DATA AND TAG NODES WITH IT
      // #####################################################################
      this.getNodeParentGrandparentData();

      this.allPaths()
    },

    // @remind genNodes
    genNodes(filterCytoData) {
      // return new Promise(async (resolve, reject) => { // eslint-disable-line
      let nodes = [];
      let nodeCheck = [];
      let catCheck = [];
      let sricatCheck = [];
      let x = 100;
      let y = 100;
      for (let i = 0; i < filterCytoData.length; i++) {
        const res = filterCytoData[i];
        let fixSubjectName = res.subjectName.split(" ").join("_");
        let fixObjectName = res.objectName.split(" ").join("_");
        // console.log(res)

        //
        if (sricatCheck.indexOf(res.objectSRICat) == -1) {
          sricatCheck.push(res.objectSRICat.split(":")[1]);
        }
        if (sricatCheck.indexOf(res.subjectSRICat) == -1) {
          sricatCheck.push(res.subjectSRICat.split(":")[1]);
        }
        // GET LIST OF ALL CATS TO LOOK AT HOW TO SET FORMATS
        // console.log(res.objectCats)
        for (let oc = 0; oc < res.objectCats.length; oc++) {
          const cat = res.objectCats[oc];
          // console.log(cat)
          if (catCheck.indexOf(cat) == -1) {
            catCheck.push(cat);
          }
        }
        // console.log("######### catCheck")
        // console.log(catCheck)
        // console.log(res.subjectCats)
        for (let sc = 0; sc < res.subjectCats.length; sc++) {
          // console.log(cat)
          const cat = res.subjectCats[sc];
          if (catCheck.indexOf(cat) == -1) {
            catCheck.push(cat);
          }
        }

        // #################################################
        // GET SUBJECT NODES
        // #################################################
        if (nodeCheck.indexOf(fixSubjectName) == -1) {
          x = x + 50;
          if (x % 500 == 0) {
            y = y + 100;
            x = 100;
          }
          let el = {};
          el.data = {};
          el.position = {};
          el.classes = [];
          el.data.name = res.subjectName;
          console.log("res.subjectName");
          console.log(res.subjectName);
          console.log(fixSubjectName);
          el.data.id = fixSubjectName;
          el.data.sriCat = res.subjectSRICat.split(":")[1];
          el.data.classDefault = res.subjectSRICat.split(":")[1];

          el.position = { x: x, y: y };
          el.group = "nodes";

          console.log("res.subjectCats");
          console.log(res.subjectCats);

          if (res.diseaseKey == res.subject) {
            this.theDisease = fixSubjectName;
            el.classes = ["thedisease"];
            el.position = { x: 900, y: 300 };
            el.data.classDefault = "thedisease";
            console.log("FOUND subject DISEASE");
            console.log(res);
            // el.locked = true
          } else if (res.drugKey == res.subject) {
            this.theDrug = fixSubjectName;
            el.classes = ["thedrug"];
            el.data.classDefault = "thedrug";
            el.position = { x: 200, y: 300 };
            console.log("FOUND subject DRUG");
          } else {
            el.classes = [res.subjectSRICat.split(":")[1]];
          }
          // else if (res.subjectSRICat == "biolink:SmallMolecule") {
          //   // console.log("res small mol")
          //   // console.log(res)
          //   el.classes = ["smallmolecule"];
          // } else if (res.subjectSRICat == "biolink:Disease") {
          //   // console.log("res disease")
          //   // console.log(res)
          //   el.classes = ["disease"];
          // } else if (res.subjectSRICat == "biolink:Protein") {
          //   // console.log("res protein")
          //   // console.log(res)
          //   el.classes = ["protein"];
          // }

          // nodes = [nodes, ...el] "biolink:DiseaseOrPhenotypicFeature"
          nodes.push(el);
          nodeCheck.push(fixSubjectName);
        }

        if (nodeCheck.indexOf(fixObjectName) == -1) {
          x = x + 50;
          if (x % 500 == 0) {
            y = y + 100;
            x = 100;
          }

          let el = {};
          el.data = {};
          el.position = {};
          el.classes = [];
          console.log("res.objectName");
          console.log(res.objectName);
          console.log(fixObjectName);
          el.data.id = fixObjectName;
          el.data.sriCat = res.objectSRICat.split(":")[1];
          el.data.classDefault = res.objectSRICat.split(":")[1];
          el.data.name = res.objectName;

          el.position = { x: x, y: y };
          el.group = "nodes";

          if (res.drugKey == res.object) {
            this.theDrug = fixObjectName;
            el.data.classDefault = "thedrug";

            el.classes = ["thedrug"];
            el.position = { x: 200, y: 300 };
            console.log("FOUND object DRUG");
            // console.log(res)
            // el.locked = true
          } else if (res.diseaseKey == res.object) {
            this.theDisease = fixObjectName;
            el.classes = ["thedisease"];
            el.data.classDefault = "thedisease";
            el.position = { x: 900, y: 300 };
            console.log("FOUND object DISEASE");
          } else {
            el.classes = [res.objectSRICat.split(":")[1]];
          }

          // else if (res.objectSRICat == "biolink:SmallMolecule") {
          //   // console.log("res small mol")
          //   // console.log(res)
          //   el.classes = ["smallmolecule"];
          // } else if (res.objectSRICat == "biolink:Disease") {
          //   // console.log("res disease")
          //   // console.log(res)
          //   el.classes = ["disease"];
          // } else if (res.objectSRICat == "biolink:Protein") {
          //   // console.log("res protein")
          //   // console.log(res)
          //   el.classes = ["protein"];
          // }
          // nodes = [nodes, ...el]

          nodes.push(el);
          nodeCheck.push(fixObjectName);
        }
        if (i == filterCytoData.length - 1) {
          console.log("nodes");
          console.log(nodes);
          console.log("catCheck");
          console.log(catCheck);
          console.log("sricatCheck");
          console.log(sricatCheck);
          // resolve(nodes)
          return nodes;
        }
      }
      // })
    },
    genEdges(filterCytoData) {
      // return new Promise(async (resolve, reject) => { // eslint-disable-line
      let edges = [];
      let edgesCheck = [];
      for (let i = 0; i < filterCytoData.length; i++) {
        const res = filterCytoData[i];

        let edgeCheck = res.subjectName + "_" + res.objectName;
        edgeCheck = edgeCheck.split(" ").join("_");
        let primaryEdge1 = this.theDrug + "_" + this.theDisease;
        let primaryEdge2 = this.theDisease + "_" + this.theDrug;

        if (
          edgesCheck.indexOf(edgeCheck) == -1 &&
          primaryEdge1 != edgeCheck &&
          primaryEdge2 != edgeCheck
        ) {
          let el = {};
          el.data = {};
          el.data.id = edgeCheck;
          el.data.source = res.subjectName.split(" ").join("_");
          el.data.target = res.objectName.split(" ").join("_");
          // el.position
          el.group = "edges";
          // edges = [edges, ...el]
          edges.push(el);
          edgesCheck.push(edgeCheck);
        }
        if (i == filterCytoData.length - 1) {
          console.log("edges");
          console.log(edges);
          // resolve(edges)
          return edges;
        }
      }
      // })
    },

    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    preConfig2(cytoscape) {
      console.log("preConfig");
      console.log("cytoscape")
      console.log(cytoscape)
      // console.log('this.$refs["cy-element"]')
      // console.log(this.$refs["cy-element"])
      // console.log("this.$refs.cy")
      // console.log(this.$refs.cy)
      // console.log("document.getElementById('cytoscape-div')")
      // console.log(document.getElementById('cytoscape-div').clientHeight)
      // console.log(document.getElementById('cytoscape-div').clientWidth)
      // // cy-element
      // console.log("this.$refs.cy.instance")
      // console.log(this.$refs.cy.instance)
      cytoscape.use(this.klay);
    },
    preConfig(cytoscape) {
      console.log("preConfig");
      // console.log("cytoscape")
      // // console.log(cytoscape)
      // console.log('this.$refs["cy-element"]')
      // console.log(this.$refs["cy-element"])
      // console.log("this.$refs.cy")
      // console.log(this.$refs.cy)
      // console.log("document.getElementById('cytoscape-div')")
      // console.log(document.getElementById('cytoscape-div').clientHeight)
      // console.log(document.getElementById('cytoscape-div').clientWidth)
      // // cy-element
      // console.log("this.$refs.cy.instance")
      // console.log(this.$refs.cy.instance)
      cytoscape.use(this.klay);
    },
    klayLayout() {
      this.cyInstance
        .makeLayout({ name: "klay", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },
    klayLayout2() {
      this.cyInstance
        .makeLayout({ name: "klay", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },
    coseLayout() {
      this.cyInstance
        .makeLayout({ name: "cose", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },
    breadthfirstLayoutCircle() {
      this.cyInstance
        .makeLayout({
          name: "breadthfirst",
          circle: true,
          animate: true,
          fit: true,
        })
        .run();
      this.cyInstance.center();
    },
    breadthfirstLayout() {
      this.cyInstance
        .makeLayout({ name: "breadthfirst", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },
    cola() {
      this.cyInstance
        .makeLayout({ name: "cola", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },
    gridLayout() {
      this.cyInstance
        .makeLayout({ name: "grid", animate: true, fit: true })
        .run();
      this.cyInstance.center();
    },


    updateXY(xy) {
      console.log(xy);
    },
    collapseChildNodes() {
      // GET THE PARENTS
      this.makeParents();

      // COLLAPSE THE CHILDREN
      let nodeData = this.cyInstance.nodes(".parentGroup").jsons();
      console.log("nodeData");
      console.log(nodeData);
      let nodesToDelete = [];
      for (let index = 0; index < nodeData.length; index++) {
        const parentNode = nodeData[index];
        // GET PARENT ID TO SELECT THE POSITION - TO MOVE CHILD NODES TO THE PARENT LOCATION
        let parentNodeSelectName = "#" + parentNode.data.id;
        let location = this.cyInstance
          .$(parentNodeSelectName)
          .renderedPosition();

        // GET IDS OF THE CHILDREN TO MOVE THEM
        let elbowChildIDs = parentNode.data.elbowChildIDs;
        console.log("elbowChildIDs");
        console.log(elbowChildIDs);
        nodesToDelete = [...nodesToDelete, ...elbowChildIDs];
        for (let n = 0; n < elbowChildIDs.length; n++) {
          const elbowChildID = elbowChildIDs[n];
          let nodeSelectName = "#" + elbowChildID;
          // let animateData = {}
          let animateNode = this.cyInstance.$(nodeSelectName);
          animateNode.animate({
            style: {
              opacity: 0,
            },
            renderedPosition: location,
            duration: 1000,
            complete: function () {
              console.log("animation complete");
              animateNode.remove();
            },
          });
        }
      }
      // CHANGE THE SIZE OF THE PARENTS
      for (let i = 0; i < nodeData.length; i++) {
        const parentNodeData = nodeData[i];
        let nodeGetID = "#" + parentNodeData.data.id;
        let elbowCount = parentNodeData.data.elbowChildCount;

        let height = this.cyInstance.$(nodeGetID).numericStyle("height");
        let width = this.cyInstance.$(nodeGetID).numericStyle("width");
        let adjustHeight = height + elbowCount * 10;
        let adjustWidth = width + elbowCount * 10;
        let animateParentNode = this.cyInstance.$(nodeGetID);
        console.log("adjustHeight = ", adjustHeight);
        console.log("adjustWidth = ", adjustWidth);
        animateParentNode.animate({
          style: { height: adjustHeight, width: adjustWidth },
          duration: 1000,
        });
      }
    },

    moveSecondaryNodes(primaryMap) {
      console.log("moveSecondaryNodes");
      console.log(primaryMap);
      let renderedBoundingBox = this.cyInstance
        .elements()
        .renderedBoundingBox();

      console.log("renderedBoundingBox = ", renderedBoundingBox);
      let xUnit = (renderedBoundingBox.x2 - renderedBoundingBox.x1) / 3;
      let xRow1 = renderedBoundingBox.x2 - xUnit;

      let groupKeys = Object.keys(primaryMap.firstRow);
      let yUnit =
        (renderedBoundingBox.y2 - renderedBoundingBox.y1) /
        (primaryMap.countAll + 3 * groupKeys.length);

      let yPos = renderedBoundingBox.y1;
      for (let i = 0; i < groupKeys.length; i++) {
        const group = groupKeys[i];

        let groupNodes = primaryMap.firstRow[group].nodes;
        for (let n = 0; n < groupNodes.length; n++) {
          const node = groupNodes[n];
          let nodeID = "#" + node.id;
          if (node.id != this.theDrug) {
            this.cyInstance.nodes(nodeID).animate(
              {
                renderedPosition: { x: xRow1, y: yPos },
              },
              {
                duration: 1000,
              }
            );
            yPos = yPos + yUnit;
          }
        }
        yPos = yPos + 3 * yUnit;
      }
    },
    // @remind makeParents
    makeParents() {
      // "obstructive_sleep_apnea_syndrome_type_2_diabetes_mellitus"
      let nodeData = this.cyInstance.nodes().jsons();
      console.log("nodeData = ", nodeData);
      console.log(nodeData.filter((x) => x.data.parentGroup != null));
      // console.log(parentSet)
      // console.log(grandParentSet)

      // GET NODES WITH A PARENT GROUP
      let nodesWithParent = nodeData.filter((x) => x.data.parentGroup != null);
      let parentNodeCheck = [];

      // FOR EACH NODE - GET THE PARENT ID
      for (let i = 0; i < nodesWithParent.length; i++) {
        const node = nodesWithParent[i];
        let nodeParentID = node.data.parentGroup;

        // SEE IF THE PARENT DATA HAS ALREADY BEEN CAPTURED - IF NOT THEN CAPTURE IT AND BUILD PARENT
        if (parentNodeCheck.indexOf(nodeParentID) == -1) {
          parentNodeCheck.push(nodeParentID);

          // GET ALL THE NODES WITH THE SAME PARENT ID
          let parentGroupNodes = nodeData.filter(
            (x) => x.data.parentGroup == nodeParentID
          );
          let parentGroupNodeCategory = parentGroupNodes[0].data.sriCat;
          // IF THERE IS ONLY ONE NODE THEN DO NOT CREATE ELBOW PARENT NODE
          if (parentGroupNodes.length > 1) {
            console.log("nodeParentID");
            console.log(nodeParentID);

            // CREATE DATA FOR NODES
            let parentNode = {};
            parentNode.group = "nodes";
            parentNode.data = {};
            parentNode.data.id = nodeParentID;
            parentNode.data.name = nodeParentID;
            parentNode.data.category = parentGroupNodeCategory;
            parentNode.classes = [parentGroupNodeCategory, "parentGroup"];
            parentNode.position = {};
            parentNode.data.elbowChildCount = parentGroupNodes.length;
            parentNode.data.elbowChildIDs = parentGroupNodes.map(
              (x) => x.data.id
            );
            console.log("parentNode.data.elbowChildIDs");
            console.log(parentNode.data.elbowChildIDs);
            // GET ELBOW NEIGHBORS TO MAKE EDGES
            let elbowNeighborIDs = this.cyInstance
              .$("#" + node.data.id)
              .neighborhood()
              .nodes()
              .jsons()
              .map((x) => x.data.id);
            console.log("elbowNeighborIDs");
            console.log(elbowNeighborIDs);
            console.log(
              this.cyInstance
                .$("#" + node.data.id)
                .neighborhood()
                .jsons()
            );
            parentNode.data.neighbors = elbowNeighborIDs;

            // OPTION 1: SET PARENT POSITION TO AVERAGE POSITION OF ALL ELBOW NODES IN THE GROUP
            // GET THE renderedPosition FOR EACH
            let xTot = 0;
            let yTot = 0;
            let count = parentGroupNodes.length;

            for (let n = 0; n < parentGroupNodes.length; n++) {
              const parentGroupNode = parentGroupNodes[n];
              let getNodeID = "#" + parentGroupNode.data.id;
              let elbowRenderedPosition = this.cyInstance
                .$(getNodeID)
                .position();
              console.log(elbowRenderedPosition);
              xTot = xTot + elbowRenderedPosition.x;
              yTot = yTot + elbowRenderedPosition.y;
            }
            parentNode.position.x = xTot / count;
            parentNode.position.y = yTot / count;
            // OPTION 2: GET THE POINT BETWEEN THE SHOULDER AND THE HAND TO MAKE THE EDGE STRAIGHT AS IF THE ELBOW DOES NOT EXIST
            // OPTION 2 NOT SHOWN HERE
            this.cyInstance.add(parentNode);
            // this.elements.push(parentNode)

            // CREATE EDGES
            for (let n = 0; n < elbowNeighborIDs.length; n++) {
              const elbowNeighborID = elbowNeighborIDs[n];
              let edgeID1 = nodeParentID + "_" + elbowNeighborID;
              // let edgeID2 = nodeParentID + "_" + parentGroupNodes[1]
              // console.log()

              let edge = {
                group: "edges",
                classes: ["parentEdge"],
                data: {
                  id: edgeID1,
                  source: elbowNeighborID,
                  target: nodeParentID,
                  elbowCount: elbowNeighborIDs.length,
                },
              };
              this.cyInstance.add(edge);
              // this.elements.push(edge)
            }
          }
        }
      }
    },
    async consoleStuff() {
      let nodesToDelete = await this.collapseChildNodes();
      console.log("after collapseChildNodes");
      console.log(nodesToDelete);
      for (let i = 0; i < nodesToDelete.length; i++) {
        const node = nodesToDelete[i];
        let nodeID = "#" + node;
        this.cyInstance.$(nodeID).remove();
      }
      // console.log(this.cyInstance.$("#metabolic_disease_type_2_diabetes_mellitus").json())
      // console.log(this.cyInstance.$("#metabolic_disease").json())
      // this.cyInstance.$("#metabolic_disease").select()
      //"metabolic_disease_type_2_diabetes_mellitus"
    },
    makeChildrenInvisiable() {
      this.cyInstance.nodes().forEach(function (ele) {
        console.log("TESTING - ", ele.id());

        if (ele.isChild() == true) {
          console.log("found one", ele.id());
          console.log(ele.json());
          // console.log("y2n = ", y2n)
          // console.log("x2nDisease = ", x2nDisease)
          // console.log( ele.id() );
          ele.animate(
            {
              // style: { display: 'none' },
              style: { opacity: 0 },
              renderedPosition: { x: 500, y: 500 },
            },
            {
              duration: 1000,
            }
          );
          ele.classes("hidden");
        }
      });
    },

    sizeByDegree() {
      // eles.style( name, value )
      let nodeData = this.cyInstance.nodes().jsons();
      console.log(nodeData);
      console.log(this.cyInstance.$("#type_2_diabetes_mellitus").style());
      for (let i = 0; i < nodeData.length; i++) {
        const node = nodeData[i];
        let nodeGetID = "#" + node.data.id;
        // console.log("node = ", node)
        // console.log("nodeGetID = ", nodeGetID)
        // console.log("name = ", node.data.name)
        // console.log("height = ", this.cyInstance.$(nodeGetID).style().height)
        // console.log("numericStyle height = ", this.cyInstance.$(nodeGetID).numericStyle("height"))
        // console.log("degree = ", this.cyInstance.$(nodeGetID).degree())

        let degree = this.cyInstance.$(nodeGetID).degree();
        let height = this.cyInstance.$(nodeGetID).numericStyle("height");
        let width = this.cyInstance.$(nodeGetID).numericStyle("width");

        let adjustHeight = height + degree * 10;
        let adjustWidth = width + degree * 10;
        console.log("adjustHeight = ", adjustHeight);
        console.log("adjustWidth = ", adjustWidth);

        let animateChanges = {
          style: {
            height: adjustHeight,
            width: adjustWidth,
            visibility: "hidden",
          },
          // style: { 'height': adjustHeight, 'width': adjustWidth, opacity: 0 },
          duration: 1000,
        };
        this.cyInstance.nodes(nodeGetID).animate(animateChanges);
        console.log(
          "change height = ",
          this.cyInstance.$(nodeGetID).style().height
        );
      }
    },

    // @remind getNodeParentGrandparentData
    getNodeParentGrandparentData(focusNode) {
      this.startingNodeData = this.cyInstance.nodes().jsons();
      console.log("this.startingNodeData");
      console.log(this.startingNodeData);
      // let focusNode = "#" + this.theDisease
      // if(this.parentGroup == "target"){
      //   focusNode = "#" + this.theDisease
      // } else {
      //   focusNode = "#" + this.theDrug
      // }

      let diseaseNeighbors = this.cyInstance.$(focusNode).neighborhood();
      console.log("diseaseNeighbors.jsons()");
      console.log(diseaseNeighbors.jsons());
      // diseaseNeighbors.select()
      console.log("nodes");
      console.log(diseaseNeighbors.nodes().jsons());

      let primaryMap = {};
      let parentSet = [];
      let grandParentSet = [];
      // let nodeTypeCheck = []
      let neighborData = diseaseNeighbors.nodes().jsons();
      primaryMap.countAll = neighborData.length;
      primaryMap.firstRow = {};
      // let allNodes = []
      // ####################################################
      // SETUP THE PARENT AND GRAND PARENT DATA ON THE NODES
      // ####################################################
      for (let i = 0; i < neighborData.length; i++) {
        //FOR EACH NODE THAT IS A NEIGHBOR

        // console.log("##############################")
        const data = neighborData[i];
        let nodeInfo = {};
        nodeInfo.id = data.data.id;
        // console.log("this.cyInstance.$(data.data.id)")
        console.log(data.data.id);
        let getID = "#" + data.data.id;
        // console.log(this.cyInstance.$(getID).renderedPosition())
        // console.log(this.cyInstance.$("#type_2_diabetes_mellitus").renderedPosition())
        let location = this.cyInstance.$(getID).renderedPosition();
        nodeInfo.location = { ...location };
        let degree = this.cyInstance.$(getID).degree();
        let neighbors = this.cyInstance.$(getID).neighborhood().nodes().jsons();
        nodeInfo.neighbors = neighbors;
        // console.log("this.cyInstance.$(getID).isNode")
        // console.log(this.cyInstance.$(getID).isNode())
        nodeInfo.degree = degree;
        nodeInfo.elbowGroup = "none";
        nodeInfo.elbowGroupText = "none";

        this.cyInstance.$(getID).data("parentGroup", null);
        this.cyInstance.$(getID).data("grandParentGroup", null);
        this.cyInstance.$(getID).data("elbowDegree", null);

        // ####################################################
        // SELECT THE NODES WITH 2 OR 3 DEGREE
        // ####################################################

        if (degree > 1 && degree < 4) {
          // if(degree == 2){
          let elbowNeighbor = neighbors.filter(
            (x) => x.data.id != this.theDisease
          );
          nodeInfo.elbowGroup = elbowNeighbor.map((x) => x.data.id);
          console.log("nodeInfo.elbowGroup = ", nodeInfo.elbowGroup);
          // nodeInfo.elbowGroup = elbowNeighbor[0].data.id

          // ####################################################
          // CHECK IF THE PARENT ALREADY EXISTS - CREATE IF NOT - ASSIGN THS NODE AS CHILD
          // ####################################################
          nodeInfo.elbowGroupText = JSON.stringify(nodeInfo.elbowGroup);
          // console.log(this.cyInstance$(checkParentID))
          // console.log("this.cyInstance.$(getID).degree()")
          // console.log(this.cyInstance.$(getID).degree())

          let checkParentID = "";
          // let checkGrandParentID = ""
          for (let x = 0; x < nodeInfo.elbowGroup.length; x++) {
            const element = nodeInfo.elbowGroup[x];
            checkParentID = element + "_" + checkParentID;
            // if(x == nodeInfo.elbowGroup.length -1){
            // }
          }

          let checkGrandParentID = checkParentID + "elbow";
          checkParentID = checkParentID + "_" + data.data.sriCat;
          this.cyInstance.$(getID).data("parentGroup", checkParentID);
          this.cyInstance.$(getID).data("grandParentGroup", checkGrandParentID);
          this.cyInstance.$(getID).data("elbowDegree", degree);

          if (parentSet.indexOf(checkParentID) == -1) {
            parentSet.push(checkParentID);
          }
          if (grandParentSet.indexOf(checkGrandParentID) == -1) {
            grandParentSet.push(checkGrandParentID);
          }
        }
      }
      let nodeData = this.cyInstance.nodes().jsons();
      console.log("nodeData = ", nodeData);
      console.log(nodeData.filter((x) => x.data.parentGroup != null));
      console.log(parentSet);
      console.log(grandParentSet);

      // ####################################################
      // CREATE THE PARENT NODES AND GIVE THEM THE AVERAGE POSITION OF THE CHILD NODES
      // ####################################################
    },

    allPaths() {
      this.nodePaths = {};
      let startingNode = this.theDrug;
      let startingNodeID = "#" + startingNode;
      let startingNodeEdges = this.cyInstance
        .$(startingNodeID)
        .neighborhood()
        .edges()
        .jsons();
      let startingNodeEdgeIDs = startingNodeEdges.map((x) => x.data.id);

      let allPaths = {};

      allPaths.hopOneNodes = [];
      allPaths.hopTwoNodes = [];
      allPaths.hopThreeNodes = [];
      allPaths.hopFourNodes = [];

      // GET HOP ONE NODES
      for (let i = 0; i < startingNodeEdgeIDs.length; i++) {
        const edge = startingNodeEdgeIDs[i];
        const edgeID = "#" + startingNodeEdgeIDs[i];
        let target = this.cyInstance.$(edgeID).target().jsons()[0].data.id;
        allPaths.hopOneNodes.push([this.theDrug, edge, target]);
      }

      // GET HOP TWO NODES
      for (let i = 0; i < allPaths.hopOneNodes.length; i++) {
        const nodeArray = allPaths.hopOneNodes[i];
        let lastNode = nodeArray[nodeArray.length - 1];
        // let currentNode = nodeArray[1]
        let edges = this.cyInstance
          .$("#" + lastNode)
          .neighborhood()
          .edges()
          .jsons();
        let edgeIDs = edges.map((x) => x.data.id);
        for (let n = 0; n < edgeIDs.length; n++) {
          const edge = edgeIDs[n];
          const edgeID = "#" + edge;
          let target = this.cyInstance.$(edgeID).target().jsons()[0].data.id;
          let path = [...nodeArray, ...[edge, target]];
          if (target != lastNode) {
            allPaths.hopTwoNodes.push(path);
            allPaths.hopTwoNodes.push(path);
          }
        }
      }

      for (let i = 0; i < allPaths.hopTwoNodes.length; i++) {
        const nodeArray = allPaths.hopTwoNodes[i];
        let lastNode = nodeArray[nodeArray.length - 1];
        // let currentNode = nodeArray[1]
        let edges = this.cyInstance
          .$("#" + lastNode)
          .neighborhood()
          .edges()
          .jsons();
        let edgeIDs = edges.map((x) => x.data.id);
        for (let n = 0; n < edgeIDs.length; n++) {
          const edge = edgeIDs[n];
          const edgeID = "#" + edge;
          let target = this.cyInstance.$(edgeID).target().jsons()[0].data.id;
          let path = [...nodeArray, ...[edge, target]];
          if (target != lastNode) {
            allPaths.hopThreeNodes.push(path);
          }
        }
      }
      console.log("allPaths");
      console.log(allPaths);

      // BUILD THE OBJECT CONTAINTING THE PATHS FOR EACH NODE nodePaths
      let allElements = this.cyInstance.elements().jsons();
      let allElementsIDs = allElements.map((x) => x.data.id);
      console.log("allElements");
      console.log(allElements);
      for (let i = 0; i < allElementsIDs.length; i++) {
        const element = allElementsIDs[i];
        this.nodePaths[element] = [];
        // CHECK EACH ARRAY TO SEE IF THE NODE OR EDGE IS IN THE ARRAY
        for (let n = 0; n < allPaths.hopThreeNodes.length; n++) {
          const pathArray = allPaths.hopThreeNodes[n];
          // IF IT IS THEN ADD THE NODES AND EDGES THAT ARE NOT ALREADY IN IT TO THE NODEPATHS OBJECT
          if (pathArray.indexOf(element) != -1) {
            let filterPath = pathArray.filter(
              (x) => this.nodePaths[element].indexOf(x) == -1
            );
            this.nodePaths[element] = [
              ...this.nodePaths[element],
              ...filterPath,
            ];
          }
        }
      }
      console.log("this.nodePaths");
      console.log(this.nodePaths);
    },

    // #############################################
    // CREATE GROUPS FOR THE ELBOWS FROM ROW 1 - TRY TO REPLACE NODES WITH NON-PARENT NODES TO ALLOW FORMATING
    // #############################################
    async makeElbowNodesRemoveChildren() {
      let diseaseNeighbors = this.cyInstance
        .$("#type_2_diabetes_mellitus")
        .neighborhood();
      console.log("diseaseNeighbors.jsons()");
      console.log(diseaseNeighbors.jsons());
      // diseaseNeighbors.select()
      console.log("nodes");
      console.log(diseaseNeighbors.nodes().jsons());

      let primaryMap = {};

      let nodeTypeCheck = [];
      let neighborData = diseaseNeighbors.nodes().jsons();
      primaryMap.countAll = neighborData.length;
      primaryMap.firstRow = {};
      let allNodes = [];

      for (let i = 0; i < neighborData.length; i++) {
        // console.log("##############################")
        const data = neighborData[i];
        let nodeInfo = {};
        nodeInfo.id = data.data.id;
        // console.log("this.cyInstance.$(data.data.id)")
        // console.log(data.data.id)
        let getID = "#" + data.data.id;
        // console.log(this.cyInstance.$(getID).renderedPosition())
        // console.log(this.cyInstance.$("#type_2_diabetes_mellitus").renderedPosition())
        let location = this.cyInstance.$(getID).renderedPosition();
        nodeInfo.location = { ...location };
        let degree = this.cyInstance.$(getID).degree();
        let neighbors = this.cyInstance.$(getID).neighborhood().nodes().jsons();
        nodeInfo.neighbors = neighbors;
        // console.log("this.cyInstance.$(getID).isNode")
        // console.log(this.cyInstance.$(getID).isNode())
        nodeInfo.degree = degree;
        nodeInfo.elbowGroup = "none";
        nodeInfo.elbowGroupText = "none";

        // ####################################################
        // SELECT THE NODES WITH 2 OR 3 DEGREE
        // ####################################################

        if (degree > 1 && degree < 5) {
          let elbowNeighbor = neighbors.filter(
            (x) => x.data.id != this.theDisease
          );
          nodeInfo.elbowGroup = elbowNeighbor.map((x) => x.data.id);
          // nodeInfo.elbowGroup = elbowNeighbor[0].data.id

          // ####################################################
          // CHECK IF THE PARENT ALREADY EXISTS - CREATE IF NOT - ASSIGN THS NODE AS CHILD
          // ####################################################
          nodeInfo.elbowGroupText = JSON.stringify(nodeInfo.elbowGroup);
          // console.log(this.cyInstance$(checkParentID))
          // console.log("this.cyInstance.$(getID).degree()")
          // console.log(this.cyInstance.$(getID).degree())

          let checkParentID = "";
          let checkGrandParentID = "";
          for (let x = 0; x < nodeInfo.elbowGroup.length; x++) {
            const element = nodeInfo.elbowGroup[x];
            checkParentID = element + "_" + checkParentID;
            if (x == nodeInfo.elbowGroup.length - 1) {
              checkGrandParentID = checkParentID + "elbow";
              checkParentID = checkParentID + "_" + data.data.sriCat;
              // console.log("GETTING IDS FOR PARENT AND GRAND")
              // console.log("checkGrandParentID = ", checkGrandParentID)
              // console.log("checkParentID = ", checkParentID)
              // console.log("data = ", data)
            }
          }
          // console.log(checkGrandParentID)
          // let useParentNodeID =
          // console.log(this.cyInstance.$("#" + checkParentID).isNode())
          // console.log('this.cyInstance.$("#" + checkGrandParentID).isNode()')
          // console.log(this.cyInstance.$("#" + checkGrandParentID).isNode())

          // ##############################################################
          // MAKE THE GRANDPARENT NODE AND CONNECT IT TO THE ELBOW CONNECTORS WITH EDGES
          // ##############################################################
          if (this.cyInstance.$("#" + checkGrandParentID).isNode() == false) {
            let pos = this.cyInstance.$(getID).renderedPosition();
            console.log("pos = ", pos);
            let newGrandParent = {
              group: "nodes",
              data: {
                id: checkGrandParentID,
              },
              classes: ["grandParentGroup"],
            };
            this.cyInstance.add(newGrandParent);
            this.cyInstance.$("#" + checkGrandParentID).renderedPosition(pos);
            // USE THE ARRAY OF ELBOWS TO MAKE EDGES
            for (let n = 0; n < nodeInfo.elbowGroup.length; n++) {
              const edgeTarget = nodeInfo.elbowGroup[n];
              let edgeID = checkGrandParentID + "_" + edgeTarget;
              console.log("grand edge ID = ", edgeID);
              this.cyInstance.add({
                group: "edges",
                classes: "grandParentEdge",
                data: {
                  id: edgeID,
                  source: checkGrandParentID,
                  target: edgeTarget,
                },
              });
              console.log('this.cyInstance.$("#" + edgeID).isNode()');
              console.log(this.cyInstance.$("#" + edgeID).isEdge());
              console.log(this.cyInstance.$("#" + edgeID).json());
            }
            // USE THE ARRAY OF ELBOWS TO MAKE EDGES
            let edgeID = checkGrandParentID + "_" + this.theDisease;
            this.cyInstance.add({
              group: "edges",
              classes: "grandParentEdge",
              data: {
                id: edgeID,
                source: checkGrandParentID,
                target: this.theDisease,
              },
            });
            // GET LOCATION OF NODES AND AVERAGE THEM TO GET PARENT LOCATION
          }
          //REMOVE THE NODE THAT IS IN THE ELBOW GROUP
          let node = this.cyInstance.$(getID);
          this.cyInstance.remove(node);
          // if(this.cyInstance.$("#" + checkParentID).isNode() == false){
          //   let newParent = {
          //     group: 'nodes',
          //     data: {
          //       id: checkParentID,
          //       grandPar: checkGrandParentID
          //     },
          //     parent: checkGrandParentID,
          //     classes: ["parentGroup"]
          //   }

          //   this.cyInstance.add(newParent).move({parent: checkGrandParentID})
          //   // hidden
          //   this.cyInstance.$("#" + checkParentID)
          //   this.cyInstance.nodes(getID).data('par', checkParentID)
          //   // this.cyInstance.nodes(getID).data('parGrand', checkGrandParentID)
          //   this.cyInstance.nodes(getID).move({parent: checkParentID})
          // }
          // else {
          //   this.cyInstance.nodes(getID).move({parent: checkParentID})
          // }

          // this.cyInstance.$(getID).animate({
          //       style: {display: 'none'}
          //     }, {
          //       duration: 1000
          //     })
          // MAKE THEM INVISABLE
          // this.cyInstance.$(getID).classes('hidden')

          // try{
          //   console.log("ADDING PARENT")
          //   console.log(nodeInfo.elbowGroupText)
          //   let newParent = {
          //     group: 'nodes',
          //     data: { id: nodeInfo.elbowGroupText},
          //     classes: ["parentGroup"]
          //   }
          //   this.cyInstance.add(newParent)
          // } catch(err){

          //   console.log("already NODE")
          //   console.error(err)
          // }
        }

        // if(degree == 3){
        //   let elbowNeighbor = neighbors.filter(x => x.data.id != this.theDisease)
        //   // nodeInfo.elbowGroup = elbowNeighbor[0].data.id
        //   nodeInfo.elbowGroup = elbowNeighbor.map(x => x.data.id)
        // }
        // allNodes.push(...nodeInfo)
        let transferNodeInfo = { ...nodeInfo };
        // allNodes = [...allNodes, {...transferNodeInfo}]
        allNodes.push({ ...transferNodeInfo });
        // console.log(data.data.id)
        // console.log("nodeInfo")
        // console.log(nodeInfo)

        if (nodeTypeCheck.indexOf(data.classes) == -1) {
          // primaryMap.firstRow[data.classes].ids = []
          // primaryMap.firstRow[data.classes].ids.push(data.data.id)
          primaryMap.firstRow[data.classes] = {};
          primaryMap.firstRow[data.classes].count = 1;
          primaryMap.firstRow[data.classes].nodes = [];
          primaryMap.firstRow[data.classes].nodes.push(nodeInfo);
          nodeTypeCheck.push(data.classes);
        } else {
          primaryMap.firstRow[data.classes].count++;
          primaryMap.firstRow[data.classes].nodes.push(nodeInfo);
        }
      }
      // console.log("allNodes")
      // console.log(allNodes)
      // let elbows = allNodes.filter(x => x.degree = 2)
      // console.log("elbows = ", elbows)
      // console.log("primaryMap")
      // console.log(primaryMap)
      return primaryMap;
    },

    // #############################################
    // CREATE GROUPS FOR THE ELBOWS FROM ROW 1
    // #############################################
    getDiseaseNeighborInfo() {
      let diseaseNeighbors = this.cyInstance
        .$("#type_2_diabetes_mellitus")
        .neighborhood();
      console.log("diseaseNeighbors.jsons()");
      console.log(diseaseNeighbors.jsons());
      // diseaseNeighbors.select()
      console.log("nodes");
      console.log(diseaseNeighbors.nodes().jsons());

      let primaryMap = {};

      let nodeTypeCheck = [];
      let neighborData = diseaseNeighbors.nodes().jsons();
      primaryMap.countAll = neighborData.length;
      primaryMap.firstRow = {};
      let allNodes = [];

      for (let i = 0; i < neighborData.length; i++) {
        // console.log("##############################")
        const data = neighborData[i];
        let nodeInfo = {};
        nodeInfo.id = data.data.id;
        // console.log("this.cyInstance.$(data.data.id)")
        // console.log(data.data.id)
        let getID = "#" + data.data.id;
        // console.log(this.cyInstance.$(getID).renderedPosition())
        // console.log(this.cyInstance.$("#type_2_diabetes_mellitus").renderedPosition())
        let location = this.cyInstance.$(getID).renderedPosition();
        nodeInfo.location = { ...location };
        let degree = this.cyInstance.$(getID).degree();
        let neighbors = this.cyInstance.$(getID).neighborhood().nodes().jsons();
        nodeInfo.neighbors = neighbors;
        // console.log("this.cyInstance.$(getID).isNode")
        // console.log(this.cyInstance.$(getID).isNode())
        nodeInfo.degree = degree;
        nodeInfo.elbowGroup = "none";
        nodeInfo.elbowGroupText = "none";

        // ####################################################
        // SELECT THE NODES WITH 2 OR 3 DEGREE
        // ####################################################

        if (degree == 2 || degree == 3) {
          let elbowNeighbor = neighbors.filter(
            (x) => x.data.id != this.theDisease && x.data.id != this.theDrug
          );
          nodeInfo.elbowGroup = elbowNeighbor.map((x) => x.data.id);
          // nodeInfo.elbowGroup = elbowNeighbor[0].data.id

          // ####################################################
          // CHECK IF THE PARENT ALREADY EXISTS - CREATE IF NOT - ASSIGN THS NODE AS CHILD
          // ####################################################
          nodeInfo.elbowGroupText = JSON.stringify(nodeInfo.elbowGroup);
          // console.log(this.cyInstance$(checkParentID))
          // console.log("this.cyInstance.$(getID).degree()")
          // console.log(this.cyInstance.$(getID).degree())

          let checkParentID = "";
          let checkGrandParentID = "";
          for (let x = 0; x < nodeInfo.elbowGroup.length; x++) {
            const element = nodeInfo.elbowGroup[x];
            checkParentID = element + "_" + checkParentID;
            if (x == nodeInfo.elbowGroup.length - 1) {
              checkGrandParentID = checkParentID + "elbow";
              checkParentID = checkParentID + "_" + data.data.sriCat;
              console.log("GETTING IDS FOR PARENT AND GRAND");
              console.log("checkGrandParentID = ", checkGrandParentID);
              console.log("checkParentID = ", checkParentID);
              console.log("data = ", data);
            }
          }

          // ##############################################################
          // MAKE THE GRANDPARENT NODE AND CONNECT IT TO THE ELBOW CONNECTORS WITH EDGES
          // ##############################################################
          if (this.cyInstance.$("#" + checkGrandParentID).isNode() == false) {
            let newGrandParent = {
              group: "nodes",
              data: {
                id: checkGrandParentID,
              },
              classes: ["grandParentGroup"],
            };
            this.cyInstance.add(newGrandParent);
            // USE THE ARRAY OF ELBOWS TO MAKE EDGES
            for (let n = 0; n < nodeInfo.elbowGroup.length; n++) {
              const edgeTarget = nodeInfo.elbowGroup[n];
              let edgeID = checkGrandParentID + "_" + edgeTarget;
              console.log("grand edge ID = ", edgeID);
              this.cyInstance.add({
                group: "edges",
                classes: "grandParentEdge",
                data: {
                  id: edgeID,
                  source: checkGrandParentID,
                  target: edgeTarget,
                },
              });
              console.log('this.cyInstance.$("#" + edgeID).isNode()');
              console.log(this.cyInstance.$("#" + edgeID).isEdge());
              console.log(this.cyInstance.$("#" + edgeID).json());
            }
            // USE THE ARRAY OF ELBOWS TO MAKE EDGES
            let edgeID = checkGrandParentID + "_" + this.theDisease;
            this.cyInstance.add({
              group: "edges",
              classes: "grandParentEdge",
              data: {
                id: edgeID,
                source: checkGrandParentID,
                target: this.theDisease,
              },
            });
          }

          if (this.cyInstance.$("#" + checkParentID).isNode() == false) {
            let newParent = {
              group: "nodes",
              data: {
                id: checkParentID,
                grandPar: checkGrandParentID,
              },
              parent: checkGrandParentID,
              classes: ["parentGroup"],
            };

            this.cyInstance.add(newParent).move({ parent: checkGrandParentID });
            // hidden
            this.cyInstance.$("#" + checkParentID);
            this.cyInstance.nodes(getID).data("par", checkParentID);
            // this.cyInstance.nodes(getID).data('parGrand', checkGrandParentID)
            this.cyInstance.nodes(getID).move({ parent: checkParentID });
          } else {
            this.cyInstance.nodes(getID).move({ parent: checkParentID });
          }
        }

        let transferNodeInfo = { ...nodeInfo };
        // allNodes = [...allNodes, {...transferNodeInfo}]
        allNodes.push({ ...transferNodeInfo });
        // console.log(data.data.id)
        // console.log("nodeInfo")
        // console.log(nodeInfo)

        if (nodeTypeCheck.indexOf(data.classes) == -1) {
          // primaryMap.firstRow[data.classes].ids = []
          // primaryMap.firstRow[data.classes].ids.push(data.data.id)
          primaryMap.firstRow[data.classes] = {};
          primaryMap.firstRow[data.classes].count = 1;
          primaryMap.firstRow[data.classes].nodes = [];
          primaryMap.firstRow[data.classes].nodes.push(nodeInfo);
          nodeTypeCheck.push(data.classes);
        } else {
          primaryMap.firstRow[data.classes].count++;
          primaryMap.firstRow[data.classes].nodes.push(nodeInfo);
        }
      }
      // console.log("allNodes")
      // console.log(allNodes)
      // let elbows = allNodes.filter(x => x.degree = 2)
      // console.log("elbows = ", elbows)
      // console.log("primaryMap")
      // console.log(primaryMap)
      return primaryMap;
    },

    movePrimaryNodestoSide() {
      // ####################################################################
      // MOVE THE DISEASE AND DRUG TO THE OPPOSITE SIDES
      // ####################################################################
      let renderedBoundingBox = this.cyInstance
        .elements()
        .renderedBoundingBox();
      let boundingBox = this.cyInstance.elements().boundingBox();
      // let zoomGet = this.cyInstance.zoom();
      // let panGet = this.cyInstance.pan();
      console.log("boundingBox  = ", boundingBox);
      console.log("renderedBoundingBox  = ", renderedBoundingBox);
      // console.log("boundingBox Options = ", boundingBoxOptions)
      // console.log("zoomGet = ", zoomGet);
      // console.log("panGet = ", panGet);

      let x2nDisease = renderedBoundingBox.x2 + renderedBoundingBox.w / 4;
      let x2nDrug = renderedBoundingBox.x1 - renderedBoundingBox.w / 4;
      let y2n = (renderedBoundingBox.y1 + renderedBoundingBox.y2) / 2;

      this.cyInstance.nodes().forEach(function (ele) {
        if (ele.id() == "type_2_diabetes_mellitus") {
          console.log("y2n = ", y2n);
          console.log("x2nDisease = ", x2nDisease);
          console.log(ele.id());
          ele.animate(
            {
              renderedPosition: { x: x2nDisease, y: y2n },
            },
            {
              duration: 1000,
            }
          );
        }
        if (ele.id() == "TROGLITAZONE") {
          console.log("y2n = ", y2n);
          console.log("x2nDrug = ", x2nDrug);
          console.log(ele.id());
          ele.animate(
            {
              renderedPosition: { x: x2nDrug, y: y2n },
            },
            {
              duration: 1000,
            }
          );
        }
      });
      this.cyInstance.center();
    },

    // @remind updateGraph
    async updateGraph() {
      console.log("updateGraph");
      await this.$nextTick();

      console.log("after makeLayout");

      console.log("this.cyInstance.elements(':selected')");
      console.log(this.cyInstance.elements(":selected"));
      // this.cyInstance.$(this.nodeToSelect).select()
      console.log("selected = ");
      console.log(this.nodeToSelect);
    },

    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    //
    moveToModal(def, data, id) {
      console.log("############################")
      console.log("CLICKED")
      console.log("############################")
 
      let nodeID = id.id;

      console.log("this.nodePaths[nodeID]")
      console.log(this.nodePaths[nodeID])


      // TRANSFER NODES TO MODAL
      for (let i = 0; i < this.nodePaths[nodeID].length; i++) {
        const element = this.nodePaths[nodeID][i];
        console.log("element");
        console.log(element);
        let pathSelectNode = this.cyInstance.$("#" + element).json();
        if(pathSelectNode.group == "nodes"){
          // this.modalCyInstance.add(pathSelectNode)
          this.modalElements.push(pathSelectNode)
   
        }

      }

      for (let i = 0; i < this.nodePaths[nodeID].length; i++) {
        const element = this.nodePaths[nodeID][i];
        console.log("element");
        console.log(element);
        let pathSelectNode = this.cyInstance.$("#" + element).json();
        if(pathSelectNode.group == "edges"){
          // this.modalCyInstance.add(pathSelectNode)
          this.modalElements.push(pathSelectNode)
    
        }

      }


      this.nodeToSelect = id.id;
      this.modalCyInstance
        .makeLayout({ name: "klay", animate: true, fit: true })
        .run();
      this.modalCyInstance.center();
    },

    hoverGraph(def, data, id) {
      console.log("hovered");
      // console.log("############################")
      // console.log("############################")
      // console.log("node clicked def.cy.container()", def.cy.container());
      // console.log("node clicked def", def);
      // console.log("node clicked data", data);
      // console.log("node clicked id", id);
      // console.log(id);
      // let nodeSelectName = "#" + id.id
      // console.log("position = ", this.cyInstance.$(nodeSelectName).position());
      // console.log("renderedPosition = ", this.cyInstance.$(nodeSelectName).renderedPosition());
      // console.log("zoom = ", this.cyInstance.$(nodeSelectName).zoom());
      // console.log(
      //   "renderedPosition = ",
      //   this.cyInstance.$(nodeSelectName).renderedPosition()
      // );
      // console.log("id.id");
      // console.log(id.id);
      let nodeID = id.id;
      // console.log("this.nodePaths[id]");
      // console.log(nodeID);
      // console.log(this.nodePaths);
      // console.log(this.nodePaths[nodeID]);
      // console.log(this.cyInstance.$("#" + nodeID).json());
      // console.log(this.cyInstance.$("#" + nodeID).data());

      // this.cyInstance.$(nodeSelectName)
      this.cyInstance.elements().removeClass("pathNode");
      for (let i = 0; i < this.nodePaths[nodeID].length; i++) {
        const nodeSelectName = this.nodePaths[nodeID][i];
        // console.log("nodeSelectName");
        // console.log(nodeSelectName);
        // let pathSelectNode = this.cyInstance.$("#" + nodeSelectName).json();
        // console.log("pathSelectNode");
        // console.log(pathSelectNode);
        this.cyInstance.$("#" + nodeSelectName).addClass("pathNode");
      }

      // this.cyInstance.$(id.id).select()
      this.nodeToSelect = id.id;
      // console.log("elements = " ,this.elements)
      // console.log("config = ", this.config)
      // console.log("definition = ", definition)
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    selectResult() {
      console.log("this.keyCounter");
      console.log(this.keyCounter);
      // console.log("config2")
      // console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(
        (x) => x.drugKey == "CHEMBL.COMPOUND:CHEMBL408"
      );
      console.log("filterCytoData");
      console.log(filterCytoData);
      // let newElements = []
      let nodes = this.genNodes(filterCytoData);
      let edges = this.genEdges(filterCytoData);
      this.elements = [...nodes, ...edges];
      console.log("elements");
      console.log(this.elements);

      // this.cyInstance.makeLayout({ name: "klay" }).run();

      // console.log("about to update graph")

      // console.log("graph updated")

      this.updateGraph();
      this.keyCounter++;

    },
  },
  computed: {
    cyInstance() {
      return this.$refs.cyto.instance;
    },
    modalCyInstance() {
      return this.$refs.modalCyto.instance;
    },
  },
};
</script>
