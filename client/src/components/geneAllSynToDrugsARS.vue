<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">ARS GENE TO GENE TO DRUG QUERY NEXT</h1>

    <div style="margin-top: 20px">
      <b-modal
        ref="my-modal"
        hide-footer
        title="Error getting results"
        header-bg-variant="danger"
        header-text-variant="white"
      >
        <div class="d-block text-center">
          <h3>{{ errorSteps[0] }}</h3>
          <h4>({{ errorSubMessage }})</h4>
        </div>
        <!-- <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Close Me</b-button>
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> testSection-->
      </b-modal>
      <b-row style="min-height: 130px">
        <b-col>
          <b-form>
            <div>
              <b-form-group>
                <b-form inline>
                  <label class="sr-only" for="Object">Object</label>
                  <b-form-input
                    v-model="concept_search"
                    id="concept_search"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Object"
                    :state="validation"
                  ></b-form-input>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="getAllSynToDrugs"
                    >getAllSynToDrugs
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="secondary"
                    v-on:click="saveFile"
                    :disabled="!validation"
                    >saveFile
                  </b-button>

                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="testSection"
                    >testSection
                  </b-button>
                  
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="tryARS"
                    >tryARS
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="metagraph"
                    >metagraph
                  </b-button>
                  <b-form-checkbox
                    style="margin-left: 20px"
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
                  >
                    Check to include all results {{ status == "false" }} :
                    {{ status == false }}
                  </b-form-checkbox>

                  <div>
                    State: <strong>{{ status }}</strong>
                  </div>

                  <b-icon
                    v-if="show_waiting_card"
                    style="margin-left: 5px"
                    v-bind:class="cardVariant"
                    icon="circle-fill"
                    animation="throb"
                    font-scale="2"
                  ></b-icon>
                  <b-form-invalid-feedback :state="validation">
                    Must be formated HGNC:n (n = integer)
                  </b-form-invalid-feedback>
                  <b-form-valid-feedback :state="validation">
                    Looks Good.
                  </b-form-valid-feedback>

                  <p text-muted>Enter the HGNC ID in the format shown</p>
                </b-form>
              </b-form-group>
              Example: {{ARSrequestID}} 
                               <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="ARScheckResults"
                    >ARScheckResults
                  </b-button>
            </div>
          </b-form>
        </b-col>
        <!-- <b-col>

          <transition name="fade">
            <div v-if="show_waiting_card">
              <b-card
                border-variant="primary"
                header-tag="header"
                v-bind:header-bg-variant="headerBg"
                header-text-variant="white"
                class="text-center"
              >
                <template #header>
                  <div>
                    <h4 class="mb-0">What are we waiting for..</h4>
                  </div>
                </template>
                <b-card-text>
                  <h5>{{ waitingfor_text }}</h5></b-card-text
                >
              </b-card>
            </div>
          </transition>
        </b-col> -->
      </b-row>

      <b-container style="margin-top: 20px" fluid>
        <b-row>
                          <b-card
                  header="featured"
                  header-tag="header"
                  :key="componentKey"
                >
                  <template #header>
                    <h6 class="mb-0">Current result count:</h6>
                    <!-- concept_search -->
                  </template>
                  <!-- <h4 class="mb-0">Symbol: {{ concept_search }}</h4> -->

                  <br />
                <b-table
                  bordered
                  striped
                  hover
                  ref="timepersteptable"
                  table-layout:
                  fixed
                  :fields="fields"
                  :items="resultSetIDs"
                >

                </b-table>
                  <!-- <b-card-text v-for="syn in synonymsArray" :key="syn.id">
                    <b>{{ syn.identifier }}: &nbsp;</b>{{ syn.name }} &nbsp;
                    (Hits = {{ syn.hitCount }})
                  </b-card-text> -->
                  <!-- {{synonymsArray}} -->
                </b-card>
        </b-row>
        <b-row>
          <b-col>
            <div>
              <b-card-group deck>



                <b-card
                  header="featured"
                  header-tag="header"
                  :key="componentKey + 5"
                >
                  <template #header>
                    <h6 class="mb-0">Gene info:</h6>
                    <!-- concept_search -->
                  </template>
                  <h4 class="mb-0">Symbol: {{ concept_search }}</h4>

                  <br />
                  <b-card-text v-for="syn in synonymsArray" :key="syn.id">
                    <b>{{ syn.identifier }}: &nbsp;</b>{{ syn.name }} &nbsp;
                    (Hits = {{ syn.hitCount }})
                  </b-card-text>
                  <!-- {{synonymsArray}} -->
                </b-card>
              </b-card-group>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col> this is a test </b-col>
        </b-row>

        <b-row style="margin-top: 20px">
          <b-col>
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  Gene Gene Start: {{ startTime }} - Stop: {{ stopTime }}
                </h6>
              </template>
              <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="timeArray"
              >
              </b-table>
            </b-card>
          </b-col>
        </b-row>
        <!-- <b-row style="margin-top: 20px"> -->

        <b-row>
          <b-col>
            <!-- <b-card>
              <template #header>
                <h6 class="mb-0">Drug Gene</h6>
                Rows = {{ geneToGeneTable.length }}
              </template>

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
                :total-rows="dgTotalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>

    
            </b-card> -->
          </b-col>
        </b-row>
        <b-container>
          <b-row>
            <b-card style="margin-top: 20px; width: 100%" :key="componentKey">
              <template #header>
                <h4 class="mb-0">Drug Gene Progress:</h4>
              </template>

              <!-- <b-card-title>{{gene.predicates}}</b-card-title> -->

              <!-- <b-card-sub-title  v-for="(predicate, index) in resultWithDrugs.predicates" :key="index" >Predicate: {{predicate}} </b-card-sub-title> -->
              <b-card-text>
                {{currentDrug}}
                <!-- <b-table
                  bordered
                  striped
                  hover
                  ref="progressTable"
                  table-layout:
                  fixed
                  :items="progressTable"
                >
                </b-table> -->
              </b-card-text>
              <b-card-body> </b-card-body>
            </b-card>
            <!-- <b-col> </b-col> -->
          </b-row>
        </b-container>
                <b-container :key="componentKey">
          <b-row
            style="margin-top: 20px; width: 100%"
            v-for="gene in geneIDList"
            :key="gene.id"
          >
            <b-card style="margin-top: 20px; width: 100%" :key=" gene.id + componentKey">
              <template #header>
                <h4 class="mb-0">{{ progressObject[gene].groupName }}</h4> (all drugs with any predicate: {{progressObject[gene].chemCountTotal}})

              </template>
             

              <b-card-text>
        Drugs with clear predicate ({{progressObject[gene].chemCount}})
        <div>
          <h5>Getting and filtering synonyms: </h5>
              <b-progress :value="progressObject[gene].synCurrentCount" :max="progressObject[gene].chemCount" show-progress animated></b-progress>
                {{progressObject[gene]}}
        </div>        
        <div>
          <h5>Checking FDA status: </h5>
              <b-progress :value="progressObject[gene].FDACurrentCount" :max="progressObject[gene].chemCount" show-progress animated></b-progress>
                {{progressObject[gene]}}
        </div>
      </b-card-text> 
              <b-card-body> </b-card-body>
            </b-card>
            <!-- <b-col> </b-col> -->
          </b-row>
        </b-container>
      </b-container>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
import TrapiResultClean from "../TrapiResultClean";
import ARSService from "../ARSService";
import ARAXService from "../ARAXService";
import NodeService from "../NodeService";
import metagraph from "/Users/andycrouse/Documents/GitHub/medikweb-largefilefix/datafiles/metaknowledgegraph.json"
// 
// import svgtest from "./svgtest.vue"
// import importResultWithDrugs from "/Users/andycrouse/Downloads/resultWithDrugsWithFDA.json"
import synonymService from "../synonymService";
// import twohopdata from "../../../datafiles/twohopggd.json"


var parser = require("fast-xml-parser");
import axios from "axios";
import * as d3 from "d3";

// import {
//   breadcrumbTrail,
//   highlightOnHover,
//   nodeInfoDisplayer,
//   sunburst,
//   zoomOnClick
// } from 'vue-d3-sunburst';
// import "vue-d3-sunburst/dist/vue-d3-sunburst.css";
// import got from 'got';
// const EventEmitter = require("events");

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();

export default {
  name: "Gene2Drugs",

  data() {
    return {
      status: false,
      perPage: 5,
      ggTotalRows: 1,
      dgTotalRows: 1,
      currentPage: 1,
      filteredTableData: [],
      filtercategories: {
        ambiguous: { name: "ambiguous", count: 0 },
        increase: { name: "increase", count: 0 },
        decrease: { name: "decrease", count: 0 },
        fda: { name: "fda", count: 0 },
      },
      selectedcategories: [],
      groupedTableKey: 1,
      busy: false,
      error: "",
      text: "",
      mediget: {},
      nodes: [],
      edges: [],
      subject: "chemical",
      predicate: "UMLS:C0004096",
      concept_search: "mapk8ip3",
      // HGNC:18481
      // HGNC:6884" MAPK8IP3
      // "HGNC:2625" CYP2D6
      // "HGNC:11998" TP53"
      // "HGNC:3236" EGFR  - 3546 hits
      // 1100 BRCA1
      // 9588 PTEN
      // 5173 HRAS

      // KEEP THIS AS TEMPLATE FOR QUERIES
      query: {
  "message": {
      "query_graph": {
          "edges": {
              "e00": {
                  "constraints": [],
                  "object": "gene1",
                  "predicates": [
                      "biolink:decreases_degradation_of",
                      "biolink:increases_activity_of",
                      "biolink:increases_expression_of",
                      "biolink:increases_stability_of",
                      "biolink:increases_synthesis_of",
                      "biolink:activator",
                      "biolink:agonist",
                      "biolink:inducer",
                      "biolink:inverse_agonist",
                      "biolink:partial_agonist",
                      "biolink:positive_allosteric_modulator",
                      "biolink:stimulates",
                      "biolink:stimulator",
                      "biolink:positively_regulates",
                      "biolink:regulates",
                      "biolink:negatively_regulates",
                      "biolink:positively_regulates",
                      "biolink:entity_positively_regulates_entity",
                      "biolink:entity_negatively_regulates_entity",
                      "biolink:entity_regulates_entity",
                      "biolink:correlated_with",
                      "biolink:affects"

                  ],
                  "subject": "gene0"
              }
 
          },
          "nodes": {
      
              "gene0": {
                  "categories": [
                      "biolink:Protein",
                      "biolink:Gene"
                  ],
                  "constraints": [],
                  "ids": [
      "HGNC:6884",
        "NCBIGene:23162",
        "UMLS:C1417026",
        "RGD:1563691",
        "NCBIGene:302983",
        "MGI:1353598",
        "NCBIGene:30957",
        "PR:Q9UPT6",
        "UniProtKB:Q9UPT6",
        "PR:000010162",
        "NCBIGene:176349", "UMLS:C1432412", "wb:WBGene00006755", "WormBase:WBGene00006755",
        "MESH:C581624", "UMLS:C3657327", "RGD:1563691", "MESH:C554781", "UMLS:C2974800"
                  ],
                  "is_set": false
              },
              "gene1": {
                "categories": [
                    "biolink:Protein",
                    "biolink:Gene"
                ],
                "constraints": [],
          
                "is_set": false
            }
          }
      }
  },
  "submitter": "UI Team ABC",
  "stream_progress": true
},
      queryjson: {
        message: {
          query_graph: {
            nodes: {
              n1: {
                category: "chem",
              },
              n2: {
                id: "PR:P10635-old",
              },
            },
            edges: {
              e0: {
                subject: "n2",
                object: "n1",
              },
            },
          },
        },
      },
      parentjson: {},
      synonyms: [],
      pr_id: "",
      parentID: "",
      modal_text: "",
      filtercount: 0,
      geneInfo: {},
      filter_counttype: {},
      filter_clean: [],

      waitingfor_text: "",
      cardVariant: "primary",
      headerBg: "primary",
      cardVariantArray: [
        "primary",
        "secondary",
        "success",
        "info",
        "warning",
        "danger",
        "light",
      ],
      show_waiting_card: false,
      ncbiResults: [],
      umlsResults: [],
      prResults: [],
      uniprotResults: [],
      exporttable: [],
      errorSteps: [],
      errorSubMessage: [],
      groupedResults: {},
      groupedResultsTable: [],
      predicate_increase: [
        "decreases_degradation_of",
        "positively_regulates,_entity_to_entity",
        "increases_activity_of",
        "increases_expression_of",
        "increases_stability_of",
        "increases_synthesis_of",
        "activator",
        "agonist",
        "inducer",
        "inverse_agonist",
        "partial_agonist",
        "positive_allosteric_modulator",
        "stimulates",
        "stimulator",
        "positively_regulates",
        "positively_regulates_entity_to_entity",
      ],
      predicate_decrease: [
        "positively_regulates_entity_to_entity",
        "decreases_expression_of",
        "decreases_stability_of",
        "decreases_synthesis_of",
        "increases_degradation_of",
        "antagonist",
        "channel_blocker",
        "gating_inhibitor",
        "inhibitor",
        "inhibits",
        "negative_modulator",
        "antagonist",
        "blocker",
        "inhibitor",
        "inverse_agonist",
        "inhibits",
        "inhibits",
        "decreases_activity_of",
        "decreases_expression_of",
        "increases_degradation_of",
        "negatively_regulates,_entity_to_entity",
        "decreases_activity_of",
        "negatively_regulates",
        "decreases_activity_of",
        "decreases_expression_of",
        "decreases_activity_of",
        "increases_degradation_of",
        "negatively_regulates,_entity_to_entity",
        "negatively_regulates,_entity_to_entity",
        "negatively_regulates,_entity_to_entity",
        "negatively_regulates",
        "negatively_regulates",
        "negatively_regulates_entity_to_entity",
      ],
      predicate_both: [
        "affects_activity_of",
        "affects_degradation_of",
        "affects_expression_of",
        "affects_metabolic_processing_of",
        "decreases_activity_of",
        "decreases_degradation_of",
        "decreases_expression_of",
        "decreases_response_to",
        "decreases_stability_of",
        "increases_activity_of",
        "increases_degradation_of",
        "increases_expression_of",
        "increases_response_to",
        "increases_stability_of",
        "interacts_with",
        "molecularly_interacts_with",
        "negatively_regulates",
        "negatively_regulates_entity_to_entity",
        "negatively_regulates,_entity_to_entity",
        "physically_interacts_with",
        "positively_regulates",
        "positively_regulates_entity_to_entity",
        "positively_regulates,_entity_to_entity",
        "regulates",
        "decreases_synthesis_of",
        "antagonist",
        "channel_blocker",
        "gating_inhibitor",
        "inhibitor",
        "inhibits",
        "negative_modulator",
        "blocker",
        "inverse_agonist",
        "increases_synthesis_of",
        "activator",
        "agonist",
        "inducer",
        "partial_agonist",
        "positive_allosteric_modulator",
        "stimulates",
        "stimulator",
      ],
      badResults: [
        "carbon",
        "inhibitor",
        "oil",
        "acid",
        "pharmaceutical / biologic product",
        "transcript",
        "dna",
        "ion",
        "pharmaceutical / biological product",
        "promoter",
        "toxin",
        "amine",
        "hydrochloride",
        "",
        "ions",
        "particle",
        "enhancers",
        "enhancer",
        "lipid",
        "triphosphate",
        "antigen",
        "agent",
        "nucleotide",
        "amide",
      ],
      badChemResults: ["UMLS:C0066772"],
      rawresultstosave: null,

      fields: [
        {
          key: "agent",
          label: "Name",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "code",
          label: "Code",
        },
        {
          key: "status",
          label: "Status",
        },
        {
          key: "id",
          label: "ID",
        },
        {
          key: "resultCount",
          label: "Result Count",
          sortable: true,
          tdClass: "colwidth",
        }
   
      ],
      predicateAll:[],
            nodelist: [],
      filteredResultsmore: [],
      synonymsArray: [],
      synCountHits: [],
      componentKey: 10000,
      synIDObject: {},
      drugToGeneTable: [],
      geneToGeneTable: [],
      filter: null,
      filterOn: [],
      drugToGenePrintTable: [],
      geneToGenePrintTable: [],
      onehitGeneProtList: [],
      chemPredicates: [],
      startTime: null,
      stopTime: null,
      timeArray: [],
      resultWithDrugs: [],
      geneTableToSave: [],
      chemTableToSave: [],
      hgncAll: [
     
      
        "HGNC:10596",
        "HGNC:15573",
        "HGNC:25566",
        "HGNC:11042",
        "HGNC:11098",
        "HGNC:16974",
        "HGNC:11444",
        "HGNC:11497",
        "HGNC:12303",
        "HGNC:12632",
      ],
      i: 0,
      progressTable: [],
      progressObject: {},
      geneIDList: [],
      currentDrug: "test",
      araxResultTable: [],
      ARSrequestID: "f92c8a10-551f-4086-a036-6f6e3162eb42",
      resultSetIDs: [],
      ARSResultStatus: {},
      ARSJobId: "bc32c185-6a97-4aff-b467-aa2fac22e275",
      // 0c2bff46-f20a-4761-859b-50b4d0b0ce83  Object from aragorn

// nodeGeneName
      //FAILED "HGNC:2348", "HGNC:13723", "HGNC:2514", "HGNC:2961", "HGNC:3373", reasoner_id
        //       {
        //     "subject": "ClinicalFinding",
        //     "object": "ClinicalFinding",
        //     "predicate": "correlated_with",
        //     "api": {
        //         "name": "Multiomics Wellness KP API",
        //         "smartapi": {
        //             "metadata": "https://raw.githubusercontent.com/Hadlock-Lab/multiomics_wellness_kp/main/multiomics_wellness.yaml",
        //             "id": "02af7d098ab304e80d6f4806c3527027",
        //             "ui": "https://smart-api.info/ui/02af7d098ab304e80d6f4806c3527027"
        //         },
        //         "x-translator": {
        //             "component": "KP",
        //             "team": [
        //                 "Multiomics Provider",
        //                 "Service Provider"
        //             ],
        //             "infores": "infores:biothings-multiomics-wellness"
        //         }
        //     }
        // },
    };
  },
  methods: {
    metagraph(){
      let example = metagraph.associations[0]
      let associations = metagraph.associations
      console.log("example")
      console.log(example)
      let metaTable =[]
      for (let i = 0; i < associations.length; i++) {
      // for (let i = 0; i < 10; i++) {
        let el = associations[i];
        let meta = {}
        meta.subject = el.subject
        meta.object = el.object
        meta.predicate = el.predicate
        meta.name = el.api.name
        meta.component = el.api["x-translator"].component
        meta.team = el.api["x-translator"].team
        meta.infores = el.api["x-translator"].infores
        metaTable.push(meta)
        console.log("meta")
        // console.log(meta)
        // console.log("el")
        // console.log(el)
        if(i == associations.length - 1){
        // if(i == 9){
          this.saveThisFile(metaTable, " metaTable")
        }

        
      }
      

    },
    showModal() {
      this.$refs["my-modal"].show();
      this.show_waiting_card = false;
    },
    async getAllSynOrtho (){
      let symbol = this.concept_search
      symbol = "mapk8ip3"
      let ensembleIDData = await NodeService.getAllSynOrtho(symbol)
      console.log(ensembleIDData)
      let ensemblIDs = ensembleIDData.data[0].homologies
      console.log("ensemblIDs")
      console.log(ensemblIDs)

      for (let i = 0; i < ensemblIDs.length; i++) {
        const ensemblID = ensemblIDs[i].id
        console.log("ensemblIDs[i].species")
        console.log(ensemblIDs[i].species)

        let orthoXREF = await NodeService.getXrefs(ensemblID)
        console.log("orthoXREF")
        console.log(orthoXREF)  

      }

    },
    openPubmed: function (pmid) {
      window.open("https://pubmed.ncbi.nlm.nih.gov/" + pmid, "_blank");
    },
    async tryARS() {

    // SET QUERY WITH SEARCH TERM
    // this.query.message.query_graph.nodes.n00.ids = [this.concept_search]

    // GET GENES REGULATING TARGET
      console.log("------ ARSService REQUEST STARTED")
      // console.log(ARSService)
      let ARSRequest = await ARSService.ARSQuery(this.query)
      console.log("ARSRequest")
      console.log(ARSRequest)
      // ARSStatus
      let ARSrequestID = ARSRequest.pk
      this.ARSrequestID = ARSrequestID
      this.ARScheckResults()

    },

    async ARScheckResults () {
      // let ARSStatus = await ARSService.ARSStatus(this.ARSrequestID)
      console.log("##### ##### ##### ##### ##### ##### ##### ")
      console.log("##### ARSStatus checked by rerunning")
      // console.log(ARSStatus)
      this.resultSetIDs = []

      ARSService.ARSStatus(this.ARSrequestID)
      .then(async (ARSStatus) => {
        console.log("ARSStatus")
        console.log(ARSStatus)
        let resultList  = ARSStatus.children

        for (let i = 0; i < resultList.length; i++) {
          console.log("----- ----- ----- ----- -----")


          const resInfo = resultList[i];
          console.log(resInfo.actor.agent)
          console.log(resInfo.code)
          console.log(resInfo.status)        
          let result = await ARSService.ARSStatus(resInfo.message)

          let agent = resInfo.actor.agent
          this.ARSResultStatus[agent] = {}
          this.ARSResultStatus[agent]["agent"] = agent
          this.ARSResultStatus[agent]["code"] = resInfo.code
          this.ARSResultStatus[agent]["status"] = resInfo.status
          this.ARSResultStatus[agent]["id"] = resInfo.message
          this.ARSResultStatus[agent]["resultCount"] = null
          this.ARSResultStatus[agent]["results"] = result

          // CHECK IF THERE IS A KNOWLEDGE GRAPH
          console.log(Object.prototype.hasOwnProperty.call(result, "message"))
          if(Object.prototype.hasOwnProperty.call(result, "message")){
            console.log("Has Knowledge Graph = ", (Object.prototype.hasOwnProperty.call(result.message, "knowledge_graph")))
          }else {
            console.log("Has Knowledge Graph = ", false)
          }

          // SHOW RESULTS
          console.log(result)  

          // IF THERE ARE  RESULTS SEND THEM TO BE CLEANED
          if(Object.prototype.hasOwnProperty.call(result, "message")){
            console.log("FOUND MESSAGE")
            if(Object.prototype.hasOwnProperty.call(result.message, "knowledge_graph")){
              console.log("FOUND KNOWLEDGE GRAPH")
              // if(result.message.results.length > 0){
                // console.log("HAS MORE THAN 0 RESULTS")
                this.ARSResultStatus[agent].resultCount = result.message.results.length
                
                let resultObj = {"agent": resInfo.actor.agent,"status": resInfo.status, "code": resInfo.code, "id": resInfo.message, "resultCount":  result.message.results.length}
                this.resultSetIDs.push(resultObj)
                // let cleanedResults = await TrapiResultClean.TrapiResultClean(result)
                // console.log("cleanedResults")
                // console.log(cleanedResults)
              // }
            }
          }

          
        // NOTE WHEN FINISHED
          if(i == resultList.length - 1){
            console.log("FINISHED GETTING ALL THE RESULTS")
            return
          }    
        }

      })
      .then(async () => {

        let keys = Object.keys(this.ARSResultStatus)
        console.log(this.ARSResultStatus)
        this.resultSetIDs = []
        console.log(keys)
        for (let i = 0; i < keys.length; i++) {
          const id = keys[i];
          console.log("id")
          console.log(id)
          this.resultSetIDs.push(this.ARSResultStatus[id])
          console.log("this.ARSResultStatus[id]")
          console.log(this.ARSResultStatus[id])
          
          if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results, "message")){
            if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.message, "knowledge_graph")){
              console.log("CLEANING RESULTS")
              let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results)
              console.log(cleanedResults)

            }

          }





          // if( this.ARSResultStatus[id].agent == "ara-aragorn"){
          //   console.log("TESTING INFO FROM ARAGORM")
          //   // console.log(this.ARSResultStatus[id].message.knowledge_graph.edges["0c2bff46-f20a-4761-859b-50b4d0b0ce83"])
          //   let test = this.ARSResultStatus[id].results.message.knowledge_graph.edges["0c2bff46-f20a-4761-859b-50b4d0b0ce83"]
          //   console.log(JSON.stringify(test))
          //   console.log(this.ARSResultStatus[id].results.message.knowledge_graph.edges["0c2bff46-f20a-4761-859b-50b4d0b0ce83"])
          //   // console.log(this.ARSResultStatus[id].message.knowledge_graph)
          // }
          
        }
      })    


    },
    async testSection () {
      console.log("search term = ", this.concept_search)
      let ARAXsyn = await  ARAXService.getARAXSynonyms(this.concept_search)
      console.log("ARAXsyn")
      console.log(ARAXsyn)

    },
    async eventLoop() {
      // concept_search

      
      this.progressTable = []
      this.progressObject= {}
      this.geneIDList = []
      let length = this.hgncAll.length;
      let i = 0;

      const EventEmitter = require("events");
      class Emitter extends EventEmitter {}
      const eventEmitter = new Emitter();
      eventEmitter.on("event", async () => {

     this.progressTable = []
      this.progressObject= {}
      this.geneIDList = []
        console.log("event emitted!");
        console.log(this.hgncAll[i]);

        // console.log("this.i < 2");
        // console.log(i < length - 1)
        console.log(i < 2);
        console.log("length = ", length);
        // console.log("i = ", i);
        // if(i < length ){
        if (i < length) {
          console.log("this.i < length - 1");
          this.concept_search = this.hgncAll[i];
          let test = await this.getAllSynToDrugs();
          // let test = await this.synonymtestemit()
          i++;
          console.log("test");
          console.log(test);
          eventEmitter.emit("event");
        }
      });

      eventEmitter.emit("event");
    },

    async synonymtestemit() {
      this.synonymsArray = [];

      return new Promise(async (resolve, reject) => { // eslint-disable-line
        

        let syns = await synonymService.allSynonyms(this.concept_search);
        console.log("syns");
        console.log(syns);
        resolve(syns);
        // .then(async (results)=>{
        //   console.log(results)
        // })
      });
    },
    async getAllSynToDrugs() {
      this.progressObject= {}
      this.timeArray = [];
      let time = { step: "start get synonyms", time: new Date(), gene: this.concept_search };
      this.timeArray.push(time);
      this.componentKey = this.componentKey + 1;

      try {
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          

          synonymService
            .allSynonyms(this.concept_search)
            .then(async (results) => {
              let time = { step: "got synonyms", time: new Date() };
              this.timeArray.push(time);
              this.componentKey = this.componentKey + 1;
              console.log(results);
              // this.synonymsArray = results.araxSynonyms_equivalentids
              this.synonymsArray = results.araxSynonyms_equivalentids.filter(
                (syn) =>
                  !syn.identifier.includes("ENSEMBL") &&
                  !syn.identifier.includes("REACT")
              );
              console.log(this.synonymsArray);
              // this.synonymsArray = results.allSynonyms
              // let synonymIdArray = results.synonymIdArray
              let query = this.queryjson;
              let rawResult = {};
              let cleanedResultArray = [];
              let searchType = "prot";
              query.message.query_graph.nodes.n1.category = searchType;

              // #########################
              // SEND ALL SYNONYMS THAT MAY HAVE A HIT FOR PROTEIN INTERACTION TO SEARCH MEDIK
              // TODO GET ALL FOR BOTH 'GENE' AND 'PROT'
              // #########################

              for (let i = 0; i < this.synonymsArray.length; i++) {
                const syn = this.synonymsArray[i].identifier;

                // console.log("---------")
                // console.log(syn)
                // console.log(typeof syn)
                if (typeof syn !== "undefined") {
                  // console.log(syn)
                  // console.log(!syn.includes("ENSEMBL"))
                  // console.log(!syn.includes("REACT"))
                  query.message.query_graph.nodes.n2.id = syn;
                  rawResult = await PostService.query_raw(query);

                  let cleanedResults = await TrapiResultClean.TrapiResultClean(
                    rawResult
                  );
                  // console.log("finished cleanedResults")

                  // console.log(cleanedResults)
                  this.synonymsArray[i].hitCount = cleanedResults.length;
                  this.synonymsArray[i].protHitCount = cleanedResults.length;
                  this.componentKey = this.componentKey + 1;
                  // console.log("this.synonymsArray[i].hitCount = ", this.synonymsArray[i].hitCount)
                  cleanedResultArray =
                    cleanedResultArray.concat(cleanedResults);
                }

                if (i == this.synonymsArray.length - 1) {
                  this.componentKey = this.componentKey + 1;
                  // console.log("cleanedResultArray from prot = ", cleanedResultArray)
                  for (let n = 0; n < cleanedResultArray.length; n++) {
                    cleanedResultArray[n].source = searchType;
                    if (n == cleanedResultArray.length - 1) {
                      this.onehitGeneProtList = cleanedResultArray;
                      time = { step: "got protein", time: new Date() };

                      this.timeArray.push(time);
                      this.componentKey = this.componentKey + 1;
                      return cleanedResultArray;
                    }
                  }
                }
              }
            })
            .then(async () => {
              // #########################
              // SEND ALL SYNONYMS THAT MAY HAVE A HIT FOR GENE INTERACTION TO SEARCH MEDIK
              // #########################
              let query = this.queryjson;
              let rawResult = {};
              let cleanedResultArray = [];
              let searchType = "gene";
              query.message.query_graph.nodes.n1.category = searchType;

              for (let i = 0; i < this.synonymsArray.length; i++) {
                const syn = this.synonymsArray[i].identifier;

                // console.log("---------")
                // console.log(syn)
                // console.log(typeof syn)
                if (typeof syn !== "undefined") {
                  // console.log(syn)
                  // console.log(!syn.includes("ENSEMBL"))
                  // console.log(!syn.includes("REACT"))
                  query.message.query_graph.nodes.n2.id = syn;
                  rawResult = await PostService.query_raw(query);

                  let cleanedResults = await TrapiResultClean.TrapiResultClean(
                    rawResult
                  );
                  // console.log("finished cleanedResults")

                  // console.log(cleanedResults)
                  this.synonymsArray[i].hitCount =
                    this.synonymsArray[i].hitCount + cleanedResults.length;
                  this.synonymsArray[i].geneHitCount = cleanedResults.length;

                  this.componentKey = this.componentKey + 1;
                  // console.log("this.synonymsArray[i].hitCount = ", this.synonymsArray[i].hitCount)
                  cleanedResultArray =
                    cleanedResultArray.concat(cleanedResults);
                }

                if (i == this.synonymsArray.length - 1) {
                  this.componentKey = this.componentKey + 1;
                  console.log(
                    "cleanedResultArray from gene = ",
                    cleanedResultArray
                  );
                  for (let n = 0; n < cleanedResultArray.length; n++) {
                    cleanedResultArray[n].source = searchType;
                    this.onehitGeneProtList.push(cleanedResultArray[n]);
                    if (n == cleanedResultArray.length - 1) {
                      console.log(this.onehitGeneProtList);
                      // this.onehitGeneProtList.concat(cleanedResultArray)

                      this.timeArray.push({
                        step: "got gene and concat them",
                        time: new Date(),
                      });
                      this.componentKey = this.componentKey + 1;
                      return this.onehitGeneProtList;
                    }
                  }
                }
              }
            })


            .then(async (results) => {
              // ##############################
              // GET SYNONYMS SO RESULTS THAT ARE THE SAME CAN BE COMBINED
              // ##############################

              for (let i = 0; i < results.length; i++) {
                try {
                  const element = results[i];
                  // getARAXSynonyms
                  let synonyms = await ARAXService.getARAXSynonyms(
                    element.object
                  );
                  results[i].objectSynonyms = synonyms;
                  // console.log("synonyms from arax = ", synonyms);
                  console.log("synonyms from arax");
                  results[i].groupID = "";

                  if (synonyms[element.object]) {
                    results[i].groupNormalID =
                      synonyms[element.object].id.SRI_normalizer_curie;
                  } else {
                    results[i].groupNormalID = element.object;
                  }

                  // console.log("result = ",element)
                  let object = results[i].object;
                  // console.log("object = ",object)
                  let synData = results[i].objectSynonyms[object];
                  results[i].chemSearchSynArray = [];
                  // if (synData != null) {
                    if (
                      Object.prototype.hasOwnProperty.call(synData, "nodes")
                    ) {
                      // console.log("FOUND NODES!!")

                      /*eslint no-unused-vars: ["error", { "caughtErrorsIgnorePattern": "^ignore" }]*/
                      let nodes = synData.nodes;
                      let chemSearchSynArray = [];
                      let HGNCidHold = "";
                      let PRidHold = "";
                      let UMLSHold = "";
                      let UniProtKBHold = "";
                      let NCBIGeneHold = "";
                      let NCITHold = "";
                      let removeValues = [
                        "UMLS:C0600388",
                        "UMLS:C0030956",
                        "UMLS:C1305923",
                        "NCIT:C735",
                        "UMLS:C0031727",
                        "PR:000000001",
                        "NCIT:C17021",
                        "UMLS:C0033684",
                        "UMLS:C0030956",
                        "UMLS:C1305923",
                        "NCIT:C735",
                        "UMLS:C0066772",
                      ];
                      // Protein complex = UMLS:C1180347
                      // protein polypeptide chain = PR:000000001 UMLS:C0033684 NCIT:C17021
                      // Phosphotransferases UMLS:C0031727
                      // peptide 'UMLS:C0030956', 'UMLS:C1305923', 'NCIT:C735'
                      // Extracellular Signal Regulated Kinases UMLS:C0600388

                      chemSearchSynArray = nodes.filter(
                        (node) => node.identifier
                      );
                      results[i].chemSearchSynArray = chemSearchSynArray;

                      for (let n = 0; n < nodes.length; n++) {
                        const node = nodes[n];
                        // console.log("node = ", node) //UniProtKB UMLS NCBIGene NCIT
                        if (removeValues.indexOf(node.identifier) == -1) {
                          if (node.identifier.includes("HGNC")) {
                            // console.log("found HGNC")
                            HGNCidHold = node.identifier;
                            // n = nodes.length
                          }
                          if (node.identifier.includes("UniProtKB")) {
                            UniProtKBHold = node.identifier;
                            chemSearchSynArray.push(node.identifier);
                          } else if (node.identifier.includes("PR:00")) {
                            PRidHold = node.identifier;
                            chemSearchSynArray.push(node.identifier);
                          } else if (node.identifier.includes("UMLS")) {
                            UMLSHold = node.identifier;
                            chemSearchSynArray.push(node.identifier);
                          } else if (node.identifier.includes("NCBIGene")) {
                            NCBIGeneHold = node.identifier;
                            chemSearchSynArray.push(node.identifier);
                          } else if (node.identifier.includes("NCIT")) {
                            NCITHold = node.identifier;
                            chemSearchSynArray.push(node.identifier);
                            console.log(UniProtKBHold, NCBIGeneHold, NCITHold);
                          }
                        }
                        if (n == nodes.length - 1) {
                          results[i].chemSearchSynArray = chemSearchSynArray;
                        }
                        if (n == nodes.length - 1 && HGNCidHold != "") {
                          results[i].groupID = HGNCidHold;
                        } else if (n == nodes.length - 1 && PRidHold != "") {
                          results[i].groupID = PRidHold;
                        } else if (n == nodes.length - 1 && UMLSHold != "") {
                          results[i].groupID = UMLSHold;
                        } else {
                          results[i].groupID = results[i].object;
                        }
                      }
                    }
                  // }

                  if (i == results.length - 1) {
                    return results;
                  }
                } catch (err) {
                  console.log(err);
                  if (i == results.length - 1) {
                    return results;
                  }
                }
              }
            })
            // .then(async (results) => {
            //   console.log("results = ", results)
            // })
            .then(async (results) => {
              // ##############################
              // GROUPING
              // SEPARATE AND GROUP BY THE PRESENCE OR LACK OF HGNC - THEN GROUP BY GROUPID OR NAME
              // ##############################
              this.timeArray.push({
                step: "SEPARATE AND GROUP BY THE PRESENCE OR LACK OF HGNC - THEN GROUP BY GROUPID OR NAME",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;
              // let noChebResutls = results.filter(result => result.groupID == "")
              let chebResutls = results.filter(
                (result) => result.groupID != ""
              );
              let groupedGroupID = [];
              let groupedGroupIDnormalNode = [];
              // groupedChebi = await TrapiResultClean.TrapiResultGroup(chebResutls, "objectCHEBI")
              groupedGroupID = await TrapiResultClean.TrapiResultGroup(
                chebResutls,
                "groupID"
              );
              groupedGroupIDnormalNode =
                await TrapiResultClean.TrapiResultGroup(
                  chebResutls,
                  "groupNormalID"
                );
              // let groupedObjName = []
              // groupedObjName= await TrapiResultClean.TrapiResultGroup(noChebResutls, "object")
              // console.log("groupedChebi")
              // console.log(groupedChebi)
              // console.log(Object.keys(groupedChebi))
              console.log("groupedGroupID");
              console.log(groupedGroupID);
              console.log("groupedGroupIDnormalNode");
              console.log(groupedGroupIDnormalNode);

              // console.log(Object.keys(groupedObjName))
              let groupKeys = Object.keys(groupedGroupID);
              // let objNameKeys = Object.keys(groupedObjName)
              let resultsArray = [];
              for (let i = 0; i < groupKeys.length; i++) {
                let obj = {};
                let id = groupKeys[i];
                obj.id = id;
                obj.data = groupedGroupID[id];
                resultsArray.push(obj);

                if (i == groupKeys.length - 1) {
                  console.log(
                    "grouped by synonyms for gene and protein = ",
                    resultsArray
                  );
                  return resultsArray;
                }
              }
            })
            // .then(async (allSynGeneResultsArray)=>{
            //   console.log("end = ", allSynGeneResultsArray)
            // })
            .then(async (allSynGeneResultsArray) => {
              // ##############################
              // REMOVE UNWANTED CURRIES THAT ARE TOO GENERAL AND UNWANTED PREDICATES
              // ##############################
              this.timeArray.push({
                step: "REMOVE UNWANTED CURRIES THAT ARE TOO GENERAL AND UNWANTED PREDICATES",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;
              let removeValues = [
                "UMLS:C0600388",
                "UMLS:C0030956",
                "UMLS:C1305923",
                "NCIT:C735",
                "UMLS:C0031727",
                "PR:000000001",
                "NCIT:C17021",
                "UMLS:C0033684",
                "UMLS:C0030956",
                "UMLS:C1305923",
                "NCIT:C735",
                "UMLS:C0597357",
                "UMLS:C0306371", // INSULTIN
              ];
              let badPredicates = [
                "Has gene product",
                "Subclass of",
                "Same as",
                "Subclass of",
              ];

              let synGeneResultsArray = allSynGeneResultsArray.filter(
                (synResult) => removeValues.indexOf(synResult.id) == -1
              );
              synGeneResultsArray = synGeneResultsArray.filter(
                (synResult) => badPredicates.indexOf(synResult.predicate) == -1
              );
              // synGeneResultsArray = synGeneResultsArray.map(synResult => badPredicates.indexOf(synResult.predicate) == -1)

              console.log("removed broad terms = ", synGeneResultsArray);
              for (let i = 0; i < synGeneResultsArray.length; i++) {
                const id = synGeneResultsArray[i].id;
                let synonymData = await synonymService.allSynonyms(id);
                let synonymsArray = [];
                // objectName
                synGeneResultsArray[i].groupName =
                  synGeneResultsArray[i].data[0].objectName;

                if (synonymData.araxSynonyms_equivalentids != null) {
                  synonymsArray = synonymData.araxSynonyms_equivalentids.filter(
                    (syn) =>
                      !syn.identifier.includes("ENSEMBL") &&
                      !syn.identifier.includes("REACT")
                  );
                  if (synonymsArray.length != 0) {
                    synGeneResultsArray[i].synonyms = synonymsArray;
                  } else {
                    synGeneResultsArray[i].synonyms = [
                      { identifier: synGeneResultsArray[i].id },
                    ];
                  }
                } else {
                  synGeneResultsArray[i].synonyms = [
                    { identifier: synGeneResultsArray[i].id },
                  ];
                  console.log("syn is undefined");
                }

                if (i == synGeneResultsArray.length - 1) {
                  this.timeArray.push({
                    step: "filterd generic gene curries and ensembl react synonyms",
                    time: new Date(),
                  });
                  this.componentKey = this.componentKey + 1;
                  console.log("synGeneResultsArray = ", synGeneResultsArray);
                  return synGeneResultsArray;
                  // return
                }
              }
              // synonymService.allSynonyms(this.concept_search)
            })
            .then((synGeneResultsArray) => {
              for (let i = 0; i < synGeneResultsArray.length; i++) {
                const geneData = synGeneResultsArray[i].data;
                synGeneResultsArray[i].predicateArray = [];
                synGeneResultsArray[i].predRegulates = false;
                for (let n = 0; n < geneData.length; n++) {
                  const pred = geneData[n].predicate;
                  if (
                    synGeneResultsArray[i].predicateArray.indexOf(pred) == -1
                  ) {
                    synGeneResultsArray[i].predicateArray.push(pred);
                  }
                  if (pred.includes("regul")) {
                    synGeneResultsArray[i].predRegulates = true;
                  }
                }
                if (i == synGeneResultsArray.length - 1) {
                  console.log(
                    "synGeneResultsArray with pred array = ",
                    synGeneResultsArray
                  );
                  return synGeneResultsArray;
                }
              }
            })
            // .then(async(resultsArray)=>{
            //   console.log("resultsArray REMOVE UNWANTED CURRIES THAT ARE TOO GENERAL AND UNWANTED PREDICATES")
            //   console.log(resultsArray)
            // })
            .then(async (resultsArray) => {
              if (this.status == false) {
                let filteredresultsArray = resultsArray.filter(
                  (result) => result.predRegulates
                );
                console.log(
                  "resultsArray with pFILTERED red array = ",
                  resultsArray
                );
                console.log(
                  "filteredresultsArray with pFILTERED red array = ",
                  filteredresultsArray
                );
                return filteredresultsArray;
              } else {
                return resultsArray;
              }
            })

            .then(async (resultsArray) => {
              if (resultsArray.length == 0) {
                resolve();
              }
              // ##############################
              // FILTER FOR CLEAR PREDICATES AND THEN GET CHEM FOR ALL TERMS AND ALL SYNONYMS
              // ##############################

              this.timeArray.push({
                step: "GETTING ALL CHEM RESULTS FOR ALL GENES AND SYNONYMS",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;
              console.log("resultsArray");
              console.log(resultsArray);

              let query = this.queryjson;
              let rawResult = {};
              // let cleanedResultArray = []
              query.message.query_graph.nodes.n1.category = "chem";
              // query.message.query_graph.nodes.n1.category = "chem"

              for (let i = 0; i < resultsArray.length; i++) {
                const synArray = resultsArray[i].synonyms;
                // console.log("resultsArray[i]")
                // console.log(resultsArray[i])
                resultsArray[i].chemResults = [];

                if (synArray != null) {
                  for (let n = 0; n < synArray.length; n++) {
                    const syn = synArray[n].identifier;
                    // console.log(syn);
                    query.message.query_graph.nodes.n2.id = syn;

                    rawResult = await PostService.query_raw(query);
                    // console.log("rawResult getting chem = " ,rawResult)
                    let cleanedResults = [];
                    if (rawResult != null) {
                      cleanedResults = await TrapiResultClean.TrapiResultClean(
                        rawResult
                      );
                      // console.log("########## finished cleanedResults")
                      // console.log(cleanedResults)
                      resultsArray[i].chemResults =
                        resultsArray[i].chemResults.concat(cleanedResults);
                    }
                  }
                }
                if (i == resultsArray.length - 1) {
                  this.componentKey = this.componentKey + 1;

                  return resultsArray;
                }
              }
            })
            // .then(async(resultsArray)=>{
            //   console.log("resultsArray")
            //   console.log(resultsArray)
            // })
            .then(async (resultsArray) => {
              // ##############################
              // FILTER OUT UNHELPFUL PREDICATES FOR CHEMICALS
              // STORE ALL RESULTS IN CHEMRESULTSALL - FILTER CHEMRESULTS BASED ON PREDICATES
              // ##############################
              this.timeArray.push({
                step: "FILTERING OUT AMBIGUOUS CHEM PREDICATES",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;

              for (let n = 0; n < resultsArray.length; n++) {
                const gene = resultsArray[n];
                gene.chemResultsAll = gene.chemResults;
                gene.chemResults = gene.chemResults.filter(
                  (chem) =>
                    chem.predicate.includes("regulate") ||
                    chem.predicate.includes("negat") ||
                    chem.predicate.includes("positiv") ||
                    chem.predicate.includes("increase") ||
                    chem.predicate.includes("decrease")
                );
                // this.chemPredicates = gene.chemResults.map(chem)
                for (let i = 0; i < gene.chemResults.length; i++) {
                  const chem = gene.chemResults[i];
                  if (this.chemPredicates.indexOf(chem.predicate) == -1) {
                    this.chemPredicates.push(chem.predicate);
                  }
                }
                if (n == resultsArray.length - 1) {
                  this.componentKey = this.componentKey + 1;

                  return resultsArray;
                }
              }
            })
            .then(async (resultsArray) => {
              // ##############################
              // CONSOLIDATE GENE INFO TO TOP LEVEL - FROM GENE.DATA
              // ##############################
              this.timeArray.push({
                step: "CONSOLIDATING GENE INFO TO TOP LEVEL - FROM GENE.DATA",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;

              // console.log("test resultsArray");
              // console.log(resultsArray);
              for (let index = 0; index < resultsArray.length; index++) {
                const gene = resultsArray[index];
                resultsArray[index].chemCountTotal =
                  resultsArray[index].chemResultsAll.length;
                resultsArray[index].chemCount =
                  resultsArray[index].chemResults.length;
                resultsArray[index].geneName = [];
                resultsArray[index].predicates = [];
                resultsArray[index].pubTableInfo = [];
                // console.log("gene.data");
                // console.log(gene.data);
                // CLEAN UP AND PUSH GENE INFO
                for (let n = 0; n < gene.data.length; n++) {
                  const genedata = gene.data[n];

                  let genedataPredicate = genedata.predicate.replace(
                    "biolink:",
                    ""
                  );
                  let objectName = genedata.objectName;

                  // console.log("resultsArray[index].predicates = ", resultsArray[index].predicates)
                  // console.log("genedataPredicate = ", genedataPredicate)
                  // console.log("resultsArray[index].geneName = ", resultsArray[index].geneName)
                  // console.log("objectName = ", objectName)
                  // let predicate = genedata.Predicate
                  if (resultsArray[index].geneName.indexOf(objectName) == -1) {
                    resultsArray[index].geneName.push(objectName);
                  }
                  if (
                    resultsArray[index].predicates.indexOf(genedataPredicate) ==
                    -1
                  ) {
                    resultsArray[index].predicates.push(genedataPredicate);
                  }
                }
                if (index == resultsArray.length - 1) {
                  this.resultWithDrugs = resultsArray;
                  return resultsArray;
                }
              }
            })
            .then(async (resultsArray) => {
              // ############################################################################################################
              // CREATE OBJECT FOR TRACKING PROGRESS OF FDA STATUS SEARCH
              // ############################################################################################################
              console.log(
                "resultsArray CONSOLIDATE GENE INFO TO TOP LEVEL - FROM GENE.DATA"
              );
              // console.log(resultsArray);
              for (let i = 0; i < resultsArray.length; i++) {
                let gene = resultsArray[i];
                this.geneIDList.push(gene.id)
                this.progressObject[gene.id] = {}
                this.progressObject[gene.id].id = gene.id
                this.progressObject[gene.id].groupName = gene.groupName
                this.progressObject[gene.id].chemCount = gene.chemCount
                this.progressObject[gene.id].chemCountTotal = gene.chemCountTotal
                this.progressObject[gene.id].FDACurrentCount = 0  
                this.progressObject[gene.id].synCurrentCount = 0  
                if(i == resultsArray.length -1){
                  // console.log("this.progressObject")
                  // console.log(this.progressObject)
                  return resultsArray
                }             
              }
              // this.progressTable = resultsArray.map(gene => ({id: gene.id,  groupName:gene.groupName , chemCount: gene.chemCount, chemCountTotal : gene.chemCountTotal, currentCount: 0}))
              // console.log("this.progressTable")
              // console.log(this.progressTable)

              // chemCount chemCountTotal groupName id
            })
            .then(async (resultWithDrugs) => {
              // ##############################
              // MAKE JSON FOR SAVING GENE INFO TO CSV
              // ##############################
              this.timeArray.push({
                step: "MAKE JSON FOR SAVING GENE INFO TO CSV",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;

              this.geneTableToSave = [];
              // GET GENE INFO FOR SAVE TABLE
              this.stopTime = new Date();
              console.log("resultWithDrugs after filter");
              // console.log(resultWithDrugs);
              for (let i = 0; i < resultWithDrugs.length; i++) {
                const gene = resultWithDrugs[i];
                for (let n = 0; n < gene.data.length; n++) {
                  const genedata = gene.data[n];
                  // console.log("genedata");
                  // console.log(genedata);
                  let pubInfo = {};
                  pubInfo.object = genedata.object;
                  pubInfo.subject = genedata.subject;
                  pubInfo.subjectName = genedata.subjectName;
                  pubInfo.objectName = genedata.objectName;
                  pubInfo.datacount = n;
                  pubInfo.geneDatalen = gene.data.length;
                  pubInfo.pubNumber = 0;
                  pubInfo.id = "";
                  // pubInfo.predicate = genedata.predicate
                  pubInfo.predicate = genedata.predicate.replace(
                    "biolink:",
                    ""
                  );
                  pubInfo.edgeprovider = genedata.edgeprovider;
                  // console.log(
                  //   "genedata.edgepublications = ",
                  //   genedata.edgepublications
                  // );

                  if (
                    gene.data[n].edgepublications == null ||
                    gene.data[n].edgepublications.length == 0
                  ) {
                    // await new Promise(resolve => setTimeout(resolve, 1000));
                    pubInfo.pub = " ";
                    pubInfo.pubNumber_x = 0;
                    // console.log("order ID = ", i, "-", n, "-none");
                    // pubInfo.id = "order ID = " + i + "-" + n + "-none"
                    // console.log("pubInfo");
                    // console.log(pubInfo);
                    // let resultTable = this.geneTableToSave
                    // console.log("resultTable")
                    // console.log(resultTable.length)
                    // console.log(resultTable)
                    this.geneTableToSave.push(pubInfo);
                  } else {
                    // try{
                    let pubs = genedata.edgepublications;
                    pubInfo.pub = pubs;

                    this.geneTableToSave.push(pubInfo);
                  }
                }
                if (i == resultWithDrugs.length - 1) {
                  console.log("ABOUT TO SAVE FILE");

                  // console.log(resultWithDrugs);
                  this.saveThisFile(this.geneTableToSave, "GENE GENE");
                  // console.log("this.geneTableToSave");
                  // console.log(this.geneTableToSave);

                  return resultWithDrugs;
                }
              }
            })
            // .then(async (resultsArray) => {
            //   console.log("resultsArray");
            //   console.log(resultsArray);
            // })
            // .then(async (resultWithDrugs) => {
            //   // ##############################
            //   // CREATE UID VERSION OF CSV
            //   // ##############################
            //   let trynewtable = [];
            //   for (let i = 0; i < this.geneTableToSave.length; i++) {
            //     const result = this.geneTableToSave[i];
            //     console.log("i = ", i);
            //     if (result.pub == null) {
            //       result.uid =
            //         result.object + result.subject + result.predicate;
            //       trynewtable.push(result);
            //     } else {
            //       for (let n = 0; n < result.pub.length; n++) {
            //         const pubID = result.pub[n];
            //         console.log("pubID = ", pubID);

            //         let pubresult = result;
            //         pubresult.edgepublications = pubID;
            //         pubresult.uid =
            //           pubresult.object +
            //           pubresult.subject +
            //           pubresult.predicate +
            //           pubID;
            //         trynewtable.push(pubresult);
            //       }
            //     }
            //     if (i == this.geneTableToSave.length - 1) {
            //       this.saveThisFile(trynewtable, " uid GENE GENE");
            //       console.log("trynewtable = =", trynewtable);
            //       return resultWithDrugs;
            //     }
            //   }
            //   let stringresultWithDrugs = JSON.stringify(resultWithDrugs);
            //   function download(content, fileName, contentType) {
            //     var a = document.createElement("a");
            //     var file = new Blob([content], { type: contentType });
            //     a.href = URL.createObjectURL(file);
            //     a.download = fileName;
            //     a.click();
            //   }
            //   download(
            //     stringresultWithDrugs,
            //     "resultWithDrugspreChemSyn.json",
            //     "text/plain"
            //   );
            //   return resultWithDrugs;
            // })
            .then(async (resultWithDrugs) => {
              // ##############################
              // GET CHEM SYNONYMS SO WE CAN GET FDA APPROVAL AND GROUP THEM USING UNIFIED ARAX ID - SRI_normalizer_curie
              // ##############################
              this.timeArray.push({
                step: "GET CHEM SYNONYMS SO WE CAN GET FDA APPROVAL AND GROUP THEM USING UNIFIED ARAX ID - SRI_normalizer_curie",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;

              console.log("resultWithDrugs chem synonyms process");
              // console.log(resultWithDrugs);
              let p = 0;
              for (let i = 0; i < resultWithDrugs.length; i++) {
                // console.log("############ i = ", i);
                // for (let i = 0; i < 5; i++) {
                const dgObject = resultWithDrugs[i];
                // console.log("dgObject.chemResults");
                // console.log(dgObject.chemResults);
                // if(dgObject.chemResults.length > 0){
              // ##############################
              // START - GET START TIME TO SEE WHAT AVERAGE TIME PER DRUG IS
              // ##############################                
                this.progressObject[dgObject.id].drugStartTime = new Date();

              // ##############################
              // START - GO THROUGH EACH DRUG
              // ##############################              
                for (let n = 0; n < dgObject.chemResults.length; n++) {
                  p++;

                   try {
                  if (p % 10 == 0) {
                    console.log("p chems have been proces = ", p);
                  }
                  resultWithDrugs[i].chemResults[n].objectChemblArray = [];
                  resultWithDrugs[i].chemResults[n].objectChemSynArray = [];
                  // for (let n = 0; n < 1; n++) {
                  const chemData = dgObject.chemResults[n];
                  this.currentDrug = chemData.objectName
                  // ##############################
                  // ADJUST COUNTER FOR FINDING CHEM SYNONYMS
                  // ##############################

                  this.progressObject[dgObject.id].synCurrentCount = n + 1
                  this.componentKey = this.componentKey + 1;

                  // ##############################
                  // END - ADJUST COUNTER FOR FINDING CHEM SYNONYMS
                  // ##############################

                  // console.log(dgObject) 
                  // console.log(chemData)
                  // console.log("chemData.object")
                  // console.log(chemData.object)
                  if(this.badChemResults.indexOf(chemData.object) == -1){
                    let startchemsyn = new Date()
                    let synonymData = await synonymService.chemSynonyms(
                      chemData.object
                    );
                    let endchemsyn = new Date()
                    // console.log("synonymData = ", synonymData);
                    console.log("synonymData = ");
                    console.log("chem turnaround syn time (sec)= ", (endchemsyn - startchemsyn)/1000 );

                    if (synonymData[chemData.object] != null) {
                      resultWithDrugs[i].chemResults[n].objectChemSynArray =
                        synonymData[chemData.object].nodes;
                      let chemblArray = synonymData[chemData.object].nodes.filter(
                        (node) => node.identifier.includes("CHEMBL")
                      );
                      resultWithDrugs[i].chemResults[n].objectChemblArray =
                        chemblArray;
                      resultWithDrugs[i].chemResults[n].objectAraxid =
                        synonymData[chemData.object].id.identifier;
                      if (
                        synonymData[chemData.object].id.SRI_normalizer_curie ==
                        null
                      ) {
                        resultWithDrugs[i].chemResults[n].objectSRINormid =
                          chemData.object;
                      } else {
                        resultWithDrugs[i].chemResults[n].objectSRINormid =
                          synonymData[chemData.object].id.SRI_normalizer_curie;
                      }
                    }
                  }

                  // if(n == 10){
                  //   n = dgObject.chemResults.length
                  // }
                  if (n == dgObject.chemResults.length - 1) {
                    // console.log(
                    //   "done with chembl array = ",
                    //   resultWithDrugs[i].chemResults[n]
                    // );
                    this.progressObject[dgObject.id].drugStopTime = new Date();
                    this.progressObject[dgObject.id].drugTotalTime = (this.progressObject[dgObject.id].drugStOPTime - this.progressObject[dgObject.id].drugStopTime) /1000
                  }
                  }
                  catch (err){
                    console.error(err)
                    this.timeArray.push({
                      step: "error - GET CHEM SYNONYMS SO WE CAN GET FDA APPROVAL AND GROUP THEM USING UNIFIED ARAX ID - SRI_normalizer_curie",
                      time: new Date(),
                    });
                    if (n == dgObject.chemResults.length - 1) {
                      // console.log(
                      //   "done with chembl array = ",
                      //   resultWithDrugs[i].chemResults[n]
                      // );
                    }
                  }
                  
                }
                // }

                if (i == resultWithDrugs.length - 1) {
                  console.log(
                    "FINISHED GETTING CHEMBL AND HOPE I DID MORE THAN ONE GENE"
                  );
                  this.timeArray.push({
                    step: "GOT ALL POSSIBLE CHEMBL CURRIE ",
                    time: new Date(),
                  });
                  this.componentKey = this.componentKey + 1;
                  return resultWithDrugs;
                }
              }
            })

            .then(async (resultWithDrugs) => {
              // ##############################
              // GET FDA APPROVAL STATUS FOR DRUGS WITH CHEMBL ID
              // ##############################
              this.timeArray.push({
                step: "GET FDA APPROVAL STATUS FOR DRUGS WITH CHEMBL ID",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;

              // let stringresultWithDrugs = JSON.stringify(resultWithDrugs)
              // function download(content, fileName, contentType) {
              //       var a = document.createElement("a");
              //       var file = new Blob([content], {type: contentType});
              //       a.href = URL.createObjectURL(file);
              //       a.download = fileName;
              //       a.click();
              //   }
              // download(stringresultWithDrugs, 'resultWithDrugsWSynbeforeFDA.json', 'text/plain');
              // let testdata = resultWithDrugs
              // console.log(testdata)
              for (let i = 0; i < resultWithDrugs.length; i++) {
                // console.log("@@@@@@@@@@@ gene count = ", i);


                const gene = resultWithDrugs[i];

                let chems = gene.chemResults;
                // console.log("chems = ", chems);
                for (let n = 0; n < chems.length; n++) {

              // ##############################
              // GET CALCULATING PROGRESS 
              // ##############################
              
                try {
                  let geneID = gene.id
                  this.progressObject[geneID].FDACurrentCount = n +1
                  // console.log("## CALC PROGRESS ##")
                  
                  // this.progressObject[geneID].currentCount = i
                  this.componentKey = this.componentKey + 1;
                }
                catch {
                  // console.log("progress NO WORKY")
                }

              // ##############################
              // END - GET CALCULATING PROGRESS
              // ##############################
                  const chem = chems[n];
                  this.componentKey = this.componentKey + 1;
                  this.currentDrug = chem.objectName
                  let chembls = chem.objectChemblArray;
                  resultWithDrugs[i].chemResults[n].objectChemFDA = 0;
                  // console.log("hit # = ", i, "-", n);
                  // try{

                  // console.log("gene")
                  // console.log(gene)
                  // console.error(err)
                  if (chembls != null && chembls.length > 0) {
                    // console.log("chembls != null", chembls != null)
                    // console.log("chems = ", chems)
                    // console.log("chem = ", chem)
                    // console.log("chembls = ", chembls)
                    for (let x = 0; x < chembls.length; x++) {
                      const chembl = chembls[x];
                      // console.log("chembl.identifier")
                      // console.log(chembl.identifier)
                      let drugNameConceptData = await PostService.getConcept(
                        chembl.identifier
                      );
                      // console.log(
                      //   "drugNameConceptData = ",
                      //   drugNameConceptData
                      // );
                      try {
                        // let asArray = Object.entries(
                        //   drugNameConceptData["concepts"]["rtx2_2021_02_04"][chembl.identifier]
                        // );
                        let attArray =
                          drugNameConceptData["concepts"]["rtx2_2021_02_04"][
                            chembl.identifier
                          ].attributes;
                        // console.log("attArray = ", attArray)
                        // console.log(asArray)
                        let attfiltered = attArray.filter(
                          (att) => att.name == "description"
                        );
                        // console.log("attfiltered length= ", attfiltered.length)
                        // console.log("attfiltered = ", attfiltered)
                        let descriptionArray = attfiltered[0].value.split(";");
                        // console.log("descriptionArray = ", descriptionArray)

                        if (
                          attfiltered[0].value.includes(
                            "MAX_FDA_APPROVAL_PHASE"
                          )
                        ) {
                          for (let m = 0; m < descriptionArray.length; m++) {
                            const descript = descriptionArray[m];
                            if (descript.includes("MAX_FDA_APPROVAL_PHASE")) {
                              let fda = parseInt(descript.split(" ")[2]);
                              // console.log("FDA = ", fda);
                              // console.log(descript.split(" "));
                              if (
                                fda >
                                resultWithDrugs[i].chemResults[n].objectChemFDA
                              ) {
                                resultWithDrugs[i].chemResults[
                                  n
                                ].objectChemFDA = fda;
                              }
                            }
                          }
                        }
                      } catch (err) {
                        console.error(
                          i,
                          "-",
                          x,
                          "  - error getting rtx data - likely none available"
                        );
                        console.error(err);
                      }
                    }
                  }
                }

                if (i == resultWithDrugs.length - 1) {
                  this.timeArray.push({
                    step: "CHECKED FDA APPROVAL FOR ALL CHEMBL IDS",
                    time: new Date(),
                  });
                  this.componentKey = this.componentKey + 1;
                  // console.log("resultWithDrugs");
                  // console.log(resultWithDrugs);
                  return resultWithDrugs;
                }
              }
            })
            .then(async (resultWithDrugs) => {
              // ##############################
              // MAKE TABLE FOR DRUG RESULTS
              // ##############################
              this.timeArray.push({
                step: "MAKE TABLE FOR DRUG RESULTS",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;
              // let resultWithDrugs =  importResultWithDrugs
              this.geneTableToSave = [];
              // let resultWithDrugs =  "importResultWithDrugs"
              // GET GENE INFO FOR SAVE TABLE
              console.log("making drug table to convert to csv");

              // drugToGenePrintTable
              for (let i = 0; i < resultWithDrugs.length; i++) {
                const gene = resultWithDrugs[i];
                this.drugToGenePrintTable = this.drugToGenePrintTable.concat(
                  gene.chemResults
                );
                console.log("this.drugToGenePrintTable.length");
                // console.log(this.drugToGenePrintTable.length)
                if (i == resultWithDrugs.length - 1) {
                  for (let n = 0; n < this.drugToGenePrintTable.length; n++) {
                    // const drugInfo = this.drugToGenePrintTable[n];
                    delete this.drugToGenePrintTable[n].edgeinfo;
                    delete this.drugToGenePrintTable[n].edgepublicationsText;
                    // delete this.drugToGenePrintTable[n].objectAtt;
                    delete this.drugToGenePrintTable[n].objectChemSynArray;
                    delete this.drugToGenePrintTable[n].pubInfo;
                    // delete this.drugToGenePrintTable[n].subjectAtt;
                    // console.log("this.drugToGenePrintTable[n]")
                    // console.log(this.drugToGenePrintTable[n])
                    if (n == this.drugToGenePrintTable.length - 1) {
                      console.log("about to save file");
                      this.saveThisFile(
                        this.drugToGenePrintTable,
                        "DRUG GENE "
                      );
                    }
                  }
                }
              }
              return resultWithDrugs;
            })
            .then(async () => {
              // ##############################
              // SAVE TABLE FOR DRUG RESULTS
              // ##############################
              this.timeArray.push({
                step: "SAVE TABLE FOR DRUG RESULTS",
                time: new Date(),
              });
              this.componentKey = this.componentKey + 1;
              for (let i = 0; i < this.timeArray.length; i++) {
                this.timeArray[i].gene = this.concept_search;
                if (i == this.timeArray.length - 1) {
                  this.saveThisFile(
                    this.timeArray,
                    this.concept_search + "TIME "
                  );
                  resolve(
                    "!@#$#@!@#$#@!@#$#@! - FINISHED FOR " + this.concept_search
                  );
                  return;
                }
              }
            })
            .catch((error) => {
              console.error("error ");
              console.error(error);
              reject(" ^^^^^^^^^^^^^ - REJECTED FOR " + this.concept_search);
            });
        });
      } catch (err) {
        console.error(err);
      }
    },

    async getGeneSynonyms() {
      // SEND HGNC TO GET ALL SYNONYMS
      PostService.getGeneSynonyms(this.concept_search)
        .then(async (geneinfo) => {
          //GETGENESYNONYMS - PULLS OUT THE DESIRED GENE INFO FROM THE CONCEPT FUNCTION

          // ADD BACK THE HGNC ID
          geneinfo.HGNC = this.concept_search;

          // GETT THE PARENT TERM FOR PR SYNONYM
          //the parent_id is the general form of the gene that is not species specific - it is also the only one that has drug resutls in the textmining KG

          console.log(geneinfo.PR);
          this.queryjson_subclass["message"]["query_graph"]["nodes"]["n2"][
            "id"
          ] = geneinfo.PR;
          let query = this.queryjson_subclass;
          // "api/posts/query/" - URL USED FOR QUERYMEDIK SERVICE
          console.log("query");
          console.log(query);
          console.log(
            "getPRparent query = ",
            await PostService.getPRparent(query)
          );
          // let PRparentData = await PostService.queryMedik(query);
          geneinfo.PRparent = await PostService.getPRparent(query);
          return geneinfo;

        })

        .then(async (geneinfo) => {
          console.log("********* skipped UMLS");
          console.log("got UMLS info = ", geneinfo);
          let nodes = {};
          let edges = {};

          // let currieTypes = ["HGNC","PRparent", "UniProtKB", "NCBI", "umls"]
          let currieTypes = ["HGNC", "PRparent", "UniProtKB", "NCBI"];
          for (let i = 0; i < currieTypes.length; i++) {
            const currietype = currieTypes[i];

            let currie = geneinfo[currietype];

            if (typeof currie !== "undefined") {
              this.query.message.query_graph.nodes.n2.id = currie;
              let queryResults = await PostService.query_raw(this.query);
              console.log(currie);
              console.log(currietype);
              console.log("queryResults");
              console.log(queryResults);
              // console.log(queryResults.message.knowledge_graph.edges );

              edges = {
                ...edges,
                ...queryResults.message.knowledge_graph.edges,
              };

              nodes = {
                ...nodes,
                ...queryResults.message.knowledge_graph.nodes,
              };
            }
            if (i == currieTypes.length - 1) {
              console.log("edges");
              console.log(edges);
              console.log("nodes");
              console.log(nodes);
              this.nodelist = Object.keys(nodes);
              return { edges: edges, nodes: nodes };
            }
          }
        })
        .then((results) => {
          console.log(results);
          let nodes = results.nodes;
          let edgekeys = Object.keys(results.edges);

          let combinedEdgeNodes = [];

          for (let i = 0; i < edgekeys.length; i++) {
            let ggData = {};
            let edgeid = edgekeys[i];
            let edge = results.edges[edgeid];
            let subject = edge.subject;
            let object = edge.object;

            // ggData.edgeAtt = edge.attributes;
            ggData.geneTwo = edge.object;
            ggData.geneOne = edge.subject;
            ggData.predicate_gg = edge.predicate;
            ggData.relation_gg = edge.relation;
            // ggData.geneOneAtt = nodes[subject].attributes;
            // ggData.geneTwoAtt = nodes[object].attributes;
            ggData.geneOneName = nodes[subject].name;
            ggData.geneTwoName = nodes[object].name;
            ggData.geneOneCat = nodes[subject].category;
            ggData.geneTwoCat = nodes[object].category;

            combinedEdgeNodes.push(ggData);

            if (i == edgekeys.length - 1) {
              return combinedEdgeNodes;
            }
          }
        })
        .then(async (results) => {
          console.log(results);
          let drugquery = this.query;

          // let nodePlusSynonyms = []
          for (let i = 0; i < results.length; i++) {
            const result = results[i];
            results[i].drugInfo = [];
            // GET SYNONYMS OF ALL GENES
            let synResults = await PostService.getSynonyms(result.geneOne);
            console.log(synResults);
            let synonyms = synResults.synonyms;
            let synkeys = Object.keys(synonyms);

            /// ######### needs review below #########
            for (let n = 0; n < synkeys.length; n++) {
              let syn = synkeys[n];
              let nodedata = {};
              nodedata.node = result.geneOne;
              nodedata.PRparent = "";
              nodedata.showSyn = "";

              drugquery.message.query_graph.nodes.n1.category = "chem";
              drugquery.message.query_graph.nodes.n2.id = syn;

              if (
                (syn.startsWith("NCBI") ||
                  syn.startsWith("UniProtKB") ||
                  syn.startsWith("PR") ||
                  syn.startsWith("UMLS")) &&
                syn != "PR:000000001"
              ) {
                let queryDrugResults = {};

                if (syn.startsWith("PR")) {
                  // HAVE TO GET PARENT BEFORE GETTING CHEMICALS
                  this.queryjson_subclass["message"]["query_graph"]["nodes"][
                    "n2"
                  ]["id"] = syn;
                  let PRparent = await PostService.getPRparent(
                    this.queryjson_subclass
                  );

                  // GET DRUG DATA ON PARENT
                  drugquery.message.query_graph.nodes.n2.id = PRparent;
                  queryDrugResults = await PostService.query_raw(drugquery);
                  // console.log("syn = ", syn)
                  // console.log({queryDrugResults})
                  nodedata.synonym = syn;
                  nodedata.drugs = queryDrugResults;
                  nodedata.PRparent = PRparent;
                  nodedata.showSyn = PRparent;
                  results[i].drugInfo.push(nodedata);
                } else {
                  // IF NOT PR CURRIE THEN CAN GET CHEM DATA
                  queryDrugResults = await PostService.query_raw(drugquery);
                  // console.log("syn = ", syn)
                  // console.log({queryDrugResults})
                  nodedata.synonym = syn;
                  nodedata.showSyn = syn;
                  nodedata.drugs = queryDrugResults;
                  results[i].drugInfo.push(nodedata);
                }
              }
            }
            if (i == results.length - 1) {
              return results;
            }
          }
        })
        .then(async (results) => {
          console.log(results);
          let tableResults = [];

          for (let i = 0; i < results.length; i++) {
            const result = results[i];

            for (let n = 0; n < result.drugInfo.length; n++) {
              const drug = result.drugInfo[n];
              // console.log(drug)
              let drugedges =
                drug["drugs"]["message"]["knowledge_graph"]["edges"];
              // console.log("drugedges = ", drugedges)
              let drugnodes =
                drug["drugs"]["message"]["knowledge_graph"]["nodes"];
              // console.log("drugnodes = ", drugnodes)

              let drugedgekeys = Object.keys(drugedges);
              for (let x = 0; x < drugedgekeys.length; x++) {
                let dggResult = {};
                const key = drugedgekeys[x];
                let drug = drugedges[key];
                // console.log("drug")
                // console.log(drug)

                // dggResult.edgeAtt = result.edgeAtt;
                dggResult.geneTwo = result.geneTwo;
                dggResult.geneOne = result.geneOne;
                dggResult.predicate_gg = result.predicate_gg;
                dggResult.relation_gg = result.relation_gg;
                // dggResult.geneOneAtt = result.geneOneAtt;
                // dggResult.geneTwoAtt = result.geneTwoAtt;
                dggResult.geneOneName = result.geneOneName;
                dggResult.geneTwoName = result.geneTwoName;
                dggResult.geneOneCat = result.geneOneCat;
                dggResult.geneTwoCat = result.geneTwoCat;
                dggResult.showSyn = drug.showSyn;
                // dggResult.drugAtt = drug.atrributes;
                dggResult.predicateAtt_dg = drug.attributes;
                dggResult.predicate_dg = drug.predicate;
                dggResult.drug = drug.subject;
                dggResult.drugName = drugnodes[drug.subject].name;
                dggResult.drugCat = drugnodes[drug.subject].category;
                // dggResult.drugAtt = drugnodes[drug.subject].attributes;

                tableResults.push(dggResult);
                // nodedata.showSyn
              }
            }
            if (i == results.length - 1) {
              console.log("tableResults");
              console.log(tableResults);
              return tableResults;
            }
          }
        })
        .then(async (results) => {
          console.log("finished table results");
          console.log(results);
          // const result = words.filter(word => word.length > 6);
          let filteredResults = results.filter(
            (result) =>
              this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) >
                -1 ||
              this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) >
                -1
          );
          let filteredResultsmore = results.filter(
            (result) =>
              this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) >
                -1 &&
              this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) >
                -1
          );
          console.log("filteredResults = ", filteredResults);

          // let predicateArray = []
          // let predicateAllArray = []
          console.log("filteredResults = ", filteredResults);
          console.log("filteredResultsmore = ", filteredResultsmore);
          this.filteredResultsmore = filteredResultsmore;
          // for (let index = 0; index < results.length; index++) {
          //   const result = results[index];
          //   predicateAllArray.push(result.predicate_dg)

          //   // console.log("pred index = ", predicateArray.indexOf(result.predicate_dg))

          //   if(predicateArray.indexOf(result.predicate_dg) == -1){
          //     predicateArray.push(result.predicate_dg)
          //   }
          //   if(predicateArray.indexOf(result.predicate_gg) == -1){
          //     predicateArray.push(result.predicate_gg)
          //   }

          //   if(index == results.length - 1){
          //     return {"predicateArray": predicateArray, "predicateAllArray": predicateAllArray}
          //   }
          // }
        });
      // .then((predicateArray)=>{
      //   console.log("predicateArray")
      //   console.log(predicateArray.predicateArray)
      //   //predicateAllArray
      //   console.log("predicateAllArray")
      //   console.log(predicateArray.predicateAllArray)
      // })
    },

    async getalldrugs() {
      this.headerBg = "primary";
      this.show_waiting_card = true;
      this.waitingfor_text = "Getting some gene info";
      this.cardVariant = this.cardVariantArray[Math.floor(Math.random() * 10)];
      this.parentjson = {};
      this.synonym_drugs = [];
      this.synonyms_tosearch = [];
      this.synonym_tabledata = [];
      this.synonym_tabledata = [];
      this.busy = true;
      this.groupedResultsTable = [];
      console.log("concept_search");
      console.log(this.concept_search);
      // SEND HGNC TO GET ALL SYNONYMS
      PostService.getConcept(this.concept_search)
        .then((result) => {
          console.log("concept");
          console.log({ result });
          // GET THE GENE NAME AND INFO TO DISPLAY
          let concepts = result.concepts;
          console.log({ concepts });
          for (const [key] of Object.entries(concepts)) {
            // console.log(`${key}`);
            if (key.startsWith("rtx")) {
              // console.log(key);
              let rtx = concepts[key];

              for (const [key] of Object.entries(rtx)) {
                // console.log(`${key}`);
                if (key == this.concept_search) {
                  // console.log("rtx[key]");
                  // console.log(rtx[key]);
                  let hgnc = rtx[key];
                  let geneinfo = {};
                  geneinfo.hgnc_name = hgnc.name;
                  // this.geneInfo.hgnc_synonyms = ""
                  // console.log("hgnc.attributes")
                  // console.log(hgnc.attributes)
                  for (let index = 0; index < hgnc.attributes.length; index++) {
                    const element = hgnc.attributes[index];
                    // console.log(element)
                    if (element.name == "synonym") {
                      geneinfo.hgnc_synonyms = element.value;
                      this.geneInfo = geneinfo;
                    }
                  }
                }
              }
            }
            let prowl = concepts["pr-owl"];
            console.log("prowl[this.concept_search]");
            console.log(prowl[this.concept_search]);
            this.geneInfo.prowl_symbol = prowl[this.concept_search].name;
            // console.log("this.geneInfo");
            // console.log(this.geneInfo);
          }

          // GET THE PR CURIE AND MAKE THE JSON FOR THE QUERY TO GET THE PARENTS

          // return new Promise(resolve, reject => {
          console.log("after gotconcept data - now get synonyms");
          // console.log(this.synonyms_tosearch)
          this.waitingfor_text = "Getting the synonyms";
          this.cardVariant =
            this.cardVariantArray[Math.floor(Math.random() * 10)];

          this.cardVariant = "warning";
          // ERROR HANDLING IN CASE THERE ARE NO SYNONYMS
          if (result.synonyms.length == 0) {
            this.modal_text = "THERE WERE NO SYNONYMS";
            this.showModal();
            throw new Error("NO SYNONYMS FOUND");
          } else {
            // THIS.SYN_IDS IS WHAT HOLDS THE IDS UNTIL THEY ARE CLEANED UP TO SEND FOR DRUGS
            this.syn_ids = Object.keys(result.synonyms);
            this.synonyms = Object.keys(result.synonyms);
            // console.log("syn_ids = ", this.syn_ids);
            // GET THE SYNONYM CURIES THAT WILL BE SEARCH - ncbi and UniProtKB
            let ncbiCurie = this.syn_ids.find((id) => id.startsWith("NCBI"));
            let uniprotCurie = this.syn_ids.find((id) =>
              id.startsWith("UniProtKB")
            );
            this.synonyms_tosearch.push(ncbiCurie);
            this.synonyms_tosearch.push(uniprotCurie);
            // GET THE PR SYNONYM CURIES THAT WILL BE USED TO GET PARENT
            let pr_id = this.syn_ids.find((id) => id.startsWith("PR"));
            this.pr_id = this.syn_ids.find((id) => id.startsWith("PR"));
            // ABOVE NEEDED LATER

            // console.log("pr_id = ", pr_id);
            // USE THE TEMPLATE AND ADD IN THE PR FROM THE QUERY
            this.queryjson_subclass["message"]["query_graph"]["nodes"]["n2"][
              "id"
            ] = pr_id;
            // console.log(this.queryjson_subclass);
            return this.queryjson_subclass;
            // reject(this.queryjson)
            // queryMedik
            // } catch(err) {
            //   reject(console.log("ERROR - NO SYNONYMS FOUND"))
            // }

            // });
          }
        })
        .catch((err) => {
          console.log("ERROR - GETTING SYNONYMS AND STORING SEARCH TERMS", err);
          this.errorSteps.push(
            "ERROR - GETTING SYNONYMS AND STORING SEARCH TERMS"
          );
          this.errorSubMessage =
            "Most likely this is due to a timeout: mediK is tired because someone asked for all the drugs that are associated with any disease!";
          this.modal_text = "ERROR - GETTING SYNONYMS AND STORING SEARCH TERMS";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async (query) => {
          console.log("get pr parent - this.synonyms_tosearch");
          this.waitingfor_text = "Finding PR parents";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];

          // console.log(this.synonyms_tosearch);
          //  GET PARENT PR - USE QUERYMEDIK TO SEND QUERY TO
          console.log("query");
          console.log(query);
          // console.log(await PostService.queryMedik(query))
          // "api/posts/query/" - URL USED FOR QUERYMEDIK SERVICE
          let parent_result = await PostService.queryMedik(query);
          this.parentjson = parent_result;
          // console.log("parent_result");
          // console.log({parent_result});
          let nodes = parent_result["message"]["knowledge_graph"]["nodes"]; // returns 3 nodes that include the search term and the two parents
          let node_ids = Object.keys(nodes);
          // console.log({nodes})
          // console.log({node_ids})
          // console.log("node_ids.length = " , node_ids.length)
          for (let index = 0; index < node_ids.length; index++) {
            //exclude the unwnated parent and the original search term
            const parent_id = node_ids[index];
            // console.log({parent_id})
            // console.log(parent_id != "PR:000029067")
            // console.log(parent_id != this.pr_id)
            if (parent_id != "PR:000029067" && parent_id != this.pr_id) {
              // PR:000029067 is the id for all human proteins
              this.synonyms_tosearch.push(parent_id);
              this.syn_ids.push(parent_id);
              this.parentID = parent_id;
              // console.log("***** parent_id")
              // console.log(parent_id)
              return parent_id;
            }

            //the parent_id is the general form of the gene that is not species specific - it is also the only one that has drug resutls in the textmining KG
          }
        })
        .catch((err) => {
          console.log("ERROR - GETTING PR PARENT AND STORING", err);
          this.errorSteps.push("ERROR - GETTING PR PARENT");

          this.modal_text = "ERROR - GETTING PR PARENT AND STORING";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async () => {
          console.log("got pr parent - this.synonyms_tosearch");
          console.log("getting UMLS from mongo - this.synonyms_tosearch");
          this.waitingfor_text = "Getting the UMLS term from HGNC";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          // console.log(this.synonyms_tosearch);
          // GET THE UMLS ID FROM THE HGNC ID FROM THE MONGO DB THAT WAS SET UP FROM SCRAPEING UMLS DATA FILES
          // console.log("this.syn_ids");
          // console.log(this.syn_ids);
          let parent_result = await PostService.mongoumls(this.syn_ids); // send all of the ids, but only one will have a match in the mondgo db set up for this
          this.parentjson = parent_result;
          // [0]["UMLS"]
          this.synonyms_tosearch.push(parent_result[0]["UMLS"]);
          // console.log("this.synonyms_tosearch");
          // console.log(this.synonyms_tosearch);
          return;
        })
        .catch((error) => {
          console.error(error.message);
          this.modal_text = "ERROR - GETTING GETTING UMLS FROM MONGO";
          this.errorSteps.push("ERROR - GETTING UMLS FROM MONGO");
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async () => {
          this.waitingfor_text = "Getting drugs from NCBI curie";
          console.log("GETTING DRUGS FOR NCBI CURIE");
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          // console.log("get NCBI - this.synonyms_tosearch");
          // console.log(this.synonyms_tosearch);
          // GET RESULTS FROM NCBI TERMS
          let ncbiCurie = this.synonyms_tosearch.find((id) =>
            id.startsWith("NCBI")
          );
          console.log("ncbiCurie");
          console.log(ncbiCurie);

          if ((typeof ncbiCurie == "undefined") | (ncbiCurie.length == 0)) {
            return;
          } else {
            let drugsReturned = await PostService.queryPost(ncbiCurie);
            // console.log({ drugsReturned });
            // console.log(drugsReturned)
            this.ncbiResults = drugsReturned;
            this.synonym_tabledata = drugsReturned;
            console.log("end -ncbi  this.synonyms_tosearch");
            // console.log(this.synonyms_tosearch)

            console.log(this.synonym_tabledata);
            return;
          }
        })
        .catch((error) => {
          console.error("ERROR - getting NCBI results", error.message);
          this.errorSteps.push("ERROR - GETTING NCBI results");
          this.modal_text = "ERROR - GETTING NCBI RESULTS";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async () => {
          this.waitingfor_text = "Getting drugs from Uniprot curie";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          console.log("get UniProtKBCurie - this.synonyms_tosearch");
          // console.log(this.synonyms_tosearch);
          // GET RESULTS FROM NCBI TERMS
          let UniProtKBCurie = this.synonyms_tosearch.find((id) =>
            id.startsWith("UniProtKB")
          );
          // console.log("UniProtKBCurie");
          // console.log(UniProtKBCurie);

          if (
            (typeof UniProtKBCurie == "undefined") |
            (UniProtKBCurie.length == 0)
          ) {
            return;
          } else {
            console.log("GETTING DRUGS FOR UNIPROTKB CURIE");

            let drugsReturned = await PostService.queryPost(UniProtKBCurie);
            this.uniprotResults = drugsReturned;
            // console.log({ drugsReturned });
            console.log(drugsReturned);
            this.synonym_tabledata =
              this.synonym_tabledata.concat(drugsReturned);
            console.log("end UniProtKB - this.synonyms_tosearch");
            // console.log(this.synonyms_tosearch)

            // console.log(this.synonym_tabledata);
            return;
          }
        })
        .catch((error) => {
          console.error("ERROR - getting UniProtKB results", error.message);
          this.errorSteps.push("ERROR - GETTING UniProt results");
          this.modal_text = "ERROR - GETTING UniProt";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async () => {
          this.waitingfor_text = "Getting drugs from UMLS curie";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          console.log("GETTIING UMLS RESULTS");
          // console.log(this.synonyms_tosearch);
          // GET RESULTS FROM UMLS TERMS
          let UMLSCurie = this.synonyms_tosearch.find((id) =>
            id.startsWith("UMLS")
          );
          console.log("UMLSCurie");
          console.log(UMLSCurie);

          if ((typeof UMLSCurie == "undefined") | (UMLSCurie.length == 0)) {
            console.log("ERROR - NO UMLSCURRIE");
            return;
          } else {
            let drugsReturned = await PostService.queryPost(UMLSCurie);
            console.log("GETTING DRUGS FOR UMLS CURIE");
            this.umlsResults = drugsReturned;
            // console.log({ drugsReturned });
            // console.log("UMLS RESULTS")
            console.log(this.umlsResults);
            this.synonym_tabledata =
              this.synonym_tabledata.concat(drugsReturned);
            console.log("end UMLSCurie - this.synonyms_tosearch");
            // console.log(this.synonyms_tosearch)

            // console.log(this.synonym_tabledata);
            return;
          }
        })
        .catch((error) => {
          console.error("getting UMLS results", error.message);
          this.errorSteps.push("ERROR - GETTING UMLS Results");
          this.modal_text = "ERROR - GETTING UniProt";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(async () => {
          this.waitingfor_text = "Getting drugs from PR curie";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          console.log("get PR - this.synonyms_tosearch");
          // console.log(this.synonyms_tosearch);
          // GET RESULTS FROM PRCurie TERMS
          let PRCurie = this.synonyms_tosearch.find((id) =>
            id.startsWith("PR")
          );
          // console.log("PRCurie");
          // console.log(PRCurie);

          if ((typeof PRCurie == "undefined") | (PRCurie.length == 0)) {
            return;
          } else {
            let drugsReturned = await PostService.queryPost(PRCurie);
            console.log("GETTING DRUGS FOR PR CURIE");

            this.prResults = drugsReturned;
            // console.log({ drugsReturned });
            console.log(drugsReturned);
            this.synonym_tabledata =
              this.synonym_tabledata.concat(drugsReturned);
            console.log("end UMLSCurie - this.synonyms_tosearch");
            // console.log(this.synonyms_tosearch)

            // console.log(this.synonym_tabledata);
            return;
          }
        })
        .catch((error) => {
          console.error("ERROR - getting PRCurie results", error.message);
          this.errorSteps.push("ERROR - GETTING PRCurie results");
          this.modal_text = "ERROR - GETTING PRCurie results";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(() => {
          // GETTING LIST OF UNIQUE SUBJECT AND PREDICATES
          this.waitingfor_text = "CLEANING UP THE DATA";
          // this.cardVariant = this.cardVariantArray[
          //   Math.floor(Math.random() * 10)
          // ];
          console.log("FIXING PREDICATES AND SUBJECTS - REMOVE BIOLINK PREFIX");
          // syn_ids[index].includes('NCBI')
          // selectedFilters
          for (let index = 0; index < this.synonym_tabledata.length; index++) {
            const drug = this.synonym_tabledata[index];

            if (drug.predicate.indexOf(":") > -1) {
              let fixpred =
                this.synonym_tabledata[index].predicate.split(":")[1];
              drug.predicate_cleaned = fixpred;
              this.synonym_tabledata[index].predicate_cleaned = fixpred;
            } else {
              this.synonym_tabledata[index].predicate_cleaned =
                this.synonym_tabledata[index].predicate;
            }

            // GET ARRAY TO MAKE FILTER CHECK LIST
            if (
              this.synonym_tabledata_predicates.indexOf(drug.predicate) == -1
            ) {
              // ADD UNIQUE PREDICATE THAT IS NOT ALREADY IN THE ARRARY OF PREDICATES
              this.synonym_tabledata_predicates.push(drug.predicate);

              // ADD ALL OF THE FILTERS FOR THE CHECKBOX TO BE CHECKED EXCEPT THE VAGUE ONE
              if (this.synonym_tabledata[index].relation != "SIO:000001") {
                this.selectedFilters.push(drug.predicate);
              }
              // synonym_tabledata_predicates
            }

            if (
              this.synonym_tabledata_objects.indexOf(drug.object_name) == -1
            ) {
              this.synonym_tabledata_objects.push(drug.object_name);
            }

            if (index == this.synonym_tabledata.length - 1) {
              console.log(
                "FINISHED - FIXING PREDICATES AND SUBJECTS - REMOVE BIOLINK PREFIX"
              );
              console.log(new Date());
              return;
              // console.log(this.filter_counttype)
            }
          }
        })
        .catch((error) => {
          console.error("EERROR - GETTING UNIQUE PREDICATES", error.message);
          this.errorSteps.push("ERROR - Cleaning unique prediicates");
          this.modal_text = "ERROR - GETTING CLEANING PREDICATES FOR FILTER";
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(() => {
          console.log("GETTING THE FILTER DATA");
          this.totalRows = this.synonym_tabledata.length;
          console.log(this.filter_counttype);
          console.log(new Date());
          this.exporttable = this.synonym_tabledata;
          let predfixarray = {};
          for (let i = 0; i < this.synonym_tabledata.length; i++) {
            let element = this.synonym_tabledata[i].predicate_cleaned;
            // console.log(element)
            let predkeys = Object.keys(predfixarray);
            if (predkeys.indexOf(element) == -1) {
              predfixarray[element] = { value: element, count: 1 };
              this.filter_counttype[element] = { value: element, count: 1 };

              // predfixarray.push(element)
              // console.log(" found unique element");
              // console.log(element);
            } else {
              try {
                // console.log("this.filter_counttype[element]")
                // console.log(this.filter_counttype[element])
                this.filter_counttype[element]["count"] =
                  this.filter_counttype[element]["count"] + 1;
                predfixarray[element]["count"] =
                  predfixarray[element]["count"] + 1;
              } catch {
                console.error(
                  "ISSUE WITH this.filter_counttype[element][count]"
                );
                // console.log(this.filter_counttype);
                // console.log(element);
                // console.log(this.filter_counttype[element]);
              }

              //
            }

            if (i == this.synonym_tabledata.length - 1) {
              console.log("DONE WITH FILTERS");
              let filterarray = Object.keys(predfixarray);
              let collectFilters = [];
              for (let n = 0; n < filterarray.length; n++) {
                const filter = filterarray[n];
                // console.log(filter)

                if (filter != "related_to") {
                  // this.selectedFilters.push(filter);
                  collectFilters.push(filter);
                }
                if (n == filterarray.length - 1) {
                  this.filter_counttype = predfixarray;
                  this.selectedFilters = [];
                  this.waitingfor_text = "";
                  this.headerBg = "success";
                  this.show_waiting_card = false;
                  this.waitingfor_text = "Nothing! Fiinished!";
                  this.selectedFilters = collectFilters;
                  console.log(this.synonym_tabledata);

                  return;
                }
              }
              // console.log(this.filter_counttype);
              // console.log(predfixarray);
              // this.filter_counttype = predfixarray;
              // this.selectedFilters = [];
              // this.waitingfor_text = "";
              // this.headerBg = "success"
              // this.show_waiting_card = false
              // this.waitingfor_text = "Nothing! Fiinished!";
              for (const filter in predfixarray) {
                // console.log("checking all but related to");
                // console.log(filter);
                // const filter = predfixarray[n];
                if (filter != "related_to") {
                  this.selectedFilters.push(filter);
                }
              }
            }
          }
        })
        .catch((error) => {
          console.error("EERROR - CREATIING FILTER", error.message);
          this.modal_text = "ERROR - MAKING FILTER";
          this.errorSteps.push("ERROR - MAKING FILTER");
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(() => {
          this.modal_text = "CLEANING UP DRUGS - GROUPING BY NAME";
          // GROUPING ALL OF THE RESULTS BY DRUG NAME
          console.log("table = ", this.synonym_tabledata);
          console.log("length = ", this.synonym_tabledata.length);
          // let i = 0
          let groupabledrugs = this.synonym_tabledata.map((item) => {
            try {
              item.group_subject_name = item.subject_name.toLowerCase();
            } catch {
              console.log("########### ITEM FAILED #############");
              console.log(item);
            }

            // console.log(i)
            // i++
            // console.log("item = ", item)

            return item;
          });

          // let result = this.synonym_tabledata.reduce(function (r, a) {
          let result = groupabledrugs.reduce(function (r, a) {
            r[a.group_subject_name] = r[a.group_subject_name] || [];
            r[a.group_subject_name].push(a);
            return r;
          }, Object.create(null));

          console.log(result);
          console.log(typeof result);
          console.log("ogroup count = ", Object.keys(result).length);
          this.groupedResults = result;
        })
        .catch((error) => {
          console.error("ERROR - GROUPING DRUGS BY NAME", error.message);
          this.modal_text = "ERROR - GROUPING DRUGS BY NAME";
          this.errorSteps.push("ERROR - GROUPING DRUGS BY NAME");
          this.showModal();
          throw new Error("Ran out of coffee");
        })
        .then(() => {
          this.modal_text =
            "CLEANING UP DRUGS - ORGANIZING THE DATA INTO A TABLE";
          // REORGANIZING THE DATA STRUCTURE TO MAKE IT EASIER FOR THE TABLE
          console.log("this.groupedResults");
          console.log(this.groupedResults);
          let organized_grouped_drugs = [];

          let keys = Object.keys(this.groupedResults);
          // console.log("this.groupedResults")
          // console.log(this.groupedResults)
          // console.log("keys")
          // console.log(keys)
          for (let index = 0; index < keys.length; index++) {
            let obj = {};
            const key = keys[index];
            console.log(key);
            obj.name = key;
            obj.data = this.groupedResults[key];
            // console.log("this.groupedResults[key]")
            // console.log(this.groupedResults[key])
            // console.log("obj")
            // console.log(obj)
            organized_grouped_drugs.push(obj);
            if (index == keys.length - 1) {
              console.log("organized_grouped_drugs");
              console.log(organized_grouped_drugs);
              return organized_grouped_drugs;
            }
          }
        })
        .then((results) => {
          // SUMMARIZE THE GROUPED DATA
          console.log("results from organized group drugs");
          console.log(results);
          for (let i = 0; i < results.length; i++) {
            const drug = results[i];
            results[i].relation = [];
            results[i].fda_original = [];
            results[i].publications = [];
            results[i].publicationsListAll = [];
            results[i].moreInfo = false;
            results[i]._showDetails = false;
            results[i].geneSymbol = this.geneInfo.prowl_symbol;
            // results[i].publications2 = []
            // results[i].publications3 = []
            // console.log("drug")
            // console.log(drug)
            let data = drug.data;
            for (let n = 0; n < data.length; n++) {
              //ELEMENT IS THE JSON OF THE DATA USED IN THE OLD TABLE ON EACH EDGE
              const element = data[n];

              // CLEAN UP THE PUBLICATIONS AND UNIQUE THEM
              // console.log(Object.prototype.hasOwnProperty.call(element, "publications"))
              results[i].publications.concat(element.publications);
              if (
                Object.prototype.hasOwnProperty.call(element, "publications")
              ) {
                // if(element.pubLength > 0){
                // SET UP OBJECT TO CAPTURE EDGE PUBLICATION RELATIONSHIP
                let predicate_pub = {
                  predicate: element.predicate_cleaned,
                  pubids: [],
                  direction: "",
                };

                //  CATEGORIZE PREDICATES FOR EACH EDGE - THIS WILL ALLOW FOR READER DESCRIMINATION WHEN REVIEWIN THE LIT
                if (
                  this.predicate_increase.indexOf(element.predicate_cleaned) >
                  -1
                ) {
                  predicate_pub.direction = "Increase";
                } else if (
                  this.predicate_decrease.indexOf(element.predicate_cleaned) >
                  -1
                ) {
                  predicate_pub.direction = "Decrease";
                } else {
                  predicate_pub.direction = "Ambiguous";
                }

                for (
                  let index = 0;
                  index < element.publications.length;
                  index++
                ) {
                  let pubid = element.publications[index];
                  // console.log("pubid")
                  // console.log(pubid.replace(/\//g, ""))
                  pubid = pubid.replace(/\(/g, "");
                  pubid = pubid.replace(/\)/g, "");
                  pubid = pubid.replace(/\[/g, "");
                  pubid = pubid.replace(/\]/g, "");
                  pubid = pubid.replace(/,/g, "");
                  pubid = pubid.replace(/"/g, "");
                  pubid = pubid.split(" ");

                  // results[i].publications = results[i].publications.concat(pubid)
                  // results[i].publications2.push(pubid)
                  predicate_pub.pubids.push(pubid);

                  // console.log("results[i].publicationsListAll.indexOf(pubid)")
                  // console.log(results[i].publicationsListAll)
                  // console.log(pubid[0])
                  // console.log(results[i].publicationsListAll.indexOf(pubid[0]))

                  if (results[i].publicationsListAll.indexOf(pubid[0]) == -1) {
                    results[i].publicationsListAll.push(pubid[0]);
                  }
                  if (index == element.publications.length - 1) {
                    results[i].publications.push(predicate_pub);
                  }
                }
              }

              try {
                results[i].relation.push(element.predicate_cleaned);
                results[i].fda_original.push(element.fdaApproved);
              } catch (error) {
                console.log(error);
              }
            }
            if (i == results.length - 1) {
              // console.log("results")
              // console.log(results)
              return results;
            }
          }
        })
        .then(async (results) => {
          // USE CONCEPT SERVICE TO GET RELATED CONCEPTS AND FIND THE CHEMBL RTX THAT WILL HAVE FDA APPROVAL
          console.log("GETTING FDA APROVAL INFO FROM RTX CHMBL DATA");
          for (let index = 0; index < results.length; index++) {
            const drugName = results[index].name;
            results[index].chembl = "";
            results[index].rtx = { attributes: [] };
            // console.log(drugName)

            // if(drugName != "" && drugName != "acid"){
            if (this.badResults.indexOf(drugName) == -1) {
              let drugNameConceptData = await PostService.getConcept(drugName);
              //  results[index].rtx = []

              try {
                let asArray = Object.entries(
                  drugNameConceptData["concepts"]["rtx2_2021_02_04"]
                );
                let asfilteredArray = asArray.filter(([key, value]) => {
                  if (
                    key.includes("CHEMBL") &&
                    drugName.toLowerCase() == value.name.toLowerCase()
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                });
                console.log("asfilteredArray");
                console.log(asfilteredArray);

                results[index].rtx = asfilteredArray[0][1];
                results[index].chembl = asfilteredArray[0][0];
                console.log(results[index].rtx);

                if (index == results.length - 1) {
                  return results;
                }
              } catch {
                // console.error("error getting rtx data - likely none available");
                if (index == results.length - 1) {
                  return results;
                }
              }
            }
            if (index == results.length - 1) {
              return results;
            }
          }
        })
        .then((results) => {
          console.log(
            "CONTINUE CONSOLIDATION - PROCESS RAW DATA FOR FDA- GET FDA APPROVAL STATUS - AND SIMPLIFY DIRECTION RELATIONSHIP"
          );
          // console.log(results)
          // let intersection = arrA.filter(x => arrB.includes(x));
          for (let index = 0; index < results.length; index++) {
            const element = results[index];
            console.log("this.geneInfo");
            console.log(this.geneInfo);
            results[index].geneSymbol = this.geneInfo.prowl_symbol;
            results[index].predicate_increase =
              element.relation.filter((x) =>
                this.predicate_increase.includes(x)
              ).length > 0;
            results[index].predicate_decrease =
              element.relation.filter((x) =>
                this.predicate_decrease.includes(x)
              ).length > 0;
            results[index].predicate_ambiguous =
              element.relation.filter((x) => !this.predicate_both.includes(x))
                .length > 0;
            // let increase_matches = element.relation.filter((x) =>
            //   this.predicate_increase.includes(x)
            // );
            // let decrease_matches = element.relation.filter((x) =>
            //   this.predicate_decrease.includes(x)
            // );
            // let ambiguos_matches = element.relation.filter(
            //   (x) => !this.predicate_both.includes(x)
            // );
            // console.log(element.name);
            // console.log("increase = ", increase_matches);
            // console.log("decrease = ", decrease_matches);
            // console.log("ambiguous = ", ambiguos_matches);

            //SET FDA STATUS TO NEGATIVE AND THEN CHANGE IT IF SOMETHING IS FOUND
            results[index].fdaDescription = "No FDA Information Found";
            results[index].fdaApproved = "0";

            if (Object.prototype.hasOwnProperty.call(element, "rtx")) {
              let rtx = element.rtx.attributes;
              for (let i = 0; i < rtx.length; i++) {
                const element = rtx[i];
                try {
                  if (element.name == "description") {
                    // console.log("element")
                    // console.log(element)
                    if (element.value.includes("FDA")) {
                      let description = element.value
                        .split("; ")
                        .filter((el) => el.includes("FDA"));
                      console.log("FDA = ", description);
                      console.log("FDA = ", description[0]);

                      results[index].fdaDescription = description[0];
                      results[index].fdaApproved =
                        results[index].fdaDescription.split(" ")[1];
                      console.log(results[index].fdaApproved);
                      console.log(results[index].fdaDescription);
                    } else {
                      results[index].fdaDescription =
                        "No FDA Information Found";
                      results[index].fdaApproved = "0";
                    }
                  }
                } catch (error) {
                  console.error(error);
                  console.log(element);
                }
              }
            } else {
              results[index].rtx = { data: "none" };
              results[index].fda = "No FDA Information Found";
            }

            if (index == results.length - 1) {
              return results;
            }
          }
        })
        .then((results) => {
          for (let i = 0; i < results.length; i++) {
            const drug = results[i];
            drug.filtertags = [];
            if (drug.predicate_ambiguous) {
              drug.filtertags.push("ambiguous");
              this.filtercategories.ambiguous.count++;
            }
            if (drug.predicate_decrease) {
              drug.filtertags.push("decrease");
              this.filtercategories.decrease.count++;
            }
            if (drug.predicate_increase) {
              drug.filtertags.push("increase");
              this.filtercategories.increase.count++;
            }
            if (drug.fdaApproved != "0") {
              drug.filtertags.push("fda");
              this.filtercategories.fda.count++;
            }

            results[i].edgeids = [];

            for (let n = 0; n < drug.data.length; n++) {
              const data = drug.data[n];
              results[i].edgeids.push(data.key);
            }

            if (i == results.length - 1) {
              this.groupedResultsTable = results;
              this.busy = false;
              console.log(results);
            }
          }
        });
    },

    saveThisFile(file, nametag) {
      let text = "";
      console.log("save result");

      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = file[index];
        // console.log(result);

        let headers = Object.keys(result);
        // console.log({headers})

        if (index == 0) {
          // console.log("headers index == 0");
          // HEADER ROW
          for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            // if(i == 0){
            //   text = "gene,"
            // }
            if (i != headers.length - 1) {
              text = text + header + ",";
            } else {
              text = text + header + "\r\n";
            }
          }
        }
        // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
        for (let n = 0; n < headers.length; n++) {
          let header = headers[n];
          let cell = JSON.stringify(result[header]);
          // let cell = result[header]
          // console.log("cell = ", cell)

          try {
            cell = cell.replace(/,/gi, ";");
          } catch (err) {
            console.error(err);
          }
          // if(n == 0){
          //   text = this.geneInfo.prowl_symbol + ','

          // }
          if (n != headers.length - 1) {
            text = text + cell + ",";
          } else {
            text = text + cell + "\r\n";
          }
        }
      }

      let filename =
        this.concept_search + "-" + nametag + " two hop results.csv";
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);
      console.log("file saved!!");
    },
    saveFile() {
      let text = "";
      console.log("save result");

      for (let index = 0; index < this.geneToGenePrintTable.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = this.geneToGenePrintTable[index];
        console.log(result);

        let headers = Object.keys(result);
        // console.log({headers})

        if (index == 0) {
          console.log("headers index == 0");
          // HEADER ROW
          for (let i = 0; i < headers.length; i++) {
            const header = headers[i];
            // if(i == 0){
            //   text = "gene,"
            // }
            if (i != headers.length - 1) {
              text = text + header + ",";
            } else {
              text = text + header + "\r\n";
            }
          }
        } else {
          // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
          for (let n = 0; n < headers.length; n++) {
            let header = headers[n];
            let cell = JSON.stringify(result[header]);
            // let cell = result[header]
            console.log("cell = ", cell);

            try {
              cell = cell.replace(/,/gi, ";");
            } catch (err) {
              console.error(err);
            }
            // if(n == 0){
            //   text = this.geneInfo.prowl_symbol + ','

            // }
            if (n != headers.length - 1) {
              text = text + cell + ",";
            } else {
              text = text + cell + "\r\n";
            }
          }
        }
      }

      let filename = this.concept_search + "two hop results for review.csv";
      let element = document.createElement("a");
      element.setAttribute(
        "href",
        "data:application/json;charset=utf-8," + encodeURIComponent(text)
      );
      element.setAttribute("download", filename);

      element.style.display = "none";
      document.body.appendChild(element);

      element.click();
      document.body.removeChild(element);

      //########## BELOW IS OLDS CODE
      // credit: https://www.bitdegree.org/learn/javascript-download
      // let text = JSON.stringify(this.groupedResultsTable);
      // let filename = "cats.json";
      // let element = document.createElement("a");
      // element.setAttribute(
      //   "href",
      //   "data:application/json;charset=utf-8," + encodeURIComponent(text)
      // );
      // element.setAttribute("download", filename);

      // element.style.display = "none";
      // document.body.appendChild(element);

      // element.click();
      // document.body.removeChild(element);
    },

    async getPubmed(item, index) {
      console.log("***** START getPubmed");
      console.log("index = ", index);
      console.log(item);
      console.log(this.groupedResultsTable[index]);

      if (item._showDetails) {
        // this.$set(item, '_showDetails', false)
        this.groupedResultsTable[index]._showDetails = false;
      } else {
        //   console.log(item);
        // console.log(index);
        // console.log(fields)

        let pubs = item.publicationsListAll;
        let pubString = "";
        for (let n = 0; n < pubs.length; n++) {
          console.log("started pub loop");
          const pub = pubs[n];
          pubString = pubString.concat(",", pub);

          if (n == pubs.length - 1) {
            try {
              let pubmedurl =
                "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" +
                pubString +
                "&rettype=json";
              // let pubmedurl =
              // "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334&rettype=json";
              // "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334,30612693&rettype=json";

              console.log("link2 = ", pubmedurl);
              const res = await axios.get(pubmedurl);

              const xmlData = res.data;
              // console.log("xmlData")
              // console.log(xmlData)
              var pmjson = parser.parse(xmlData);
              // console.log("length = ",pmjson.PubmedArticleSet.PubmedArticle.length);
              // console.log( pmjson.PubmedArticleSet.PubmedArticle);
              // let articles = []
              // articles.push(pmjson.PubmedArticleSet.PubmedArticle)
              let pub = [];
              if (Array.isArray(pmjson.PubmedArticleSet.PubmedArticle)) {
                pub = pmjson.PubmedArticleSet.PubmedArticle;
              } else {
                pub.push(pmjson.PubmedArticleSet.PubmedArticle);
              }

              // console.log(pmjson.PubmedArticleSet)
              console.log(Array.isArray(pmjson.PubmedArticleSet.PubmedArticle));
              // console.log("length = ", pmjson.PubmedArticleSet.PubmedArticle.length)
              // console.log(pmjson)
              // console.log(pub)

              let pubData = await PubCleanService.cleanPubmed(pub);
              console.log("pubData processsed");
              console.log(pubData);
              this.groupedResultsTable[index].pubData = pubData;
              this.groupedResultsTable[index]._showDetails = true;
              console.log(this.groupedResultsTable);
              console.log("index = ", index);
              console.log(this.groupedResultsTable[index]);
              console.log("***** END getPubmed");

              // this.$set(item, '_showDetails', true)
              // let newitem = item
              // newitem._showDetails = true
              // item = Object.assign({}, item, newitem)
              // let filterdata = this.filteredTableData
              // this.filteredTableData = filterdata
              this.groupedTableKey += 1;
            } catch (err) {
              console.error(err);
            }
          }
        }
      }
    },
    filterTable(row, filter) {
      // this.filtercount = 0
      if (filter.indexOf(row.predicate_cleaned) == -1) {
        return false;
      } else {
        // this.filtercount++
        return true;
      }
    },
    filterTableCategories(row, filter) {
      // this.filtercount = 0
      console.log("######## NEW ROW ########", row.name);
      if (filter.length == 0) {
        return true;
      } else {
        // let truecount = []
        let selectedfilter = filter;
        let intersection = selectedfilter.filter((x) =>
          row.filtertags.includes(x)
        );

        console.log("intersection = ", intersection);
        if (intersection.length == filter.length) {
          return true;
        } else {
          return false;
        }

        // for (let index = 0; index < filter.length; index++) {
        //   const filteritem = filter[index];
        //   // console.log("filteritem = ", filteritem)
        //   // console.log("filtertags = ", row.filtertags)
        //   // console.log(row.filtertags.indexOf(filteritem))

        //   if(row.filtertags.indexOf(filteritem) == -1){
        //     // console.log("returned false for", filteritem)
        //     return false
        //   } else {
        //     // console.log("returned true for ", filteritem)
        //     return true
        //   }

        // }
      }

      // if (filter.indexOf(row.predicate_cleaned) == -1) {
      //   return false;
      // } else {
      //   // this.filtercount++
      //   return true;
      // }
    },
    onFiltered(filteredItems) {
      // console.log(filteredItems);
      console.log("filteredItems = ", filteredItems);
      this.filtercount = filteredItems.length;
      // this.currentPage = 1
    },
    showwidth() {
      // let divElement = this.$id["svgnetwork"]
      let divElement = this.$refs;
      console.log("divElement");
      console.log(divElement);
      // document.body.getElementById(‘id’);
    },
  },
  filters: {
    pretty: function (value) {
      // console.log(typeof value)
      // let fixedvalue = {}
      // fixedvalue.tabledata = value
      return JSON.stringify(value, null, 1);
    },
  },
  computed: {
    lineGenerator() {
      return d3
        .line()
        .x((v) => v[0])
        .y((v) => v[1]);
    },
    d() {
      return this.lineGenerator(this.dataset);
    },
    //     divwidth(){
    //       // console.log(this.$refs["svgnetwork"])
    //       let divElement = this.$refs["svgnetwork"]
    //       console.log("divElement")
    //       console.log(divElement)
    //       // let width = divElement.getAttribute('width');
    // // let height = divElement.getAttribute('height');
    // return divElement
    //     },

    // relationFilters: function() {
    //   let uniqueRelations = [];

    //   return this.synonym_tabledata.filter(drug => {
    //     if (uniqueRelations.indexOf(drug.predicate_cleaned) == -1) {
    //       uniqueRelations.push(drug.predicate_cleaned);
    //       return drug.predicate_cleaned;
    //     }
    //   });
    // },
    synonym_tabledata_filtered: function () {
      // synonym_tabledata
      return this.synonym_tabledata.filter((drug) => {
        if (this.selectedFilters.indexOf(drug.predicate) == -1) {
          // uniqueRelations.push(drug.predicate)
          return drug.predicate;
        }
      });
    },
    validation() {
      // concept_search
      let split = this.concept_search.split(":");
      let splitlength = split.length == 2;
      let split0 = split[0] == "HGNC";
      let split1 = Number.isInteger(parseInt(split[1]));
      console.log({ splitlength });
      console.log({ split0 });
      console.log({ split1 });

      if (splitlength && split0 && split1) {
        return true;
      } else {
        return false;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* div.container { max-width: 800px; margin: 0 auto; } */
.colwidth {
  max-width: 100px;
}
.db_colwidth {
  max-width: 10px;
}
.pub_colwidth {
  max-width: 50px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

/* 
p.error {
  border: 1px solid #ff5b5f;
  background-color: #ffc5c1;
  padding: 10px;
  margin-bottom: 15px;
}

div.post {
  position: relative;
  border: 1px solid #5bd658;
  background-color: #bcffb8;
  padding: 10px 10px 30px 10px;
  margin-bottom: 15px;
}

div.created-at {
  position: absolute;
  top: 0;
  left: 0;
  padding: 5px 15px 5px 15px;
  background-color: darkgreen;
}

p.text {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 0;
} */
</style>