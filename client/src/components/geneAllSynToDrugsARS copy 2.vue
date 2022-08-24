<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">ARS DRUG TO GENE QUERY NEXT</h1>

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
                    v-on:click="testNormalization"
                    >testNormalization
                  </b-button>
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="secondary"
                    v-on:click="eventLoop2"
                    :disabled="!validation"
                    >eventLoop2
                  </b-button> -->

                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="testSection"
                    >testSection
                  </b-button> -->
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="tryARS2"
                    >tryARS2
                  </b-button>                  
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="tryARS"
                    >tryARS
                  </b-button> -->
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="success"
                    v-on:click="getAllOrthSyns"
                    >getAllOrthSyns
                  </b-button> -->
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="success"
                    v-on:click="trans2R"
                    >trans2R
                  </b-button> -->
                  <!-- <b-form-checkbox
                    style="margin-left: 20px"
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
                  >
                    Check to include all results {{ status == "false" }} :
                    {{ status == false }}
                  </b-form-checkbox> -->

                  <!-- <div>
                    State: <strong>{{ status }}</strong>
                  </div> -->

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
                    v-on:click="openARAX"
                    >openARAX
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

      <b-container style="margin-top: 20px" :key="componentKey" fluid>
        <b-row>
                          <b-card
                  header="featured"
                  header-tag="header"
                  :key="componentKey"
                  style="width: 100%"
                >
                  <template #header>
                    <h6 class="mb-0">Current result count:</h6>
                    <!-- concept_search -->
                  </template>
                  <!-- <h4 class="mb-0">Symbol: {{ concept_search }}</h4> -->
                  <br />
                      <div v-if = "showARS">
        <!-- <h3 class="p-3 text-center">Vue.js - Display a list of items with v-for</h3> -->
        <table class="table table-striped table-bordered" >
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Code</th>
                    <th>Status</th>
                    <th>ID</th>
                    <th>Count</th>
                    <th>Icon</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="result in ARSResultStatus" :key="result.id">
                    <td>{{result.agent}} </td>
                    <td>{{result.code}}</td>
                    <td>{{result.status}}</td>
                    <!-- <td>{{result.status}}</td> -->
                    <td>{{result.id}}</td>
                    <td>{{result.resultCount}}</td>
                    <td><b-icon
                    v-if="result.status == 'Running'"
                    style="margin-left: 5px"
                    icon="circle-fill"
                    animation="throb"
                    font-scale="2"
                  ></b-icon></td>
                </tr>
            </tbody>
        </table>
        {{ARSResultStatus}}
    </div> 
                  <br />
                <!-- <b-table
                  bordered
                  striped
                  hover
                  ref="timepersteptable"
                  table-layout:
                  fixed
                  :fields="fields"
                  :items="resultSetIDs"
                >

                </b-table> -->
                  <!-- <b-card-text v-for="syn in synonymsArray" :key="syn.id">
                    <b>{{ syn.identifier }}: &nbsp;</b>{{ syn.name }} &nbsp;
                    (Hits = {{ syn.hitCount }})
                  </b-card-text> -->
                  <!-- {{synonymsArray}} -->
                </b-card>
        </b-row>
        <!-- <b-row>
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
                  </template>
                  <h4 class="mb-0">Symbol: {{ concept_search }}</h4>

                  <br />
                  <b-card-text v-for="syn in synonymsArray" :key="syn.id">
                    <b>{{ syn.identifier }}: &nbsp;</b>{{ syn.name }} &nbsp;
                    (Hits = {{ syn.hitCount }})
                  </b-card-text>
                </b-card>
              </b-card-group>
            </div>
          </b-col>
        </b-row> -->
        <!-- <b-row>
          <b-col> this is a test </b-col>
        </b-row> -->
<!-- drugResults -->
        <b-row style="margin-top: 20px">
          <b-col>
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  ARSResults Subject Object Predicate length = {{ARSResults.length}}
                </h6>
              </template>
              <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="ARSResults"
                :fields="resultFields"
              >
              </b-table>
            </b-card>
          </b-col>
        </b-row>

        <b-row style="margin-top: 20px">
          <b-col>
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  geneResults Subject Object Predicate length = {{geneResults.length}}
                </h6>
              </template>
              <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="geneResults"
                :fields="resultFields"
              >
              </b-table>
            </b-card>
          </b-col>
        </b-row>

        <b-row style="margin-top: 20px">
          <b-col>
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  drugResults Subject Object Predicate length = {{geneResults.length}}
                </h6>
              </template>
              <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="drugResults"
                :fields="resultFields"
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
// import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
import TrapiResultClean from "../TrapiResultClean";
import ARSService from "../ARSService";
// import ARAXService from "../ARAXService";
// import NodeService from "../NodeService";
// import metagraph from "/Users/andycrouse/Documents/GitHub/medikweb-largefilefix/datafiles/metaknowledgegraph.json"
// import resultsAD from  "/Users/andycrouse/Documents/GitHub/medikweb_dev/datafiles/resultsAD.json"
// import svgtest from "./svgtest.vue"
// import importResultWithDrugs from "/Users/andycrouse/Downloads/resultWithDrugsWithFDA.json"
import synonymService from "../synonymService";
// import twohopdata from "../../../datafiles/twohopggd.json"


var parser = require("fast-xml-parser");
import axios from "axios";
// import * as d3 from "d3";

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
      concept_search: "HGNC:16716",
      testNormalizationArray: ["HGNC:18481", "HGNC:6884" , "HGNC:2625", "HGNC:11998", "HGNC:3236", "HGNC:1100", "HGNC:9588"],
      // HGNC:18481
      // HGNC:6884" MAPK8IP3
      // "HGNC:2625" CYP2D6
      // "HGNC:11998" TP53"
      // "HGNC:3236" EGFR  - 3546 hits
      // 1100 BRCA1
      // 9588 PTEN
      // 5173 HRAS

      // KEEP THIS AS TEMPLATE FOR QUERIES

      query_gg: {
        "message": {
            "query_graph": {
                "edges": {
                    "e00": {
                        "constraints": [],
                        "subject": "regGene",
                        
                        "predicates": ["biolink:affects"],
                        "object": "targetGene"
                        
                        
                    }
      
                },
                "nodes": {
            
                    "targetGene": {
                        "categories": [
                            "biolink:Protein",
                            "biolink:Gene"
                        ],
                        "constraints": [],
                        "ids": [
                          "HGNC:6884"
                        ],
                        "is_set": false
                    },
                    "regGene": {
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
      query_dg: {
        "message": {
            "query_graph": {
                "edges": {
                    "e00": {
                        "constraints": [],
                        "subject": "drug",
                        
                        "predicates": ["biolink:affects"],
                        "object": "genes",
                    }
                },
                "nodes": {
                    "genes": {
                        "categories": [
                            "biolink:Protein",
                            "biolink:Gene"
                        ],
                        "constraints": [],
                        "ids": [
                          "HGNC:6884"
                        ],
                        "is_set": false
                    },
                    "drug": {
                        "categories": [
                            "biolink:ChemicalMixture",
                            "biolink:SmallMolecule",
                            "biolink:Nutrient"
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
      resultFields: [
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
        }
   
      ],
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
      ARSResults: [],
      ARSResultsSPO: [],
      count: 0,
      statusTable: [],
      showARS: false,
      resultGroup: "gene",
      geneResults:[],
      drugResults:[],
      queryTerms: [],
      normalizedTermsAll:[]

    };
  },
  methods: {
    async testNormalization(){

        let synData = await synonymService.nodeNormalizationPost(this.testNormalizationArray)
        console.log(synData)

    },
    openARAX: function () {   
      
      let url = "https://arax.ncats.io/?r=" + this.ARSrequestID
        window.open(url, "_blank");    
    },

    async tryARS2() {


      // #######################
      // RESET THE TABLES TO CLEAR FOR NEW RUN
      // #######################
      if(this.resultGroup == "gene"){
        this.geneResults = []
        this.drugResults = []
        this.queryTerms = [this.concept_search]
      }
      this.ARSResults = []
      this.ARSResultsSPO = []
      

      // #######################
      // PREPARE TO REMOVE NODES THAT DON'T HAVE TARGET GENE AS OBJECT - GET SYNONYMS
      // CAN SEARCH WITH SINGLE TERM THOUGH - ARAS ARE NORMALISZING
      // #######################


      // #######################
      // LOOP THROUGH ALL TERMS TO GET ALL SYNONYMS
      // #######################
      synonymService.nodeNormalizationPost(this.testNormalizationArray)
      .then(async (normalizedTerms) => {
        let normalKeys = Object.keys(normalizedTerms)

        // PROCESS NODENORMALIZER DATA
        for (let i = 0; i < normalKeys.length; i++) {
          const key = normalKeys[i];
          let termData = normalizedTerms[key]
          let normTerms = termData.equivalent_identifiers.map(x => x.identifier)
          this.synonyms = this.synonyms.concat(normTerms)

          if(i == normalKeys.length - 1){
            console.log("this.synonyms")
            console.log(this.synonyms)
            return
          }

        }

      })
      .then(async () => {

          if(this.resultGroup == "gene"){
            // #######################
            // SEND QUERY WITH CORRECT NODES AND CATEGORIES
            // #######################

            this.query_gg.message.query_graph.nodes.targetGene.ids = this.queryTerms
            // #######################
            // SEND TO LOOP THE QUERY TO ARS - USE EVENT LOOPING
            // #######################
            let query = this.query_gg
            this.ARSResultsLoop(query) 
        }   
          else if(this.resultGroup == "drug"){
            // #######################
            // SEND QUERY WITH CORRECT NODES AND CATEGORIES
            // #######################

            this.query_dg.message.query_graph.nodes.genes.ids = this.queryTerms
            // #######################
            // SEND TO LOOP THE QUERY TO ARS - USE EVENT LOOPING
            // #######################
            let query = this.query_dg
            this.ARSResultsLoop(query) 
        }         
      })

    },

    async ARSResultsLoopPromise(query) {
      return new Promise(async (resolve, reject) => { // eslint-disable-line

      this.ARSResults = []
      console.log("------ eventLoop2 REQUEST STARTED")

      // ################
      // SEND TO ARS
      // ################
      console.log("################################################")
      console.log("RUNNING QUERY AFTER THIS")
      console.log("################################################")
      let ARSRequest = await ARSService.ARSQuery(query)
      console.log("query - ", this.resultGroup)
      console.log(query)      
      console.log("--------- ARSRequest ---------")
      console.log(ARSRequest)
      // ARSStatus - GET PK FROM ARS TO LOOP AND CHECK 
      let ARSrequestID = ARSRequest.pk
      this.ARSrequestID = ARSrequestID

      // ################
      // START LOOP VIA EVENTS
      // ################

      const EventEmitter = require("events");
      class Emitter extends EventEmitter {}
      const eventEmitter = new Emitter();
      this.count = 0
      eventEmitter.on("event", async () => {
      console.log("************************************************")
      console.log("EVENT EMMITTED")
      console.log("************************************************")
      ARSService.ARSStatus(this.ARSrequestID)
      .then(async (ARSStatus) => {
        // let count = 1
        let resultList = []
        console.log("ARSStatus")
        console.log(ARSStatus)
        resultList  = ARSStatus.children
        console.log("# of sets of results = ", resultList.length)

        // let recheck = []

        // ################
        // WAIT FOR 14 RESULTS SO THAT YOU DON'T PROCESS UNTIL THEY ARE ALL RESPONDING WITH SOMETHING - EVEN IF NOT COMLPLETED
        // ################

        if(resultList.length< 14){
          console.log("less than 14")
          
          await new Promise(resolve => setTimeout(resolve, 3000));
          console.log(new Date())
          eventEmitter.emit("event")
        } else {
          
          console.log("*** resultList = ", resultList)
          
          // let recheckStat = ["Running"]
          for (let i = 0; i < resultList.length; i++) {

            // ################
            // LOOPING THROUGH EACH OF THE RESULTS FROM THE ARS STATUS TO COLLECT ALL OF THE INFORATION
            // ################

            const resInfo = resultList[i];       
            let result = await ARSService.ARSResult(resInfo.message)

            let agent = resInfo.actor.agent
            // if(recheck.indexOf(agent) == -1){
              console.log("agent")
              console.log(agent)
              console.log({result})

              this.ARSResultStatus[agent] = {}
              this.ARSResultStatus[agent]["agent"] = agent
              this.ARSResultStatus[agent]["code"] = resInfo.code
              this.ARSResultStatus[agent]["status"] = resInfo.status
              this.ARSResultStatus[agent]["id"] = resInfo.message
              this.ARSResultStatus[agent]["resultCount"] = null
              this.ARSResultStatus[agent]["results"] = result

              // this.showARS = true

              // if(resInfo.status == "Running" && resInfo.agent != "ara-unsecret"){
              //   recheck.push(agent)
              // }

              // CHECK IF THERE IS A KNOWLEDGE GRAPH
              if(result.fields.data != null){
                  if(Object.prototype.hasOwnProperty.call(result.fields.data, "message")){
                    // console.log("FOUND MESSAGE")
                    if(Object.prototype.hasOwnProperty.call(result.fields.data.message, "knowledge_graph")){
                      // console.log("FOUND KNOWLEDGE GRAPH")
                      // if(result.message.results.length > 0){
                        // console.log("HAS MORE THAN 0 RESULTS")
                        this.ARSResultStatus[agent].resultCount = result.fields.data.message.results.length
                      
                    }
                  }
              }

            // }

            this.resultSetIDs.push(this.ARSResultStatus[agent])

            // ################
            // SORT THE STATUS TABLE ALPHABETICALLY
            // ################
            // let obj = this.ARSResultStatus
            // let sorted = Object.keys(obj)
            //   .sort()
            //   .reduce((accumulator, key) => {
            //     accumulator[key] = obj[key];

            //     return accumulator;
            //   }, {});
            //   this.ARSResultStatus = sorted
            //   this.componentKey++
            //   console.log("SORTED THE STATUS TABLE")

            if(i == resultList.length - 1 ){
              // ################
              // CHECK IF DATA WAS GOTTEN FOR ALL AGENTS
              // ################      
              console.log("FINISHED GETTING ALL THE RESULTS")

              // let checkRerun = this.resultSetIDs.filter(x => x.resultCount == null && x.status != "Error")

              // ################
              // CHECK THE STATUS TO SEE IF ANY ARE STILL RUNNING - EXCLUDE UNSECRET FOR NOW
              // ################ 
              let checkRerun = this.resultSetIDs.filter(x => x.status == "Running" && x.name != "ara-unsecret")

              console.log("ARSResultStatus = ", this.ARSResultStatus)
              console.log("checkRerun = ", checkRerun)
              if(checkRerun.length > 0 && this.count < 10){

                // ################
                // IF THERE ARE THINGS STILL RUNNING THEN WAIT FOR SECONDS 
                // THEN THROUGH A NEW EVENT TO START LOOP OVER
                // ELSE RETURN
                // ################ 

                // console.log("WE HAVE TO CHECK AGAIN - NOT DONE")
                console.log("COUNT OF TIMES CHECKED STATUS OF ALL = ", this.count)
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.resultSetIDs = []
                // this.ARSResultStatus = {}
                this.count++
                eventEmitter.emit("event");
                
              } else {
                console.log("return")
                // return
              }
              
            }    
          }
        }

        })
      })
      }) //Promise ending 
    },

    async ARSResultsLoop(query) {
      
      this.ARSResults = []
      console.log("------ eventLoop2 REQUEST STARTED")

      // ################
      // SEND TO ARS
      // ################
      console.log("################################################")
      console.log("RUNNING QUERY AFTER THIS")
      console.log("################################################")
      let ARSRequest = await ARSService.ARSQuery(query)
      console.log("query - ", this.resultGroup)
      console.log(query)      
      console.log("--------- ARSRequest ---------")
      console.log(ARSRequest)
      // ARSStatus - GET PK FROM ARS TO LOOP AND CHECK 
      let ARSrequestID = ARSRequest.pk
      this.ARSrequestID = ARSrequestID

      // ################
      // START LOOP VIA EVENTS
      // ################

      const EventEmitter = require("events");
      class Emitter extends EventEmitter {}
      const eventEmitter = new Emitter();
      this.count = 0
      eventEmitter.on("event", async () => {
      console.log("************************************************")
      console.log("EVENT EMMITTED")
      console.log("************************************************")
      ARSService.ARSStatus(this.ARSrequestID)
      .then(async (ARSStatus) => {
        // let count = 1
        let resultList = []
        console.log("ARSStatus")
        console.log(ARSStatus)
        resultList  = ARSStatus.children
        console.log("# of sets of results = ", resultList.length)

        // let recheck = []

        // ################
        // WAIT FOR 14 RESULTS SO THAT YOU DON'T PROCESS UNTIL THEY ARE ALL RESPONDING WITH SOMETHING - EVEN IF NOT COMLPLETED
        // ################

        if(resultList.length< 14){
          console.log("less than 14")
          
          await new Promise(resolve => setTimeout(resolve, 3000));
          console.log(new Date())
          eventEmitter.emit("event")
        } else {
          
          console.log("*** resultList = ", resultList)
          
          // let recheckStat = ["Running"]
          for (let i = 0; i < resultList.length; i++) {

            // ################
            // LOOPING THROUGH EACH OF THE RESULTS FROM THE ARS STATUS TO COLLECT ALL OF THE INFORATION
            // ################

            const resInfo = resultList[i];       
            let result = await ARSService.ARSResult(resInfo.message)

            let agent = resInfo.actor.agent
            // if(recheck.indexOf(agent) == -1){
              console.log("agent")
              console.log(agent)
              console.log({result})

              this.ARSResultStatus[agent] = {}
              this.ARSResultStatus[agent]["agent"] = agent
              this.ARSResultStatus[agent]["code"] = resInfo.code
              this.ARSResultStatus[agent]["status"] = resInfo.status
              this.ARSResultStatus[agent]["id"] = resInfo.message
              this.ARSResultStatus[agent]["resultCount"] = null
              this.ARSResultStatus[agent]["results"] = result

              // this.showARS = true

              // if(resInfo.status == "Running" && resInfo.agent != "ara-unsecret"){
              //   recheck.push(agent)
              // }

              // CHECK IF THERE IS A KNOWLEDGE GRAPH
              if(result.fields.data != null){
                  if(Object.prototype.hasOwnProperty.call(result.fields.data, "message")){
                    // console.log("FOUND MESSAGE")
                    if(Object.prototype.hasOwnProperty.call(result.fields.data.message, "knowledge_graph")){
                      // console.log("FOUND KNOWLEDGE GRAPH")
                      // if(result.message.results.length > 0){
                        // console.log("HAS MORE THAN 0 RESULTS")
                        this.ARSResultStatus[agent].resultCount = result.fields.data.message.results.length
                      
                    }
                  }
              }

            // }

            this.resultSetIDs.push(this.ARSResultStatus[agent])

            // ################
            // SORT THE STATUS TABLE ALPHABETICALLY
            // ################
            // let obj = this.ARSResultStatus
            // let sorted = Object.keys(obj)
            //   .sort()
            //   .reduce((accumulator, key) => {
            //     accumulator[key] = obj[key];

            //     return accumulator;
            //   }, {});
            //   this.ARSResultStatus = sorted
            //   this.componentKey++
            //   console.log("SORTED THE STATUS TABLE")

            if(i == resultList.length - 1 ){
              // ################
              // CHECK IF DATA WAS GOTTEN FOR ALL AGENTS
              // ################      
              console.log("FINISHED GETTING ALL THE RESULTS")

              // let checkRerun = this.resultSetIDs.filter(x => x.resultCount == null && x.status != "Error")

              // ################
              // CHECK THE STATUS TO SEE IF ANY ARE STILL RUNNING - EXCLUDE UNSECRET FOR NOW
              // ################ 
              let checkRerun = this.resultSetIDs.filter(x => x.status == "Running" && x.name != "ara-unsecret")

              console.log("ARSResultStatus = ", this.ARSResultStatus)
              console.log("checkRerun = ", checkRerun)
              if(checkRerun.length > 0 && this.count < 10){

                // ################
                // IF THERE ARE THINGS STILL RUNNING THEN WAIT FOR SECONDS 
                // THEN THROUGH A NEW EVENT TO START LOOP OVER
                // ELSE RETURN
                // ################ 

                // console.log("WE HAVE TO CHECK AGAIN - NOT DONE")
                console.log("COUNT OF TIMES CHECKED STATUS OF ALL = ", this.count)
                await new Promise(resolve => setTimeout(resolve, 3000));
                this.resultSetIDs = []
                // this.ARSResultStatus = {}
                this.count++
                eventEmitter.emit("event");
                
              } else {
                console.log("return")
                // return
              }
              
            }    
          }
        }

        })
        .then(async () => {
          console.log("MAKE IT STOP!!")
        })
        .then(async () => {
          console.log("WENT TO NEXT STEP TO CLEAN RESULTS")
          this.ARSResults = []
          let keys = Object.keys(this.ARSResultStatus)
          console.log(this.ARSResultStatus)
          this.resultSetIDs = []
          // console.log(keys)
          // let tempResults = []

          for (let i = 0; i < keys.length; i++) {
            const id = keys[i];
            // console.log("id")
            // console.log(id)
            this.resultSetIDs.push(this.ARSResultStatus[id])
            // console.log("this.ARSResultStatus[id]")
            // console.log(this.ARSResultStatus[id])

            if(this.ARSResultStatus[id].results.fields.data != null){
              if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.fields.data, "message")){
                if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.fields.data.message, "knowledge_graph")){
                  // console.log("CLEANING RESULTS")
                  // console.log(this.ARSResultStatus[id].results)
                  let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results.fields.data)
                  // console.log(cleanedResults)

                  this.ARSResults = this.ARSResults.concat(cleanedResults) 
                  // tempResults = tempResults.concat(cleanedResults) 

                  if (i == keys.length - 1){
                    console.log("this.ARSResults INSIDE IF CLAUSE")
                    // this.ARSResult = tempResults
                    
                    this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)
                    // console.log(this.ARSResults)


                      if(this.resultGroup == "gene"){
                        this.geneResults = this.ARSResults
                        return
                      }
                      if(this.resultGroup == "drug"){
                        this.drugResults = this.ARSResults
                      }
                    // return
                  }     

                }
              }   
            } 
            // else if (i == keys.length - 1){
            if (i == keys.length - 1){
              console.log("this.ARSResults - OUTSIDE IF CLAUSE")

              this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)

              let obj = this.ARSResultStatus
              let sorted = Object.keys(obj)
                .sort()
                .reduce((accumulator, key) => {
                  accumulator[key] = obj[key];

                  return accumulator;
                }, {});
                this.ARSResultStatus = sorted
              // this.ARSResultStatus =  this.ARSResultStatus.sort((a, b) => a.name.localeCompare(b.name));

              console.log(this.ARSResults)
              if(this.resultGroup == "gene"){
                this.geneResults = this.ARSResults
                this.componentKey++

                return
              }
              if(this.resultGroup == "drug"){
                this.drugResults = this.ARSResults
                this.componentKey++

              }
              // resolve(this.ARSResults);
              

            }      
          }
        })
        .then(async () => {
          // ################################################
          // DONE WITH GENE - GENE NOW UPDATE QUERY AND RUN AGAIN FOR 
          // ################################################
          // GET THE CURIES FOR GENES TO TARGET WITH DRUGS
          // GET THEIR SYNONYMS TO FILTER OUT THE EXTRANEOUS 
          // THEN RUN THE PROGRAM AGAIN
          console.log("made it through!")
          let genesForDrug = this.ARSResults.map(x => x.subject)
          this.queryTerms = genesForDrug
          console.log("this.ARSResults")
          console.log(this.ARSResults)
          console.log("genesForDrug")
          console.log(genesForDrug)
          this.resultGroup = "drug"
          // this.tryARS2()

          
        }) 

      })

      eventEmitter.emit("event");

      // }) // FROM PROMISE
    },

    //   async eventLoop2() {
    //   // concept_search
    //   console.log("------ eventLoop2 REQUEST STARTED")
    //   console.log(this.query)
    //   let ARSRequest = await ARSService.ARSQuery(this.query)
    //   console.log("ARSRequest")
    //   console.log(ARSRequest)
    //   // ARSStatus
    //   let ARSrequestID = ARSRequest.pk
    //   this.ARSrequestID = ARSrequestID
      
    //   // this.progressTable = []
    //   // this.progressObject= {}
    //   // this.geneIDList = []
    //   // let length = this.hgncAll.length;
    //   // let i = 0;

    //   const EventEmitter = require("events");
    //   class Emitter extends EventEmitter {}
    //   const eventEmitter = new Emitter();
    //   this.count = 0
    //   eventEmitter.on("event", async () => {

    //   ARSService.ARSStatus(this.ARSrequestID)
    //   .then(async (ARSStatus) => {
    //     // let count = 1
    //     console.log("ARSStatus")
    //     console.log(ARSStatus)
    //     let resultList  = ARSStatus.children

    //     if(resultList.length< 14){
    //       console.log("less than 14")
          
    //       await new Promise(resolve => setTimeout(resolve, 3000));
    //       console.log(new Date())
    //       eventEmitter.emit("event")
    //     } else {
          
    //       console.log("*** resultList = ", resultList)
    //       for (let i = 0; i < resultList.length; i++) {
    //         console.log("----- ----- ----- ----- -----")


    //         const resInfo = resultList[i];
    //         console.log(resInfo)
    //         // console.log(resInfo.actor.agent)
    //         // console.log(resInfo.code)
    //         // console.log(resInfo.status)        
    //         let result = await ARSService.ARSStatus(resInfo.message)
    //         console.log("result = ", result)

    //         let agent = resInfo.actor.agent
    //         this.ARSResultStatus[agent] = {}
    //         this.ARSResultStatus[agent]["agent"] = agent
    //         this.ARSResultStatus[agent]["code"] = resInfo.code
    //         this.ARSResultStatus[agent]["status"] = resInfo.status
    //         this.ARSResultStatus[agent]["id"] = resInfo.message
    //         this.ARSResultStatus[agent]["resultCount"] = null
    //         this.ARSResultStatus[agent]["results"] = result

    //         // CHECK IF THERE IS A KNOWLEDGE GRAPH
    //         if(Object.prototype.hasOwnProperty.call(result, "message")){
    //           // console.log("FOUND MESSAGE")
    //           if(Object.prototype.hasOwnProperty.call(result.message, "knowledge_graph")){
    //             // console.log("FOUND KNOWLEDGE GRAPH")
    //             // if(result.message.results.length > 0){
    //               // console.log("HAS MORE THAN 0 RESULTS")
    //               this.ARSResultStatus[agent].resultCount = result.message.results.length

                
    //           }
    //         }
    //         this.resultSetIDs.push(this.ARSResultStatus[agent])

            
    //       // NOTE WHEN FINISHED
    //         if(i == resultList.length - 1 ){
    //           console.log("FINISHED GETTING ALL THE RESULTS")
    //           // console.log(this.resultSetIDs)
    //           // console.log("this.ARSResultStatus")
    //           // console.log(this.ARSResultStatus)
    //           let checkRerun = this.resultSetIDs.filter(x => x.resultCount == null && x.status != "Error")
    //           // console.log("checkRerun = ", checkRerun)
    //           if(checkRerun.length > 0 && this.count < 3){
    //             console.log("WE HAVE TO CHECK AGAIN - NOT DONE")
    //             console.log("count = ", this.count)
    //             await new Promise(resolve => setTimeout(resolve, 5000));
    //             this.resultSetIDs = []
    //             // this.ARSResultStatus = {}
    //             this.count++
    //             eventEmitter.emit("event");
                
    //           } else {
    //             return
    //           }
              
    //         }    
    //       }
    //     }

    //     })
    //     .then(async () => {
    //       console.log("WENT TO NEXT STEP TO CLEAN RESULTS")

    //       let keys = Object.keys(this.ARSResultStatus)
    //       console.log(this.ARSResultStatus)
    //       this.resultSetIDs = []
    //       console.log(keys)

    //       for (let i = 0; i < keys.length; i++) {
    //         const id = keys[i];
    //         console.log("id")
    //         console.log(id)
    //         this.resultSetIDs.push(this.ARSResultStatus[id])
    //         console.log("this.ARSResultStatus[id]")
    //         console.log(this.ARSResultStatus[id])
            
    //         if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results, "message")){
    //           if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.message, "knowledge_graph")){
    //             console.log("CLEANING RESULTS")
    //             console.log(this.ARSResultStatus[id].results)
    //             let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results)
    //             console.log(cleanedResults)

    //             this.ARSResults = this.ARSResults.concat(cleanedResults) 

    //             if (i == keys.length - 1){
    //               console.log("this.ARSResults")
    //               console.log(this.ARSResults)
    //               return
    //             }     

    //           }
    //         }    
    //         else if (i == keys.length - 1){
    //               console.log("this.ARSResults")
    //               console.log(this.ARSResults)
    //           return

    //         }      
    //       }
    //     }) 

    //   })


    //   eventEmitter.emit("event");
    // },

    // async ARScheckResults () {
    //   this.ARSResultsSPO = []
    //   // let ARSStatus = await ARSService.ARSStatus(this.ARSrequestID)
    //   console.log("##### ##### ##### ##### ##### ##### ##### ")
    //   console.log("##### ARSStatus checked by rerunning")
    //   // console.log(ARSStatus)
    //   this.resultSetIDs = []
    //   // let continue = true

    //   ARSService.ARSStatus(this.ARSrequestID)
    //   .then(async (ARSStatus) => {
    //     console.log("ARSStatus")
    //     console.log(ARSStatus)
    //     let resultList  = ARSStatus.children

    //     for (let i = 0; i < resultList.length; i++) {
    //       console.log("----- ----- ----- ----- -----")


    //       const resInfo = resultList[i];
    //         console.log(resInfo)
    //         // console.log(resInfo.actor.agent)
    //         // console.log(resInfo.code)
    //         // console.log(resInfo.status)        
    //       let result = await ARSService.ARSStatus(resInfo.message)
    //       console.log("result = ", result)

    //       let agent = resInfo.actor.agent
    //       this.ARSResultStatus[agent] = {}
    //       this.ARSResultStatus[agent]["agent"] = agent
    //       this.ARSResultStatus[agent]["code"] = resInfo.code
    //       this.ARSResultStatus[agent]["status"] = resInfo.status
    //       this.ARSResultStatus[agent]["id"] = resInfo.message
    //       this.ARSResultStatus[agent]["resultCount"] = null
    //       this.ARSResultStatus[agent]["results"] = result

    //       // CHECK IF THERE IS A KNOWLEDGE GRAPH
    //       console.log(Object.prototype.hasOwnProperty.call(result, "message"))
    //       if(Object.prototype.hasOwnProperty.call(result, "message")){
    //         console.log("Has Knowledge Graph = ", (Object.prototype.hasOwnProperty.call(result.message, "knowledge_graph")))
    //       }else {
    //         console.log("Has Knowledge Graph = ", false)
    //       }

    //       // SHOW RESULTS
    //       console.log(result)  

    //       // IF THERE ARE  RESULTS SEND THEM TO BE CLEANED
    //       if(Object.prototype.hasOwnProperty.call(result, "message")){
    //         console.log("FOUND MESSAGE")
    //         if(Object.prototype.hasOwnProperty.call(result.message, "knowledge_graph")){
    //           console.log("FOUND KNOWLEDGE GRAPH")
    //           // if(result.message.results.length > 0){
    //             // console.log("HAS MORE THAN 0 RESULTS")
    //             this.ARSResultStatus[agent].resultCount = result.message.results.length
                
    //             let resultObj = {"agent": resInfo.actor.agent,"status": resInfo.status, "code": resInfo.code, "id": resInfo.message, "resultCount":  result.message.results.length}
    //             this.resultSetIDs.push(resultObj)
              
    //         }
    //       }

          
    //     // NOTE WHEN FINISHED
    //       if(i == resultList.length - 1 ){
    //         console.log("FINISHED GETTING ALL THE RESULTS")
    //         console.log(this.resultSetIDs)
    //         console.log("this.ARSResultStatus")
    //         console.log(this.ARSResultStatus)
    //         // return
    //       }    
    //     }

    //   })
    //   .then(async () => {

    //     let keys = Object.keys(this.ARSResultStatus)
    //     console.log(this.ARSResultStatus)
    //     this.resultSetIDs = []
    //     console.log(keys)

    //     for (let i = 0; i < keys.length; i++) {
    //       const id = keys[i];
    //       console.log("id")
    //       console.log(id)
    //       this.resultSetIDs.push(this.ARSResultStatus[id])
    //       console.log("this.ARSResultStatus[id]")
    //       console.log(this.ARSResultStatus[id])
          
    //       if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results, "message")){
    //         if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.message, "knowledge_graph")){
    //           console.log("CLEANING RESULTS")
    //           console.log(this.ARSResultStatus[id].results)
    //           let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results)
    //           console.log(cleanedResults)

    //           this.ARSResults = this.ARSResults.concat(cleanedResults) 

    //           if (i == keys.length - 1){
    //             return
    //           }     

    //         }
    //       }    
    //       else if (i == keys.length - 1){
    //         return

    //       }      
    //     }
    //   }) 
    //   .then(async () => {

    //     // this.synonyms 
    //     let synData = await synonymService.normalizedSynonyms(this.concept_search)

    //     this.synonyms = synData[this.concept_search].equivalent_identifiers.map(x => x.identifier)
    //     console.log("this.synonyms")
    //     console.log(this.synonyms)
    //     return

    //   })
    //   .then(async () => {
    //     console.log("this.ARSResults")
    //     console.log(this.ARSResults)
    //     // let tempResults = []

    //     for (let i = 0; i < this.ARSResults.length; i++) {
          
    //       const res = this.ARSResults[i];
    //       let resSPO = {}
    //       // console.log("this.synonyms.indexOf(res.subject)")
    //       // console.log(this.synonyms.indexOf(res.subject))
    //       if(this.synonyms.indexOf(res.subject) != -1){
    //       resSPO.object = res.objectName
    //       resSPO.objectID = res.object
    //       resSPO.predicate = res.predicate
    //       resSPO.subject = res.subjectName
    //       resSPO.subjectID = res.subject


    //       this.ARSResultsSPO.push(resSPO)
    //         if(i == this.ARSResults.length - 1){
    //           console.log("this.ARSResultsSPO")
    //           console.log(this.ARSResultsSPO)
    //         }
    //       }

    //       // if(res.subject == "PR:000010162"){
    //       //   console.log("PR:000010162")
    //       //   console.log(res)
    //       // }

          
    //     }
    //   })   
    //   .then(async ()=> {
    //     let resultObjects = []
    //     for (let i = 0; i < this.ARSResultsSPO.length; i++) {
    //       const el = this.ARSResultsSPO[i];
    //       // console.log("objectID")
    //       // console.log(el.objectID)
    //       if(resultObjects.indexOf(el.objectID) == -1){
    //         resultObjects.push(el.objectID)
    //       }
    //       if(i == this.ARSResultsSPO.length -1){
    //         return resultObjects
    //       }
          
    //     }

    //   })
    //   .then(async(resultObjects)=>{
    //     console.log("resultObjects")
    //     console.log(resultObjects)
    //     this.query.message.query_graph.nodes.gene0.ids = resultObjects
    //     this.query.message.query_graph.nodes.gene1.categories = ["biolink:ChemicalMixture"]
    //     console.log(this.query)
    //     // this.tryARS()
    //     console.log("####### END #######")
        
    //   })


    // },
    
    // async getGeneSynonyms() {
    //   // SEND HGNC TO GET ALL SYNONYMS
    //   PostService.getGeneSynonyms(this.concept_search)
    //     .then(async (geneinfo) => {
    //       //GETGENESYNONYMS - PULLS OUT THE DESIRED GENE INFO FROM THE CONCEPT FUNCTION

    //       // ADD BACK THE HGNC ID
    //       geneinfo.HGNC = this.concept_search;

    //       // GETT THE PARENT TERM FOR PR SYNONYM
    //       //the parent_id is the general form of the gene that is not species specific - it is also the only one that has drug resutls in the textmining KG

    //       console.log(geneinfo.PR);
    //       this.queryjson_subclass["message"]["query_graph"]["nodes"]["n2"][
    //         "id"
    //       ] = geneinfo.PR;
    //       let query = this.queryjson_subclass;
    //       // "api/posts/query/" - URL USED FOR QUERYMEDIK SERVICE
    //       console.log("query");
    //       console.log(query);
    //       console.log(
    //         "getPRparent query = ",
    //         await PostService.getPRparent(query)
    //       );
    //       // let PRparentData = await PostService.queryMedik(query);
    //       geneinfo.PRparent = await PostService.getPRparent(query);
    //       return geneinfo;

    //     })

    //     .then(async (geneinfo) => {
    //       console.log("********* skipped UMLS");
    //       console.log("got UMLS info = ", geneinfo);
    //       let nodes = {};
    //       let edges = {};

    //       // let currieTypes = ["HGNC","PRparent", "UniProtKB", "NCBI", "umls"]
    //       let currieTypes = ["HGNC", "PRparent", "UniProtKB", "NCBI"];
    //       for (let i = 0; i < currieTypes.length; i++) {
    //         const currietype = currieTypes[i];

    //         let currie = geneinfo[currietype];

    //         if (typeof currie !== "undefined") {
    //           this.query.message.query_graph.nodes.n2.id = currie;
    //           let queryResults = await PostService.query_raw(this.query);
    //           console.log(currie);
    //           console.log(currietype);
    //           console.log("queryResults");
    //           console.log(queryResults);
    //           // console.log(queryResults.message.knowledge_graph.edges );

    //           edges = {
    //             ...edges,
    //             ...queryResults.message.knowledge_graph.edges,
    //           };

    //           nodes = {
    //             ...nodes,
    //             ...queryResults.message.knowledge_graph.nodes,
    //           };
    //         }
    //         if (i == currieTypes.length - 1) {
    //           console.log("edges");
    //           console.log(edges);
    //           console.log("nodes");
    //           console.log(nodes);
    //           this.nodelist = Object.keys(nodes);
    //           return { edges: edges, nodes: nodes };
    //         }
    //       }
    //     })
    //     .then((results) => {
    //       console.log(results);
    //       let nodes = results.nodes;
    //       let edgekeys = Object.keys(results.edges);

    //       let combinedEdgeNodes = [];

    //       for (let i = 0; i < edgekeys.length; i++) {
    //         let ggData = {};
    //         let edgeid = edgekeys[i];
    //         let edge = results.edges[edgeid];
    //         let subject = edge.subject;
    //         let object = edge.object;

    //         // ggData.edgeAtt = edge.attributes;
    //         ggData.geneTwo = edge.object;
    //         ggData.geneOne = edge.subject;
    //         ggData.predicate_gg = edge.predicate;
    //         ggData.relation_gg = edge.relation;
    //         // ggData.geneOneAtt = nodes[subject].attributes;
    //         // ggData.geneTwoAtt = nodes[object].attributes;
    //         ggData.geneOneName = nodes[subject].name;
    //         ggData.geneTwoName = nodes[object].name;
    //         ggData.geneOneCat = nodes[subject].category;
    //         ggData.geneTwoCat = nodes[object].category;

    //         combinedEdgeNodes.push(ggData);

    //         if (i == edgekeys.length - 1) {
    //           return combinedEdgeNodes;
    //         }
    //       }
    //     })
    //     .then(async (results) => {
    //       console.log(results);
    //       let drugquery = this.query;

    //       // let nodePlusSynonyms = []
    //       for (let i = 0; i < results.length; i++) {
    //         const result = results[i];
    //         results[i].drugInfo = [];
    //         // GET SYNONYMS OF ALL GENES
    //         let synResults = await PostService.getSynonyms(result.geneOne);
    //         console.log(synResults);
    //         let synonyms = synResults.synonyms;
    //         let synkeys = Object.keys(synonyms);

    //         /// ######### needs review below #########
    //         for (let n = 0; n < synkeys.length; n++) {
    //           let syn = synkeys[n];
    //           let nodedata = {};
    //           nodedata.node = result.geneOne;
    //           nodedata.PRparent = "";
    //           nodedata.showSyn = "";

    //           drugquery.message.query_graph.nodes.n1.category = "chem";
    //           drugquery.message.query_graph.nodes.n2.id = syn;

    //           if (
    //             (syn.startsWith("NCBI") ||
    //               syn.startsWith("UniProtKB") ||
    //               syn.startsWith("PR") ||
    //               syn.startsWith("UMLS")) &&
    //             syn != "PR:000000001"
    //           ) {
    //             let queryDrugResults = {};

    //             if (syn.startsWith("PR")) {
    //               // HAVE TO GET PARENT BEFORE GETTING CHEMICALS
    //               this.queryjson_subclass["message"]["query_graph"]["nodes"][
    //                 "n2"
    //               ]["id"] = syn;
    //               let PRparent = await PostService.getPRparent(
    //                 this.queryjson_subclass
    //               );

    //               // GET DRUG DATA ON PARENT
    //               drugquery.message.query_graph.nodes.n2.id = PRparent;
    //               queryDrugResults = await PostService.query_raw(drugquery);
    //               // console.log("syn = ", syn)
    //               // console.log({queryDrugResults})
    //               nodedata.synonym = syn;
    //               nodedata.drugs = queryDrugResults;
    //               nodedata.PRparent = PRparent;
    //               nodedata.showSyn = PRparent;
    //               results[i].drugInfo.push(nodedata);
    //             } else {
    //               // IF NOT PR CURRIE THEN CAN GET CHEM DATA
    //               queryDrugResults = await PostService.query_raw(drugquery);
    //               // console.log("syn = ", syn)
    //               // console.log({queryDrugResults})
    //               nodedata.synonym = syn;
    //               nodedata.showSyn = syn;
    //               nodedata.drugs = queryDrugResults;
    //               results[i].drugInfo.push(nodedata);
    //             }
    //           }
    //         }
    //         if (i == results.length - 1) {
    //           return results;
    //         }
    //       }
    //     })
    //     .then(async (results) => {
    //       console.log(results);
    //       let tableResults = [];

    //       for (let i = 0; i < results.length; i++) {
    //         const result = results[i];

    //         for (let n = 0; n < result.drugInfo.length; n++) {
    //           const drug = result.drugInfo[n];
    //           // console.log(drug)
    //           let drugedges =
    //             drug["drugs"]["message"]["knowledge_graph"]["edges"];
    //           // console.log("drugedges = ", drugedges)
    //           let drugnodes =
    //             drug["drugs"]["message"]["knowledge_graph"]["nodes"];
    //           // console.log("drugnodes = ", drugnodes)

    //           let drugedgekeys = Object.keys(drugedges);
    //           for (let x = 0; x < drugedgekeys.length; x++) {
    //             let dggResult = {};
    //             const key = drugedgekeys[x];
    //             let drug = drugedges[key];
    //             // console.log("drug")
    //             // console.log(drug)

    //             // dggResult.edgeAtt = result.edgeAtt;
    //             dggResult.geneTwo = result.geneTwo;
    //             dggResult.geneOne = result.geneOne;
    //             dggResult.predicate_gg = result.predicate_gg;
    //             dggResult.relation_gg = result.relation_gg;
    //             // dggResult.geneOneAtt = result.geneOneAtt;
    //             // dggResult.geneTwoAtt = result.geneTwoAtt;
    //             dggResult.geneOneName = result.geneOneName;
    //             dggResult.geneTwoName = result.geneTwoName;
    //             dggResult.geneOneCat = result.geneOneCat;
    //             dggResult.geneTwoCat = result.geneTwoCat;
    //             dggResult.showSyn = drug.showSyn;
    //             // dggResult.drugAtt = drug.atrributes;
    //             dggResult.predicateAtt_dg = drug.attributes;
    //             dggResult.predicate_dg = drug.predicate;
    //             dggResult.drug = drug.subject;
    //             dggResult.drugName = drugnodes[drug.subject].name;
    //             dggResult.drugCat = drugnodes[drug.subject].category;
    //             // dggResult.drugAtt = drugnodes[drug.subject].attributes;

    //             tableResults.push(dggResult);
    //             // nodedata.showSyn
    //           }
    //         }
    //         if (i == results.length - 1) {
    //           console.log("tableResults");
    //           console.log(tableResults);
    //           return tableResults;
    //         }
    //       }
    //     })
    //     .then(async (results) => {
    //       console.log("finished table results");
    //       console.log(results);
    //       // const result = words.filter(word => word.length > 6);
    //       let filteredResults = results.filter(
    //         (result) =>
    //           this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) >
    //             -1 ||
    //           this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) >
    //             -1
    //       );
    //       let filteredResultsmore = results.filter(
    //         (result) =>
    //           this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) >
    //             -1 &&
    //           this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) >
    //             -1
    //       );
    //       console.log("filteredResults = ", filteredResults);

    //       // let predicateArray = []
    //       // let predicateAllArray = []
    //       console.log("filteredResults = ", filteredResults);
    //       console.log("filteredResultsmore = ", filteredResultsmore);
    //       this.filteredResultsmore = filteredResultsmore;

    //     });

    // },


    saveThisFile(file, nametag) {
      let text = "";
      console.log("save result");

      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = file[index];
        console.log(result);

        let headers = Object.keys(result);
        console.log({headers})

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

      }

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
    // orderARSStatus(){
    //     return this.ARSResultStatus.sort((a, b) => a.name.localeCompare(b.name));
            
    //   // const ordered = Object.keys(this.ARSResultStatus).sort().reduce(
    //   //   (obj, key) => { 
    //   //     obj[key] = this.ARSResultStatus[key]; 
    //   //     return obj;
    //   //   }, 
    //   //   {}
    //   // );
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