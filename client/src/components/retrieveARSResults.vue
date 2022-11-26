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
              <b-form-input
                    style="width: 50%"
                    v-model="ARSrequestID"
                    id="concept_search"
                    class="mb-2 mr-sm-2 mb-sm-0"
                    placeholder="Object"
                    
                  ></b-form-input>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="ARSToTable"
                    >ARSToTable
                  </b-button>
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="testSaveFile2"
                    >testSaveFile2
                  </b-button> -->
                  <!-- <br /> testSaveFile2
              Example: {{ARSrequestID}} 
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="openARAX"
                    >openARAX
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="testRerunPK"
                    >testRerunPK
                  </b-button>
                  

                  <download-excel
                    class="btn btn-default"
                    :data="geneGeneExcel"
                    worksheet="My Worksheet"
                    :fields="excelFields"
                    :name="geneGeneFileName"
                  >
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    >Download Gene Gene sheet
                  </b-button>
                    Download Excel (you can customize this with html code!)
                  </download-excel> -->
                </b-form>
                  </b-form-group>
                
            </div>
          </b-form>
          
        </b-col>
        <b-col  v-if="showTerm">

          <transition name="fade"> 
            <div v-if="showTerm">
              <b-card
                border-variant="primary"
                header-tag="header"
                v-bind:header-bg-variant="headerBg"
                header-text-variant="white"
                class="text-center"
              >
                <template #header>
                  <div>
                    <h4 class="mb-0">{{queryTargetLabel}}</h4>
                  </div>
                </template>
                <b-card-text>
                  <h5>{{queryTargetId}}</h5></b-card-text
                >
              </b-card>
            </div>
          </transition>
        </b-col>
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
                      <!-- <div v-if = "showARS"> -->
        <!-- <h3 class="p-3 text-center">Vue.js - Display a list of items with v-for</h3> -->
        <table class="table table-striped table-bordered" :key="componentKey">
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
    <!-- </div>  -->
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
        <!-- <b-row style="margin-top: 20px" v-if="ARSResults.length > 0"> -->
        <b-row style="margin-top: 20px" v-if="false">
        <!-- <b-row style="margin-top: 20px" > -->
          <b-col>
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  ARSResults Subject Object Predicate length = {{ARSResults.length}}
                </h6>
                <b-form-group
          label="Filter"
          label-for="filter-input"
          label-cols-sm="3"
          label-align-sm="right"
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

          
          </b-input-group>
        </b-form-group>
              </template>
              <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="ARSResults.length"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
              <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="ARSResults"
                :fields="resultFields"
                :filter="filter"
                :filter-included-fields="filterOn"
              >
              </b-table>
            </b-card>
          </b-col>
        </b-row>

        <!-- <b-row style="margin-top: 20px">
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
        </b-row> -->
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
        <!-- <b-container>
          <b-row>
            <b-card style="margin-top: 20px; width: 100%" :key="componentKey">
              <div>
                <b-table hover :items="noveltyTable"></b-table>
              </div>
            </b-card>
          </b-row>
        </b-container> -->
 
      </b-container>
    </div>
  </div>
</template>

<script>
// import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
import TrapiResultClean from "../TrapiResultClean";
import ARSService from "../ARSService";
// import searchResult1 from "../assets/searchResult1.json"

// import excel from 'vue-excel-export'
// import ARAXService from "../ARAXService";
import NodeService from "../NodeService";
// import metagraph from "/Users/andycrouse/Documents/GitHub/medikweb-largefilefix/datafiles/metaknowledgegraph.json"
// import resultsAD from  "/Users/andycrouse/Documents/GitHub/medikweb_dev/datafiles/resultsAD.json"
// import svgtest from "./svgtest.vue"
// import importResultWithDrugs from "/Users/andycrouse/Downloads/resultWithDrugsWithFDA.json"
import synonymService from "../synonymService";
// import twohopdata from "../../../datafiles/twohopggd.json"


var parser = require("fast-xml-parser");
import axios from "axios";

// import { jsontoexcel } from "vue-table-to-excel";

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
      concept_search: "HGNC:2625",
      testNormalizationArray: ["HGNC:18481", "HGNC:6884" , "HGNC:2625", "HGNC:11998", "HGNC:3236", "HGNC:1100", "HGNC:9588", "HGNC:16716"],
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
      // ARSrequestID: "3ff82c51-3fd4-43e1-af82-e40c629b74fa",
      ARSrequestID: "eefdcc25-9e5d-4693-939f-6fbfccbe05d1", 
      // ARSrequestID: "75ae2eb4-d3ba-4b11-b217-f1440787e7ea",
      resultSetIDs: [],
      ARSResultStatus: {},
      ARSJobId: "bc32c185-6a97-4aff-b467-aa2fac22e275",
      ARSResults: [], 
      // testARSResults: searchResult1, 
      ARSResultsSPO: [],
      count: 0,
      statusTable: [],
      showARS: false,
      resultGroup: "gene",
      geneResults:[],
      drugResults:[],
      queryTerms: [],
      normalizedTermsAll:[],
      showTerm: false,
      queryTarget:"",
      queryTargetId:"",
      queryTargetLabel:"",
      genePk: "",
      drugPk: "",
      json_fields: {
        "Complete name": "name",
        City: "city",
        Telephone: "phone.mobile",
        "Telephone 2": {
          field: "phone.landline",
          callback: (value) => {
            return `Landline Phone - ${value}`;
          },
        },
      },

      json_meta: [
        [
          {
            key: "charset",
            value: "utf-8",
          },
        ],
      ],
      excelFields: {
        agent: "agent",
        "Edge ID": "edgeID",
        "Att Number": "attNum",
        "Object ID" :"object",
        "Object category": "objectCat",
        "Object categories": "objectCats",
        "Object Name": "objectName",
        "Predicate": "predicate",
        "Subject ID": "subject" ,
        "Subject Category": "subjectCat",
        "Subject Categories": "subjectCats",
        "Subject Name": "subjectName",
        "Att description": "description",
        "Att Name": "original_attribute_name",
        "Att value": "value",
        "Value type ID": "value_type_id",
        "Att source": "attribute_source",
        "Att type ID": "attribute_type_id",
        attributes: "attributes",

      },
      geneGeneFileName: "",
      drugGeneFileName: "",
      geneGeneExcel: [],
      drugGeneExcel: [],
      filterSubject: true,
      SRINodeData: {},
      allAnswerGraphArray: [],
      allResultsNodeTable:[],
      allResultsEdgeTable:[],
      allResutlDrugDiseaseTable:[],
      synData: [],
      cooccurrenceNodeData: [],
       noveltyTable: [],
      coocurrenceQuery: {
          "message": {
            "query_graph": {
              "edges": {
        "e1" :{"object": "n1", "predicates":["biolink:occurs_together_in_literature_with"], "subject": "n2"},
        "e2" :{"object": "n3", "predicates":["biolink:occurs_together_in_literature_with"], "subject": "n4"},
        "e3" :{"object": "n5", "predicates":["biolink:occurs_together_in_literature_with"], "subject": "n6"}
              },
              "nodes": {
        "n1":{ "ids":["DRUGBANK:DB01261"]},
        "n2":{ "ids":["MONDO:0005148"]},
        "n3":{ "ids":["DRUGBANK:DB00672"]},
        "n4":{ "ids":["MONDO:0005015"]},
        "n5":{ "ids":["DRUGBANK:DB00945"]},
        "n6":{ "ids":["MONDO:0005015"]}
              }
            }
          }
        },
        queryName: ""
       
    };
  },
  methods: {



    async ARSToTable(){

    // this.filterSubject = false
    let ARSStatus =  await ARSService.pkQueryData(this.ARSrequestID)
    console.log("ARSStatus")
    console.log(ARSStatus)
    
    await this.getNameing(ARSStatus)

    this.ARSResultStatus = {}

    this.resultGroup == "drug" // TO KEEP FROM LOOPING TO GET MORE INFO

    await this.makeARSStatusTable() 
    console.log("makeARSStatusTable")


    console.log("this.ARSResultStatus")
    console.log(this.ARSResultStatus)

    await this.ARSCleanResults() 
    console.log("ARSCleanResults")

    await this.resultEdgeGroupTable()
    console.log("CHECK ITHIS  ---  resultEdgeGroupTable")
    this.saveFile_ArrayJSONtoTable(this.allResultsEdgeTable, "edgeTable")


    await this.resultNodeGroupTable()
    console.log("CHECK ITHIS  ---  resultNodeGroupTable")
    console.log("this.allResultsNodeTable")
    console.log(this.allResultsNodeTable)
    this.saveFile_ArrayJSONtoTable(this.allResultsNodeTable, "nodeTable")
    console.log("this.ARSResults DONE")
    // console.log(this.ARSResults) 
    // this.componentKey++
    

    let uniqueNodes = await this.getUniqueNodeIDs()
    console.log("uniqueNodes")
    console.log(uniqueNodes)
    this.SRINodeData = await ARSService.getARAXSynonymsArray(uniqueNodes)

    console.log("this.SRINodeData")
    console.log(this.SRINodeData)

    // this.getDrugSynonyms()

  

    console.log("this.ARSResults")
    console.log(this.ARSResults)

    await this.araxCategoryGroup()
    console.log("getting categories")

    this.saveThisFile2(this.ARSResults, this.ARSrequestID)

  // MAKE THE NODES AND EDGES FOR THE COOCURRANCE

    console.log("running getSynonymDataForCooccuranceQuery ")
    await this.getSynonymDataForCooccuranceQuery()

    console.log("formatCoocurranceQueryBuild")
    let coocData = await this.formatCoocurranceQueryBuild()
    console.log("finshed formatCoocurranceQueryBuild")

    this.formatCoocurrData(coocData)

  },

// let synData = []
// console.log(synData)
async getNameing (ARSStatus){
  return new Promise(async (resolve, reject) => { // eslint-disable-line

// this.queryName = ""
    let nodes = ARSStatus.fields.data.message.query_graph.nodes
    let nodeKeys = Object.keys(nodes)
    this.queryName = ""
    for (let i = 0; i < nodeKeys.length; i++) {
      const node =nodeKeys[i];
      let nodeData  = {...nodes[node]}
      console.log(nodeData)
        if(Object.prototype.hasOwnProperty.call(nodeData, "name")){
          this.queryName = this.queryName + " " + node + "-" + nodeData.name
        } else if(Object.prototype.hasOwnProperty.call(nodeData, "ids")){
          this.queryName = this.queryName + " " + node + "-" + nodeData.ids[0]
        } else if(Object.prototype.hasOwnProperty.call(nodeData, "categories")){
          this.queryName = this.queryName + " " + node + "-" + nodeData.categories[0]
        } else {
          this.queryName = this.queryName + " " + node + "-" + "namedThing"
        }
      if(i == nodeKeys.length - 1){
        resolve()
      }
    }
  })
},


async formatCoocurrData (coocData){
  console.log("STARTED formatCoocurrData")
  let nodes = coocData.message.knowledge_graph.nodes
  let edges = coocData.message.knowledge_graph.edges
  let edgeKeys = Object.keys(edges)

  for (let i = 0; i < edgeKeys.length; i++) {
    let coocurrInfoRow = {}
    const edgeKey = edgeKeys[i];
    let edge = edges[edgeKey]
    coocurrInfoRow.subID = edge.subject
    coocurrInfoRow.subName = nodes[edge.subject].name
    coocurrInfoRow.objID = edge.object
    coocurrInfoRow.objName = nodes[edge.object].name

    for (let n = 0; n < edge.attributes.length; n++) {
      const att = edge.attributes[n];
      switch (true) {
        case att.attribute_type_id == "biolink:concept_count_subject":
          coocurrInfoRow.subCount = att.value
          break;
        case att.attribute_type_id == "biolink:concept_count_object":
          coocurrInfoRow.objCount = att.value
          break;
        case att.attribute_type_id == "biolink:concept_pair_count":
          coocurrInfoRow.pairCount = att.value
          break;
        case att.attribute_type_id == "biolink:tmkp_normalized_pointwise_mutual_information":
          coocurrInfoRow.normPointwise = att.value
          break;
      }
      if(n == edge.attributes.length - 1){
        this.noveltyTable.push(...coocurrInfoRow)
        // console.log("ENDED formatCoocurrData")
      }
      
    }
    if( i == edgeKeys.length - 1){
      console.log("ENDED formatCoocurrData - updating to show table")
      this.componentKey++
      this.saveFile_ArrayJSONtoTable(this.noveltyTable, "Novelty")
    }

    // noveltyTable
  }
  


},

async getSynonymDataForCooccuranceQuery(){
    return new Promise(async (resolve, reject) => { // eslint-disable-line

    console.log("getDrugSynonyms started")
    let synKeys = Object.keys(this.SRINodeData)
    console.log(synKeys)

    let drugNodes = this.allResultsNodeTable.filter(x => x.key == "drug")
    let diseaseNodes = this.allResultsNodeTable.filter(x => x.key == "disease")

    console.log("drugNodes")
    console.log(drugNodes)
    console.log("diseaseNodes")
    console.log(diseaseNodes)


    // GO THROUGH THE NODES THAT ARE DRUGS AND GET THEIR SYNONYMS
    for (let i = 0; i < drugNodes.length; i++) {
      const drugNode = drugNodes[i];
      let drugNodeid = drugNode.nodeID
      drugNode.diseaseName = ""
      // console.log("drugNodeid")
      // console.log(drugNodeid)
      // console.log("this.SRINodeData[drugNodeid]")
      // console.log(this.SRINodeData[drugNodeid])
      let disMatchNode = diseaseNodes.filter(x => x.resultGroup ==drugNode.resultGroup && x.agent == drugNode.agent)
      // console.log("disMatchNode")
      // console.log(disMatchNode)

      drugNode.disease = disMatchNode[0].nodeID
      drugNode.edgeID = drugNode.agent + "_" + drugNode.resultGroup
      // console.log("drugNode")
      // console.log(drugNode)
      try {
        if(Object.prototype.hasOwnProperty.call(this.SRINodeData[drugNode.disease], "nodes")){
          drugNode.diseaseName = this.SRINodeData[drugNode.disease].equivalent_identifiers[0].normalizer_name
        }
      }
      catch(err) {
        console.log("disease name error")
        console.log(err)
      }
      drugNode.drugName = ""

      try{
        if(Object.prototype.hasOwnProperty.call(this.SRINodeData[drugNodeid], "nodes")){
        
            let sybGroupDataNodes = this.SRINodeData[drugNodeid].nodes
            drugNode.drugName = this.SRINodeData[drugNodeid].equivalent_identifiers[0].normalizer_name
            // CHECK THE SRI NORMALIZER DATA THAT WAS CREATED FOR POSSIBLE SYNONYMS THAT MEET THE COOCURRANCE QUERY REQUIREMENTS
            for (let n = 0; n < sybGroupDataNodes.length; n++) {
              const node = sybGroupDataNodes[n];

              if(node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ChemicalMixture"){
                  // synData.ChemicalMixture_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name
                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ChemicalEntity"){
                  // synData.ChemicalEntity_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:ChemicalEntity"){
                  // synData.ChemicalEntity_drugbank = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:Polypeptide"){
                  // synData.Polypeptide_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:MolecularMixture"){
                  // synData.MolecularMixture_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:MolecularMixture"){
                  // synData.MolecularMixture_drugbank = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:Protein"){
                  // synData.Protein_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "PR" && node.category == "biolink:Protein"){
                  // synData.Protein_pr = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:SmallMolecule"){
                  // synData.SmallMolecule_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:SmallMolecule"){
                  // synData.SmallMolecule_drugbank = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ComplexMolecularMixture"){
                  // synData.ComplexMolecularMixture_chebi = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:ComplexMolecularMixture"){
                  // synData.ComplexMolecularMixture_drugbank = node.identifier
                  drugNode.synonym = node.identifier
                  // drugNode.drugName = node.normalizer_name

                }
                
                if(n == sybGroupDataNodes.length - 1){
                  this.cooccurrenceNodeData.push(drugNode)
                } 
            }
      }

    } catch {
      // console.log(err)
      // console.log("FAILED AT ") 
      console.log("FAILED AT  drugNode") 
      // console.log(drugNode) 
      // console.log("disMatchNode") 
      // console.log(disMatchNode) 
    }

    if(i == drugNodes.length - 1){
      console.log("this.cooccurrenceNodeData FINISHED")
      console.log(this.cooccurrenceNodeData)

      resolve()
    }
      
    }
  })

},

async formatCoocurranceQueryBuild(){

  return new Promise(async (resolve, reject) => { // eslint-disable-line

    console.log("START formatCoocurranceQueryBuild")
    let nodes = {}
    let edges = {}
    // let node = {"n1":{ "ids":["DRUGBANK:DB01261"]}}
    // let edge = {"e1" :{"object": "n1", "predicates":["biolink:occurs_together_in_literature_with"], "subject": "n2"}}

    for (let i = 0; i < this.cooccurrenceNodeData.length; i++) {
    // for (let i = 0; i < 2; i++) {
      const nodeData = this.cooccurrenceNodeData[i];

      if(nodeData.synonym != null && nodeData.disease != null){
        console.log("getting nodes and edges")
        
        let drugNodeID = "drug_" + i
        let disNodeID = "dis_" + i
        let edgeID = "e" + i
        nodes[drugNodeID] = {"ids":[nodeData.synonym]}
        nodes[disNodeID] = {"ids":[nodeData.disease]}
        edges[edgeID] = {"object": drugNodeID, "predicates":["biolink:occurs_together_in_literature_with"], "subject": disNodeID}
      }

      // if(i == this.cooccurrenceNodeData.length - 1){
      if(i == this.cooccurrenceNodeData.length -1){
        console.log("nodes")
        console.log(nodes)
        console.log("edges")
        console.log(edges)
        this.coocurrenceQuery.message.query_graph.edges = edges
        this.coocurrenceQuery.message.query_graph.nodes = nodes
        console.log("this.coocurrenceQuery")
        console.log(this.coocurrenceQuery)
        let cooccData = await NodeService.getCooccurance(this.coocurrenceQuery)
        console.log("cooccData")
        console.log(cooccData)

        resolve(cooccData)

      }
      
    }
  })
},

async getDrugSynonyms(){
console.log("getDrugSynonyms started")
let synKeys = Object.keys(this.SRINodeData)
console.log(synKeys)

// let categories = ["biolink:ChemicalMixture","biolink:ChemicalEntity", "biolink:NamedThing", "biolink:Polypeptide", "biolink:MolecularMixture", "biolink:Protein", "biolink:SmallMolecule", "biolink:ComplexMolecularMixture" ]
  for (let i = 0; i < synKeys.length; i++) {
    // SETUP BLANK TO ADD DATA IF EXISTS
      let synData = {}
      synData.id = ""
      synData.ChemicalMixture_chebi = ""
      synData.ChemicalEntity_chebi = ""
      synData.ChemicalEntity_drugbank = ""
      synData.Polypeptide_chebi = ""
      synData.MolecularMixture_chebi = ""
      synData.MolecularMixture_drugbank = ""
      synData.Protein_chebi = ""
      synData.Protein_pr = ""
      synData.SmallMolecule_chebi = ""
      synData.SmallMolecule_drugbank = ""
      synData.ComplexMolecularMixture_chebi = ""
      synData.ComplexMolecularMixture_drugbank = ""
      synData.synonym = ""
    //  end


    // CHECK FOR AVAILABLE DATA
      const synGroup = synKeys[i];
      // data.key = synGroup
      // data.drugbank = ""
      synData.id = synGroup
      console.log("synGroup")
      console.log(synGroup)

      // if(Object.prototype.hasOwnProperty.call(this.SRINodeData[synGroup], "nodes")){
      try{
        let sybGroupDataNodes = this.SRINodeData[synGroup].nodes

        for (let n = 0; n < sybGroupDataNodes.length; n++) {
          const node = sybGroupDataNodes[n];

          if(node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ChemicalMixture"){
            synData.ChemicalMixture_chebi = node.identifier
            synData.synonym = node.identifier
          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ChemicalEntity"){
            synData.ChemicalEntity_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:ChemicalEntity"){
            synData.ChemicalEntity_drugbank = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:Polypeptide"){
            synData.Polypeptide_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:MolecularMixture"){
            synData.MolecularMixture_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:MolecularMixture"){
            synData.MolecularMixture_drugbank = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:Protein"){
            synData.Protein_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "PR" && node.category == "biolink:Protein"){
            synData.Protein_pr = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:SmallMolecule"){
            synData.SmallMolecule_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:SmallMolecule"){
            synData.SmallMolecule_drugbank = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "CHEBI" && node.category == "biolink:ComplexMolecularMixture"){
            synData.ComplexMolecularMixture_chebi = node.identifier
            synData.synonym = node.identifier

          } else if (node.identifier.split(":")[0] == "DRUGBANK" && node.category == "biolink:ComplexMolecularMixture"){
            synData.ComplexMolecularMixture_drugbank = node.identifier
            synData.synonym = node.identifier

          }

          
          if(n == sybGroupDataNodes.length - 1){
            this.synData.push(synData)
          }        
      }

        } catch (err) {
          console.log(err)
          console.log("FAILED AT ") 
          console.log(this.SRINodeData[synGroup])
        }
      // }

    if(i == synKeys.length - 1){
      console.log("finished getting synonym table")
      this.saveFile_ArrayJSONtoTable(this.synData, "synonym table ")
    }

  }

// saveFile_ArrayJSONtoTable(data, name)


},
async resultEdgeGroupTable(){
  console.log("start resultGroupTable")
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    // results.fields.data
    // GET EACH DATA SET FROM THE ARAS
    for (let i = 0; i < this.allAnswerGraphArray.length; i++) {
    // for (let i = 0; i < 1; i++) {
      const res = this.allAnswerGraphArray[i].results.fields.data;
      let agent = this.allAnswerGraphArray[i].agent
      console.log("-res")
      console.log(res)
      let results = res.message.results
      console.log("--results")
      console.log(results)
      // GO THROUGH EACH RESULT
      for (let n = 0; n < results.length; n++) {
        const result = results[n];
        // console.log("----- result")
        // console.log(result)
        let edgeKeys = Object.keys(result.edge_bindings)
        for (let x = 0; x < edgeKeys.length; x++) {
          const edgeKey = edgeKeys[x];
          let edge_bindingGroup = result.edge_bindings[edgeKey]
          // console.log(" ---------- node_bindingGroup and key = ", nodeKey)
          // console.log(node_bindingGroup)
          let tableRow = {"agent": agent, "resultGroup": n,  "key": edgeKey, "edgeID": ""}
          //  EACH NODE IN ARRAY FOR EACH KEY
          for (let t = 0; t < edge_bindingGroup.length; t++) {
            // const element = array[t];
            // tableRow.edgeID = edge_bindingGroup[t].id
            // tableRow.edgeID = edge_bindingGroup[t].id
            // tableRow.edgeID = edge_bindingGroup[t].id
            tableRow = {...tableRow, edgeID:edge_bindingGroup[t].id}
            this.allResultsEdgeTable.push(tableRow)

            
          }
          
        }

        
      }

      if(i == this.allAnswerGraphArray.length -1){
        console.log("this.allResultsEdgeTable")
        console.log(this.allResultsEdgeTable)
        resolve()
      }
      
    }
  })

},

async resultNodeGroupTable(){
  console.log("start resultGroupTable")
  return new Promise(async (resolve, reject) => { // eslint-disable-line
// results.fields.data
    // GET EACH DATA SET FROM THE ARAS
    for (let i = 0; i < this.allAnswerGraphArray.length; i++) {
    // for (let i = 0; i < 1; i++) {
      const res = {...this.allAnswerGraphArray[i].results.fields.data}
      let agent = this.allAnswerGraphArray[i].agent
      // console.log("-res")
      // console.log(res)
      let results = res.message.results
      // console.log("--results")
      // console.log(results)
      // GO THROUGH EACH RESULT
      for (let n = 0; n < results.length; n++) {
        const result = {...results[n]}
        // console.log("----- result")
        // console.log(result)
        let nodeBindings = {...result.node_bindings}
        let nodeKeys = Object.keys(nodeBindings)
        // console.log("nodeBindings")
        // console.log(nodeBindings)
        for (let x = 0; x < nodeKeys.length; x++) {
          const nodeKey = nodeKeys[x];
          let nodeBindingsCopy = {...nodeBindings}
          let node_bindingGroup = nodeBindingsCopy[nodeKey]
          // let node_bindingGroup = nodeBindings[nodeKey]
          // if(n < 5){
          //   console.log("agent = ", agent, "-", n)
          //   console.log(" ---------- node_bindingGroup and key = ", nodeKey)
          //   console.log("node_bindingGroup")
          //   console.log(node_bindingGroup)
          //   console.log("node_bindingGroup.length")
          //   console.log(node_bindingGroup.length)
          //   console.log("#########################")
          // }

          let tableRow = {"agent": agent, "resultGroup": n,  "key": nodeKey, "nodeID": ""}
          //  EACH NODE IN ARRAY FOR EACH KEY
          for (let t = 0; t < node_bindingGroup.length; t++) {
            // const element = array[t];

            let node_bindingGroupObject = {...node_bindingGroup[t]}
            let pushTableRow = {...tableRow, nodeID: node_bindingGroupObject.id}
            // tableRow.nodeID = node_bindingGroupObject.id
            // this.allResultsNodeTable.push(tableRow)
            this.allResultsNodeTable.push(pushTableRow)
              // if(n < 5){
              //   console.log("tableRow = ", pushTableRow)
              //   // console.log(" ---------- node_bindingGroup and key = ", nodeKey)
              //   // console.log(node_bindingGroup)
              //   console.log("#########################")
              // }
            
          }
          
        }

        
      }

      if(i == this.allAnswerGraphArray.length -1){
        console.log("this.allResultsNodeTable")
        console.log(this.allResultsNodeTable)
        resolve()
      }
      
    }
  })

},


async araxCategoryGroup(){

    // ARSService.getARAXSynonyms
    for (let n = 0; n < this.ARSResults.length; n++) {
    // for (let n = 0; n < 10; n++) {
      console.log("GETTING araxCategoryGroup")
      const res = this.ARSResults[n];
      let subject = res.subject
      let object = res.object
      this.ARSResults[n].subjectSRIID = this.ARSResults[n].subject
      this.ARSResults[n].subjectSRICat = this.ARSResults[n].subjectCat
      this.ARSResults[n].subjectSRIName = this.ARSResults[n].subjectName
      this.ARSResults[n].subjectSRInormID = null
      this.ARSResults[n].subjectSRInormCat = null
      this.ARSResults[n].subjectSRInormName = null
      this.ARSResults[n].objectSRIID = this.ARSResults[n].object
      this.ARSResults[n].objectSRICat = this.ARSResults[n].objectCat
      this.ARSResults[n].objectSRIName = this.ARSResults[n].objectName
      this.ARSResults[n].objectSRInormID = null
      this.ARSResults[n].objectSRInormCat = null
      this.ARSResults[n].objectSRInormName = null 

      try{
        if(this.SRINodeData[subject] != null){
          if(this.SRINodeData[subject].id != null){
            try{
                //"category": "biolink:Drug",
                // "identifier": "MESH:Q000819",
                // "name": "agonists"
                // let subjectSRIData = await ARSService.getARAXSynonyms(subject)
                this.ARSResults[n].subjectSRInormID = this.SRINodeData[subject].id.SRI_normalizer_curie
                this.ARSResults[n].subjectSRInormCat = this.SRINodeData[subject].id.SRI_normalizer_category
                this.ARSResults[n].subjectSRInormName = this.SRINodeData[subject].id.SRI_normalizer_name
                this.ARSResults[n].subjectSRIID = this.SRINodeData[subject].id.identifier
                this.ARSResults[n].subjectSRICat = this.SRINodeData[subject].id.category
                this.ARSResults[n].subjectSRIName = this.SRINodeData[subject].id.name             
              } catch (err){
                console.log("subbject err = ", subject)
                console.log(this.SRINodeData[subject])
                // console.log(err)
              }
          }
        }
        if(this.SRINodeData[object] != null){
          if(this.SRINodeData[object].id != null){

            try{
              
              // let objectSRIData = await ARSService.getARAXSynonyms(object)
              this.ARSResults[n].objectSRInormID = this.SRINodeData[object].id.SRI_normalizer_curie
              this.ARSResults[n].objectSRInormCat = this.SRINodeData[object].id.SRI_normalizer_category
              this.ARSResults[n].objectSRInormName = this.SRINodeData[object].id.SRI_normalizer_name        
              this.ARSResults[n].objectSRIID = this.SRINodeData[object].id.identifier
              this.ARSResults[n].objectSRICat = this.SRINodeData[object].id.category
              this.ARSResults[n].objectSRIName = this.SRINodeData[object].id.name 
            } catch (err){
              console.log("object err = ", object)
              console.log(this.SRINodeData[object])

              // console.log(err)
            }  
          }   
        }   
      }  catch(err) {
        console.log("object err = ", object)
        console.log("this.SRINodeData[object] = ", this.SRINodeData[object])
        console.log("subject err = ", subject)
        console.log("this.SRINodeData[object] = ", this.SRINodeData[subject])
      }

      // console.log("subjectSRIData res")
      // console.log(res)  
    }


  },

  // async araxCategoryGroup(){

  //   // ARSService.getARAXSynonyms
  //   for (let n = 0; n < this.ARSResults.length; n++) {
  //   // for (let n = 0; n < 10; n++) {
  //     console.log("GETTING araxCategoryGroup")
  //     const res = this.ARSResults[n];
  //     let subject = res.subject
  //     let object = res.object

  //     try{
        
  //       let subjectSRIData = await ARSService.getARAXSynonyms(subject)
  //       this.ARSResults[n].subjecSRIID = subjectSRIData[subject].id.SRI_normalizer_curie
  //       this.ARSResults[n].subjecSRICat = subjectSRIData[subject].id.SRI_normalizer_category
  //       this.ARSResults[n].subjecSRIName = subjectSRIData[subject].id.SRI_normalizer_name
  //     } catch (err){
  //       console.log("subbject err = ", subject)
  //       console.log(err)
  //     }

  //     try{
        
  //       let objectSRIData = await ARSService.getARAXSynonyms(object)
  //       this.ARSResults[n].objecSRIID = objectSRIData[object].id.SRI_normalizer_curie
  //       this.ARSResults[n].objecSRICat = objectSRIData[object].id.SRI_normalizer_category
  //       this.ARSResults[n].objecSRIName = objectSRIData[object].id.SRI_normalizer_name        
  //     } catch (err){
  //       console.log("object err = ", object)
  //       console.log(err)
  //     }    

  //     console.log("subjectSRIData res")
  //     console.log(res)  
  //   }


  // },
    async getUniqueNodeIDs(){
    return new Promise(async (resolve, reject) => { // eslint-disable-line

      // ARSService.getARAXSynonymsArray
      let uniqueNodeArray = []
      for (let i = 0; i < this.ARSResults.length; i++) {
        const result = this.ARSResults[i];
        // console.log(uniqueNodeArray)
        // console.log(result.subject)
        // console.log(uniqueNodeArray.indexOf(result.subject))
        if(uniqueNodeArray.indexOf(result.subject) == -1){
          uniqueNodeArray.push(result.subject)
        }
        if(uniqueNodeArray.indexOf(result.object) == -1){
          uniqueNodeArray.push(result.object)
        }

        if(i == this.ARSResults.length -1){
          resolve(uniqueNodeArray)
        }
      
      }
    })


  },

  async getUniqueSRIIDs(){
    return new Promise(async (resolve, reject) => { // eslint-disable-line

      // ARSService.getARAXSynonymsArray
      let uniqueNodeArray = []
      for (let i = 0; i < this.ARSResults.length; i++) {
        const result = this.ARSResults[i];
        if(uniqueNodeArray.indexOf(result.subject) != -1){
          uniqueNodeArray.push(result.subject)
        }
        if(uniqueNodeArray.indexOf(result.object) != -1){
          uniqueNodeArray.push(result.object)
        }

        if(i == this.ARSResults.length -1){
          resolve(uniqueNodeArray)
        }
      
      }
    })


  },

    async nodeNormalize(queryTarget){

    return new Promise(async (resolve, reject) => { // eslint-disable-line
      console.log("node normal started")
      // #######################
      // LOOP THROUGH ALL TERMS TO GET ALL SYNONYMS
      // #######################
      synonymService.nodeNormalizationPost(queryTarget)
      .then(async (normalizedTerms) => {
      // console.log("passed .then()")
      this.queryTargetLabel = normalizedTerms[queryTarget[0]].id.label

        let normalKeys = Object.keys(normalizedTerms)
        let synonyms = []
        // PROCESS NODENORMALIZER DATA
        for (let i = 0; i < normalKeys.length; i++) {
          const key = normalKeys[i];
          let termData = normalizedTerms[key]
          // console.log("normalizedTerms[key]")
          // console.log(normalizedTerms[key])
          let normTerms = termData.equivalent_identifiers.map(x => x.identifier)
          this.synonyms = this.synonyms.concat(normTerms)
  
          if(i == normalKeys.length - 1){
            console.log("synonyms")
            console.log(synonyms)
            resolve(synonyms)
            return

          }

        }
        // reject(err)

      })
    })
    },

    async setPK(query) {
      return new Promise(async (resolve, reject) => { // eslint-disable-line

      // this.ARSResults = []
      console.log("------ eventLoop2 REQUEST STARTED")

      // ################
      // SEND TO ARS
      // ################
      // console.log("################################################")
      // console.log("RUNNING QUERY AFTER THIS")
      // console.log("################################################")
      let ARSRequest = await ARSService.ARSQuery(query)
      // console.log("query - ", this.resultGroup)
      // console.log(query)      
      // console.log("--------- ARSRequest ---------")
      // console.log(ARSRequest)
      // ARSStatus - GET PK FROM ARS TO LOOP AND CHECK 
      let ARSrequestID = ARSRequest.pk
      this.ARSrequestID = ARSrequestID

      if(this.resultGroup == "gene"){
        this.genePk = ARSrequestID
      }
      if(this.resultGroup == "drug"){
        this.drugPk = ARSrequestID
      }
      resolve(ARSrequestID)
      })
    },

    async makeARSStatusTable(){
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        let loopCount = 100
        for (let i = 0; i < loopCount; i++) {
        // for (let i = 0; i < 5; i++) {
          let ARSStatusCheck = await this.ARSStatusTable()
            // ################
            // SORT THE STATUS TABLE ALPHABETICALLY
            // ################
            let obj = this.ARSResultStatus
            let sorted = Object.keys(obj)
              .sort()
              .reduce((accumulator, key) => {
                accumulator[key] = obj[key];
                return accumulator;
              }, {});
              this.ARSResultStatus = sorted
              
          console.log("SORTED THE STATUS TABLE")
          this.componentKey++
          console.log("I LOOP NUMBER = ", i)
          // console.log("ARSStatusCheck")
          // console.log(ARSStatusCheck)
          // ################
          // CHECK STATUS OF RESULTS
          // ################     resultCount   
          // let ARSStatusCheckArray = Object.entries(ARSStatusCheck)
          // let checkForAnyResults = ARSStatusCheckArray.filter(x => x.resultCount > 0)
          // if(ARSStatusCheck.agentFinished < 3 && ARSStatusCheck.agentCount >13){
          if(ARSStatusCheck.agentFinished < 3){
          // if(checkForAnyResults.length != 0){
            i = loopCount
            console.log("finish before looping to 10!")
            console.log("this.ARSResultStatus")
            console.log(this.ARSResultStatus)

            this.componentKey++
            resolve()
            return
          } else {
            await new Promise(resolve => setTimeout(resolve, 3000));
          }
        }
      })// PROMISE

    },
    

    async ARSStatusTable () {
      return new Promise(async (resolve, reject) => { // eslint-disable-line

      let ARSStatus =  await ARSService.ARSStatus(this.ARSrequestID)

        let resultList = []
        console.log("ARSStatus")
        console.log(ARSStatus)
        resultList  = ARSStatus.children
        // console.log("# of sets of results = ", resultList.length)

        // ################
        // WAIT FOR 14 RESULTS SO THAT YOU DON'T PROCESS UNTIL THEY ARE ALL RESPONDING WITH SOMETHING - EVEN IF NOT COMLPLETED
        // ################
          
          // console.log("*** resultList = ", resultList)
          
          // let recheckStat = ["Running"]
          if(resultList.length == 0){
            resolve({agentFinished: 0, agentCount: 0})
          } else {
            for (let i = 0; i < resultList.length; i++) {
              // this.resultSetIDs = []
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
                          console.log("HAS MORE THAN 0 RESULTS")
                          console.log(result.fields.data)
                          if(result.fields.data.message.results == null){
                            this.ARSResultStatus[agent].resultCount = 0
                          } else {
                            this.ARSResultStatus[agent].resultCount = result.fields.data.message.results.length
                          }
                          // this.ARSResultStatus[agent].resultCount = result.fields.data.message.results.length
                        
                      }
                    }
                }

              // }

              this.resultSetIDs.push(this.ARSResultStatus[agent])
              this.componentKey++

              if(i == resultList.length - 1 ){
                // ################
                // CHECK IF DATA WAS GOTTEN FOR ALL AGENTS
                // ################      
                console.log("FINISHED GETTING ALL THE RESULTS")
                // ################
                // CHECK THE STATUS TO SEE IF ANY ARE STILL RUNNING - EXCLUDE UNSECRET FOR NOW
                // ################ 
                // this.resultSetIDs = []
                let checkRerun = this.resultSetIDs.filter(x => x.status == "Running" && x.agent != "ara-unsecret")

                // console.log("ARSResultStatus = ", this.ARSResultStatus)
                // console.log("i = ", i)
                // console.log("this.resultSetIDs = ")
                // console.log( this.resultSetIDs)
                // console.log("checkRerun = ", checkRerun)
                // if (checkRerun.length > 0) {
                  let res = {agentFinished: checkRerun.length, agentCount: resultList.length}
                  this.resultSetIDs = []
                  this.componentKey++
                  resolve(res)
                
              }    
            }            
          }

      }) //Promise ending 
    },

    async ARSCleanResults(){
      return new Promise(async (resolve, reject) => { // eslint-disable-line

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
        // this.ARSResultStatus[id]
        // console.log("this.ARSResultStatus[id]")
        // console.log(this.ARSResultStatus[id])
        this.resultSetIDs.push(this.ARSResultStatus[id])
        // console.log("this.ARSResultStatus[id]")
        // console.log(this.ARSResultStatus[id])

        if(this.ARSResultStatus[id].results.fields.data != null){
          if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.fields.data, "message")){
            if(Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.fields.data.message, "knowledge_graph")){
              if(this.ARSResultStatus[id].results.fields.data.message.results != null){

              
              console.log("CLEANING RESULTS")

              let resultCount = this.ARSResultStatus[id].results.fields.data.message.results.length
              if(resultCount > 0){
                console.log("this.ARSResultStatus[id].results.fields.data")
                console.log(this.ARSResultStatus[id].results.fields.data)
                // console.log("this.ARSResultStatus[id]")
                // console.log(this.ARSResultStatus[id])
                this.allAnswerGraphArray.push(this.ARSResultStatus[id])
                // console.log(this.ARSResultStatus[id].results.fields.data.message.results)
                // console.log(this.ARSResultStatus[id].results.fields.data.message)
                // message.knowledge_graph.nodes
                // let nodes = Object.keys(this.ARSResultStatus[id].results.fields.data.message.knowledge_graph.nodes)
                // console.log("nodes")
                // console.log(nodes)

                // let normalizedArray =  await ARSService.getSynonymsArray(nodes)
                // console.log("normalizedArray")
                // console.log(normalizedArray)

                // let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results.fields.data, id)
                console.log("DATA GOING TO BE CLEANED")
                // console.log(this.ARSResultStatus[id].results.fields.data)
                let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results.fields.data, id)
                // console.log("cleanedResults")
                // console.log(cleanedResults)
                // let normalResults = await this.normalizeCleaned(cleanedResults, normalizedArray)

                // console.log("normalResults")
                // console.log(normalResults)

                this.ARSResults = this.ARSResults.concat(cleanedResults) 
                // console.log("this.ARSResults")
                // console.log(this.ARSResults)

              }


              if (i == keys.length - 1){
                // console.log("this.ARSResults INSIDE IF CLAUSE")
                // console.log("this.ARSResults before")
                // console.log(this.ARSResults)    
                
                // ### MAY NEED TO TURN BACK ON:
                // if(this.filterSubject == true){
                  // this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)                                 
                // }


                // SAVE THE RAW DATA TO EXCEL
                console.log("about to save as test")
                this.saveFile_ArrayJSONtoTable(this.ARSResults, "test")
                console.log("save as test")

                // BELOW IS FOR THE TWO HOP DRUG GENE GENE
                  if(this.resultGroup == "gene"){
                    console.log("GENE run done - return")
                    console.log("this.ARSResults")
                    console.log(this.ARSResults)
                    this.geneResults = this.ARSResults
                    this.componentKey++
                    resolve()
                    return
                  }
                  if(this.resultGroup == "drug"){
                    console.log("DRUG run done - return")
                    this.drugResults = this.ARSResults
                    this.componentKey++
                    resolve()
                    return
                  }
                  
                // return
                }     
              }
            }
          }   
        } 
        // else if (i == keys.length - 1){
          if (i == keys.length - 1){
            // console.log("this.ARSResults INSIDE IF CLAUSE")
            // console.log("this.ARSResults before")
            // console.log(this.ARSResults)    
            
            // ### MAY NEED TO TURN BACK ON:
            // this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)                                 


              if(this.resultGroup == "gene"){
                console.log("GENE run done - return")
                console.log("this.ARSResults")
                console.log(this.ARSResults)
                this.geneResults = this.ARSResults
                this.componentKey++
                resolve()
                return
              }
              if(this.resultGroup == "drug"){
                console.log("DRUG run done - return")
                this.drugResults = this.ARSResults
                this.componentKey++
                resolve()
                return
              }
              
            // return
          }       
      }
    })
  },

  async normalizeCleaned(data, normalObject){
      console.log("### STARTING NORMALIZECLEANED ###")
      // console.log("data = ", data) 
      // console.log("normalObject = ", normalObject) 
      return new Promise(async (resolve, reject) => { // eslint-disable-line
      // let nullSubjectID = 0
        for (let n = 0; n < data.length; n++) {
          const el = data[n]
          let subjectID = el.subject
          let objectID = el.object
          let errorType = "none"
          // data[n].subjectNorm = null
          // data[n].objectNorm

          data[n].subjectNormID = data[n].subject
          data[n].subjectNormLabel = data[n].subjectName
          data[n].subjectCurPref = data[n].subject.split(":")[0]
          data[n].objectNormID = data[n].object
          data[n].objectNormLabel = data[n].objectName
          data[n].objectCurPref = data[n].object.split(":")[0]

          // Object.prototype.hasOwnProperty.call(this.ARSResultStatus[id].results.fields.data, "message")

          try{
            if(normalObject[subjectID] != null){
              console.log("MATCHED ONE WITH ID")
              errorType = "subject"
              data[n].subjectNormID = normalObject[subjectID].id.identifier
              data[n].subjectNormLabel = normalObject[subjectID].id.label 
              data[n].subjectCurPref = normalObject[subjectID].id.identifier.split(":")[0]             
            } 
            // if(Object.prototype.hasOwnProperty.call(normalObject[objectID], "id")){
            if(normalObject[objectID] != null){
              errorType = "object"
              data[n].objectNormID = normalObject[objectID].id.identifier
              data[n].objectNormLabel = normalObject[objectID].id.label 
              data[n].objectCurPref = normalObject[objectID].id.identifier.split(":")[0]             

            }

          }
          catch(err){
            console.log("normalizing err")
            console.log("normalizing err type = ", errorType)
            console.error(err)
            console.log("normalObject[objectID]")
            console.log(normalObject[objectID])
            console.log("normalObject[subjectID]")
            console.log(normalObject[subjectID])
            reject(data)
          }

          if(n == data.length - 1){
            console.log("data")
            console.log(data)
            resolve(data)
          }          
        }
      
      })


    },

    // saveExcel(file, nametag) {
    saveExcel(file) {
      // let text = "";
      console.log("saveExcel result");
      console.log("file = ", file)
      let excelData = []

      let attributeInfo = ["value","value_url","attributes","description","value_type_id","attribute_source","attribute_type_id","original_attribute_name"]
      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = file[index];
        // console.log("excel result - row start = ", result)

        // #################
        // START RESULT ROW
        // #################

        let excelRow = {}
        excelRow.agent = result.agent.toString()
        excelRow.edgeID = result.edgeKey.toString()
        excelRow.object = result.object.toString()
        excelRow.objectCat = result.objectCat.toString()
        excelRow.objectCats = result.objectCats.toString()
        excelRow.objectName = result.objectName.toString()
        excelRow.predicate = result.predicate.toString()
        excelRow.subject = result.subject.toString()
        excelRow.subjectCat = result.subjectCat.toString()
        excelRow.subjectCats = result.subjectCats.toString()
        excelRow.subjectName = result.subjectName.toString()
        excelRow.value = ""
        excelRow.value_url = ""
        excelRow.attributes = ""
        excelRow.description = ""
        excelRow.value_type_id = ""
        excelRow.attribute_source = ""
        excelRow.attribute_type_id = ""
        excelRow.original_attribute_name = ""

        // #################
        // APPEND ROW DATA WITH ATTRIBUTE DATA FOR EACH ATTRIBUTE
        // #################
        let atts = result["edgeinfo"]["attributes"]
        // console.log("atts")
        // console.log(atts)

        for (let m = 0; m < atts.length; m++) {
          const attGroup = atts[m];
          // console.log("attGroup check = ", attGroup)
          excelRow.attNum = m

            for (let x = 0; x < attributeInfo.length; x++) {
              const att = attributeInfo[x];
              // console.log("att")
              // console.log(att)

              // CREATE EMPTY DATA VALUE INCASE IT DOES NOT EXIST
              // let attCell = ""
                // CHECK TO SEE IF THE PART OF THE ATTRIBUTE EXISTS - IF SO THEN SET VALUE TO THAT
                if(Object.prototype.hasOwnProperty.call(attGroup, att)){
                  // console.log("FOUND ATTGROUP[ATT]")
                  if(attGroup[att] != null){
                    excelRow[att] = attGroup[att].toString()
                  } else {
                    excelRow[att] = ""
                  }
                }
      

                if(x == attributeInfo.length - 1){
                  const row = {...excelRow}
                  excelData.push(row)
                  // console.log("excelRow")
                  // console.log(row)

                  if(index == file.length - 1){
                    this.geneGeneExcel = excelData
                  }
                }
              
            }                  
        }

              

        

        // }
        if(index == file.length - 1){
          console.log("excelData")
          console.log(excelData)
          // console.log("(new TextEncoder().encode(text)).length")
          // console.log((new TextEncoder().encode(text)).length)
          // // console.log("pubmedAtt")
          // // console.log(pubmedAtt)
          // // console.log("pubmedAtt")
          // // console.log(pubmedAtt)
          // let filename = this.concept_search + "-" + nametag + " two hop results.csv";
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
          // console.log("file saved!!");
        }
      }


    },


    saveThisFile2(file, nametag) {
      let text = "";
      console.log("saveThisFile2 result");
      console.log("file")
      console.log(file)
      console.log("nametag")
      console.log(nametag)

      const attributeInfo = ["value","value_url","attributes","description","value_type_id","attribute_source","attribute_type_id","original_attribute_name"]
      // const attributeHeaders = ["value","value_url","attributes","description","value_type_id","attribute_source","attribute_type_id","original_attribute_name"]
      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = file[index];
        result.edgeGroup = index
        // console.log("result");
        // console.log(result);

        let headers = Object.keys(result);
        let allHeaders = headers.concat(attributeInfo) 
        // allHeaders = allHeaders 
        // console.log({headers})

        if (index == 0) {
          // #################
          // HEADER ROW
          // #################

          for (let i = 0; i < allHeaders.length; i++) {
            const header = allHeaders[i];
          // IGNORE EDGEINFO BECAUSE IT WILL BE USED TO BREAK OUT EACH LINE OF EVIDENCE AS AN ATTRIBUTE objectAtt
          if(header != "edgeinfo" && header != "objectAtt" && header != "subjectAtt"){

            if (i == allHeaders.length - 1) {
              text = text + header + "\r\n"
              
            } else {
              text = text + header + ",";
            }
          }


          }
        }
        // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
        // START ROW THEN REPEAT FOR EACH ATTRIBUTE

        // #################
        // START ROW
        // #################
        let rowData = ""
        // let pubmedAtt = []
        // #################
        // GRAB EACH COMMON ELEMENT PER ROW - THEN APPEND EACH ATTRIBUTE OF EVIDENCE TO IT AND CREATE A NEW ROW
        // #################
        for (let n = 0; n < headers.length; n++) {
          let header = headers[n]
        // #################
        // SKIP EDGGEINFO BC TOO MUCH PER ROW
        // #################
          // console.log("header")
          // console.log(header)
          // if(header != "edgeinfo" && header != "objectAtt" && header != "subjectAtt"){
              //GET EVERY VALUE TO PUT IN A CELL
              //edgepubInfo	edgen_pmids	edgeprovider	edgepublicationsText	edgepublications
          if(header != "edgeinfo" && header != "objectAtt" && header != "subjectAtt"){

            let cell = JSON.stringify(result[header]);
              // console.log("cell")
              // console.log(cell)
              if(cell != null){
                try {
                  cell = cell.replace(/,/gi, ";")
                  cell = cell.replace(/\n/gi, ";")
                  // cell = cell.replace(/\r/gi, ";")
                } catch (err) {
                  console.error("err trying to get cell info for undefined");
                  console.error(err);
                  console.log(header)
                  console.log("cell")
                  console.log(cell)
                  console.log("result")
                  console.log(result)
                  cell = ""
                }
              } else {
                cell = ""
              }

              rowData = rowData + cell + ","
          }
              
              // #################
              // GOT EDGE DATA TO START ROW FOR THIS EDGE TO START CSV
              // NEXT GET ATTRIBUTES AND APEND TO THIS - MAKE NEW ROW FOR EACH ATTRIBUTE
              // #################              
              if(n == headers.length - 1){
                // console.log("rowData")
                // console.log(rowData)
                // #################
                // GET ALL ATTRIBUTES FOR AN EDGE
                // #################
                let atts = result["edgeinfo"]["attributes"]
                // console.log("atts")
                // console.log(atts)
                // if(index < 20){
                //   console.log("########## attributeInfo to Start")
                //   console.log(attributeHeaders)                  
                // }

                for (let m = 0; m < atts.length; m++) {
                  const attGroup = atts[m];
                  // console.log("attGroup check")
                  // if(attGroup.attribute_source == "infores:pubmed" || attGroup.attribute_source  == "infores:text-mining-provider-targeted"){
                  //   // console.log("attGroup - publications = ", attGroup)
                  //   pubmedAtt.push(attGroup)
                  // }
                  // let attTextArray = attributeInfo
                  let attInfoText  = ""
                    for (let x = 0; x < attributeInfo.length; x++) {
                      const att = attributeInfo[x];
                      // console.log("att")
                      // console.log(att)

                      // CREATE EMPTY DATA VALUE INCASE IT DOES NOT EXIST
                      let attCell = "N/A"
                        // CHECK TO SEE IF THE PART OF THE ATTRIBUTE EXISTS - IF SO THEN SET VALUE TO THAT
                        // console.log("attTextArray to Start")
                        // console.log(attTextArray)
                        if(Object.prototype.hasOwnProperty.call(attGroup, att)){
                          // console.log("FOUND ATTGROUP[ATT]")
                          attCell = attGroup[att]
                            // REPLACE COMMAS WITH SEMICOLONS SO THAT IT DOES NOT MESS UP CSV
                            if(attCell != null){
                              try {
                                attCell = attCell.toString()
                                attCell = attCell.replace(/,/gi, ";");
                                attCell = attCell.replace(/\n/gi, ";")
                              } catch (err) {
                                console.error(err);
                              }                               
                            }
 
                        }else {
                          // console.log(" ---- DID NOT FIND ATTGROUP[ATT]")
                        }

                      attInfoText = attInfoText + attCell + ","


                        if(x == attributeInfo.length - 1){
                          // console.log("GOT TO END OF ROW AND ADDED ALL ATTRIBUTES!")
                          // console.log("rowData")
                          // console.log(rowData)
                          // if(index < 20){
                          //   console.log("attTextArray end")
                          //   console.log(attTextArray)                 
                          // }
                          
                          // REPEAT THE LINE TEXT AND ADD THE ATTRIBUTE TEXT AND ADD LINE BREAK
                          // SHOULD GET ONE LINE FOR EACH ATTRIBUTE GROUP
                          text = text + rowData + attInfoText.toString()   + "\r\n"
                          
                        }
                      
                    }                  
                }

              }

        

        }
        if(index == file.length - 1){
        // if(index == 100){
          // console.log("(new TextEncoder().encode(text)).length")
          // console.log((new TextEncoder().encode(text)).length)
          // console.log("pubmedAtt")
          // console.log(pubmedAtt)
          // console.log("pubmedAtt")
          // console.log(pubmedAtt) this.getNameing this.queryName
          // let filename =  "Edges with attributes - " + nametag + ".csv";
          // let filename = name + " " + this.ARSrequestID + ".csv";
          let filename =  "Edges with attributes - "  + this.queryName + nametag  + this.ARSrequestID+  ".csv";
          console.log("FILENAME ===== ", filename)
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
          console.log("FILE SAVED!!");
        }
      }


    },

    saveThisFile(file, nametag) {
      let text = "";
      console.log("saveThisFile result");
      

// {
//     "value": "infores:automat-robokop",
//     "value_url": null,
//     "attributes": null,
//     "description": null,
//     "value_type_id": null,
//     "attribute_source": null,
//     "attribute_type_id": "biolink:aggregator_knowledge_source",
//     "original_attribute_name": null
// }

      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = {...file[index]}

        if(["infores:service-provider-trapi:NCBIGene:23162-biolink:entity_negatively_regulated_by_entity-PUBCHEM.COMPOUND:5311", "153fdbefe537"].indexOf(result.edgeKey) > -1){
          console.log(" found result")
          console.log(result)
        }
        console.log("saving");
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

      let filename = nametag + "_ars_results.csv"
        // this.concept_search + "-" + nametag + " two hop results.csv";
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


    saveFile_ArrayJSONtoTable(data, name) {
      name = name + this.queryName
      let text = "";
      console.log("saveFile result");
      // let counter = 0

      for (let index = 0; index < data.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = {...data[index]}
        // console.log(result);

        let headers = Object.keys(result);
        // console.log({headers})
        // if(counter % 100 == 0){
        //   console.log("saved 1000 rows")
        // }
        
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
        } 
          // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
          // if(index < 10 ){
          //   console.log("result")
          //   console.log(result)
          // }
          for (let n = 0; n < headers.length; n++) {
            let header = headers[n];
            let cell = JSON.stringify(result[header]);
            // let cell = result[header]
            // console.log("cell = ", cell);

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
        // }
      }

      let filename = name + " " + this.ARSrequestID + ".csv";
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

    saveFile() {
      let text = "";
      console.log("saveFile result");

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