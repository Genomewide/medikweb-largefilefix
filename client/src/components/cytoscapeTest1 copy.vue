<template>
  <div class="container" style="margin-bottom: 100px">
    <b-row>
      <h1 class="text-center">CYTOSCAPE TESTING</h1>
    </b-row>
    <b-row>
      <b-col cols="4">
        <div class="border border-secondary rounded" style="height: 100%">
          test
        </div>
        
      </b-col>
      <b-col cols="8">
      <div class="border border-primary rounded" >
        <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
        <!-- <cytoscape :key="keyCounter" ref="cyto" :config="config" :preConfig="preConfig" :afterCreated="updateGraph"> -->
        <cytoscape
          :key="keyCounter"
          ref="cyto"
          :config="config"
          :preConfig="preConfig"
        >
          <!-- <cytoscape :key="keyCounter" ref="cyto" :config="config"  > -->
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
      </b-col>
    </b-row>
    <div>
      <!-- <b-button class="mt-3" variant="primary" block @click="selectResult">CHEMBL.COMPOUND:CHEMBL408 </b-button> -->
      <b-button class="mt-3" variant="primary" block @click="selectResult2"
        >CHEMBL.COMPOUND:CHEMBL408 - 2</b-button
      >
      <!-- <br> -->
      <b-button class="mt-3" variant="primary" block @click="consoleStuff"
        >console stuff
      </b-button>
      <!-- <br>  -->
      <b-button class="mt-3" variant="primary" block @click="groupSecondDiseases"
        >groupSecondDiseases
      </b-button>
      <!-- <br>  -->
      <b-button class="mt-3" variant="primary" block @click="klayLayout"
        >klayLayout
      </b-button>
      <br />
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
// import config2 from "./cytoscapeData/CytoConfig2";
import cytoData from "../assets/diabetesTreatsCleaned.json";
import cytoscape from "cytoscape";

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
      theDisease: ""
    };
  },
  methods: {


    // @remind selectResult2
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
        (x) => x.drugKey == "CHEMBL.COMPOUND:CHEMBL408"
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
      // USE THIS TO ADD 
      // ###############################################################
      // ###############################################################
      // this.elements = [...nodes, ...edges];
      // console.log("this.elements");
      // console.log(this.elements);
      // this.updateGraph()
      // console.log("nodes  = ", this.cyInstance.nodes())
      //
      // console.log("nodes after addElements = ", this.cyInstance.nodes())
      // this.updateGraph()
      // console.log("nodes after addElements = ", this.cyInstance.nodes())

      console.log("TROGLITAZONE node");
      console.log(this.cyInstance.$("#TROGLITAZONE").data());
      console.log(this.cyInstance.$("#TROGLITAZONE").style());
      console.log(this.cyInstance.$("#TROGLITAZONE").classes());

      console.log("diabetes node");
      console.log(this.cyInstance.$("#type_2_diabetes_mellitus").data());
      console.log(this.cyInstance.$("#type_2_diabetes_mellitus").style());
      console.log(this.cyInstance.$("#type_2_diabetes_mellitus").classes());

      console.log("after adding elements");
      console.log(this.elements);
      this.updateGraph();
      // console.log(this.cyInstance.$('#a'))
      this.cyInstance.makeLayout({ name: "klay" }).run();
      // console.log("type_2_diabetes_mellitus data = ", this.cyInstance.$('#type_2_diabetes_mellitus').data())
      // console.log("type_2_diabetes_mellitus classes = ", this.cyInstance.$('#type_2_diabetes_mellitus').classes())
      // this.updateGraph()

      
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

          el.data.id = fixSubjectName;
          el.data.sriCat = res.subjectSRICat.split(":")[1];
          el.data.name = fixSubjectName;

          el.position = { x: x, y: y };
          el.group = "nodes";

          console.log("res.subjectCats");
          console.log(res.subjectCats); // "biolink:Pathway"

          if (res.diseaseKey == res.subject) {
            
            el.classes = ["thedisease"];
            el.position = { x: 900, y: 300 };
            // console.log("FOUND DISEASE")
            // console.log(res)
            // el.locked = true
          } else {
            el.classes = [res.subjectSRICat.split(":")[1]]
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

          el.data.id = fixObjectName;
          el.data.sriCat = res.objectSRICat;
          el.data.name = fixObjectName;

          el.position = { x: x, y: y };
          el.group = "nodes";

          if (res.drugKey == res.object) {
            el.classes = ["thedrug"];
            el.position = { x: 200, y: 300 };
            // console.log("FOUND DRUG")
            // console.log(res)
            // el.locked = true
          } else {
            el.classes = [res.objectSRICat.split(":")[1]]
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

        if (edgesCheck.indexOf(edgeCheck) == -1) {
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
    removeDrugDiseaseEdge(){
      let nodeData = this.cyInstance.nodes().jsons()

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    klayLayout() {
      console.log("klayLayout");
      this.cyInstance.makeLayout({ name: "klay" }).run();
    },
    center() {
      console.log("center");
      this.cyInstance.center();
    },
    // @remind preConfig
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

    // @remind consoleStuff
    consoleStuff() {
      console.log("#############################");
      console.log("SELECTED");
      console.log(this.cyInstance.$(":selected").jsons());

      // this.cyInstance.cy()
      console.log("this.cyInstance.data() = ", this.cyInstance.data());

      this.movePrimaryNodestoSide()

      this.groupSecondDiseases()

      // // this.cyInstance.remove(this.cyInstance.$('#type_2_diabetes_mellitus'))
      // let pos = this.cyInstance.$("#type_2_diabetes_mellitus").position();
      // // let posX = this.cyInstance.$('#type_2_diabetes_mellitus').position('x')
      // // let posY = this.cyInstance.$('#type_2_diabetes_mellitus').position('y')

      // console.log("pos of diabet = ", pos);
      // // console.log("posX of diabet = ", posX)
      // // console.log("posY of diabet = ", posY)

      // // let bBoxOptions = {includeNodes: true}
      // // let boundingBoxOptions = this.cyInstance.elements().renderedBoundingBox(bBoxOptions)
      // let renderedBoundingBox = this.cyInstance
      //   .elements()
      //   .renderedBoundingBox();
      // let boundingBox = this.cyInstance.elements().boundingBox();
      // // let zoomGet = this.cyInstance.zoom();
      // // let panGet = this.cyInstance.pan();
      // console.log("boundingBox  = ", boundingBox);
      // console.log("renderedBoundingBox  = ", renderedBoundingBox);
      // // console.log("boundingBox Options = ", boundingBoxOptions)
      // // console.log("zoomGet = ", zoomGet);
      // // console.log("panGet = ", panGet);

      // let x2nDisease = renderedBoundingBox.x2 + renderedBoundingBox.w / 4;
      // let x2nDrug = renderedBoundingBox.x1 - renderedBoundingBox.w / 4;
      // let y2n = (renderedBoundingBox.y1 + renderedBoundingBox.y2) / 2;
      // console.log("x2n = ", x2n)
      // console.log("y2n = ", y2n)

      // this.cyInstance.$("#type_2_diabetes_mellitus").renderedPosition("y", y2n);
      // this.cyInstance
      //   .$("#type_2_diabetes_mellitus")
      //   .renderedPosition("x", x2nDisease);
      // this.cyInstance.$("#TROGLITAZONE").renderedPosition("x", x2nDrug);
      // this.cyInstance.$("#TROGLITAZONE").renderedPosition("y", y2n);

      // console.log("this.cyInstance.nodes('name = TROGLITAZONE')")
      // console.log(this.cyInstance.nodes('[name = TROGLITAZONE]'))


    },

    groupSecondDiseases(){
      let diseaseNeighbors = this.cyInstance.$("#type_2_diabetes_mellitus").neighborhood()
      console.log("diseaseNeighbors.jsons()")
      console.log(diseaseNeighbors.jsons())
      diseaseNeighbors.select()
      console.log("nodes")
      console.log(diseaseNeighbors.nodes().jsons())

      let primaryMap = {}
      
      let nodeTypeCheck = []
      let neighborData = diseaseNeighbors.nodes().jsons()
      primaryMap.countAll = neighborData.length

      for (let i = 0; i < neighborData.length; i++) {
        const data = neighborData[i];
        
        if(nodeTypeCheck.indexOf(data.data.sriCat) == -1){
          
          // primaryMap
        }
        
      }
      


    },
    movePrimaryNodestoSide(){
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

      this.cyInstance.nodes().forEach(function( ele ){
        if( ele.id() == "type_2_diabetes_mellitus"){
          console.log("y2n = ", y2n)
          console.log("x2nDisease = ", x2nDisease)
          console.log( ele.id() );
              ele.animate({
                  renderedPosition: { x: x2nDisease, y: y2n }
                }, {
                  duration: 1000
                })
              // .delay( 1000 )
              // .animate({
              //   style: { 'background-color': 'yellow' }
              // })
        }
        if( ele.id() == "TROGLITAZONE"){
          console.log("y2n = ", y2n)
          console.log("x2nDrug = ", x2nDrug)
          console.log( ele.id() );
              ele.animate({
                  renderedPosition: { x: x2nDrug, y: y2n }
                }, {
                  duration: 1000
                })
        }  
      });
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
    deleteNode(def, data, id) {
      console.log("node clicked def", def);
      console.log("node clicked data", data);
      console.log("node clicked id", id);
      console.log(id);
      console.log("position = ", this.cyInstance.$(id.id).position());
      console.log(
        "renderedPosition = ",
        this.cyInstance.$(id.id).renderedPosition()
      );
      console.log("id.id");
      console.log(id.id);

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

      // // ####################################################################
      // // SET THE LAYOUT OF THE GRAPH
      // // ####################################################################
      // console.log("about to update layou")

      //   this.cyInstance.makeLayout({ name: "klay" }).run();
      //   this.cyInstance.fit()
      //   console.log("layout updated")
      //   this.updateGraph()
      // // ####################################################################

      // // ####################################################################
      // // MOVE DRUG AND DISEASE AFTER THE LAYOUT IS RENDERED
      // // ####################################################################
      //   let renderedBoundingBox = this.cyInstance.elements().renderedBoundingBox()
      //   let boundingBox = this.cyInstance.elements().boundingBox()
      //   let zoomGet = this.cyInstance.zoom()
      //   let panGet = this.cyInstance.pan()
      //   console.log("boundingBox  = ", boundingBox)
      //   console.log("renderedBoundingBox  = ", renderedBoundingBox)
      //   // console.log("boundingBox Options = ", boundingBoxOptions)
      //   console.log("zoomGet = ", zoomGet)
      //   console.log("panGet = ", panGet)

      //   let x2nDisease = renderedBoundingBox.x2 + renderedBoundingBox.w/4
      //   let x2nDrug = renderedBoundingBox.x1 - renderedBoundingBox.w/4
      //   let y2n = (renderedBoundingBox.y1 + renderedBoundingBox.y2)/2
      //   // console.log("x2n = ", x2n)
      //   // console.log("y2n = ", y2n)
      //   this.cyInstance.$('#type_2_diabetes_mellitus').renderedPosition('y', y2n)
      //   this.cyInstance.$('#type_2_diabetes_mellitus').renderedPosition('x', x2nDisease)
      //   this.cyInstance.$('#TROGLITAZONE').renderedPosition('y', y2n)
      //   this.cyInstance.$('#TROGLITAZONE').renderedPosition('x', x2nDrug)

      //   console.log("new position = ", this.cyInstance.$('#type_2_diabetes_mellitus').position())

      //   // ####################################################################
    }
  },
  computed: {
    cyInstance() {
      return this.$refs.cyto.instance;
    },
  },
};
</script>
