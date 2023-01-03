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
      <b-row style="min-height: 130px; width:100%">
        <!-- <b-card> -->
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
                    v-on:click="tryARS2"
                    >tryARS2
                  </b-button>                  

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
        
            </div>
          </b-form>

          
        </b-col>
        <!-- <b-col  v-if="showTerm"> -->
        <b-col >

          <transition name="fade"> 
            <!-- <div v-if="showTerm"> -->
              <b-card
                border-variant="primary"
                header-tag="header"
                v-bind:header-bg-variant="headerBg"
                header-text-variant="white"
                class="text-center"
              >
                <!-- <template #header>
                  <div>
                    <h4 class="mb-0">{{queryTargetLabel}}</h4>
                  </div>
                </template> -->
                <b-card-text>
                  <b-button
                    style="margin-left: 20px"
                    :variant="gettingAliasColor"
                    >Getting Target Gene Aliases
                  </b-button>  
                </b-card-text>
                <b-card-text>
                  <b-button
                    style="margin-left: 20px"
                    :variant="gettingGGColor"
                    >Getting Genes-Gene Edges
                  </b-button>
                </b-card-text>
                <b-card-text>  
                  <b-button
                    style="margin-left: 20px"
                    :variant="gettingDGColor"
                    >Getting Drug-Gene Edges
                  </b-button>  
                </b-card-text>
              </b-card>
            <!-- </div>  -->
          </transition>
        </b-col>
        <!-- </b-card> -->
      </b-row>

      <b-container style="margin-top: 20px; border-top:2px" :key="componentKey" fluid>
        <b-row>
          <!-- <b-button v-b-toggle.collapse-1 variant="primary"> Show Synonyms</b-button> -->
          <!-- <b-button size="sm" v-b-toggle.genePKProgress style="margin-left:20px"> Gene-Gene ARS Progress </b-button> -->
          <!-- <b-button size="sm" :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="genePKProgress" @click="visible = !visible" style="margin-left:20px">
            Gene-Gene ARS Progress
          </b-button>  
          <b-button size="sm" :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="drugPKProgress" @click="visible = !visible" style="margin-left:20px">
            Drug-Gene ARS Progress
          </b-button> 
          <b-button size="sm" :class="visible ? null : 'collapsed'" :aria-expanded="visible ? 'true' : 'false'" aria-controls="genePKProgress" @click="visibleGene = !visibleGene" style="margin-left:20px">
            Gene-Gene ARS Progress
          </b-button>          
          <b-button size="sm" :class="visible ? null : 'collapsed'" :aria-expanded="visibleDrug ? 'true' : 'false'" aria-controls="drugPKProgress" @click="visibleDrug = !visibleDrug" style="margin-left:20px">
            Drug-Gene ARS Progress
          </b-button> -->
          <b-button v-if="targetGeneSynonyms.length > 1" size="sm" variant="primary" @click="visibleSynonyms = !visibleSynonyms" style="margin-left:20px">
            Show Synonyms
          </b-button> 
          <b-button v-if="GGResultStatus.length > 0" size="sm" variant="primary" @click="visibleGene = !visibleGene" style="margin-left:20px">
            Show Gene-Gene ARS Progress
          </b-button> 
          <b-button v-if="DGResultStatus.length > 0" size="sm" variant="primary" @click="visibleDrug = !visibleDrug" style="margin-left:20px">
            Show Drug-Gene ARS Progress
          </b-button> 


        </b-row>
        <br/>
        <!-- <b-row v-if="targetGeneSynonyms.length > 1"> -->
        <b-row style="width:100%" v-if="visibleSynonyms && targetGeneSynonyms.length > 1" >
            <div>
              <b-card>
                <template #header>
                  <h4 class="mb-0"> 
                    Synonyms:
                  </h4>
                </template>
                <b-table
                  bordered
                  striped
                  hover
                  ref="targetGeneSynonymsTable"
                  table-layout:
                  fixed
                  :items="targetGeneSynonyms"
                >
                </b-table>
              </b-card>
            </div>
            <!-- </b-collapse> -->
          <!-- </div> -->
          <br />
        </b-row>
        
        <!-- <b-row v-if="genePk.length > 2"> -->
          @remind transition
          <transition name="slide"> 
        <b-row style="width:100%" v-if="visibleGene && GGResultStatus.length > 0" >
          <!-- <a class="font-weight-lighter" v-b-toggle href="#genePKProgress" @click.prevent>Toggle Collapse</a> -->
          <!-- <a class="clickTextLight secondary" v-b-toggle.genePKProgress  @click.prevent>Toggle Collapse</a> -->
          <!-- <a style="text-decoration: none; color: grey;" v-b-toggle.genePKProgress >Toggle Collapse</a> -->
          <!-- <b-collapse id="genePKProgress" style="width:100%" v-model="visible"> -->
          <b-card
            header="featured"
            header-tag="header"
            :key="componentKey"
            style="width: 100%"
            
          >
          <!-- plus-circle <b-button v-b-toggle.geneARSProgress>Toggle Collapse</b-button>-->
            <template #header>
              <h4 class="mb-0"> 
                <!-- <b-button size="sm" v-b-toggle.geneARSProgress><b-icon icon="plus-circle"> </b-icon></b-button> -->
                Gene result progress:
              </h4>
            </template>
            <!-- <b-collapse id="geneARSProgress"> -->
            <br />
          <b-card-text>
            <h5>genePk: {{genePk}}</h5>

            <b-button
              v-if="genePk.length > 2"
              size="sm"
              style="margin-left: 20px"
              variant="secondary"
              v-on:click="openInNewTab('http://localhost:8081/retrieveARSResults?pkid=' + genePk)"
              >Send to download page
            </b-button> 
            
            </b-card-text
          >
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
                <tr v-for="result in GGResultStatus" :key="result.id">
                    <td>{{result.agent}} </td>
                    <td>{{result.code}}</td>
                    <td>{{result.status}}</td>
                    <!-- <td>{{result.status}}</td> -->
                    <td>{{result.id}}</td>
                    <td>{{result.resultCount}}</td>
                    <td><b-icon
                    v-if="result.status == 'Running' && result.resultCount != 0"
                    style="margin-left: 5px"
                    icon="circle-fill"
                    animation="throb"
                    font-scale="2"
                  ></b-icon></td>
                </tr>
              </tbody>
            </table>
            <br />
            <!-- </b-collapse> -->
          </b-card>
          <!-- </b-collapse> -->
        </b-row>
          </transition>
        <br />
        <!-- <b-row v-if="drugPk != {}"> -->
        <transition name="slide"> 
        <b-row style="width:100%" v-if="visibleDrug  && DGResultStatus.length > 0">
          <b-card
            header="featured"
            header-tag="header"
            :key="componentKey"
            style="width: 100%"
          >
            <template #header>
              <h4 class="mb-0">Drug result Progress:</h4>
            </template>
            <br />
          <b-card-text>
            <h5>drugPk: {{drugPk}}</h5>
            <b-button
              v-if="drugPk.length > 2"
              size="sm"
              style="margin-left: 20px"
              variant="secondary"
              v-on:click="openInNewTab('http://localhost:8081/retrieveARSResults?pkid=' + drugPk)"
              >Send to download page
            </b-button> 
            </b-card-text
          >
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
                <tr v-for="result in DGResultStatus" :key="result.id">
                  <td>{{result.agent}} </td>
                  <td>{{result.code}}</td>
                  <td>{{result.status}}</td>
                  <!-- <td>{{result.status}}</td> -->
                  <td>{{result.id}}</td>
                  <td>{{result.resultCount}}</td>
                  <td><b-icon
                  v-if="result.status == 'Running' && result.resultCount != 0"
                  style="margin-left: 5px"
                  icon="circle-fill"
                  animation="throb"
                  font-scale="2"
                ></b-icon></td>
                </tr>
              </tbody>
          </table>
            <br />

          </b-card>
        </b-row>
        </transition>
        
        <b-row style="margin-top: 20px" v-if="geneResults.length > 0">
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                Gene - Gene Results  = {{geneResults.length}}
                </h6>
              </template>
                <b-pagination
                  style="padding-bottom: 20px"
                  v-model="currentPage"
                  :total-rows="ggTotalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
                <b-table
                  bordered
                  striped
                  hover
                  :current-page="currentPage"
                  :per-page="perPage"
                  table-layout:
                  fixed
                  sticky-header="1000px"
                  :fields="resultFields"
                  :items="geneResults"
                  :filter="filter"
                  :filter-include-fields="[]"
                  @filtered="onFiltered"
                ></b-table>
            </b-card>
        </b-row>

        <b-row style="margin-top: 20px" v-if="drugResults.length > 0">
            <b-card :key="componentKey + 1000">
              <template #header>
                <h6 class="mb-0">
                  Drug - Gene Results = {{drugResults.length}}
                </h6>
              </template>
                <b-pagination
                  style="padding-bottom: 20px"
                  v-model="currentPage"
                  :total-rows="dgTotalRows"
                  :per-page="perPage"
                  align="fill"
                  size="sm"
                  class="my-0"
                ></b-pagination>
                <b-table
                  bordered
                  striped
                  hover
                  :current-page="currentPage"
                  :per-page="perPage"
                  table-layout:
                  fixed
                  sticky-header="1000px"
                  :fields="resultFields"
                  :items="drugResults"
                  :filter="filter"
                  :filter-include-fields="[]"
                  @filtered="onFiltered"
                ></b-table>
              <!-- <b-table
                bordered
                striped
                hover
                ref="timepersteptable"
                table-layout:
                fixed
                :items="geneResults"
                :fields="resultFields"
              >
              </b-table> -->
            </b-card>
          <!-- </b-col> -->
        </b-row>

        <!-- <b-row style="margin-top: 20px">
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


        <!-- <b-container>
          <b-row>
            <b-card style="margin-top: 20px; width: 100%" :key="componentKey">
              <template #header>
                <h4 class="mb-0">Drug Gene Progress:</h4>
              </template>
              <b-card-text>
                {{currentDrug}}
                              </b-card-text>
              <b-card-body> </b-card-body>
            </b-card>
          </b-row>
        </b-container> -->
        <!-- <b-container :key="componentKey">
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
// import excel from 'vue-excel-export'
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
      visible: true,
      visibleGene: true,
      visibleDrug: true,
      visibleSynonyms: true,
      status: false,
      perPage: 10,
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
      ARSrequestID: "75ae2eb4-d3ba-4b11-b217-f1440787e7ea",
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
      targetGeneSynonyms:[],
      gettingGGColor: "outline-primary",
      gettingDGColor: "outline-primary",
      gettingAliasColor: "outline-primary",
      GGResultStatus: {},
      DGResultStatus: {}


    };
  },
  methods: {
    openInNewTab(url) {
      window.open(url, '_blank', 'noreferrer');
    },
    // download() {
    //   console.log(this.json)
    //   const { data, head, fileName } = this.json;
    //   jsontoexcel.getXlsx(data, head, fileName);
    // },
    async testNormalization(){

        let synData = await synonymService.nodeNormalizationPost(this.testNormalizationArray)
        console.log(synData)

    },
    openARAX: function () {   
      
      let url = "https://arax.ncats.io/?r=" + this.ARSrequestID
        window.open(url, "_blank");    
    },

    async testRerunPK(){

      let ARSStatus =  await ARSService.pkQueryData(this.ARSrequestID)
      console.log("ARSStatus")
      console.log(ARSStatus)

      this.queryTarget = ARSStatus.fields.data.message.query_graph.nodes.targetGene.ids
      console.log("this.queryTarget")
      console.log(this.queryTarget)
      this.queryTargetId = this.queryTarget[0]

      let normalNodes = await this.nodeNormalize(this.queryTarget)
      this.showTerm = true
      console.log("normalNodes")
      console.log(normalNodes)

      await this.makeARSStatusTable() 
      console.log("makeARSStatusTable")

      await this.ARSCleanResults() 
      console.log("ARSCleanResults")


      if(this.resultGroup == "gene"){
        this.resultGroup = "drug"
        console.log("DONE! - gene")
        console.log("this.geneResults")
        console.log(this.geneResults)
        let genesForDrug = this.ARSResults.map(x => x.object)
        genesForDrug.push(this.concept_search)
        this.queryTerms = genesForDrug
        // console.log("this.queryTerms")
        // console.log(this.queryTerms)
        this.geneGeneFileName = this.concept_search + "_gene_gene"
        // let fileName = this.concept_search + "_gene_gene"
        this.saveExcel(this.geneResults)
        this.saveThisFile2(this.geneResults, this.geneGeneFileName)
        // this.tryARS2()

      } else{
        this.drugGeneFileName = this.concept_search + "_drug_gene"
        this.saveExcel(this.geneResults)
        this.saveThisFile2(this.drugResults, this.geneDrugFileName)
        // this.saveExcel(this.drugResults)
        console.log("THIS IS THE END")
      }
      

    },

    async ARSToTable(){

      this.filterSubject = false
      let ARSStatus =  await ARSService.pkQueryData(this.ARSrequestID)
      console.log("ARSStatus")
      console.log(ARSStatus)

      this.ARSResultStatus = {}

      // this.queryTarget = ARSStatus.fields.data.message.query_graph.nodes.targetGene.ids
      // console.log("this.queryTarget")
      // console.log(this.queryTarget)
      // this.queryTargetId = this.queryTarget[0]

      // let normalNodes = await this.nodeNormalize(this.queryTarget)
      // this.showTerm = true
      // console.log("normalNodes")
      // console.log(normalNodes)


      this.resultGroup == "drug" // TO KEEP FROM LOOPING TO GET MORE INFO

      await this.makeARSStatusTable() 
      console.log("makeARSStatusTable")

      await this.ARSCleanResults() 
      console.log("ARSCleanResults")

      console.log("this.ARSResults")
      console.log(this.ARSResults)

      // if(this.resultGroup == "gene"){
      //   this.resultGroup = "drug"
      //   console.log("DONE! - gene")
      //   console.log("this.geneResults")
      //   console.log(this.geneResults)
      //   let genesForDrug = this.ARSResults.map(x => x.object)
      //   genesForDrug.push(this.concept_search)
      //   this.queryTerms = genesForDrug
      //   // console.log("this.queryTerms")
      //   // console.log(this.queryTerms)
      //   this.geneGeneFileName = this.concept_search + "_gene_gene"
      //   // let fileName = this.concept_search + "_gene_gene"
      //   this.saveExcel(this.geneResults)
      //   this.saveThisFile2(this.geneResults, this.geneGeneFileName)
      //   // this.tryARS2()

      // } else{
      //   this.drugGeneFileName = this.concept_search + "_drug_gene"
      //   this.saveExcel(this.geneResults)
      //   this.saveThisFile2(this.drugResults, this.geneDrugFileName)
      //   // this.saveExcel(this.drugResults)
      //   console.log("THIS IS THE END")
      // }
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
      this.synonyms = []
      
      // #######################
      // PREPARE TO REMOVE NODES THAT DON'T HAVE TARGET GENE AS OBJECT - GET SYNONYMS
      // CAN SEARCH WITH SINGLE TERM THOUGH - ARAS ARE NORMALISZING
      // #######################


      // #######################
      // LOOP THROUGH ALL TERMS TO GET ALL SYNONYMS
      // #######################
      // @remind get synonyms
      synonymService.nodeNormalizationPost(this.queryTerms)
      .then(async (normalizedTerms) => {
        this.gettingAliasColor = "primary"
        let normalKeys = Object.keys(normalizedTerms)
        console.log("normalizedTerms")
        console.log(normalizedTerms)
        // PROCESS NODENORMALIZER DATA
        for (let i = 0; i < normalKeys.length; i++) {
          const key = normalKeys[i];
          let termData = normalizedTerms[key]
          console.log("normalizedTerms[key]")
          console.log(normalizedTerms[key])
          let normTerms = termData.equivalent_identifiers.map(x => x.identifier)
          this.synonyms = this.synonyms.concat(normTerms)

          this.geneSynonyms = this.synonyms
          this.targetGeneSynonyms = termData.equivalent_identifiers

          if(i == normalKeys.length - 1){
            console.log("this.synonyms")
            console.log(this.synonyms)
            console.log("this.queryTerms")
            console.log(this.queryTerms)
            return
          }

        }

      })
      .then(async () => {
        // @remind set query
        // console.log("step 2 started")
          if(this.resultGroup == "gene"){
            this.query_gg.message.query_graph.nodes.targetGene.ids = this.queryTerms

            // #######################
            // SEND TO LOOP THE QUERY TO ARS - USE EVENT LOOPING
            // #######################
            let query = this.query_gg
            // this.ARSResultsLoop(query)
            return query
        }   
          else if(this.resultGroup == "drug"){
            this.query_dg.message.query_graph.nodes.genes.ids = this.queryTerms
            // #######################
            // SEND TO LOOP THE QUERY TO ARS - USE EVENT LOOPING
            // #######################
            let query = this.query_dg
            // this.ARSResultsLoop(query)
            return query
        }         
      })
      // .then(async (test) => {test.filter(x=> x==1)})
      .then(async (query) => {
        // #######################
        // GET PK FOR QUERY
        // #######################
        let pk = await this.setPK(query)
        return pk
      })
      .then(async () => {
        // @remind loop ARS
        // #######################
        // LOOP i < 10 times TO GET FULL ARS STATUS TABLE BUILT this.ARSrequestID
        // IF NOT DONE IN THAT MANY TIMES THEN MOVE ON
        // #######################
        for (let i = 0; i < 10; i++) {
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
          console.log("ARSStatusCheck")
          console.log(ARSStatusCheck)
          // ################
          // CHECK STATUS OF RESULTS
          // ################          
          if(ARSStatusCheck.agentFinished == 0 && ARSStatusCheck.agentCount >15){
            i = 10
            // console.log("finish before looping to 10!")
            // console.log("this.ARSResultStatus")
            // console.log(this.ARSResultStatus)

            this.componentKey++
            return
          } else {
            await new Promise(resolve => setTimeout(resolve, 5000));
          }
        }

      }) //ARSCleanResults
      .then(async () => {
        await this.ARSCleanResults()
        return
      })
      .then(async () => {
        if(this.resultGroup == "gene"){
          this.resultGroup = "drug"
          console.log("DONE!")
          let genesForDrug = this.ARSResults.map(x => x.object)
          genesForDrug.push(this.concept_search)
          this.queryTerms = genesForDrug
          // console.log("this.queryTerms")
          // console.log(this.queryTerms)
          this.geneGeneFileName = this.concept_search + "_gene_gene"
          let fileName = this.concept_search + "_gene_gene"

          // NEW FLATTENING CLEAN
          
          let cleanedResults = await TrapiResultClean.flattenGetPublications(this.geneResults)
          this.ggTotalRows = this.geneResults.length
          this.saveThisFile(cleanedResults, fileName)
          console.log("cleanedResults")
          console.log(cleanedResults)
          // @remind uncomment for two hop
          this.tryARS2()
          // this.saveExcel(this.geneResults)
          this.saveThisFile2(this.geneResults, fileName)

        } else{
          this.resultGroup == "gene"
          let fileName = this.concept_search + "_drug_gene"
          this.saveThisFile2(this.drugResults, fileName)
          this.saveExcel(this.drugResults)
          // this.saveExcel(this.drugResults)
          console.log("THIS IS THE END")
        }

        // if()
      })

    },

    // @remind nodeNormalize
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
           if(this.resultGroup == "gene"){
            this.geneSynonyms = this.resultGroup
           }
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

    // @remind setPK
    async setPK(query) {
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        console.log("------ eventLoop2 REQUEST STARTED")

        // ################
        // SEND TO ARS
        // ################
        // console.log("################################################")
        // console.log("RUNNING QUERY AFTER THIS")
        // console.log("################################################")
        let ARSRequest = await ARSService.ARSQuery(query)

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

        for (let i = 0; i < 10; i++) {
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
          // ################          
          if(ARSStatusCheck.agentFinished < 3 && ARSStatusCheck.agentCount >13){
            i = 10
            console.log("finish before looping to 10!")
            console.log("this.ARSResultStatus")
            console.log(this.ARSResultStatus)

            this.componentKey++
            resolve()
            return
          } else {
            await new Promise(resolve => setTimeout(resolve, 1000));
          }

        }
      })// PROMISE

    },
    
    // @remind ARSStatusTable - ARS STATUS TABLE LOOP 
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

                // if(resInfo.status == "Running" && resInfo.agent  "ara-unsecret"){
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

              // PUT INTO ARRAY TO DISPLAY IN TABLE
              this.resultSetIDs.push(this.ARSResultStatus[agent])
              // if(this.resultGroup == "gene"){
              //   this.GGResultStatus = this.resultSetIDs
              //   this.componentKey++
              // }
              // if(this.resultGroup == "drug"){
              //   this.DGResultStatus = this.resultSetIDs
              //   this.componentKey++
              // }
              this.componentKey++

              if(i == resultList.length - 1 ){
                if(this.resultGroup == "gene"){
                  this.GGResultStatus = this.resultSetIDs.sort((a, b) => (a.agent > b.agent) ? 1 : -1)
                  this.componentKey++
                }
                if(this.resultGroup == "drug"){
                  this.DGResultStatus = this.resultSetIDs.sort((a, b) => (a.agent > b.agent) ? 1 : -1)
                  this.componentKey++
                }
                // ################
                // CHECK IF DATA WAS GOTTEN FOR ALL AGENTS
                // ################      
                console.log("FINISHED GETTING ALL THE RESULTS")
                // ################
                // CHECK THE STATUS TO SEE IF ANY ARE STILL RUNNING - EXCLUDE UNSECRET FOR NOW
                // ################ 
                // this.resultSetIDs = []
                // let checkRerun = this.resultSetIDs.filter(x => x.status == "Running" && x.agent != "ara-unsecret")
                let checkRerun = this.resultSetIDs.filter(x => x.status == "Running" && x.resultCount != 0)

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
              // console.log("CLEANING RESULTS")
              // console.log(this.ARSResultStatus[id].results)
              let cleanedResults = await TrapiResultClean.TrapiResultClean(this.ARSResultStatus[id].results.fields.data, id)
              console.log("cleanedResults")
              console.log(cleanedResults)

              this.ARSResults = this.ARSResults.concat(cleanedResults) 

              if (i == keys.length - 1){
                // console.log("this.ARSResults INSIDE IF CLAUSE")
                // console.log("this.ARSResults before")
                // console.log(this.ARSResults)    
                
                // ### MAY NEED TO TURN BACK ON:
                if(this.filterSubject == true){
                  this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)                                 
                }

                  // @remind uncomment the two resolves below
                  if(this.resultGroup == "gene"){
                    
                    console.log("GENE run done - return")
                    console.log("this.ARSResults")
                    console.log(this.ARSResults)

                    // NEW FLATTENING CLEAN @remind send gene results for flatten

                    let cleanedFlatResults = await TrapiResultClean.flattenGetPublications(this.ARSResults)
                    console.log("cleanedFlatResults")
                    console.log(cleanedFlatResults)
                    
                    let fileName = this.concept_search + "_gene_gene"
                    this.saveThisFile(cleanedFlatResults, fileName)

                    // NEW FLATTENING CLEAN - END
                    this.geneResults = this.ARSResults
                    this.ggTotalRows = this.geneResults.length
                    console.log("this.geneResults")
                    console.log(this.geneResults)
                    this.componentKey++
                    resolve()
                    return
                  }
                  if(this.resultGroup == "drug"){
                    console.log("DRUG run done - return")
                    
                    // NEW FLATTENING CLEAN @remind send gene results for flatten drugResults
                    console.log("this.drugResults")
                    console.log(this.drugResults)
                    let cleanedFlatResults = await TrapiResultClean.flattenGetPublications(this.ARSResults)
                    console.log("cleanedFlatResults")
                    console.log(cleanedFlatResults)
                   
                    
                    let fileName = this.concept_search + "_drug_gene"
                    this.saveThisFile(cleanedFlatResults, fileName)

                    // NEW FLATTENING CLEAN - END

                    this.drugResults = this.ARSResults
                    this.dgTotalRows = this.drugResults.length
                    console.log("this.drugResults")
                    console.log(this.drugResults) 
                    this.componentKey++
                    resolve()
                    return
                  }
                  
                // return
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
            this.ARSResults = this.ARSResults.filter(x => this.synonyms.indexOf(x.subject) != -1)                                 

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

    // saveExcel(file, nametag) {
    saveExcel(file) {
      // let text = "";
      console.log("save result");
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

                    if(this.resultGroup == "gene"){
                      this.geneGeneExcel = excelData
                    }

                    if(this.resultGroup == "drug"){
                      this.drugGeneExcel = excelData
                    }

                    
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
      console.log("save result");

      let attributeInfo = ["value","value_url","attributes","description","value_type_id","attribute_source","attribute_type_id","original_attribute_name"]
      for (let index = 0; index < file.length; index++) {
        // const result = this.groupedResultsTable[index];
        const result = file[index];
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
          // if(header != "edgeinfo" && header != "objectAtt" && header != "subjectAtt"){

            if (i == allHeaders.length - 1) {
              text = text + header + "\r\n"
              
            } else {
              text = text + header + ",";
            }
          // }

          }
        }
        // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
        // START ROW THEN REPEAT FOR EACH ATTRIBUTE

        // #################
        // START ROW
        // #################
        let rowData = ""
        let pubmedAtt = []
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
              let cell = JSON.stringify(result[header]);
              // console.log("cell")
              // console.log(cell)
              try {
                cell = cell.replace(/,/gi, ";")
                cell = cell.replace(/\n/gi, ";")
              } catch (err) {
                console.error(err);
              }
              rowData = rowData + cell + ","
              // if(n == headers.length - 1){
              //   text = rowData + "\r\n"
              // }
              
              if(n == headers.length - 1){
                // console.log("rowData")
                // console.log(rowData)
                // #################
                // APPEND ROW DATA WITH ATTRIBUTE DATA FOR EACH ATTRIBUTE
                // #################
                let atts = result["edgeinfo"]["attributes"]
                // console.log("atts")
                // console.log(atts)

                for (let m = 0; m < atts.length; m++) {
                  const attGroup = atts[m];
                  console.log("attGroup check")
                  if(attGroup.attribute_source == "infores:pubmed" || attGroup.attribute_source  == "infores:text-mining-provider-targeted"){
                    console.log("attGroup - publications = ", attGroup)
                    pubmedAtt.push(attGroup)
                  }
                  let attTextArray = []
                    for (let x = 0; x < attributeInfo.length; x++) {
                      const att = attributeInfo[x];
                      // console.log("att")
                      // console.log(att)

                      // CREATE EMPTY DATA VALUE INCASE IT DOES NOT EXIST
                      let attCell = ""
                        // CHECK TO SEE IF THE PART OF THE ATTRIBUTE EXISTS - IF SO THEN SET VALUE TO THAT
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
                        // INSERT VALUE OR BLANK IN ARRAY AT SPECIFIC LOCATION SO IT WILL END UP IN THE RIGHT COLUMN
                        attTextArray.splice(x, 0, attCell)

                        if(x == attributeInfo.length - 1){
                          // console.log("GOT TO END OF ROW AND ADDED ALL ATTRIBUTES!")
                          // console.log("rowData")
                          // console.log(rowData)
                          // console.log("attTextArray")
                          // console.log(attTextArray)
                          // REPEAT THE LINE TEXT AND ADD THE ATTRIBUTE TEXT AND ADD LINE BREAK
                          // SHOULD GET ONE LINE FOR EACH ATTRIBUTE GROUP
                          text = text + rowData + attTextArray.toString()   + "\r\n"
                          
                        }
                      
                    }                  
                }

              }

        

        }
        if(index == file.length - 1){
          console.log("(new TextEncoder().encode(text)).length")
          console.log((new TextEncoder().encode(text)).length)
          // console.log("pubmedAtt")
          // console.log(pubmedAtt)
          // console.log("pubmedAtt")
          // console.log(pubmedAtt)
          let filename = this.concept_search + "-" + nametag + " two hop results.csv";
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
        }
      }


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



    // @remind saveFile
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
@remind style
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

.clickTextLight {
  text-decoration: none
}


hr.style1{
	border-top: 1px solid #8c8b8b;
}
.bottom-overflow-fade {
  mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
  -webkit-mask-image: linear-gradient(to bottom, black 80%, transparent 100%);
}

.slide-enter-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: ease-in;
   -webkit-transition-timing-function: ease-in;
   -o-transition-timing-function: ease-in;
   transition-timing-function: ease-in;
}

.slide-leave-active {
   -moz-transition-duration: 0.3s;
   -webkit-transition-duration: 0.3s;
   -o-transition-duration: 0.3s;
   transition-duration: 0.3s;
   -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
   transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
   max-height: 100px;
   overflow: hidden;
}

.slide-enter, .slide-leave-to {
   overflow: hidden;
   max-height: 0;
}

/* 
.enter { transform: translateX(100%) }
.enter-to { transform: translateX(0) }
.slide-enter-active { position: absolute }

.leave { transform: translateX(0) }
.leave-to { transform: translateX(-100%) }

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter, .fade-leave-to {
  opacity: 0;
}
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