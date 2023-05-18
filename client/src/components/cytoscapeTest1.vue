<template>
  <div class="container" style="margin-bottom: 100px">
    <b-row>
      <h1 class="text-center">CYTOSCAPE TESTING</h1>
    </b-row>
    <b-row>
      <b-col cols="3"> 

        <div class="border border-secondary rounded" style="height: 100%">
          <!-- <b-button class="mt-3" variant="success" block @click="checkOverlap"
            >checkOverlap</b-button
          >  -->
          <b-button class="mt-3" variant="success" block @click="getTRAPI"
            >getTRAPI</b-button
          >    
          <b-button class="mt-3" variant="warning" block @click="removeAll"
            >removeAll</b-button
          >       
          <!-- <b-button class="mt-3" variant="success" block @click="graphMeta"
            >graphMeta</b-button
          > 
          <b-button class="mt-3" variant="success" block @click="getMeta"
            >getMeta</b-button
          > 
          <b-button class="mt-3" variant="success" block @click="testMedik"
            >testMedik</b-button
          >     -->

          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="movePrimaryNodestoSide"
            >movePrimaryNodestoSide
          </b-button>
          <!-- <b-button class="mt-3" variant="primary" block @click="allPaths()"
            >allPaths
          </b-button>
          <b-button class="mt-3" variant="primary" block @click="getComplexResults"
        >getComplexResults 
      </b-button>
          <b-button
            class="mt-3"
            variant="primary"
            block
            @click="collapseChildNodes"
            >collapseChildNodes
          </b-button> -->
          <!-- <br>  -->
          <!-- <b-button class="mt-3" variant="primary" block @click="getElbow"
        >getElbow
      </b-button> -->
          <!-- <br>  -->

          <br />
          <b-button class="mt-3" variant="primary" block @click="selectResult2"
            >selectResult2</b-button
          >
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
              v-on:mousedown="showNodeInfo($event, def, def.data, def.data.id)"
            />
          </cytoscape>
          <!-- <cytoscape
            
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
              v-on:mouseover="hoverGraph($event, def, def.data, def.data.id)"
              v-on:mousedown="moveToModal($event, def, def.data, def.data.id)"
            />
          </cytoscape> -->
          
        </div>
        arasWithHits: {{ arasWithHits }}
         <div>
            <b-form-group label="Radios using options " v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                id="radio-group-1"
                v-model="drugSelected"
                :options="araCompareDrugSet"
                :aria-describedby="ariaDescribedby"
                name="radio-options"
                stacked
              > </b-form-radio-group>
            </b-form-group>
            <div class="mt-3">Selected: <strong>{{ drugSelected }}</strong></div>

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


    <!-- ########################################################################
    TESTING BTE QUERY SELECTIONN FROM META GRAPH
    ######################################################################## -->
    <b-row>
      <b-col cols="4">
        <h3>Select subject</h3>
        <div class="border border-secondary rounded">
           <div>
            <b-form-group
              label="Form-checkbox-group stacked checkboxes"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-model="selected"
                :options="selectSubject"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
            </div>
            <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
        </div>
      </b-col>
      <!-- ######################################################################## -->
      <b-col cols="4">
        <h3>Select predicate</h3>
        <div class="border border-secondary rounded">
           <div>
            <b-form-group
              label="Form-checkbox-group stacked checkboxes"
              v-slot="{ ariaDescribedby }"
            >
              <b-form-checkbox-group
                v-model="selected"
                :options="selectPredicate"
                :aria-describedby="ariaDescribedby"
                name="flavour-2a"
                stacked
              ></b-form-checkbox-group>
            </b-form-group>
            </div>
            <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
       
        </div>
      </b-col>
      <!-- ######################################################################## -->
      <b-col cols="4">
          <h3>Select object</h3>
            <div class="border border-secondary rounded">
              <div>
                <b-form-group
                  label="Form-checkbox-group stacked checkboxes"
                  v-slot="{ ariaDescribedby }"
                >
                  <b-form-checkbox-group
                    v-model="selected"
                    :options="selectSubject"
                    :aria-describedby="ariaDescribedby"
                    name="flavour-2a"
                    stacked
                  ></b-form-checkbox-group>
                </b-form-group>
                </div>
                <div class="mt-3">Selected: <strong>{{ selected }}</strong></div>
            </div>
      </b-col>
    </b-row>
    <!-- ########################################################################
    END --- REVIEW AND INFO WINDOWS 
    ######################################################################## -->

<div>
          <b-pagination
          style="padding-bottom: 20px"
          v-model="currentPage"
          :total-rows="queryData.length"
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
          :items="queryData"
          :filter="filter"
          :filter-include-fields="[]"
          @filtered="onFiltered"
        >
        </b-table>
</div>

    <div>
      <!-- <b-button class="mt-3" variant="primary" block @click="selectResult">CHEMBL.COMPOUND:CHEMBL408 </b-button> -->

      <!-- <b-collapse :id="'table-collapse' + index + result.name"> -->
      <b-card-text>
        <b-form style="margin-top: 20px; margin-bottom: 20px">
          Rows = {{ filterCytoData.length }}
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
          :total-rows="queryData.length"
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
          :items="queryData"
          :filter="filter"
          :filter-include-fields="[]"
          @filtered="onFiltered"
        >
        </b-table>
        <!-- <b-table
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
          :items="filterCytoData"
          :filter="filter"
          :filter-include-fields="[]"
          @filtered="onFiltered"
        >
        </b-table> -->
      </b-card-text>
      <!-- </b-collapse> -->
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
// import TrapiResultClean from "../TrapiResultClean";
// adfb2b6f-4512-49ba-bc9d-324c8d783dc1
// bte_metagraph
import klay from "cytoscape-klay";
import config from "./cytoscapeData/CytoConfig";
import config2 from "./cytoscapeData/CytoConfig2";
import dataMenu from "./cytoscapeData/cytoscapeExampleResults.json";
import metagraph from "../assets/bte_metagraph.json";
import aragorn from "./cytoscapeData/ara-aragorn.json";
import arax from "./cytoscapeData/ara-arax.json";
import unsecret from "./cytoscapeData/ara-unsecret.json";
import robokop from "./cytoscapeData/ara-robokop.json";
import explanatory from "./cytoscapeData/ara-explanatory.json";
import bte from "./cytoscapeData/ara-bte.json";
import improving from "./cytoscapeData/ara-improving.json";
import pathData from "./cytoscapeData/pathsData.json";
import cytoData from "../assets/diabetesTreatsCleaned.json";
// import dataMenu from "../assets/cytoscapeExampleResults.json";
import cytoscape from "cytoscape";
// cytoscapeExampleResults
// import cytoscapeAllPaths from 'cytoscape-all-paths';
// cytoscape.use( cytoscapeAllPaths );
// allAnswerGraphArray_CF
import allAnswerGraphArray_CF from "./cytoscapeData/allAnswerGraphArray_CF.json";

// cytoscape.use(klay)
console.log("config");
console.log(config);
const elements = [...config.elements];
const modalElements = [...config2.elements];
delete config.elements;
delete config2.elements;
console.log("cytoData");
console.log(cytoData);
console.log("metagraph");
console.log(metagraph);

console.log("allAnswerGraphArray_CF")
console.log(allAnswerGraphArray_CF)



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
      filterCytoData: cytoData,
      filter: null,
      resultFields: [
        {
          key: "resNodeCount",
          label: "#Nodes",
          sortable: true,
          class: "text-wrap"
        },
        {
          key: "drugKey",
          label: "Drug",
          sortable: true,
          class: "text-wrap"
        },
        {
          key: "objectName",
          label: "Object",
          sortable: true,
          tdClass: "colwidth",
          class: ".text-break"
        },

        {
          key: "object",
          label: "object ID",
          class: ".text-break"
        },
        {
          key: "predicate",
          label: "Predicate",
          class: ".text-break"
        },
        {
          key: "subjectName",
          label: "Subject",
          sortable: true,
          class: ".text-break"
        },
        {
          key: "subject",
          label: "Subject ID",
          sortable: true,
          tdClass: "colwidth",
          class: ".text-wrap"
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
      radioDrug: "CHEMBL.COMPOUND:CHEMBL408",
      queryData: [],
      allNodes: [],
      allEdges: [],
      allNodeIds: [],
      allEdgeIds: [],
      selectSubject: [],
      selectObject: [],
      selectPredicate: [],
      selected: [], // Must be an array reference!
      jsonData: {},
      allARAData: {},
      arasWithHits:[],
      drugSelected: 'CHEMBL.COMPOUND:CHEMBL1201431',
      araCompareDrugSet: [
"UMLS:C0242896",
"PUBCHEM.COMPOUND:46199646",
"CHEMBL.COMPOUND:CHEMBL1201431",
"PUBCHEM.COMPOUND:16220172",
"PUBCHEM.COMPOUND:5742832",
"PUBCHEM.COMPOUND:16678941",
"PUBCHEM.COMPOUND:12035",
"PUBCHEM.COMPOUND:445580",
"PUBCHEM.COMPOUND:134587348",
"PUBCHEM.COMPOUND:43672",
"MESH:D000900",],
      // drugSelected: 'PUBCHEM.COMPOUND:16220172', // CHEMBL.COMPOUND:CHEMBL1201431
      // drugSelected: 'CHEMBL.COMPOUND:CHEMBL1201431', // PUBCHEM.COMPOUND:16220172
      

    };
  },
  methods: {
    checkOverlap(){
      // let allARAs = [arax, unsecret, robokop, explanatory, bte, improving, aragorn]
      // make ara object with each results set
      // FIX UNSECRET TO HAVE SO AND SN
      let unsecret2 = unsecret.fields.data.message.results.map((item) => {
        item.node_bindings.on = item.node_bindings.disease
        item.node_bindings.sn = item.node_bindings.drug
        return item
      })
      console.log("unsecret2")
      console.log(unsecret2)
      unsecret.fields.data.message.results = unsecret2



      let araResults = [
        {ara: 'arax', results: arax.fields.data.message.results},
        {ara: 'unsecret', results: unsecret.fields.data.message.results},
        {ara: 'robokop', results: robokop.fields.data.message.results},
        {ara: 'explanatory', results: explanatory.fields.data.message.results},
        {ara: 'bte', results: bte.fields.data.message.results},
        {ara: 'improving', results: improving.fields.data.message.results},
        {ara: 'aragorn', results: aragorn.fields.data.message.results},

      ]
      console.log("araResults")
      console.log(araResults)
      // GET ALL SNs
      // get keys from araResults
      // let allKeys = Object.keys(araResults)
      // get all SNs
      let allSNs = []
      for (let i = 0; i < araResults.length; i++) {
        const araResult = araResults[i];
        console.log("araResult")
        console.log(araResult)
        let results = araResult.results
        console.log("results")
        console.log(results)
        let sn = results.map(x => x.node_bindings.sn[0].id)
        araResults[i].sn = sn
        allSNs = [...new Set([...allSNs, ...sn])]
        console.log(allSNs)
      }

      // COUNT WHICH SNs ARE IN EACH ARA RESULT
      // let snCount = []
      
      


      // let totalSN = []
      // for (let i = 0; i < allARAs.length; i++) {
      //   const ara = allARAs[i];
      //   let results = ara.fields.data.message.results
      //   // GET SN FROM RESULTS
      //   let araSnAll = araResults.map(x => x.node_bindings.sn[0].id)
        
      // }

    },
    removeAll(){
      
      this.elements = []
      this.cyInstance.remove(this.cyInstance.$("nodes"))
      this.cyInstance.remove(this.cyInstance.$("edges"));
      // this.cyInstance.remove();

    },
    getTRAPI(){
      this.elements = []
      // this.cyInstance.remove();
      // this.cyInstance.remove(this.cyInstance.$("nodes"));
      // this.cyInstance.remove(this.cyInstance.$("edges"));
      // this.elements = []
      // this.cyInstance.remove();
      // this.elements = []
      this.arasWithHits = []

      console.log("arax")
      console.log(arax)
      console.log("unsecret")
      console.log(unsecret)
      console.log("robokop")
      console.log(robokop)
      console.log("explanatory")
      console.log(explanatory)
      console.log("bte")
      console.log(bte)
      console.log("improving")
      console.log(improving)
      console.log("aragorn")
      console.log(aragorn)

      let unsecret2 = unsecret.fields.data.message.results.map((item) => {
        item.node_bindings.on = item.node_bindings.disease
        item.node_bindings.sn = item.node_bindings.drug
        return item
      })
      console.log("unsecret2")
      console.log(unsecret2)
      unsecret.fields.data.message.results = unsecret2

      // LOOP THROUGH ALL ARAS AND CHECK IF DRUG IS IN RESULTS
      // IF IT IS, GET THE RESULTS
      // MAKE ARRAY OF objects for each ARAS with the name and the data

      let araResults = [
        {ara: 'arax', data: arax, results: arax.fields.data.message.results},
        {ara: 'unsecret',data: unsecret,  results: unsecret.fields.data.message.results},
        {ara: 'robokop',data: robokop,  results: robokop.fields.data.message.results},
        {ara: 'explanatory',data: explanatory,  results: explanatory.fields.data.message.results},
        {ara: 'bte',data: bte,  results: bte.fields.data.message.results},
        {ara: 'improving',data: improving,  results: improving.fields.data.message.results},
        {ara: 'aragorn',data: aragorn,  results: aragorn.fields.data.message.results},
      ]

      for (let i = 0; i < araResults.length; i++) {
        const ara = araResults[i];
        console.log("ara.ara")
        console.log(ara.ara)
        let araResult = ara.results.filter(x => x.node_bindings.sn[0].id == this.drugSelected)
        console.log("araResult")
        console.log(araResult)
        if(araResult.length > 0){
          this.arasWithHits.push(ara.ara)
          this.makeGraphForEachARA(ara.data, ara.ara)
        }
        
      }

      this.cyInstance.makeLayout({ name: "klay", animate: true }).run();


      // let allARAs = [arax, unsecret, robokop, explanatory, bte, improving, aragorn]
      // for (let i = 0; i < allARAs.length; i++) {
      //   const ara = allARAs[i];
      //   let araResult = ara.fields.data.message.results.filter(x => x.node_bindings.sn[0].id == this.drugSelected)
      //   console.log("araResult")
      //   console.log(araResult.length)

      // }

    // test arax
    // this.makeGraphForEachARA(arax, "arax")
    // this.makeGraphForEachARA(unsecret, "unsecret")
    // this.makeGraphForEachARA(robokop, "robokop")
    // // this.makeGraphForEachARA(explanatory, "explanatory")
    // this.makeGraphForEachARA(bte, "bte")
    // this.makeGraphForEachARA(improving, "improving")
    // this.makeGraphForEachARA(aragorn, "aragorn")

    },
    makeGraphForEachARA(ara, araName){
      //NOTE THE ARA NAME
      console.log("######################")
      console.log("araName")
      console.log(araName)

      // GET RESULTS FROM ARAX
      let araResults = ara.fields.data.message.results

      // GET NODES FROM ARAX
      let araNodes = ara.fields.data.message.knowledge_graph.nodes
      console.log("araNodes")
      console.log(araNodes)

      // GET EDGES FROM ARAX
      let araEdges = ara.fields.data.message.knowledge_graph.edges
      console.log("araEdges")
      console.log(araEdges)

      // GET SN == PUBCHEM.COMPOUND:16220172
      let araSnAll = araResults.map(x => x.node_bindings.sn[0].id)
      let araSnUnique = [...new Set(araSnAll)]
      console.log("araSnUnique")
      console.log(araSnUnique)

      // FIND MATCHING RESULT
      let araResult = araResults.filter(x => x.node_bindings.sn[0].id == this.drugSelected)
      console.log("araResult")
      console.log(araResult)
      let on = araResult[0].node_bindings.on[0].id
      console.log("on")
      console.log(on)
      let sn = araResult[0].node_bindings.sn[0].id
      console.log("sn")
      console.log(sn)

      // GET EDGES FROM ARAX RESULT IDS
      let araResultEdges = araResult[0].edge_bindings
      let araEdgeKeys = Object.keys(araResultEdges)
      console.log("araEdgeKeys")
      console.log(araEdgeKeys)

      // this.allARAData["arax"] = []
      let araEdgeIds = []
      for (let i = 0; i < araEdgeKeys.length; i++) {
        const edgeGroup = araEdgeKeys[i];
        console.log("edgeGroup")
        console.log(edgeGroup)
        let edgeId = araResultEdges[edgeGroup].map(x => x.id)
        araEdgeIds = [...new Set([...araEdgeIds, ...edgeId])] //[...new Set(araxSnAll)]
        // console.log("araEdgeIds")
        // console.log(araEdgeIds)
        
      }

      // GET EDGES FROM ARAX RESULT IDS
      let araEdgesFiltered = []
      for (let i = 0; i < araEdgeIds.length; i++) {
        const edgeId = araEdgeIds[i];
        araEdgesFiltered.push(araEdges[edgeId])
        // console.log("araxEdge")
        // console.log(araxEdge)
        // araxEdgesFiltered = [...new Set([...araxEdgesFiltered, ...araxEdge])] //[...new Set(araxSnAll)]
      }
      console.log("araEdgesFiltered")
      console.log(araEdgesFiltered)

      // MAKE GRAPH OBJECT WITH EDGES AND NODE COMBINED DATA
      let araGraph = []

      araEdgesFiltered.map(edge => {
        let subject = araNodes[edge.subject]
        let object = araNodes[edge.object]
        let edgeData = {
          subject: subject,
          subjectid: edge.subject,
          object: object,
          objectid: edge.object,
          predicate: edge.predicate,
          edge: edge,
          ara: araName
        }
        araGraph.push(edgeData)
      })
      console.log("araGraph")
      console.log(araGraph)
      
      for (let i = 0; i < araGraph.length; i++) {
        const el = araGraph[i];
        araGraph[i].objectIdFixed = el.objectid.replaceAll(":", "_")
        araGraph[i].objectIdFixed = araGraph[i].objectIdFixed.replaceAll(" ", "_")
        araGraph[i].objectIdFixed = araGraph[i].objectIdFixed.replaceAll(".", "_")
        araGraph[i].objectIdFixed = araGraph[i].objectIdFixed.replaceAll(")", "_")
        araGraph[i].objectIdFixed = araGraph[i].objectIdFixed.replaceAll("(", "_")

        // console.log(el.object)
        // console.log(el.object.name)

        if(el.object.name == undefined){
          console.log("undefined")
          araGraph[i].objectNameFixed = araGraph[i].objectIdFixed
        } 
        // else {
        //   console.log("defined")
        //   araGraph[i].objectNameFixed = el.object.name.replace(":", "_")
        //   araGraph[i].objectNameFixed = araGraph[i].objectNameFixed.replace(" ", "_")
        // }

        try{
          araGraph[i].objectNameFixed = el.object.name.replace(":", "_")
          araGraph[i].objectNameFixed = araGraph[i].objectNameFixed.replace(" ", "_")
        } catch(e){
          console.log("error")
          console.log(e)
          araGraph[i].objectNameFixed = araGraph[i].objectIdFixed
          // araxGraph[i].objectNameFixed = araxGraph[i].objectNameFixed.replace(" ", "_")
        }
        // araxGraph[i].objectNameFixed = el.object.name.replace(":", "_")
        // araxGraph[i].objectNameFixed = araxGraph[i].objectNameFixed.replace(" ", "_")

        araGraph[i].subjectIdFixed = el.subjectid.replaceAll(":", "_")
        araGraph[i].subjectIdFixed = araGraph[i].subjectIdFixed.replaceAll(" ", "_")
        araGraph[i].subjectIdFixed = araGraph[i].subjectIdFixed.replaceAll(".", "_")
        araGraph[i].subjectIdFixed = araGraph[i].subjectIdFixed.replaceAll(")", "_")
        araGraph[i].subjectIdFixed = araGraph[i].subjectIdFixed.replaceAll("(", "_")

        if(el.subject.name == undefined){
          console.log("undefined")
          araGraph[i].subjectNameFixed = araGraph[i].subjectIdFixed
        }

        try{
          araGraph[i].subjectNameFixed = el.subject.name.replace(":", "_")
          araGraph[i].subjectNameFixed = araGraph[i].subjectNameFixed.replace(" ", "_")
        } catch(e){
          console.log("error")
          console.log(e)
          araGraph[i].subjectNameFixed = araGraph[i].subjectIdFixed
          // araxGraph[i].subjectNameFixed = araxGraph[i].subjectNameFixed.replace(" ", "_")
        }

        // araxGraph[i].subjectNameFixed = el.subject.name.replace(":", "_")
        // araxGraph[i].subjectNameFixed = araxGraph[i].subjectNameFixed.replace(" ", "_")

        araGraph[i].predicateFixed = araGraph[i].objectNameFixed + "_" + araGraph[i].ara  + "_" + araGraph[i].subjectNameFixed
        araGraph[i].predicateFixed = araGraph[i].predicateFixed.replaceAll(" ", "_")
        // araGraph[i].predicateFixed = araGraph[i].predicateFixed.replaceAll(".", "_")
        // araGraph[i].predicateFixed = araGraph[i].predicateFixed.replaceAll(":", "_")
        araGraph[i].predicateFixed = araGraph[i].predicateFixed.replaceAll("(", "_")
        araGraph[i].predicateFixed = araGraph[i].predicateFixed.replaceAll(")", "_")

        araGraph[i].predicateRevFixed = araGraph[i].subjectNameFixed + "_" + araGraph[i].ara  + "_" +  araGraph[i].objectNameFixed
        araGraph[i].predicateRevFixed = araGraph[i].predicateRevFixed.replaceAll(" ", "_")
        // araGraph[i].predicateRevFixed = araGraph[i].predicateRevFixed.replaceAll(".", "_")
        // araGraph[i].predicateRevFixed = araGraph[i].predicateRevFixed.replaceAll(":", "_")
        araGraph[i].predicateRevFixed = araGraph[i].predicateRevFixed.replaceAll("(", "_")
        araGraph[i].predicateRevFixed = araGraph[i].predicateRevFixed.replaceAll(")", "_")



        
      }

      console.log("araGraph fixed 1")
      console.log(araGraph)

      // MAKE CYTOSCAPE NODES if they don't already exist
      // {
      //   data: { id: "b" , name : "b modal node"},
      //   position: { x: 689, y: 282 },
      //   group: "nodes"
      // },
      for (let i = 0; i < araGraph.length; i++) {
        const el = araGraph[i];
        //CHECK IF NODE ID IS IN ALLNODEIDS - MAKE OBJECT NODE IF NOT
        if(!this.allNodeIds.includes(el.objectIdFixed)){
          this.allNodeIds.push(el.objectIdFixed)
          let cytoClassesCheck = ""

          if(el.objectid == on){
            this.theDisease = el.objectIdFixed
            cytoClassesCheck = ["thedisease"]
          } else if (el.objectid == sn){
            this.theDrug = el.objectIdFixed
            cytoClassesCheck = ["thedrug"]
          } else {
            cytoClassesCheck = ["secondaryNode"]}

          this.allNodes.push({
            data: {
              id: el.objectIdFixed,
              label: el.objectNameFixed,
              name: el.objectNameFixed,
              nodeType: "ara"
            },
            group: "nodes",
            classes: cytoClassesCheck
          })
        }

        //CHECK IF NODE ID IS IN ALLNODEIDS - MAKE SUBJECT NODE IF NOT
        if(!this.allNodeIds.includes(el.subjectIdFixed)){
          this.allNodeIds.push(el.subjectIdFixed)
          let cytoClassesCheck = ""

          if(el.subjectid == on){
            this.theDisease = el.subjectIdFixed
            cytoClassesCheck = ["thedisease"]
          } else if (el.subjectid == sn){
            this.theDrug = el.subjectIdFixed
            cytoClassesCheck = ["thedrug"]
          } else {
            cytoClassesCheck = ["secondaryNode"]}
          
          this.allNodes.push({
            data: {
              id: el.subjectIdFixed,
              label: el.subject.name,
              name: el.subject.name,
              nodeType: "ara"
            },
            group: "nodes",
            classes: cytoClassesCheck
          })
        }

        // ####################################################
        //CHECK IF edges ID IS IN alledgeIDS - MAKE EDGE IF NOT
        // ####################################################

        if(!this.allEdgeIds.includes(el.predicateFixed) && !this.allEdgeIds.includes(el.predicateRevFixed)){
          this.allEdgeIds.push(el.predicateFixed)
          this.allEdgeIds.push(el.predicateRevFixed)
          this.allEdges.push({
            data: {
              id: el.predicateFixed,
              source: el.subjectIdFixed,
              target: el.objectIdFixed,
              label: el.predicateFixed,
              edgeType: el.ara,
              predicate: el.predicate,
            },
            group: "edges",
            classes: [el.ara]
          })
        }
        
      }

        // ####################################################
        // CHECK THINGS AND ADD TO ELEMENTS
        // ####################################################
        console.log("allNodes")
        console.log(this.allNodes)
        console.log("allEdges")
        console.log(this.allEdges)

        this.elements = [...this.allNodes];
        this.elements = [...this.elements, ...this.allEdges]
        console.log("elements")
        console.log(this.elements)




    },
    graphMeta(){
      console.log("graphMeta")
      console.log("metagraph")
      console.log(metagraph)    
      // GET UNIQUE SUBJECT OBJECT PAIRS
      let edges = metagraph.edges
      let uniqueSubjects = [...new Set(edges.map(edge => edge.subject))]
      let uniqueObjects = [...new Set(edges.map(edge => edge.object))]
      // COMBINE SUBJECTS AND OBJECTS
      let allNodes = uniqueSubjects.concat(uniqueObjects)
      let uniqueAllNodes = [...new Set(allNodes)]
      console.log("uniqueAllNodes")
      console.log(uniqueAllNodes)

      // CREATE NODES
      let nodes = uniqueAllNodes.map(node => {
        return {
          data: {
            id: node.split(":")[1],
            label: node.split(":")[1],
            name: node.split(":")[1],
            nodeType: "meta"
          },
          group: "nodes"
        }
      })
      console.log("nodes")
      console.log(nodes)

      // CREATE EDGES
      let edges2 = edges.map(edge => {
        return {
          data: {
            id: edge.subject.split(":")[1] + "_" + edge.object.split(":")[1],
            source: edge.subject.split(":")[1],
            target: edge.object.split(":")[1],
            // predicate: edge.predicate,
            edgeType: "meta"
          },
          group: "edges"
        }
      })
      console.log("edges2")
      console.log(edges2)
      // GET UNIQUE EDGES2 BASES ON ID
      let uniqueEdges2 = []
      let uniqueEdgeCheck = []
      for (let i = 0; i < edges2.length; i++) {
        const edge = edges2[i];
        let id1 = edge.data.source + edge.data.target
        let id2 = edge.data.target + edge.data.source
        if (!uniqueEdgeCheck.includes(id1) && !uniqueEdgeCheck.includes(id2)) {
          uniqueEdges2.push(edge)
          uniqueEdgeCheck.push(id1)
          uniqueEdgeCheck.push(id2)
        }
        
      }
      console.log("uniqueEdges2")
      console.log(uniqueEdges2)


      let uniqueEdges3 = []

      edges2.forEach(edge => {
        if (!uniqueEdges3.some(e => e.data.id === edge.data.id)) {
          uniqueEdges3.push(edge)
        }
      })
      console.log("uniqueEdges3")
      console.log(uniqueEdges3)

    
    this.elements = [...nodes, ...uniqueEdges2];



      



    },
    getMeta(){
      console.log("getMeta")
      console.log("metagraph")
      console.log(metagraph)

      // get node keys from metagraph
      let nodeKeys = Object.keys(metagraph.nodes)
      console.log("nodeKeys")
      console.log(nodeKeys)

      let edges = metagraph.edges
      // GET UNIQUE SUBJECTS AND OBJECTS FROM EDGES
      let uniqueSubjects = [...new Set(edges.map(edge => edge.subject))]
      let uniqueObjects = [...new Set(edges.map(edge => edge.object))]
      let uniquePredicates = [...new Set(edges.map(edge => edge.predicate))]
      console.log("uniquePredicates")
      console.log(uniquePredicates)
      console.log("uniqueSubjects")
      console.log(uniqueSubjects)
      console.log("uniqueObjects")
      console.log(uniqueObjects)

      this.selectSubject = uniqueSubjects.map(subject => {
        return {
          text: subject.split(":")[1],
          value: subject
        }
      })
      this.selectObject = uniqueObjects.map(object => {
        return {
          text: object.split(":")[1],
          value: object
        }
      })
      this.selectPredicate = uniquePredicates.map(predicate => {
        return {
          text: predicate.split(":")[1],
          value: predicate
        }
      })

      // get unique subjects from edges
      let subjects = []
      for (let i = 0; i < metagraph.edges.length; i++){
        let subj = metagraph.edges[i].subject
        if (!subjects.includes(subj)){
          subjects.push(subj)
        }
      }
      // console.log("subjects")
      // console.log(subjects)

      // get unique objects from edges
      let objects = []
      for (let i = 0; i < metagraph.edges.length; i++){
        let obj = metagraph.edges[i].object
        if (!objects.includes(obj)){
          objects.push(obj)
        }
      }
      // console.log("objects")
      // console.log(objects)


      // GET ALL PREDICATES FOR EACH SUBJECT NODE KEY
      let selectionMap = {}
      selectionMap.subjectsPredicates = {}
      selectionMap.objectsPredicates = {}
      for (let i = 0; i < subjects.length; i++) {
        const subject = subjects[i];
        selectionMap.subjectsPredicates[subject] = []
        metagraph.edges.map(x => {
          if (x.subject === subject) {
            selectionMap.subjectsPredicates[subject].push(x.predicate)
          }
        })
        selectionMap.subjectsPredicates[subject] = [...new Set(selectionMap.subjectsPredicates[subject])]
      }
      console.log("selectionMap")
      console.log(selectionMap)


      // GET ALL PREDICATES FOR EACH OBJECT NODE KEY
      for (let i = 0; i < objects.length; i++) {
        const object = objects[i];
        selectionMap.objectsPredicates[object] = []
        metagraph.edges.map(x => {
          if (x.object === object) {
            selectionMap.objectsPredicates[object].push(x.predicate)
          }
        })
        selectionMap.objectsPredicates[object] = [...new Set(selectionMap.objectsPredicates[object])]
      }


      // for (let i = 0; i < array.length; i++) {
      //   const element = array[i];
        
      // }



      // // get all predicates for each node key
      // let nodePredicates = []
      // for (let i = 0; i < nodeKeys.length; i++){
      //   let nodeKey = nodeKeys[i]
      //   let nodePreds = metagraph.nodes[nodeKey].predicates
      //   console.log("nodePreds")
      //   console.log(nodePreds)
      //   nodePredicates.push(nodePreds)
      // }
      // get unique predicates
      // let uniquePredicates = []
      // for (let i = 0; i < nodePredicates.length; i++){
      //   let nodePreds = nodePredicates[i]
      //   for (let j = 0; j < nodePreds.length; j++){
      //     let nodePred = nodePreds[j]
      //     if (!uniquePredicates.includes(nodePred)){
      //       uniquePredicates.push(nodePred)
      //     }
      //   }
      // }
      // console.log("uniquePredicates")
      // console.log(uniquePredicates)




      

    },
    async testMedik(){
      console.log("testMedik")
      // let nodes = []
      let queryForward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n1","object": "n2"}}}}}
      let queryBackward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n2","object": "n1"}}}}}
      let queryResultsForward = await PostService.query_raw(queryForward)
      let queryResultsBackward = await PostService.query_raw(queryBackward)
      console.log("queryResultsForward")
      console.log(queryResultsForward)
      console.log("queryResultsBackward")
      console.log(queryResultsBackward)
      console.log("elements")
      console.log(elements)

      // let cleanedResults = await TrapiResultClean.TrapiResultClean(queryResultsForward, "testkp")
      // console.log("cleanedResults")
      // console.log(cleanedResults)



      // let cleanedResultsForward = await this.cleanMedikResults(queryResultsForward)
      // console.log("cleanedResultsForward")
      // console.log(cleanedResultsForward)

      // let cleanedResultsBackward = await this.cleanMedikResults(queryResultsBackward)
      // console.log("cleanedResultsBackward")
      // console.log(cleanedResultsBackward)
    
    // GET NODES
    let forwardNodes = queryResultsForward.message.knowledge_graph.nodes
    console.log("forwardNodes")
    console.log(forwardNodes)

    let forwardCytoNodes = this.getNodesFromMedikTrapi(forwardNodes)
    console.log("forwardCytoNodes")
    console.log(forwardCytoNodes)

    let backwardNodes = queryResultsBackward.message.knowledge_graph.nodes
    console.log("backwardNodes")
    console.log(backwardNodes)

    let backwardCytoNodes = this.getNodesFromMedikTrapi(backwardNodes)
    console.log("backwardCytoNodes")
    console.log(backwardCytoNodes)

    let nodes = [...forwardCytoNodes, ...backwardCytoNodes]
    // GET UNIQUE NODES BASED ON ID
    let uniqueNodes = [...new Map(nodes.map(item => [item.data.id, item])).values()]

    // GET EDGES
    let backwardEdges = queryResultsBackward.message.knowledge_graph.edges
    console.log("backwardEdges")
    console.log(backwardEdges)

    let backwardCytoEdges = this.getEdgesFromMedikTrapi(backwardEdges)
    console.log("backwardCytoEdges")
    console.log(backwardCytoEdges)

    let forwardEdges = queryResultsForward.message.knowledge_graph.edges
    console.log("forwardEdges")
    console.log(forwardEdges)

    let forwardCytoEdges = this.getEdgesFromMedikTrapi(forwardEdges)
    console.log("forwardCytoEdges")
    console.log(forwardCytoEdges)

    let edges = [...forwardCytoEdges, ...backwardCytoEdges]
    // GET UNIQUE EDGES BASED ON ID
    let uniqueEdges = [...new Map(edges.map(item => [item.data.id, item])).values()]
    // let uniqueNodes = []
    // let uniqueEdges = []

    console.log("GOT THEM ALL")
    console.log("this.elements")
    console.log(this.elements)
    console.log("nodes")
    console.log(nodes)
    console.log("edges")
    console.log(edges)

    this.elements = [...uniqueNodes, ...uniqueEdges]
    console.log("this.elements")
    console.log(this.elements)

    //get unique catergoies from nodes
    let categories = this.elements.map(x => x.data.category)
    categories = [...new Set(categories)]
    console.log("categories")
    console.log(categories)


    // this.elements = [...forwardCytoNodes, ...forwardCytoEdges]
    // let elements = [...forwardCytoNodes, ...backwardCytoNodes, ...forwardCytoEdges, ...backwardCytoEdges]
    // console.log("elements")
    // console.log(elements)
    // this.elements = elements

    // this.cyInstance.add(addElements)

    this.cyInstance.makeLayout({ name: "klay", animate: true }).run();
    // this.keyCounter++

    },
    showNodeInfo(event, def, data, id){
      console.log("showNodeInfo")
      console.log(event)
      console.log(def)
      console.log(data.category)
      console.log(id)
      // this.nodeInfo = node
    },
    getNodesFromMedikTrapi(nodes){
      let nodesKeys = Object.keys(nodes)
      // GET UNIQUE NODES
      // this.allNodes = [...new Set(nodesKeys)]
      // USE FILTER TO GET UNIQUE NODES
      // this.allNodes = nodesKeys.filter((v, i, a) => a.indexOf(v) === i);
      // console.log("this.allNodes")
      // console.log(this.allNodes)

      let nodesList = []
      for (let i = 0; i < nodesKeys.length; i++){
        const node = nodesKeys[i];
        let nodeInfo = nodes[node]
        // console.log("nodeInfo")
        // console.log(nodeInfo)
        // console.log(nodeInfo.name)
        // console.log(node)
        let cytoNode = {}
        cytoNode.data = {}
        cytoNode.data.id = ""
        cytoNode.data.name = ""
        let fixNodeName = ""

        if(nodeInfo.name == false){
          // console.log("getting name")
          // console.log(nodeInfo.name)
          fixNodeName = node.split(":").join("_")
        } else {
          // console.log("else getting name")
          fixNodeName = nodeInfo.name.split(" ").join("_")
        }

        // let fixNodeName = nodeInfo.name.split(" ").join("_"); // "NamedThing|biolink"
        let fixNodeId = node.split(":").join("_");
        let fixNodeGroup = nodeInfo.category.split(":")[1]
        fixNodeGroup = fixNodeGroup.replace(/\|biolink/gi, "");
        // console.log("fixNodeName")
        // console.log(fixNodeName)
        // console.log("fixNodeId")
        // console.log(fixNodeId)
        // console.log("fixNodeGroup")
        // console.log(fixNodeGroup)

        

        cytoNode.data.name = fixNodeName
        cytoNode.data.id = fixNodeId
        cytoNode.data.category = fixNodeGroup
        cytoNode.group = "nodes"
        cytoNode.classes = [fixNodeGroup]

        if(this.allNodes.indexOf(fixNodeId) == -1){
          this.allNodes.push(fixNodeId)
          nodesList.push(cytoNode)
        }        
        
        // nodesList.push(cytoNode)
        // this.allNodes.push(cytoNode)
        // this.cyInstance.add(addElements);
        // this.cyInstance.add(cytoNode)
        
      }
      return nodesList
    },

    getEdgesFromMedikTrapi(edges){
      let edgesKeys = Object.keys(edges)
      let edgesList = []
    //  {
    //     data: { id: "ca", source: "c", target: "a" },
    //     group: "edges"
    //   }
      for (let i = 0; i < edgesKeys.length; i++){
        const edge = edgesKeys[i];
        let edgeInfo = edges[edge]
        let cytoEdge = {}
        cytoEdge.data = {}
        cytoEdge.data.id = ""
        cytoEdge.data.source = ""
        cytoEdge.data.target = ""
        cytoEdge.data.edgeId = edge
        cytoEdge.data.predicate = edgeInfo.predicate.split(":")[1]
        cytoEdge.group = "edges"

        let source = edgeInfo.subject.split(":").join("_");
        // console.log("source")
        // console.log(source)
        let target = edgeInfo.object.split(":").join("_");
        // console.log("target")
        // console.log(target)

        let edgeId = source + "_" + target
        // console.log("edgeId")
        // console.log(edgeId)

        if(edgeId == ""){
          console.log("cytoEdge - blank ID")
          console.log(cytoEdge)
        }
        cytoEdge.data.id = edgeId
        cytoEdge.data.source = source
        cytoEdge.data.target = target

        // push edge if subject and object are in this.allNodes
        if(this.allNodes.includes(source) && this.allNodes.includes(target)){
          edgesList.push(cytoEdge)
        }
        // edgesList.push(cytoEdge)
        // this.cytoscape.add(cytoEdge)
        

      }
      return edgesList
    },

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
    // @remind getComplexResults
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

    selectResult3  () {
      this.cyInstance.selectionType("additive");
      // Set the selection type.
      // type The selection type string; one of 'single' (default) or 'additive'.

      let aras = cytoData.map((x) => x.agent);
      console.log("aras");
      console.log(aras);

      let uniqueARAs = [...new Set(aras)];
      console.log("uniqueARAs");
      console.log(uniqueARAs);
      
      // let uniqueARAs = [...new Map(cytoData.map((x) => x.agent))]
      // console.log("uniqueARAs")
      // console.log(uniqueARAs)


      console.log("this.keyCounter");
      console.log(this.keyCounter);
      // console.log("config2")
      // console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(
        (x) => x.drugKey == this.radioDrug
      );

      this.filterCytoData = filterCytoData
      console.log("filterCytoData");
      console.log(filterCytoData);
      // let newElements = []
      console.log("genNodes")
      let nodes = this.genNodes(filterCytoData);

      console.log("genEdges")
      let edges = this.genEdges(filterCytoData);
      let addElements = [...nodes, ...edges];
      // FIND THE ELEMENTS THAT HAVE '' AS THE NAME
      let emptyNames = addElements.filter((x) => x.data.id == "");
      console.log("emptyNames");
      console.log(emptyNames);
      

      // FILTER OUT THOSE WITHOUT ID
      addElements = addElements.filter((x) => x.data.id != "");
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

    // @remind selectResult2
    selectResult2() {
      this.cyInstance.selectionType("additive");
      // GET COUNT OF RESULTS WITH MORE THAN ONE AGENT
      let resultGroupsArray = cytoData.map(x => x.ResultGroup)
      resultGroupsArray = [...new Set(resultGroupsArray)]
      console.log("resultGroupsArray")
      console.log(resultGroupsArray)
      // resultGroupsArray.map((x) => x.ResultGroup)
      let resultGroupsArrayData = []

      for (let i = 0; i < resultGroupsArray.length; i++) {
        const resultGroupCheck = resultGroupsArray[i];
        // console.log("resultGroupCheck")
        // console.log(resultGroupCheck)
        // console.log("cytoData.filter(x => x.ResultGroup == resultGroupCheck ).length")
        // console.log(cytoData.filter(x => x.ResultGroup == resultGroupCheck ).length)
        let resultData = {
          ResultGroup: resultGroupCheck,
          countEdges: cytoData.filter(x => x.ResultGroup == resultGroupCheck ).length,
          agents: [...new Set(cytoData.filter(x => x.ResultGroup == resultGroupCheck).map(x => x.agent))]
          
          }
          resultGroupsArrayData.push(resultData)
      }
      console.log("resultGroupsArrayData")
      console.log(resultGroupsArrayData)
      let multiAgentResults = resultGroupsArrayData.filter(x => x.agents.length > 0)
      console.log("multiAgentResults")
      console.log(multiAgentResults)


      // Set the selection type.
      // type The selection type string; one of 'single' (default) or 'additive'.

      let aras = cytoData.map((x) => x.agent);
      console.log("aras");
      console.log(aras);

      let uniqueARAs = [...new Set(aras)];
      console.log("uniqueARAs");
      console.log(uniqueARAs);

      // let uniqueARAs = [...new Map(cytoData.map((x) => x.agent))]
      // console.log("uniqueARAs")
      // console.log(uniqueARAs)


      console.log("this.keyCounter");
      console.log(this.keyCounter);
      // console.log("config2")
      // console.log(config2)
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(
        (x) => x.drugKey == this.radioDrug
      );

      this.filterCytoData = filterCytoData
      console.log("filterCytoData");
      console.log(filterCytoData);
      // let newElements = []
      console.log("genNodes")
      let nodes = this.genNodes(filterCytoData);

      console.log("genEdges")
      let edges = this.genEdges(filterCytoData);
      let addElements = [...nodes, ...edges];
      // FIND THE ELEMENTS THAT HAVE '' AS THE NAME
      let emptyNames = addElements.filter((x) => x.data.id == "");
      console.log("emptyNames");
      console.log(emptyNames);
      

      // FILTER OUT THOSE WITHOUT ID
      addElements = addElements.filter((x) => x.data.id != "");
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
        if (nodeCheck.indexOf(fixSubjectName) == -1 ) {
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
          if(res.subjectName == ""){
            console.log("res.objectName == ''")
            console.log(res)
          }

          el.position = { x: x, y: y };
          el.group = "nodes";

          console.log("res.subjectCats");
          console.log(res.subjectCats);

          if (res.diseaseKey == res.subject) {
            console.log("res.diseaseKey == res.subject")
            console.log(res)
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

        if (nodeCheck.indexOf(fixObjectName) == -1 ) {
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
          if(res.objectName == ""){
            console.log("res.objectName == ''")
            console.log(res)
          }
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
        let agent = res.agent.split("-")[1]

        let edgeCheck = agent + "_" +res.subjectName + "_" + res.objectName;
        edgeCheck = edgeCheck.split(" ").join("_");
        // edgeCheck = edgeCheck.split("-").join("_");
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
          el.classes = [agent]
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

    genEdges_original(filterCytoData) {
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

    // @remind move the primary nodes to the side
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
      console.log("this.theDisease")
      console.log(this.theDisease)
      console.log("this.theDrug")
      console.log(this.theDrug)
      let theDisease = this.theDisease
      let theDrug = this.theDrug
      this.cyInstance.nodes().forEach(function (ele) {
        // if (ele.id() == "type_2_diabetes_mellitus") {
      // console.log("this.theDisease 2 inside")
      // console.log(theDisease)        
      if (ele.id() == theDisease) {
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
        // if (ele.id() == "TROGLITAZONE") {
        if (ele.id() == theDrug) {
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
      let filterCytoData = cytoData.map((x) => x.agent)

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
<style scoped>
table td{ 
  vertical-align: top; 
  padding: 5px;
  word-break: break-all;  /* MUST ADD THIS */
}
#cy {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
</style>
