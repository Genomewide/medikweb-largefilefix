<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">ARAX GENE TO GENE TO DRUG QUERY NEXT</h1>

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
                    v-on:click="getFDA"
                    >getFDA
                  </b-button>

                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="testSection"
                    >testSection
                  </b-button>

                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="tryARAX"
                    >tryARAX
                  </b-button>
                  <b-form-checkbox
                    style="margin-left: 20px"
                    id="checkbox-1"
                    v-model="status"
                    name="checkbox-1"
                    value="true"
                    unchecked-value="false"
                  >
                    Check to include all results :
                   
                  </b-form-checkbox>

                  <div>
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
            </div>
          </b-form>
        </b-col>
        <b-col>

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

      <b-container style="margin: 20px; width:100%"  fluid>
                <!-- <b-row style="width:100%">
          <b-card header="featured" header-tag="header" style=" width: 100%" :key="componentKey">
            <template #header>
              <h6 class="mb-0">ARAX Result Summary:</h6>
            </template>
            <br />
            <table :key="componentKey" style=" width: 100%">
              <thead>
                <tr>
                <th>Gene</th>
                <th class="text-center" style="margin: 20px;" >Direction</th>
                <th class="text-center"  style="margin: 20px;" >Total Drugs</th>
                <th class="text-center" style="margin: 20px;" >Checked</th>
                <th class="text-center" style="margin: 20px;" >Inhibitors (FDA+)</th>
                <th class="text-center" style="margin: 20px;" >Activator (FDA+)</th>
                </tr>
              </thead>
              <tbody id="araxResultTableSummary" :key="componentKey">
              <tr v-for="result in araxResultTableSummary " :key="result.gene">
                <td >{{ result.gene }}</td>
                <td class="text-center">{{ result.direction }}</td>
                <td class="text-center">{{ result.TotalDrugs }}</td>
                <td class="text-center">{{ result.TotalDrugs2 }}</td>
                <td class="text-center">{{ result.inhibitor }} ({{ result.inhibitorFDA }})</td>
                <td class="text-center">{{ result.activator }} ({{ result.activatorFDA }})</td>
              </tr>
              </tbody>
              </table>
          
          </b-card>
        </b-row> -->
        <b-row style=" marigin-bottom: 20px">
          <b-card header="featured" header-tag="header" style=" width: 100%; marigin-bottom: 20px" :key="componentKey">
            <template #header>
              <h6 class="mb-0">ARAX Result Summary:</h6>
            </template>
            <br />
            <table :key="componentKey" style=" width: 100%">
              <thead>
                <tr>
                <th>Gene</th>
                <th class="text-center" style="margin: 20px;" >Direction</th>
                <th class="text-center"  style="margin: 20px;" >Total Drugs</th>
                <th class="text-center" style="margin: 20px;" >Checked</th>
                <th class="text-center" style="margin: 20px;" >Inhibitors (FDA+)</th>
                <th class="text-center" style="margin: 20px;" >Activator (FDA+)</th>
                </tr>
              </thead>
              <tbody id="araxResultTableSummary" :key="componentKey">
              <tr v-for="result in araxResultTableSummary " :key="result.gene">
                
                <td >{{ result.gene }}</td>
                <td class="text-center">{{ result.direction }}</td>
                <td class="text-center">{{ result.TotalDrugs }}</td>
                <td class="text-center">    <b-progress
                    :max="result.TotalDrugs"
                    :value="result.CheckedDrugs"
                    show-progress
                    animated
                  ></b-progress></td>
                <td class="text-center">{{ result.inhibitor }} ({{ result.inhibitorFDA }})</td>
                <td class="text-center">{{ result.activator }} ({{ result.activatorFDA }})</td>
              </tr >
            
  
              </tbody>
              </table>
          
          </b-card>
        </b-row>
    <br />
        <b-row>
          <b-card header="featured" header-tag="header" :key="componentKey">
            <template #header>
              <h6 class="mb-0">ARAX Result Count: {{araxResultTable.length}}</h6>
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
              :items="araxResultTable"
              :fields="fields"
            >
  
            </b-table>
          
          </b-card>
        </b-row>




      
        
        
      </b-container>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
import TrapiResultClean from "../TrapiResultClean";
import ARAXService from "../ARAXService";
import FDAService from "../FDAService";
// import svgtest from "./svgtest.vue" FDAService
import importResultWithDrugs from "/Users/andycrouse/Downloads/HGNC_68842hopJSON.json";
import synonymService from "../synonymService";
// import twohopdata from "../../../datafiles/twohopggd.json"

var parser = require("fast-xml-parser");
import axios from "axios";
import * as d3 from "d3";




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
      concept_search: "HGNC:6884",
      // HGNC:18481
      // HGNC:6884" MAPK8IP3
      // "HGNC:2625" CYP2D6
      // "HGNC:11998" TP53"
      // "HGNC:3236" EGFR  - 3546 hits
      // 1100 BRCA1
      // 9588 PTEN
      // 5173 HRAS
      // HGNC:18153 - few hits

      // KEEP THIS AS TEMPLATE FOR QUERIES
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
        "entity_positively_regulates_entity",
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
        "entity_negatively_regulates_entity",
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
      query: {
        message: {
          query_graph: {
            nodes: { n1: { category: "gene" }, n2: { id: "UMLS:C1425544" } },
            edges: { e0: { subject: "n1", object: "n2" } },
          },
        },
      },
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
            //  row.edgen_pmids_gg = []
            //   row.edgen_pmids_gg = hop1res.edgepublications.length
            //   row.object_gg = hop1res.object
            //   row.objectName_gg = hop1res.objectName
            //   row.predicate_gg = hop1res.predicate
            //   row.subject_gg = hop1res.subject
            //   row.subjectName_gg = hop1res.subjectName direction_dg
      fields: [
        {
          key: "subjectName_dg",
          label: "Drug",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "subject_dg",
          label: "ID",
          sortable: true,
          tdClass: "colwidth",
        },        
        // {
        //   key: "direction_dg",
        //   label: "Reg DG",
        //   sortable: true,
        //   tdClass: "colwidth",
        // },
        {
          key: "predicate_dg",
          label: "Reg DG",
          sortable: true,
          tdClass: "colwidth",
        },
// {
        //   key: "edgen_pmids_dg",
        //   label: "Pubs DG",
        //   sortable: true,
        //   tdClass: "db_colwidth",
        // },
        {
          key: "subjectName_gg",
          label: "Gene",
          sortable: true,
          tdClass: "colwidth",
        },
        // {
        //   key: "object_gg",
        //   label: "ID",
        //   sortable: true,
        //   tdClass: "colwidth",
        // },
        // {
        //   key: "predicate_gg",
        //   label: "Reg GG",
        //   sortable: true,
        //   tdClass: "colwidth",
        // },
        {
          key: "direction_gg",
          label: "Reg GG",
          sortable: true,
          tdClass: "colwidth",
        },
        // {
        //   key: "edgen_pmids_gg",
        //   label: "Pubs GG",
        //   sortable: true,
        //   tdClass: "db_colwidth",
        // },
        {
          key: "direction_combined",
          label: "2h Reg",
          sortable: true,
          tdClass: "db_colwidth",
        },
       {
          key: "submission",
          label: "FDA",
          sortable: true,
          tdClass: "colwidth",
        },
      //  {
      //     key: "fdaData",
      //     label: "FDA",
      //     sortable: true,
      //     tdClass: "colwidth",
      //   },
      //  {
      //     key: "time",
      //     label: "Time",
      //     sortable: true,
      //     tdClass: "colwidth",
      //   },
  
      ],
      fields_hop_two: [
  
        {
          key: "subject",
          label: "subject",
          sortable: true,
          tdClass: "colwidth",
        },
   
        {
          key: "subjectName",
          label: "subjectName",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "predicate",
          label: "predicate",
          sortable: true,
          tdClass: "colwidth",
        },
        {
          key: "object",
          label: "object",
          sortable: true,
          tdClass: "colwidth",
        },        
        {
          key: "objectName",
          label: "objectName",
          sortable: true,
          tdClass: "colwidth",
        },

       
  
      ],
      predicateAll: [],
      synonymIdArrayCount: {},
      araxResultTable: [],
      araxResultTableSummary: {},
      araxResultTableSummaryDisplay: [],
      hopTwo: [],
      hopOne: [],
      cleanedResults_dg: [],
      cleanedResults_gg: []
      // nodeGeneName
      //FAILED "HGNC:2348", "HGNC:13723", "HGNC:2514", "HGNC:2961", "HGNC:3373", reasoner_id
    };
  },
  methods: {
    async getFDA(){

      for (let i = 0; i < 10; i++) {
        // const element = array[i];

        let fda = await FDAService.fdaBulk(1000,i*1000)
        this.testSave(i,fda)

        
      }

    },

    showModal() {
      this.$refs["my-modal"].show();
      this.show_waiting_card = false;
    },
    openPubmed: function (pmid) {
      window.open("https://pubmed.ncbi.nlm.nih.gov/" + pmid, "_blank");
    },
     waitforme(milisec) {
        return new Promise(resolve => {
          setTimeout(() => { resolve('') }, milisec);
      })
    },
    
    async testSection(results) {
      this.startTime = new Date()
      // console.log(importResultWithDrugs);
      let chemTableForDownload = []

      // CREATE EMMITTERS FOR LOOP THROUGH PUBMEDS
      // const EventEmitter = require("events");
      // class Emitter extends EventEmitter {}
      // const eventEmitter = new Emitter();


      try{
        // GENE LOOP
        
        for (let i = 0; i < results.length; i++) {
            // for (let i = 0; i < 2; i++) {
            console.log("##### GENE INDEX = ", i)
            const geneData = results[i];
            let chemResults = geneData.chemResults
            if(chemResults.length > 0){

              // CHEM LOOP 
            for (let n = 0; n < chemResults.length; n++) {
              // for (let n = 0; n < 5 || n < chemResults.length; n++) {

                console.log("------- CHEM INDEX = ", n)
                console.log(new Date())
                const chem = chemResults[n];
                console.log("chem = ", chem)
                let edgeInfo = {}
                edgeInfo.object = chem.object
                edgeInfo.objectAraxid = chem.objectAraxid
                edgeInfo.objectChemFDA = chem.objectChemFDA
                edgeInfo.objectName = chem.objectName
                edgeInfo.subject = chem.subject
                edgeInfo.subjectName = chem.subjectName
                edgeInfo.objectSRINormid = chem.objectSRINormid
                edgeInfo.predicate = chem.predicate
                // console.log("geneData")
                // console.log(geneData)
                let pubs = chem.edgepublications
                console.log("pubs to check what is being sent to pubclean")
                // console.log(pubs)
                console.log(pubs != null)

                if(pubs != null && pubs != [null]){
                  if(pubs.length > 0){

                    for (let x = 0; x < pubs.length; x++) {
                        const pub = pubs[x];
                        edgeInfo.link =  "https://pubmed.ncbi.nlm.nih.gov/" + pub
                        edgeInfo.geneIndex = i
                        edgeInfo.chemIndex = n
                        edgeInfo.pubIndex = x
                        
                        const edgeInfoCopy = {...edgeInfo}
                        chemTableForDownload.push(edgeInfoCopy)
                        console.log(edgeInfoCopy)                      
                    }

                    for (let x = 0; x < pubs.length; x++) {
                      // (function(x) {
                        const pub = pubs[x];
                        edgeInfo.link =  "https://pubmed.ncbi.nlm.nih.gov/" + pub
                        edgeInfo.geneIndex = i
                        edgeInfo.chemIndex = n
                        edgeInfo.pubIndex = x

                        let edgeInfoCopy = edgeInfo
                        chemTableForDownload.push(edgeInfoCopy)
                        // await this.waitforme(40)
                        console.log(edgeInfoCopy)
                      // })(x) 

                      // chemTableForDownload = [...chemTableForDownload, ...chemPubTableArr]
                      
                    }


                  }  
                }
      
                
                if(i == importResultWithDrugs.length - 1 && n == chemResults.length -1){
                  console.log("FINISHED CHEM GENE")
                  this.saveThisFile(chemTableForDownload, "CHEM GENE");
                  // this.trySection(chemTableForDownload)
                }
              }
            }


            
          }
      } catch (err){
        console.error(err)
        console.log("WRITING FILE FOR WHAT WE HAAVE SO FAR")
        this.saveThisFile(chemTableForDownload, "CHEM GENE");
      }


    },

    async getPubmed(pubs) {
      return new Promise(async (resolve, reject) => { // eslint-disable-line

      console.log("***** START getPubmed");
      // console.log("index = ",);
      console.log(pubs);

        try {
          let pubmedurl =
            "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" +
            pubs +
            "&rettype=json";
          // let pubmedurl =
          // "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334&rettype=json";
          // "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334,30612693&rettype=json";

          console.log("url = ", pubmedurl);
          const res = await axios.get(pubmedurl);

          const xmlData = res.data;

          var pmjson = parser.parse(xmlData);

          let pub = [];
          if (Array.isArray(pmjson.PubmedArticleSet.PubmedArticle)) {
            pub = pmjson.PubmedArticleSet.PubmedArticle;
          } else {
            pub.push(pmjson.PubmedArticleSet.PubmedArticle);
          }

          // console.log(pmjson.PubmedArticleSet)
          // console.log(Array.isArray(pmjson.PubmedArticleSet.PubmedArticle));


          let pubData = await PubCleanService.cleanPubmed(pub);
          console.log("pubData processsed");

          console.log("***** END getPubmed");
          if(pubData != null){
            resolve(pubData)
          } else {
            resolve([])
          }
          

          this.groupedTableKey += 1;
        } catch (err) {
          console.error(err);
          this.stopTime = new Date()
          reject(err)
        }
          // }
        
      })
    },

    async testSave(id,jsonObject) {
      console.log("testSave - testing");
      const text = JSON.stringify(jsonObject);

      // let filename = this.concept_search + id + "-FDA_JSON.json";
      let filename = id + "-FDA_JSON.json";
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
    async tryARAX(searchTerms) {
      // console.log("twohopdata")
      // console.log(twohopdata)
      // GET GENES REGULATING TARGET
        let araxResults = await ARAXService.araxQuery_gg(searchTerms)
        let context = '"context": "https://raw.githubusercontent'
        let index = araxResults.indexOf(context) - 1
        // console.log("index")
        // console.log(index)
        // console.log(araxResults.substring(index))
        // console.log(JSON.parse( araxResults.substring(index)))
        let araxJson = JSON.parse(araxResults.substring(index))
        console.log(araxJson)
        console.log("araxJson.message.knowledge_graph.edges")
        console.log(araxJson.message.knowledge_graph.edges)
        console.log("araxJson.message.knowledge_graph.nodes")
        console.log(araxJson.message.knowledge_graph.nodes)
        let nodes = araxJson.message.knowledge_graph.nodes
        // console.log(JSON.parse(araxResults) )
        // console.log(araxResults)
        console.log("araxJson.message.results")
        console.log(araxJson.message.results)
        let results = araxJson.message.results
        // essence
        // let resultsGrouped = await TrapiResultClean.TrapiResultGroup(results, "essence")
        // console.log("resultsGrouped = ", resultsGrouped)
      // GET GENES REGULATING TARGET
        let genes = Object.keys(nodes)
        console.log("genes = ", genes)
        let araxResults_dg = await ARAXService.araxQuery_dg(genes)
        index = araxResults.indexOf(context) - 1
        let araxJson_dg = JSON.parse(araxResults_dg.substring(index))
        let nodes_dg = araxJson_dg.message.knowledge_graph.nodes
        console.log("nodes_dg")
        console.log(nodes_dg)
      for (let i = 0; i < results.length; i++) {
        const result = results[i];
        let row = {}
        // let predicates = []
        console.log("result = ", result)
        row.nodeDrug = result.node_bindings.n00[0].id
        row.nodeGene = result.node_bindings.n02[0].id
        row.nodeTarget = result.node_bindings.n01[0].id
        row.nodeDrugName = nodes[row.nodeDrug].name
        row.nodeGeneName = nodes[row.nodeGene].name
        row.reasoner_id = result.reasoner_id
        row.key = this.componentKey
        let e00 = result.edge_bindings.e00
        let e01 = result.edge_bindings.e01
        // console.log("nodeDrugName = ", nodeDrugName)
        // row.edgeOnetest = e00.map(edge => edge.id.split("biolink")[1])
        // console.log("row.edgeOnetest = ", row.edgeOnetest)
        row.edgeOne = e00.map(edge => edge.id.split("biolink:")[1].split("-")[0])
        row.edgeTwo = e01.map(edge => edge.id.split("biolink:")[1].split("-")[0])
        // row.edgeTwo = result
        // console.log("nodes[row.nodeDrug] = ", nodes[row.nodeDrug])
        this.araxResultTable.push(row)
        this.componentKey++
        if(i == results.length - 1){
          let groupedGroupID = await TrapiResultClean.TrapiResultGroup(this.araxResultTable, "nodeDrugName")
          console.log("groupedGroupID = ", groupedGroupID)
        }
        // groupedGroupID = await TrapiResultClean.TrapiResultGroup
      }
    },
    // async testSection () {
    //   console.log("search term = ", this.concept_search)
    //   let ARAXsyn = await  ARAXService.getARAXSynonyms(this.concept_search)
    //   console.log("ARAXsyn")
    //   console.log(ARAXsyn)

    // },
    async eventLoop() {
      // concept_search

      this.progressTable = [];
      this.progressObject = {};
      this.geneIDList = [];
      let length = this.hgncAll.length;
      let i = 0;

      const EventEmitter = require("events");
      class Emitter extends EventEmitter {}
      const eventEmitter = new Emitter();
      eventEmitter.on("event", async () => {
        this.progressTable = [];
        this.progressObject = {};
        this.geneIDList = [];
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
        // eslint-disable-line

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
      this.show_waiting_card = true
      this.waitingfor_text = " GETTING SYNONYMS AND ORTHOLOGS FROM ARAX"
      console.log("THIS IS TO TEST IT IS V2")
      this.araxResultTableSummary = {}
      this.araxResultTableSummaryDisplay = []
      this.progressObject = {};
      this.timeArray = [];
      let time = {
        step: "start get synonyms",
        time: new Date(),
        gene: this.concept_search,
      };
      this.timeArray.push(time);
      this.componentKey = this.componentKey + 1;

      try {
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          // eslint-disable-line
          // #########################
          // GET ALL SYNONYMS THAT MAY HAVE A HIT FOR PROTEIN INTERACTION 
          // #########################          
          synonymService
            .allSynonyms(this.concept_search)
            .then(async (synonyms) => {
              // let searchterm = this.concept_search
              console.log([this.concept_search])
              console.log(synonyms) // SRI_normalizer_name
              console.log(synonyms.id)
              console.log(synonyms.id.SRI_normalizer_name)
              let SRI_normalizer_name = synonyms.id.SRI_normalizer_name
              console.log(SRI_normalizer_name)

              let time = { step: "got synonyms", time: new Date() };
              this.timeArray.push(time);
              this.componentKey = this.componentKey + 1;
              console.log(synonyms);
              this.synonymsArray = synonyms.synonymIdArray
    
              console.log("this.synonymsArray");
              console.log(this.synonymsArray);
              let query = this.queryjson;

              query.message.query_graph.nodes.n1.category = ["biolink:Protein","biolink:Gene"]
              query.message.query_graph.nodes.n2.id = this.synonymsArray 

              let dgg_nodeEdges = {}

              // #########################
              // GET GENES REGULATING TARGET
              // #########################
                this.waitingfor_text = " GETTING GENE - GENE INTERACTIONS FROM ARAX"

                let araxResults = await ARAXService.araxQuery_gg(this.synonymsArray)
                // let context = '"context": "https://raw.githubusercontent'
                // let index = araxResults.indexOf(context) - 1
                console.log("araxResults")
                console.log(araxResults)
                // let araxResultsArray_gg = araxResults.split("\n")
                // let araxResults_ggResults = araxResultsArray_gg[araxResultsArray_gg.length - 2]
                // console.log(araxResults_ggResults)
                let araxJson = araxResults
                console.log(araxJson)
                // let araxJson = JSON.parse(araxResults.substring(index))
                console.log(araxJson)
                console.log("araxJson.message.knowledge_graph.edges")
                console.log(araxJson.message.knowledge_graph.edges)

                let nodes = araxJson.message.knowledge_graph.nodes
            
                let results = araxJson.message.results
                console.log("results")
                console.log(results)
                let essence = results.map(x => x.essence)
                console.log("essence = ", essence)

                dgg_nodeEdges["nodes_gg"] = araxJson.message.knowledge_graph.nodes
                dgg_nodeEdges["edges_gg"] = araxJson.message.knowledge_graph.edges


              // GET GENES REGULATING TARGET
                // let hopOne = cleanedResults_gg.map((row) => if(row.predicate != "biolink:has_normalized_google_distance_with"){
                //   return object
                // })



                let genes = Object.keys(nodes)
                console.log("genes = ", genes)
                this.waitingfor_text = " CLEANING UP GENE - GENE RESULTS"
                let cleanedResults_gg = await TrapiResultClean.ARAXResultClean(
                    araxJson
                  );
                  
                  console.log("______________  cleanedResults_gg")
                  console.log(cleanedResults_gg)

                let cleanedResults_gg_genes = cleanedResults_gg.map((row) => {

                  if(row.predicate != "biolink:has_normalized_google_distance_with" && row.subjectName != SRI_normalizer_name){
                    // console.log(row.predicate)
                    // console.log(row.subject)
                    return row.subject
                  } else {
                    return
                  }
                })
                cleanedResults_gg_genes = cleanedResults_gg_genes.filter(x => x != null)

                function onlyUnique(value, index, self) {
                  return self.indexOf(value) === index;
                }

                // usage example:
                cleanedResults_gg_genes = cleanedResults_gg_genes.filter(onlyUnique);

                console.log("cleanedResults_gg_genes")
                console.log(cleanedResults_gg_genes)

              // #########################
              // GET DRUGS REGULATING GENES
              // ######################### 
              this.waitingfor_text = " GETTING DRUG - GENE INTERACTIONS FROM ARAX"
                // let araxResults_dg = await ARAXService.araxQuery_dg(genes)
                let araxResults_dg = await ARAXService.araxQuery_dg(cleanedResults_gg_genes)
                console.log(araxResults_dg)
              // ARAX RETURNS LOG INFO AS WELL - THE LAST LINE OF TEXT IS THE RESUTLS - SO USE SPLIT GET LAST LINE
                // let araxResultsArray = araxResults_dg.split("\n")
                // let araxResults_dgResults = araxResultsArray[araxResultsArray.length - 2]

                let araxJson_dg = araxResults_dg
                this.waitingfor_text = " CLEANING DRUG - GENE INTERACTIONS FROM ARAX"
                let cleanedResults_dg = await TrapiResultClean.ARAXResultClean(
                    araxJson_dg
                  );
                  this.cleanedResults_dg = cleanedResults_dg
                  console.log("______________  cleanedResults_dg")
                  console.log(cleanedResults_dg)

                let hopOne = cleanedResults_gg.filter(row => row.predicate != "biolink:has_normalized_google_distance_with" && row.subjectName != SRI_normalizer_name)
                let hopTwo = cleanedResults_dg.filter(row => row.predicate != "biolink:has_normalized_google_distance_with")
                let hopOneDir = hopOne.map((res) => {
                  res.direction = "Unknown"
                  // console.log(res)
                  // console.log(res.predicate.split(":")[1])
                  if(this.predicate_decrease.indexOf(res.predicate.split(":")[1]) != -1  ){
                    res.direction = "Decrease"
                    return res
                  } else if (this.predicate_increase.indexOf(res.predicate.split(":")[1]) != -1  ){
                    res.direction = "Increase"
                    return res
                  } else {
                    return res
                  }
                })

                let hopTwoDir = hopTwo.map((res) => {
                  res.direction = "Unknown"
                  // console.log(res)
                  console.log("getting direction")
                  if(this.predicate_decrease.indexOf(res.predicate.split(":")[1]) != -1  ){
                    res.direction = "Decrease"
                    return res
                  } else if (this.predicate_increase.indexOf(res.predicate.split(":")[1]) != -1  ){
                    res.direction = "Increase"
                    return res
                  } else {
                    return res
                  }
                })
                console.log("hopOneDir")
                console.log(hopOneDir)


                // console.log("hopOne")
                // console.log(hopOne)
                console.log("hopTwoDir")
                console.log(hopTwoDir)

                this.waitingfor_text = " COMBINING HOPS"

                this.araxResultTable = await TrapiResultClean.createTwoHopObject(hopOneDir, hopTwoDir)
                console.log("this.araxResultTable")
                console.log(this.araxResultTable)

                this.saveCleanedTrapi(hopOne, "hopOne")
                this.saveCleanedTrapi(hopTwo, "hopTwo")
                this.hopOne = hopOne
                this.hopTwo = hopTwo

                // let result = {"araxResultTable": this.araxResultTable, "hopOne": hopOne, "hopTwo": hopTwo}
                // let grouped = await TrapiResultClean.TrapiResultGroup(this.araxResultTable, "subjectName_dg")
                // console.log("grouped")
                // console.log(grouped)
                return 

            })
            .then(async () => {
              console.log("CREATING SUMMARY TABLE")
              let araxResultTable = this.araxResultTable
              console.log("araxResultTable")
              console.log(araxResultTable)
              // SET ARAY TO CELLECT UNIQUE GENES BY OBJECTNAME
              let uniqueGenes = []
              // for (let i = 0; i < 5; i++) {
                for (let i = 0; i < araxResultTable.length; i++) {
                const row = araxResultTable[i];

                  if(uniqueGenes.indexOf(row.subjectName_gg) == -1){
                  //  let obj = {}
                  console.log("row = ", row)
                  console.log("row.direction_gg = ", row.direction_gg)
                  this.araxResultTableSummary[row.subjectName_gg] = {gene: row.subjectName_gg, direction: row.direction_gg, TotalDrugs: 0, CheckedDrugs: 0,inhibitor: 0, inhibitorFDA: 0, activator: 0, activatorFDA: 0}
                  // let objCopy = {...obj}
                  uniqueGenes.push(row.subjectName_gg)
                  
                  console.log(this.araxResultTableSummary)
                  console.log("uniqueGenes")
                  console.log(uniqueGenes)
                    this.araxResultTableSummaryDisplay.push(this.araxResultTableSummary[row.subjectName_gg])
                    this.componentKey++                   
                  }
                  if(i == araxResultTable.length - 1){
                    for (let n = 0; n < uniqueGenes.length; n++) {
                    const gene = uniqueGenes[n];
                    let array = araxResultTable.filter(x => x.subjectName_gg == gene)
                    let arrayDecrease = araxResultTable.filter(x => x.subjectName_gg == gene && x.direction_dg == "Decrease")
                    let arrayIncrease = araxResultTable.filter(x => x.subjectName_gg == gene  && x.direction_dg == "Increase")
                    this.araxResultTableSummary[gene].TotalDrugs = array.length
                    this.araxResultTableSummary[gene].inhibitor = arrayDecrease.length
                    this.araxResultTableSummary[gene].activator = arrayIncrease.length
                    //  this.araxResultTableSummary[gene].direction = row.direction_gg
                    this.componentKey++

                    if(n == uniqueGenes.length -1 && i == araxResultTable.length - 1){
                      console.log("this.araxResultTableSummary")
                      console.log(this.araxResultTableSummary)
                      return 
                    }

                   }
      
                 }
 


                 
               }
            })
            // .then(async (results) => {

                
            
           // ORIGINAL FDA
            .then(async () => {
              this.waitingfor_text = " GETTING FDA INFO FOR EACH DRUG"
              console.log("START FDA SEARCH")
              console.log("this.araxResultTable")
              console.log(this.araxResultTable)
              let araxResultTable = this.araxResultTable


              for (let i = 0; i < araxResultTable.length; i++) {
                

              // for (let i = 0; i < 5; i++) {
                const line = araxResultTable[i];

                this.araxResultTableSummary[line.subjectName_gg].CheckedDrugs++

                this.componentKey++
                araxResultTable[i].submission = "NA"
                let chemCurie = line.object_dg
                console.log(chemCurie)
                let drugData = {}
                drugData.brand_name = []
                drugData.generic_name = []
                drugData.manufacturer_name = []
                drugData.pharm_class_epc = []
                drugData.pharm_class_pe = []
                drugData.substance_name = [] 
                drugData.product_type = [] 
                drugData.route = [] 
                drugData.substance_name = [] 
                drugData.products = [] 
                drugData.submission_status = "NA"
                araxResultTable[i].fdaData = drugData
                araxResultTable[i].time = new Date()


                try {
                // let chemData = await FDAService.myChemInfo(chemCurie)
                // console.log("chemData.unii.unii")
                // console.log(chemData.unii.unii)
                // let unii = chemData.unii.unii

                let openFDAGetUnii = await FDAService.openFDAGetUnii(line.subjectName_dg)
                // console.log("openFDAGetUnii")
                // console.log(openFDAGetUnii)
                let unii = openFDAGetUnii.results[0].unii

                let FDAData = await FDAService.openFDA(unii)
                // console.log("FDAData")
                // console.log(FDAData)
                let result = FDAData.results[0]
                // console.log(result)
                // console.log(result.openfda)
                // console.log(result.openfda.brand_name)

                drugData.brand_name = result.openfda.brand_name
                drugData.generic_name = result.openfda.generic_name
                drugData.manufacturer_name = result.openfda.manufacturer_name
                drugData.pharm_class_epc = result.openfda.pharm_class_epc
                drugData.pharm_class_pe = result.openfda.pharm_class_pe
                drugData.substance_name = result.openfda.substance_name
                drugData.product_type = result.openfda.product_type
                drugData.route = result.openfda.route
                drugData.substance_name = result.openfda.substance_name
                drugData.products = result.openfda.products
                drugData.submission_status = result.submissions[0].submission_status
                drugData.number_submissions = result.submissions.length
                araxResultTable[i].submission = result.submissions[0].submission_status
                araxResultTable[i].fdaData = drugData
                // console.log("araxResultTable")
                // console.log(araxResultTable)
                this.araxResultTable = araxResultTable
                  
                  //ADD TO COUNT OF ALL CHEMICALS

                  // console.log(araxResultTable[i])
                  // console.log(araxResultTable[i].direction_dg)
                  // console.log(result.submissions[0].submission_status)
                  if(araxResultTable[i].direction_dg == "Decrease" && result.submissions[0].submission_status == "AP"){
                    //ADD TO COUNT OF ALL CHEMICALS AND FDA IF APPROVED
                    this.araxResultTableSummary[line.subjectName_gg].inhibitorFDA++
                    this.componentKey++
                    // this.araxResultTableSummary[row.objectName_gg].TotalDrugs++
                  } else if (araxResultTable[i].direction_dg == "Increase" && result.submissions[0].submission_status == "AP"){
                    this.araxResultTableSummary[line.subjectName_gg].activatorFDA++
                    this.componentKey++
                  }
                  this.componentKey++

                } catch (err)
                {
                  console.log(err)
                }
                // console.log(i, "--- this.araxResultTableSummary")
                // console.log(this.araxResultTableSummary)
                if(i == araxResultTable.length - 1){
                  console.log("$$$$$$$$$$$$ - this.araxResultTableSummary")
                  console.log(this.araxResultTableSummary)
                  return
                }
                
              }

            })
            .then(async () => {
              // this.araxResultTableSummaryDisplay
              for (let i = 0; i < this.hopTwo.length; i++) {
                const drug = this.hopTwo[i].objectName
                // console.log("this.hopTwo[i]")
                // console.log(this.hopTwo[i])
                // console.log("########## twohop drug = ", drug)
                this.hopTwo[i].fda = ""
                // console.log("drug = ", drug)
                for (let n = 0; n < this.araxResultTable.length; n++) {
                  const drugCheck = this.araxResultTable[n]
                  // console.log(drugCheck)
                  if(drug == drugCheck.objectName_dg){
                    // console.log("FOUND MATCH")
                    // console.log(drugCheck)
                    this.hopTwo[i].fda = drugCheck.submission
                    n = this.araxResultTable.length
                  }
                  
                  
                  
                  
                }
                //this.saveCleanedTrapi(hopTwo, "hopTwo")
                if(i == this.hopTwo.length - 1){
                  this.show_waiting_card = false
                  this.saveCleanedTrapi(this.hopTwo, "hopTwo-FDA")

                }

                
              }

            })
 
        });
      } catch (err) {
        console.error(err);
      }
    },





   async saveCleanedTrapi(results, name) {
     console.log("START saveCleanedTrapi ")
      // this.startTime = new Date()
      // console.log(importResultWithDrugs);
      let tableForDownload = []

      try{
        
        for (let i = 0; i < results.length; i++) {

            const trapiData = results[i];
            let data = {}
            try {
              data.edgeOriginalSource = trapiData.edgeOriginalSource
              data.edgeprovider = trapiData.edgeprovider
              data.object = trapiData.object
              data.objectName = trapiData.objectName
              data.predicate = trapiData.predicate
              data.subject = trapiData.subject
              data.subjectName = trapiData.subjectName
              data.fda = trapiData.fda
            } catch (err){
              console.error(err)
            }

      
            if(trapiData.edgepublications.length > 0){
              // console.log("data")
              // console.log(data)
              for (let n = 0; n < trapiData.edgepublications.length; n++) {
                let pub = trapiData.edgepublications[n]
                data.pubID = pub
                let dataCopy = {...data}
                tableForDownload.push(dataCopy)
                      
                  if(i == results.length -1 && n == trapiData.edgepublications.length - 1){
                    console.log("FINISHED ", name)
                    this.saveThisFile(tableForDownload, name);
                    // this.trySection(chemTableForDownload)
                  }
                }
            } else {
              data.pubID = "none found"
              if(i == results.length -1){
                console.log("FINISHED ",name )
                this.saveThisFile(tableForDownload, name);
                // this.trySection(chemTableForDownload)
              }
            }
            
          }
      } catch (err){
        console.error(err)
        console.log("WRITING FILE FOR ", name)
        this.saveThisFile(tableForDownload, name);
      }
 


    },

    saveThisFile(file, nametag) {
      let text = "";
      console.log("save result");
      console.log("file")
      console.log(file)

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

          // try {
          //   cell = cell.replace(/,/gi, ";");
          // } catch (err) {
          //   // console.error(err);
          //   // console.log("row to be writien = ", result)
          //   cell = "not found"
          // }
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
        this.concept_search + "-" + nametag + " results.csv";
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