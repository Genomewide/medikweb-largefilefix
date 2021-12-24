<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">MEDIK GENE TO GENE TO DRUG QUERY NEXT</h1>
    <div>
      <!-- <svg>
        <circle
          cx="50"
          cy="50"
          r="40"
          stroke="deeppink"
          stroke-width="2"
          fill="#ffe6ee"
        />
      </svg> -->
   </div>
    <div>
<svgtest />
    </div>
    <div id="svgnetwork">
      <svg width = "100%">
                <rect x="0" y="0" width="100%" height="100%"/>

        <path stroke="#4287f5" fill="none" stroke-width="5" :d="d" />
        <circle r= "10"
          v-for="(item, index) in dataset"
          :cx="item[0]"
          :cy="item[1]"
          :key="index"
          fill="#4287f5"
          @click="onClick(item)"
        />
      </svg>
    </div>
    <!-- width  = {{divwidth}} -->
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
      <b-button class="mt-2" variant="outline-warning" block @click="toggleModal">Toggle Me</b-button> -->
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
                    variant="primary"
                    v-on:click="getalldrugs"
                    :disabled="!validation"
                    >getalldrugs
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="saveFile"
                    :disabled="!validation"
                    >saveFile
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="getGeneSynonyms"
                    >getGeneSynonyms
                  </b-button>
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="showwidth"
                    >showwidth
                  </b-button> -->
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
        <b-col>
          <!-- <b-card bg-variant="primary" text-variant="white"  header-tag="header" class="text-center"> -->

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
        </b-col>
      </b-row>

      <b-container
        style="margin-top: 20px"
        fluid
      >
        <b-row>
          <b-col>
            <div>
              <b-card-group deck>
                <b-card header="featured" header-tag="header">
                  <template #header>
                    <h6 class="mb-0">Gene info:</h6>
                  </template>
                  <h4 class="mb-0">Symbol: {{ geneInfo.prowl_symbol }}</h4>

                  <br />
                  <b-card-text>
                    <p>
                      <b>Description:</b> {{ geneInfo.hgnc_name }}
                    </p></b-card-text
                  >
                  <b-card-text
                    ><p>
                      <b>Synonyms: </b>{{ geneInfo.hgnc_synonyms }}
                    </p></b-card-text
                  >
                  <b-card-text
                    ><p>
                      <b>Searched synonyms: </b>{{ synonyms_tosearch }}
                    </p></b-card-text
                  >
                  <!-- <p> {{selectedFilters}} </p> -->
                </b-card>
                <!-- <p>
                  {{syn_ids}}
                </p>
                <p>
                  {{queryjson_subclass}}
                </p> -->
                <b-card header-tag="header" footer-tag="footer">
                  <template #header>
                    <h6 class="mb-0">Filter predicates</h6>
                  </template>
                  <h4 class="mb-0">(Un)Select predicates to filter:</h4>
                  <br />
                  Showing {{ filtercount }} of {{ groupedResultsTable.length }}
                  <br />
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <!-- <b-form-checkbox
                      v-for="filter in filter_counttype"
                      v-model="selectedFilters"
                      :value="filter.value"
                      :key="filter.value"
                      :aria-describedby="ariaDescribedby"
                    >
                      {{ filter.value }} ({{ filter.count }})
                    </b-form-checkbox> -->
                    <!-- {{filtercategories}} -->
                    <b-form-checkbox
                      v-for="filter in filtercategories"
                      v-model="selectedcategories"
                      :value="filter.name"
                      :key="filter.name"
                      :aria-describedby="ariaDescribedby"
                    >
                      <!-- <b-badge variant="primary">{{ filter.count }}</b-badge> filtercategories-->
                      {{ filter.name }} ({{ filter.count }})
                    </b-form-checkbox>
                    {{ selectedcategories }}
                    <!-- <b-form-checkbox
                      v-for="filter in relationFilters"
                      v-model="selectedFilters"
                      :value="filter.predicate"
                      :key="filter.predicate"
                      :aria-describedby="ariaDescribedby"
                    >
                      {{ filter.predicate }}
                    </b-form-checkbox> -->
                  </b-form-group>
                </b-card>
              </b-card-group>
            </div>
          </b-col>
        </b-row>
        <b-row>
          <b-col>
            this is a test
          </b-col>
          </b-row>
        <!-- <p>
          ncbiResults {{ncbiResults}}
        </p>
        <p>
          umlsResults {{umlsResults}}
        </p>
                <p>
          prResults {{prResults}}
        </p>
                <p>
          uniprotResults {{uniprotResults}}
        </p> -->
        <b-row style="margin-top: 20px">
          <b-col>
            <b-card>
              <template #header>
                <h6 class="mb-0">Grouped Results</h6>
              </template>
              <!-- <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination> -->
              <!-- <b-table
                sticky-header="1000px"
                bordered
                striped
                hover
                :fields="fields"
                :per-page="perPage"
                :items="synonym_tabledata"
                :filter="selectedFilters"
                :filter-function="filterTable"
                @filtered="onFiltered"
              > -->
              <b-table
                bordered
                striped
                hover
                ref="drugResultsTable"
                :fields="groupedFields"
                table-layout:
                fixed
                :items="filteredResultsmore"
                :filter="selectedcategories"
                :filter-function="filterTableCategories"
                @row-clicked="getPubmed"
                v-model="filteredTableData"
                @filtered="onFiltered"
              >
                <!-- A custom formatted header cell for field 'name' -->
                <template class="text-center" #head()="data">
                  <div class="text-center">
                    <span v-if="!data.field.icon">{{ data.field.label }}</span>
                    <span v-if="data.field.icon" class="text-center">
                      <b-icon
                        class="h2 mb-0 text-center"
                        :icon="data.field.icon"
                        :variant="data.field.variant"
                      ></b-icon>
                    </span>
                  </div>
                </template>

                <template #cell(predicate_increase)="data">
                  <div v-if="data.item.predicate_increase" class="text-center">
                    <b-icon
                      class="h2 mb-0 text-center"
                      icon="circle-fill"
                      variant="success"
                    ></b-icon>
                  </div>
                </template>
                <template #cell(predicate_decrease)="data">
                  <div v-if="data.item.predicate_decrease" class="text-center">
                    <b-icon
                      class="h2 mb-0 text-center"
                      icon="circle-fill"
                      variant="danger"
                    ></b-icon>
                  </div>
                </template>
                <template #cell(predicate_ambiguous)="data">
                  <div v-if="data.item.predicate_ambiguous" class="text-center">
                    <b-icon
                      class="h2 mb-0 text-center"
                      icon="circle-fill"
                      variant="warning"
                    ></b-icon>
                  </div>
                </template>
                <template #cell(fdaDescription)="data">
                  <div v-if="data.item.fdaApproved != '0'" class="text-center">
                    <b-icon
                      class="h2 mb-0 text-center"
                      icon="check2-circle"
                      variant="success"
                    ></b-icon>
                    {{ data.item.fdaApproved }}
                  </div>
                </template>
                <template #cell(pubCount)="data">
                  <div
                    v-if="data.item.publicationsListAll.length > 0"
                    class="text-center"
                  >
                    {{ data.item.publicationsListAll.length }}
                    <b-icon
                      class="h3 mb-0"
                      font-scale=".99"
                      icon="file-earmark"
                      variant="secondary"
                    ></b-icon>
                  </div>
                </template>
                <!-- <template #row="row">
                  <tr>
                    <td>
                  {{row}}
                    </td>
                  </tr>
                </template> -->
                <template #cell(show_details)="row">
                  <b-button
                    size="sm"
                    @click="getPubmed(row.item, row.index)"
                    class="mr-2"
                  >
                    {{ row.detailsShowing ? "Hide" : "Show" }} Details
                  </b-button>

                  <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
                  <!-- <b-form-checkbox
                    v-model="row.detailsShowing"
                    @change="row.toggleDetails"
                  >
                    Details via check
                  </b-form-checkbox> -->
                </template>
                <template #row-details="row">
                  <b-card-group v-for="pub in row.item.pubData" :key="pub.pmid">
                    <b-card :href="'pubmed.ncbi.nlm.nih.gov/' + pub.pmid">
                      <template #header>
                        <b>{{ pub.title }}</b>
                      </template>
                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"
                          ><b>Abstract:</b></b-col
                        >
                        <b-col><span v-html="pub.abstractFixed"></span> </b-col>
                      </b-row>

                      <b-row class="mb-2">
                        <b-col sm="2" class="text-sm-left"
                          ><b>Citation</b></b-col
                        >
                        <b-col
                          >{{ pub.journalTitle }}, {{ pub.pubDate.Year }}</b-col
                        >
                      </b-row>
                      <b-button
                        size="sm"
                        @click="openPubmed(pub.pmid)"
                        class="mr-2"
                        >pubmed</b-button
                      >
                      <!-- <b-button size="sm" @click="row.toggleDetails"
                      >Hide Details</b-button
                    > -->
                    </b-card>
                  </b-card-group>
                </template>
                <!-- <template #cell(publications)="data">
                  <div v-if="data.item.pubLength > 0">
                    <b-button
                      size="sm"
                      @click="data.toggleDetails"
                      class="mr-2"
                    >
                      Pubs =
                      <b-badge variant="light">{{
                        data.item.pubLength
                      }}</b-badge>
                    </b-button>
                  </div>
                </template> -->
                <template #table-busy>
                  <div class="text-center text-danger my-2">
                    <b-spinner class="align-middle"></b-spinner>
                    <strong>Loading...</strong>
                  </div>
                </template>
              </b-table>
            </b-card>
          </b-col>
        </b-row>
        <b-row style="margin-top: 20px">
          <b-col>
            <b-card>
              <template #header>
                <h6 class="mb-0">Results</h6>
              </template>
              {{ filteredTableData.length }}
              <!-- <pre>{{ filteredTableData | pretty }}</pre> -->

              <!-- <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>

              <b-table
                bordered
                striped
                hover
                ref="drugResultsTable"
                :fields="fields"
                table-layout:
                fixed
                :per-page="perPage"
                :items="synonym_tabledata"
                :filter="selectedFilters"
                :filter-function="filterTable"
                @filtered="onFiltered"
                :current-page="currentPage"
              >
                <template #cell(fdaPhase)="data">
                  <div v-if="data.item.fdaApproved">
                    <b-icon
                      class="h2 mb-0"
                      icon="check2-circle"
                      variant="success"
                    ></b-icon>
                  </div>
                </template>
                <template #cell(publications)="data">
                  <div v-if="data.item.pubLength > 0">
                    <b-button
                      size="sm"
                      @click="data.toggleDetails"
                      class="mr-2"
                    >
                      Pubs =
                      <b-badge variant="light">{{
                        data.item.pubLength
                      }}</b-badge>
                    </b-button>
                  </div>
                </template>
              </b-table> -->
            </b-card>
          </b-col>
        </b-row>
        <b-row style="margin-top: 20px">
          <b-col> </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
// import TrapiResultClean from "../TrapiResultClean";

import svgtest from "./svgtest.vue"


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
    components: {
 svgtest
  },
  data() {
    return {
      tree:  {
      "name": "flare",
        "children": [
          {
            "name": "analytics",
            "children": [
              {
                "name": "cluster",
                "children": [
                  { "name": "AgglomerativeCluster", "size": 3938 },
                  { "name": "CommunityStructure", "size": 3812 },
                  { "name": "HierarchicalCluster", "size": 6714 },
                  { "name": "MergeEdge", "size": 743 }
                ]
              },
              {
                "name": "graph",
                "children": [
                  { "name": "BetweennessCentrality", "size": 3534 },
                  { "name": "LinkDistance", "size": 5731 },
                  { "name": "MaxFlowMinCut", "size": 7840 },
                  { "name": "ShortestPaths", "size": 5914 },
                  { "name": "SpanningTree", "size": 3416 }
                ]
              },
              {
                "name": "optimization",
                "children": [
                  { "name": "AspectRatioBanker", "size": 7074 }
                ]
              }
            ]
          }
        ]
      },
      dataset: [
        [10, 70],
        [15, 10],
        [576, 6],
        [50, 20],
        [15, 10],
        [35, 30],
      ],
      perPage: 5,
      totalRows: 1,
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
      concept_search: "HGNC:18481",
      // HGNC:18481
      // HGNC:6884" MAPK8IP3
      // "HGNC:2625" CYP2D6
      // "HGNC:11998" TP53"
      // "HGNC:3236" EGFR  - 3546 hits
      // 1100 BRCA1
      // 9588 PTEN
      // 5173 HRAS
      object: "HGNC:9588",
      concept_data: {},
      //concept table
      concepts_table: [],
      selected: [],

      shownItems: [],
      select_concepts: [],

      queryResults: [],
      selectedFilters: [],
      groupedFields: [
        {
          key: "drugName",
          label: "drug",
          sortable: true,
          tdClass: "colwidth",
          icon: "",
        },
        {
          key: "predicate_dg",
          label: "predicate_dg",
          sortable: true,
          tdClass: "colwidth"
    
        },
        {
          key: "geneOneName",
          label: "geneOneName",
          sortable: true,
          tdClass: "db_colwidth"
      
        },
        {
          key: "predicate_gg",
          label: "predicate_gg",
          sortable: true,
          tdClass: "db_colwidth"
      
        },

      ],
      fields: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "predicate_cleaned",
          label: "Relation",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "fdaPhase",
          label: "FDA Approved",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "publications",
          label: "Publications",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "key",
          label: "key",

          tdClass: "db_colwidth",
        },
        {
          key: "object",
          label: "object",

          tdClass: "db_colwidth",
        },
      ],

      selectMode: "multi",
      drugs_selected: [],

      synonyms_returned: [], // current
      synonyms_tosearch: [], // current

      synonyms_info: [],
      synonym_drugs: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_tabledata: [],
      synonym_tabledata_predicates: [],
      synonym_tabledata_predicates_cleaned: [],
      synonym_tabledata_objects: [],
      chemblids: ["CHEMBL1292", "CHEMBL405", "CHEMBL501", "CHEMBL750"],
      // KEEP THIS AS TEMPLATE FOR QUERIES
      queryjson_subclass: {
        message: {
          query_graph: {
            nodes: {
              n1: {
                category: "GeneProduct",
              },
              n2: {
                id: "PR:P10635-old",
              },
            },
            edges: {
              e0: {
                subject: "n2",
                predicate: "biolink:subClassOf",
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
        "agonist",
        "partial_agonist",
        "stimulates",
        "increases_activity_of",
        "positively_regulates",
        "positively_regulates,_entity_to_entity",
        "increases_activity_of",
        "increases_activity_of",
        "increases_expression_of",
        "increases_stability_of",
        "positively_regulates,_entity_to_entity",
        "positively_regulates,_entity_to_entity",
        "positively_regulates",
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
       'affects_activity_of',
'affects_degradation_of',
'affects_expression_of',
'affects_metabolic_processing_of',
'decreases_activity_of',
'decreases_degradation_of',
'decreases_expression_of',
'decreases_response_to',
'decreases_stability_of',
'increases_activity_of',
'increases_degradation_of',
'increases_expression_of',
'increases_response_to',
'increases_stability_of',
'interacts_with',
'molecularly_interacts_with',
'negatively_regulates',
'negatively_regulates_entity_to_entity',
'negatively_regulates,_entity_to_entity',
'physically_interacts_with',
'positively_regulates',
'positively_regulates_entity_to_entity',
'positively_regulates,_entity_to_entity',
'regulates',
'decreases_synthesis_of',
'antagonist',
'channel_blocker',
'gating_inhibitor',
'inhibitor',
'inhibits',
'negative_modulator',
'blocker',
'inverse_agonist',
'increases_synthesis_of',
'activator',
'agonist',
'inducer',
'partial_agonist',
'positive_allosteric_modulator',
'stimulates',
'stimulator'
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
      rawresultstosave: null,
      query: {
            message: {
              query_graph: {
                nodes: { n1: {category: "gene"}, n2: { id: "UMLS:C1425544" } },
                edges: { e0: { subject: "n1", object: "n2" } },
              },
            },
          } ,
      nodelist: [] ,
      filteredResultsmore: []
    };
  },
  methods: {
    showModal() {
      this.$refs["my-modal"].show();
      this.show_waiting_card = false;
    },
    openPubmed: function (pmid) {
      window.open("https://pubmed.ncbi.nlm.nih.gov/" + pmid, "_blank");
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
          console.log("getPRparent query = ", await PostService.getPRparent(query) )
          // let PRparentData = await PostService.queryMedik(query);
          geneinfo.PRparent = await PostService.getPRparent(query)
          return geneinfo
          // console.log(geneinfo)

          // let nodes = PRparentData["message"]["knowledge_graph"]["nodes"]; // returns 3 nodes that include the search term and the two parents
          // let node_ids = Object.keys(nodes);

          // for (let index = 0; index < node_ids.length; index++) {
          //   //exclude the unwnated parent and the original search term
          //   const parent_id = node_ids[index];

          //   if (parent_id != "PR:000029067" && parent_id != geneinfo.PR) {
          //     // EXCLUDE HUMAN PROTEIN AND ORIGINAL SEARCH TERM

          //     geneinfo.PRparent = parent_id;
          //     // PR:000029067 is the id for all human proteins
          //   }
          //   if (index == node_ids.length - 1) {
          //     console.log("checked for parent and returning");
          //     return geneinfo;
          //   }
          // }
        })
        // .then(async (geneinfo) => {
        //   // GET THE UMLS ID FROM THE HGNC ID FROM THE MONGO DB THAT WAS SET UP FROM SCRAPEING UMLS DATA FILES

        //   console.log({ geneinfo });
        //   let HGNCtoUMLS = [];
        //   HGNCtoUMLS.push(geneinfo.HGNC);

        //   let umlsResult = await PostService.mongoumls(HGNCtoUMLS); // send all of the ids, but only one will have a match in the mondgo db set up for this
        //   console.log("umlsResult = ", umlsResult)
        //   geneinfo.umls = umlsResult[0]["UMLS"];
        //   // [0]["UMLS"]
        //   // this.synonyms_tosearch.push(parent_result[0]["UMLS"]);
        //   return geneinfo;
        // })
        .then(async (geneinfo) => {
          console.log("********* skipped UMLS")
          console.log("got UMLS info = ", geneinfo);
          let nodes = {}
          let edges = {}

          // let currieTypes = ["HGNC","PRparent", "UniProtKB", "NCBI", "umls"]
          let currieTypes = ["HGNC","PRparent", "UniProtKB", "NCBI"]
          for (let i = 0; i < currieTypes.length; i++) {
            const currietype = currieTypes[i];
            
            let currie = geneinfo[currietype]
            

            if (typeof currie !== 'undefined') {
              this.query.message.query_graph.nodes.n2.id = currie
              let queryResults = await PostService.query_raw(this.query);
              console.log(currie)
              console.log(currietype)
              console.log("queryResults" );
              console.log(queryResults );
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
            if(i == currieTypes.length -1){
              console.log("edges")
              console.log(edges)
              console.log("nodes")
              console.log(nodes)
              this.nodelist = Object.keys(nodes)
              return {"edges": edges, "nodes": nodes}
            }           
          }
        })
        .then((results) => {
          console.log(results)
          let nodes = results.nodes
          let edgekeys = Object.keys(results.edges)
          
          let combinedEdgeNodes = []

          for (let i = 0; i < edgekeys.length; i++) {
            let ggData = {}
            let edgeid = edgekeys[i];
            let edge = results.edges[edgeid]
            let subject = edge.subject
            let object = edge.object

            ggData.edgeAtt = edge.attributes
            ggData.geneTwo = edge.object
            ggData.geneOne = edge.subject
            ggData.predicate_gg = edge.predicate
            ggData.relation_gg = edge.relation
            ggData.geneOneAtt = nodes[subject].attributes
            ggData.geneTwoAtt = nodes[object].attributes
            ggData.geneOneName = nodes[subject].name
            ggData.geneTwoName = nodes[object].name
            ggData.geneOneCat = nodes[subject].category
            ggData.geneTwoCat = nodes[object].category 
            
            combinedEdgeNodes.push(ggData)
            
            if(i == edgekeys.length - 1){
              return combinedEdgeNodes
            }
          }
        })
        .then(async(results)=> {
          console.log(results)
          let drugquery = this.query

          // let nodePlusSynonyms = []
          for (let i = 0; i < results.length; i++) {
            const result = results[i]
            results[i].drugInfo = []
            // GET SYNONYMS OF ALL GENES
            let synResults = await PostService.getSynonyms(result.geneOne)
            console.log(synResults)
            let synonyms = synResults.synonyms
            let synkeys = Object.keys(synonyms)



            /// ######### needs review below #########
            for (let n = 0; n < synkeys.length; n++) {
              let syn = synkeys[n]
              let nodedata = {}
              nodedata.node = result.geneOne
              nodedata.PRparent = ""
              nodedata.showSyn = ""

              drugquery.message.query_graph.nodes.n1.category = "chem"
              drugquery.message.query_graph.nodes.n2.id = syn


              if((syn.startsWith("NCBI") || syn.startsWith("UniProtKB") || syn.startsWith("PR") || syn.startsWith("UMLS")) && syn != "PR:000000001"){
                let queryDrugResults = {}

                if(syn.startsWith("PR")){
                  // HAVE TO GET PARENT BEFORE GETTING CHEMICALS 
                  this.queryjson_subclass["message"]["query_graph"]["nodes"]["n2"]["id"] = syn
                  let PRparent = await PostService.getPRparent(this.queryjson_subclass)

                  // GET DRUG DATA ON PARENT
                  drugquery.message.query_graph.nodes.n2.id = PRparent
                  queryDrugResults = await PostService.query_raw(drugquery);
                  // console.log("syn = ", syn)
                  // console.log({queryDrugResults})
                  nodedata.synonym = syn
                  nodedata.drugs = queryDrugResults
                  nodedata.PRparent = PRparent
                  nodedata.showSyn = PRparent
                  results[i].drugInfo.push(nodedata)

                } else {
                  // IF NOT PR CURRIE THEN CAN GET CHEM DATA
                  queryDrugResults = await PostService.query_raw(drugquery);
                  // console.log("syn = ", syn)
                  // console.log({queryDrugResults})
                  nodedata.synonym = syn
                  nodedata.showSyn = syn
                  nodedata.drugs = queryDrugResults
                  results[i].drugInfo.push(nodedata)
                }

              }

            }
            if(i == results.length - 1){
              return results
            }

          }

        })
        .then(async (results) => {
          console.log(results)
          let tableResults = []

          for (let i = 0; i < results.length; i++) {
            
            const result = results[i];

            for (let n = 0; n < result.drugInfo.length; n++) {
              
              const drug = result.drugInfo[n]
              // console.log(drug)
              let drugedges = drug["drugs"]["message"]["knowledge_graph"]["edges"]
              // console.log("drugedges = ", drugedges)
              let drugnodes = drug["drugs"]["message"]["knowledge_graph"]["nodes"]
              // console.log("drugnodes = ", drugnodes)

              let drugedgekeys = Object.keys(drugedges)
              for (let x = 0; x < drugedgekeys.length; x++) {
                let dggResult = {}
                const key = drugedgekeys[x];
                let drug = drugedges[key]
                // console.log("drug")
                // console.log(drug)

                dggResult.edgeAtt = result.edgeAtt 
                dggResult.geneTwo = result.geneTwo
                dggResult.geneOne = result.geneOne
                dggResult.predicate_gg = result.predicate_gg
                dggResult.relation_gg = result.relation_gg
                dggResult.geneOneAtt = result.geneOneAtt
                dggResult.geneTwoAtt = result.geneTwoAtt
                dggResult.geneOneName = result.geneOneName 
                dggResult.geneTwoName = result.geneTwoName 
                dggResult.geneOneCat = result.geneOneCat
                dggResult.geneTwoCat = result.geneTwoCat
                dggResult.showSyn = drug.showSyn
                dggResult.drugAtt = drug.atrributes
                dggResult.predicateAtt_dg = drug.attributes
                dggResult.predicate_dg = drug.predicate
                dggResult.drug = drug.subject
                dggResult.drugName = drugnodes[drug.subject].name
                dggResult.drugCat = drugnodes[drug.subject].category
                dggResult.drugAtt = drugnodes[drug.subject].attributes
                
                tableResults.push(dggResult)
                // nodedata.showSyn
                
              }
               
              
              
            }
            if(i == results.length - 1){
              console.log("tableResults")
              console.log(tableResults)
              return tableResults
            }
            
          }
        })
        .then(async (results)=>{
          console.log("finished table results")
          console.log(results)
          // const result = words.filter(word => word.length > 6);
          let filteredResults = results.filter(result =>   this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) > -1 || this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) > -1)
          let filteredResultsmore = results.filter(result =>   this.predicate_both.indexOf(result.predicate_dg.split(":")[1]) > -1 && this.predicate_both.indexOf(result.predicate_gg.split(":")[1]) > -1)
          console.log("filteredResults = ", filteredResults)

          // let predicateArray = []
          // let predicateAllArray = []
          console.log("filteredResults = ", filteredResults)
          console.log("filteredResultsmore = ", filteredResultsmore)
          this.filteredResultsmore = filteredResultsmore
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

        })
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
    saveFile() {
      let text = "";
      console.log("save result");

      for (let index = 0; index < this.groupedResultsTable.length; index++) {
        const result = this.groupedResultsTable[index];
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

      let filename = this.concept_search + "ONEhop results.csv";
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
    showwidth(){
      // let divElement = this.$id["svgnetwork"]
      let divElement = this.$refs
      console.log("divElement")
      console.log(divElement)
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