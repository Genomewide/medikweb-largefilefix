<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">CYTOSCAPE TESTING</h1>
    <div >
      <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
      <cytoscape :key="keyCounter" ref="cyto" :config="config" :preConfig="preConfig" :afterCreated="updateGraph">
      <!-- <cytoscape :key="keyCounter" ref="cyRef" :config="config" :preConfig="preConfig" > -->
      <!-- <cytoscape :key="keyCounter" ref="cyRef" :config="config"  > -->
        <cy-element
          ref="cy"
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def, def.data, def.data.id)"
        />
        <!-- <cy-element
          ref="cy"
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def.data.id)"
        /> -->
      </cytoscape>
    </div>
    <div>
    <b-button class="mt-3" variant="primary" block @click="selectResult">CHEMBL.COMPOUND:CHEMBL408 </b-button>
    <!-- <b-button class="mt-3" variant="primary" block @click="selectResult2">CHEMBL.COMPOUND:CHEMBL408  - 2</b-button> -->
    <!-- <br> -->
    <b-button class="mt-3" variant="primary" block @click="consoleStuff">console stuff </b-button>
    <!-- <br>  -->
    <!-- <b-button class="mt-3" variant="primary" block @click="updateGraph">updateGraph </b-button> -->
    <!-- <br>  -->
    <b-button class="mt-3" variant="primary" block @click="klayLayout">klayLayout </b-button>
    <br> 
    <!-- <b-button class="mt-3" variant="primary" block @click="center">center </b-button> -->

center
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
import cytoData from "../assets/diabetesTreatsCleaned.json";
import cytoscape from 'cytoscape';

// cytoscape.use(klay)
console.log("config");
console.log(config);
const elements = [...config.elements];
delete config.elements;
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
      currentPage: 1,
      keyCounter: 1,
      cytoData: cytoData,
      filter: null,
      resultFields: [ 
        {
          key: "resNodeCount",
          label: "#Nodes",
          sortable: true
        },
        {
          key: "drugKey",
          label: "Drug",
          sortable: true
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
      gotNodes:[]
    };
  },
  methods: {
     selectResult(){
      console.log("this.keyCounter")
      console.log(this.keyCounter)
      console.log("config2")
      console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(x => x.drugKey == "CHEMBL.COMPOUND:CHEMBL408")
      console.log("filterCytoData")
      console.log(filterCytoData)
      // let newElements = []
      let nodes =  this.genNodes(filterCytoData)
      let edges =  this.genEdges(filterCytoData)
      this.elements = [...nodes, ...edges]
      console.log("elements")
      console.log(this.elements)
      // await this.updateGraph() 
      // this.keyCounter = this.keyCounter + 1
      // this.config.elements = this.elements
      // console.log(this.config)
      // console.log("this.keyCounter")
      // console.log(this.keyCounter)
      this.updateGraph()
      console.log("this.elements")
      console.log(this.elements)
    },
     selectResult2(){
      console.log("this.keyCounter")
      console.log(this.keyCounter)
      console.log("config2")
      console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(x => x.drugKey == "CHEMBL.COMPOUND:CHEMBL408")
      console.log("filterCytoData")
      console.log(filterCytoData)
      // let newElements = []
      let nodes =  this.genNodes(filterCytoData)
      let edges =  this.genEdges(filterCytoData)
      let addElements = [...nodes, ...edges]

      for (let i = 0; i < addElements.length; i++) {
        const addEl = addElements[i];
        this.cyInstance.add(addEl)
      }
      this.cyInstance.remove(this.cyInstance.$('#a'))
      this.cyInstance.remove(this.cyInstance.$('#b'))
      this.cyInstance.remove(this.cyInstance.$('#c'))
      console.log("elements")
      console.log(this.elements)
      
      this.cyInstance.$('#a')
      this.cyInstance.makeLayout({ name: "klay" }).run()
      // this.updateGraph()
      // console.log("this.cyInstance.data()")
      // console.log(this.cyInstance.data())
      // console.log(this.cyInstance)



    },
     genNodes(filterCytoData){
      // return new Promise(async (resolve, reject) => { // eslint-disable-line
        let nodes = []
        let nodeCheck = []
        let x = 100
        let y = 100
        for (let i = 0; i < filterCytoData.length; i++) {
          const res = filterCytoData[i];
          let fixSubjectName = res.subjectName.split(' ').join('_')
          let fixObjectName = res.objectName.split(' ').join('_')

          // if(nodeCheck.indexOf(res.subjectName) == -1){
          if(nodeCheck.indexOf(fixSubjectName) == -1){
            x = x + 50
            if(x % 500 == 0){
              y = y +100
              x = 100
            }
            let el = {}
            el.data = {}
            el.position = {}

            el.data.id = fixSubjectName
            el.position = { x: x, y: y}

            if(res.diseaseKey == res.subject){
              el.classes = "disease"
              el.position = {x: 900, y: 300}
              // el.locked = true
            }

            el.group = "nodes"
            // nodes = [nodes, ...el]
            nodes.push(el)
            nodeCheck.push(fixSubjectName)
          }
          if(nodeCheck.indexOf(fixObjectName) == -1){
            x = x + 50
            if(x % 500 == 0){
              y = y +100
              x = 100
            }
            let el = {}
            el.data = {}

            el.data.id = fixObjectName
            el.position = { x: x, y: y}
            if(res.drugKey == res.object){
              el.classes = "drug"
              el.position = {x: 200, y: 300}
              // el.locked = true
            }
    
                   // nodes = [nodes, ...el]
            el.group = "nodes"
            nodes.push(el)
            nodeCheck.push(fixObjectName)

          }
          if(i == filterCytoData.length -1){
            console.log("nodes")
            console.log(nodes)
            // resolve(nodes)
            return(nodes)
          }

        }
      // })
    },
     genEdges(filterCytoData){
      // return new Promise(async (resolve, reject) => { // eslint-disable-line
        let edges = []
        let edgesCheck = []
        for (let i = 0; i < filterCytoData.length; i++) {
          const res = filterCytoData[i];

          let edgeCheck = res.subjectName + "_" + res.objectName
          edgeCheck = edgeCheck.split(' ').join('_')

            if(edgesCheck.indexOf(edgeCheck) == -1){
              let el = {}
              el.data = {}
              el.data.id = edgeCheck
              el.data.source = res.subjectName.split(' ').join('_')
              el.data.target = res.objectName.split(' ').join('_')
              // el.position
              el.group = "edges"
              // edges = [edges, ...el]
              edges.push(el)
              edgesCheck.push(edgeCheck)
              
            }
            if(i == filterCytoData.length - 1){
              console.log("edges")
              console.log(edges)
              // resolve(edges)
              return(edges)
            }

        }
      // })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    klayLayout (){
      console.log("klayLayout")
      this.cyInstance.makeLayout({ name: "klay" }).run();
    },
    center (){
      console.log("center")
      this.cyInstance.center()
    }, 
    // @remind preConfig
    preConfig(cytoscape) {
      console.log("preConfig")
      // console.log("cytoscape")
      // console.log(cytoscape)
      console.log('this.$refs["cy-element"]')
      console.log(this.$refs["cy-element"])
      console.log("this.$refs.cy")
      console.log(this.$refs.cy)
      console.log("document.getElementById('cytoscape-div')")
      console.log(document.getElementById('cytoscape-div').clientHeight)
      console.log(document.getElementById('cytoscape-div').clientWidth)
      // cy-element
      console.log("this.$refs.cy.instance")
      console.log(this.$refs.cy.instance)
      cytoscape.use(this.klay);
    },

    consoleStuff(){
      // this.cyInstance.remove(this.cyInstance.$('#type_2_diabetes_mellitus'))
      let pos = this.cyInstance.$('#type_2_diabetes_mellitus').position()
      // let posX = this.cyInstance.$('#type_2_diabetes_mellitus').position('x')
      // let posY = this.cyInstance.$('#type_2_diabetes_mellitus').position('y')
       
      console.log("pos of diabet = ", pos)
      // console.log("posX of diabet = ", posX)
      // console.log("posY of diabet = ", posY)

      // let bBoxOptions = {includeNodes: true}
      // let boundingBoxOptions = this.cyInstance.elements().renderedBoundingBox(bBoxOptions)
      let renderedBoundingBox = this.cyInstance.elements().renderedBoundingBox()
      let boundingBox = this.cyInstance.elements().boundingBox()
      let zoomGet = this.cyInstance.zoom()
      console.log("boundingBox  = ", boundingBox)
      console.log("renderedBoundingBox  = ", renderedBoundingBox)
      // console.log("boundingBox Options = ", boundingBoxOptions)
      console.log("zoomGet = ", zoomGet)

      let x2n = boundingBox.w/2 + boundingBox.x2
      let y2n = (boundingBox.y1 + boundingBox.y2)/2
      console.log("x2n = ", x2n)
      console.log("y2n = ", y2n)
      this.cyInstance.$('#type_2_diabetes_mellitus').position('y', x2n)
      this.cyInstance.$('#type_2_diabetes_mellitus').position('x', y2n)
      console.log("new position = ", this.cyInstance.$('#type_2_diabetes_mellitus').position())
      // "type_2_diabetes_mellitus"
      // var a = 
      // this.cyInstance.nodes().layout({
      //   name: 'preset',
      //   animate: true,
      //   fit: false,
      //   transform: (node) => {
      //     let position = {};
      //     console.log("node")
      //     console.log(node)
      //     node.position('x')
      //     if(node.classes[0] == 'drug'){
      //     position.x = node.position('x') + 100;
      //     position.y = node.position('y') + 100;
      //     return position;
      //     }
      //   }
      // }).run();
      // this.cyInstance.remove(this.cyInstance.$('#a'))
      this.updateGraph()
      // console.log("*** consoleStuff")
      // console.log("this.$refs.cy")
      // console.log(this.$refs.cy)
      // console.log("this.$refs.cy.instance")
      // console.log(this.$refs.cy.instance)
      // console.log("this.$refs.cyto.instance")
      // console.log(this.$refs.cyto.instance)
      // console.log("this.$refs.cyto")
      // console.log(this.$refs.cyto)

    },
    // async updateGraph(cy) {
    async updateGraph() {
      console.log("updateGraph")
      await this.$nextTick()
      // console.log(cy)
      // await cy;
      // this.cyInstance.makeLayout({ name: "klay" }).run();

      console.log("after makeLayout")

      // console.log("this.$refs.cy")
      // console.log(this.$refs.cy)
      // console.log("this.cyInstance.nodes")
      // console.log(this.cyInstance.nodes)
      // console.log("this.cyInstance")
      // console.log(this.cyInstance)


    },

    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(def, data, id) {
      console.log("node clicked def", def);
      console.log("node clicked data", data);
      console.log("node clicked id", id);
      // console.log("elements = " ,this.elements)
      // console.log("config = ", this.config)
      // console.log("definition = ", definition)
    },
    updateNode(event) {
      console.log("right click node", event);
    },
  
  },
  computed: {
    cyInstance() {
      return this.$refs.cyto.instance;
    },
  }
};
</script>
