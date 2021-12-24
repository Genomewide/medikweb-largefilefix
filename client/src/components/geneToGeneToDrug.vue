<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">MEDIK TWO HOP GENE TO DRUG QUERY</h1>
    <div style="margin-top: 20px">

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
                    v-on:click="getgenetogenetodrug"
                    >getalldrugs
                  </b-button>
                  <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="saveFile"
                    >saveFile
                  </b-button>
                  <!-- <b-button
                    style="margin-left: 20px"
                    variant="primary"
                    v-on:click="saveFile"
                    :disabled="!validation"
                    >saveFile
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
                  Results: {{ twohop_result_tabledata.length }} 
                  <br />
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-checkbox
                      v-for="filter in filter_counttype"
                      v-model="selectedFilters"
                      :value="filter.value"
                      :key="filter.value"
                      :aria-describedby="ariaDescribedby"
                    >
                      <!-- <b-badge variant="primary">{{ filter.count }}</b-badge> -->
                      {{ filter.value }} ({{ filter.count }})
                    </b-form-checkbox>
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
     
        <b-row style="margin-top: 20px">
          <b-col>
            <b-card>
              <template #header>
                <h6 class="mb-0">Grouped Results</h6>
              </template>
             
              <b-table
                bordered
                striped
                hover
                fixed
                :items="twohop_result_tabledata"
                :fields="fields_dgg"
                v-model="ShownTableData"
              >
              
             
              </b-table>
              <!-- {{twohop_result_tabledata}} -->
            </b-card>
          </b-col>
        </b-row>
        <b-row style="margin-top: 20px">
          <b-col>
            <b-card>
              <template #header>
                <h6 class="mb-0">Results</h6>
              </template>
              <!-- {{groupedResultsTable}} -->
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
          <b-col>
           <!-- {{twohop_result_tabledata}} -->
          </b-col>
        </b-row>
      </b-container>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import PubCleanService from "../PubCleanService";
var parser = require("fast-xml-parser");
import axios from "axios";
// import got from 'got';
// const EventEmitter = require("events");

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();

export default {
  name: "Gene2Drugs",
  data() {
    return {
      ShownTableData: [],
      twohop_result_tabledata: [],
      perPage: 5,
      totalRows: 1,
      currentPage: 1,
      filteredTableData: [],
      groupedTableKey: 1,
      busy: false,
      error: "",
      text: "",
      mediget: {},
      nodes: [],
      edges: [],
      subject: "chemical",
      predicate: "UMLS:C0004096",
      concept_search: "NCBIGene:203547",
      // HGNC:6884" MAPK8IP3
      // "HGNC:2625" CYP2D6
      // "HGNC:11998" TP53"
      // "HGNC:3236" EGFR  - 3546 hits
      // 1100 BRCA1
      // 9588 PTEN
      // 5173 HRAS
      // 22082 VMA21
      object: "HGNC:9588",
      concept_data: {},
      //concept table
      concepts_table: [],
      selected: [],

      shownItems: [],
      select_concepts: [],

      queryResults: [],
      selectedFilters: [],
      fields_dgg: [ 
        {
          key: "drugname",
          label: "drugname",
          sortable: true,

        },
{
          key: "drugid",
          label: "Drug",
          sortable: true,

        },
{
          key: "drugFDAphase",
          label: "FDA Phase",
          sortable: true,

        },
{
          key: "direction_dg",
          label: "direction_dg",
          sortable: true,

        },
        {
          key: "predicate_dg",
          label: "predicate_dg",
          sortable: true,

        },
{
          key: "geneonename",
          label: "geneone",
          sortable: true,

        },
{
          key: "geneoneid",
          label: "geneoneid",
          sortable: true,

        },
        {
          key: "direction_gg",
          label: "direction_gg",
          sortable: true,

        },
       {
          key: "predicate_gg",
          label: "predicate_gg",
          sortable: true,

        },
                {
          key: "genetwoname",
          label: "genetwo",
          sortable: true,

        },
{
          key: "genetwoid",
          label: "genetwoid",
          sortable: true,

        },
                {
          key: "direction",
          label: "DGG Direction",
          sortable: true,

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
        "positively_regulates,_entity_to_entity",
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
        "decreases_degradation_of",
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
   
      textarea: '{"message":{"query_graph":{"nodes":{"genetwo":{"id":"NCBIGene:1733"},"drug":{"category":"chem"},"geneone":{"category":"gene"}},"edges":{"drug2gene":{"subject":"drug","object":"geneone"},"gene2gene":{"subject":"geneone","object":"genetwo"}}}}}',        // '{"message":{"query_graph":{"nodes":{"n2":{"id":"NCBIGene:1565"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2"}}}}}',
      // textarea: '{"message":{"query_graph":{"nodes":{"genetwo":{"id":"NCBIGene:1565"},"drug":{"category":"chem"},"geneone":{"category":"gene"}},"edges":{"drug2gene":{"subject":"drug","object":"geneone"},"gene2gene":{"subject":"geneone","object":"genetwo"}}}}}',        // '{"message":{"query_graph":{"nodes":{"n2":{"id":"NCBIGene:1565"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2"}}}}}',
      badResults: [
        "ATP",
        "ADP",
        "WATER",
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
        "amide"
      ],
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
   async getgenetogenetodrug (){
     this.twohop_result_tabledata = []
    //  gene = "NCBIGene:1565"
    // let twohopquerymodel = {"message":{"query_graph":{"nodes":{"genetwo":{"id":"NCBIGene:1565"},"drug":{"category":"chem"},"geneone":{"category":"gene"}},"edges":{"drug2gene":{"subject":"drug","object":"geneone"},"gene2gene":{"subject":"geneone","object":"genetwo"}}}}}
    // let query = twohopquerymodel.message.query_graph.nodes.genetwo = this.concept_search

    let query = JSON.parse(this.textarea);
    query.message.query_graph.nodes.genetwo.id = this.concept_search
    console.log(query)

    // SEND TWO HOP QUERY
     PostService.query_raw(query)
    .then(twohopresult => {
      console.log("twohopresult")
      console.log(twohopresult)
      // this.nodes = twohopresult.message.knowledge_graph.nodes
      let nodes = twohopresult.message.knowledge_graph.nodes
      let edges = twohopresult.message.knowledge_graph.edges
      console.log("edges = ", edges)
      let results = twohopresult.message.results
      let drug2geneResultsArray = []
      let gene2geneResultsArray = []

      let drug2genearray = []
      let gene2genearray = []

    // GO THROUGH EACH RESULTS AND TEST IF GENE-GENE OR DRUG-GENE
    // THEN GET EDGE ID
    // USE EDGE ID TO GET EDGE DATA FROM EDGES AND LABEL EACH AS GENE-GENE OR DRUG-GENE
      for (let i = 0; i < results.length; i++) {
        let resultProcessed = {}
        const element = results[i];

      // CHECK THE TYPE OF RESULT => GENE-GENE OR DRUG-GENE
       if(Object.prototype.hasOwnProperty.call(element.edge_bindings, "drug2gene")){
        //  console.log("found drug2gene")
         resultProcessed.type = "drug2gene"

         // DRUG2GENE **** = new code try ****** START
         let drug2gene = {}
         drug2gene.type = "drug2gene"
         drug2gene.edgeid_dg = element.edge_bindings.drug2gene[0].id
         drug2gene.drugid = element.node_bindings.drug[0].id
         drug2gene.geneoneid = element.node_bindings.geneone[0].id

         drug2gene.geneoneinfo = nodes[drug2gene.geneoneid]
         drug2gene.druginfo = nodes[drug2gene.drugid]
         drug2gene.edgeinfo_dg = edges[drug2gene.edgeid_dg]

         drug2gene.geneonename = nodes[drug2gene.geneoneid].name
         drug2gene.drugname = nodes[drug2gene.drugid].name


         // AVOID NONEXISTENT VALUES
         drug2gene.drugdescription = ""
         drug2gene.predicate_dg = ""
         drug2gene.publicationinfo_dg = ""
         drug2gene.geneonesynonym = ""
         drug2gene.drugFDAapproval = "0"
         drug2gene.drugFDAdescription = "No FDA Information Found"
         drug2gene.predicate_dg = edges[drug2gene.edgeid_dg].predicate// drug2gene.edgeinfo_dg.split(":")[1]
        
        let geneonedone = false
        let edgedone = false
        let drugdone = false

         // GO THROUGH ATTRIBUTES AND FILL IN AVAILABLE INFO

         for (let n = 0; n < drug2gene.druginfo.attributes.length; n++) {
           const att = drug2gene.druginfo.attributes[n];
           if (att.name == "description") {
             drug2gene.drugdescription = att.value

             // GET FDA APPROVAL IF IS THERE
                if (drug2gene.drugdescription.includes("FDA")) {
                  let description = drug2gene.drugdescription
                    .split("; ")
                    .filter((el) => el.includes("FDA"));
                  console.log("FDA = ", description);
                  console.log("FDA = ", description[0]);

                  drug2gene.drugFDAdescription = description[0];
                  drug2gene.drugFDAapproval =
                    drug2gene.drugFDAdescription.split(" ")[1];
                  console.log("FDA approval level = ", drug2gene.drugFDAapproval);
                  console.log(drug2gene.drugFDAdescription);
                } else {
                  drug2gene.drugFDAdescription =
                    "No FDA Information Found";
                  drug2gene.drugFDAapproval = "0";
                }

             // END FDA APPROVAL GETTER
           }
           if(n == drug2gene.druginfo.attributes.length - 1){
             drugdone = true
           }

           
         }

         for (let x = 0; x < drug2gene.edgeinfo_dg.attributes.length; x++) {
           const att = drug2gene.edgeinfo_dg.attributes[x];
           if (att.name == "predicate_label") {
             drug2gene.predicate_dg = att.value
           }
           // "publications_info"
           if (att.name == "publications_info") {
             drug2gene.publicationinfo_dg = att.value
           }           
           if (att.name == "publications") {
             drug2gene.publication_dg = att.value
           }   
          //  console.log("drug2gene = ", drug2gene)
           if(x == drug2gene.edgeinfo_dg.attributes.length - 1){
             edgedone = true
           }           
         }

         for (let t = 0; t < drug2gene.geneoneinfo.attributes.length; t++) {
           const att = drug2gene.geneoneinfo.attributes[t];
           if (att.name == "synonym") {
             drug2gene.geneonesynonym = att.value
           }
           if(t == drug2gene.geneoneinfo.attributes.length - 1){
             geneonedone = true
           }            
           
         }

         if (geneonedone && edgedone && drugdone) {
           drug2genearray.push(drug2gene)

            // console.log("drug2gene object##############")
            // console.log(drug2gene)
            // console.log("##############")           
           
         }
         // DRUG2GENE **** = new code try ****** END


        // GET EDGE IDS AND RESULT TYPE (GENE-GENE OR DRUG-GENE)
         let edgeid = element.edge_bindings.drug2gene[0].id

        // GET EDGE DATA USING EDGE ID
         let edgeinfo = edges[edgeid]

        // START NEW OBJECT THAT WILL HOLD DATA FOR EACH RESULT
        // GET SELECT INFORMATION FROM EDGE
          resultProcessed.predicate_dg = edgeid
          // resultProcessed.edgeinfo_dg = edgeinfo
         resultProcessed.object = edgeinfo.object
         let pred = edgeinfo.predicate.split(":")

         resultProcessed.predicate_dg = pred[pred.length - 1]
         resultProcessed.relation = edgeinfo.relation
         resultProcessed.subject = edgeinfo.subject
         resultProcessed.subjectname_dg = nodes[edgeinfo.subject].name
         resultProcessed.publications_dg = ""
         resultProcessed.geneone = edgeinfo.object
         resultProcessed.drug = edgeinfo.subject
        //  console.log("edgeinfo.subject")
        //  console.log(edgeinfo.subject)
 
         for (let n = 0; n < edgeinfo.attributes.length; n++) {
           const att = edgeinfo.attributes[n];
           if(att.name == "publications"){
             resultProcessed.publications_dg = att.value
           }  
           if(n == edgeinfo.attributes.length - 1) {
            //  console.log("resultProcessed")
            //  console.log(resultProcessed)
             drug2geneResultsArray.push(resultProcessed)
           }        
         }

       } else if (Object.prototype.hasOwnProperty.call(element.edge_bindings, "gene2gene")){


         // GENE2GENE **** = new code try ****** START
         let gene2gene = {}

         try {
         gene2gene.type = "gene2gene"
         gene2gene.edgeid_gg = element.edge_bindings.gene2gene[0].id
         gene2gene.genetwoid = element.node_bindings.genetwo[0].id
         gene2gene.geneoneid = element.node_bindings.geneone[0].id

         gene2gene.geneoneinfo = nodes[gene2gene.geneoneid]
         gene2gene.genetwoinfo = nodes[gene2gene.genetwoid]
         gene2gene.edgeinfo_gg = edges[gene2gene.edgeid_gg]

         gene2gene.geneonename = nodes[gene2gene.geneoneid].name
         gene2gene.genetwoname = nodes[gene2gene.genetwoid].name


         // AVOID NONEXISTENT VALUES
         gene2gene.predicate_gg = ""
         gene2gene.publication_gg = ""
         gene2gene.publicationinfo_gg = ""
         gene2gene.geneonesynonym = ""
         gene2gene.genetwosynonym = ""

         gene2gene.predicate_gg = edges[gene2gene.edgeid_gg].predicate
        
        let geneonedone = false
        let edgedone = false
        let genetwodone = false
         // GO THROUGH ATTRIBUTES AND FILL IN AVAILABLE INFO

         for (let t = 0; t < gene2gene.genetwoinfo.attributes.length; t++) {
           const att = gene2gene.genetwoinfo.attributes[t];
           if (att.name == "synonym") {
             gene2gene.genetwosynonym = att.value
           }
           if(t == gene2gene.genetwoinfo.attributes.length - 1){
             genetwodone = true
           }            
           
         }

         for (let x = 0; x < gene2gene.edgeinfo_gg.attributes.length; x++) {
           const att = gene2gene.edgeinfo_gg.attributes[x];
           if (att.name == "predicate_label") {
             gene2gene.predicate_gg = att.value
           }
           // "publications_info"
           if (att.name == "publications_info") {
             gene2gene.publicationinfo_gg = att.value
           }           
           if (att.name == "publications") {
             gene2gene.publication_gg = att.value
           }   
           if(x == gene2gene.edgeinfo_gg.attributes.length - 1){
             edgedone = true
           }           
         }

         for (let t = 0; t < gene2gene.geneoneinfo.attributes.length; t++) {
           const att = gene2gene.geneoneinfo.attributes[t];
           if (att.name == "synonym") {
             gene2gene.geneonesynonym = att.value
           }
           if(t == gene2gene.geneoneinfo.attributes.length - 1){
             geneonedone = true
           }            
           
         }

         if (geneonedone && edgedone && genetwodone) {
           gene2genearray.push(gene2gene)

            // console.log("gene2gene object##############")
            // console.log(gene2gene)
            // console.log("##############")           
           
         }

         // GENE2GENE **** = new code try ****** END

         } catch(error){
           console.log("new gene2gene error - see below")
           console.log("element = ", element)           
           console.log(gene2gene)           
           console.error(error)


         }

         resultProcessed.type = "gene2gene"
         let edgeid = element.edge_bindings.gene2gene[0].id
         let edgeinfo = edges[edgeid]
         resultProcessed.object = edgeinfo.object
         resultProcessed.resultGeneone = element.node_bindings.geneone[0].id
        //  resultProcessed.genetwo = element.node_bindings.genetwo[0].id         
         resultProcessed.geneone = element.node_bindings.geneone[0].id
         resultProcessed.genetwo = element.node_bindings.genetwo[0].id
         resultProcessed.resultGenetwo = element.node_bindings.genetwo[0].id
        //  console.log("geneone = ", element.node_bindings.geneone[0].id)
        //  console.log("genetwo = ", element.node_bindings.genetwo[0].id)

         let pred = edgeinfo.predicate.split(":")
         resultProcessed.predicate_gg = pred[pred.length - 1]
         resultProcessed.relation = edgeinfo.relation
         resultProcessed.subject = edgeinfo.subject
         resultProcessed.subjectname_gg = nodes[edgeinfo.subject].name

         resultProcessed.publications_gg = ""
            
         for (let n = 0; n < edgeinfo.attributes.length; n++) {
           const att = edgeinfo.attributes[n];
           if(att.name == "publications"){
             resultProcessed.publications_gg = att.value
           }  
           if(n == edgeinfo.attributes.length - 1) {
             gene2geneResultsArray.push(resultProcessed)
           }        
         }
       }

      if(i == results.length - 1 ) {
        console.log("********* RETURNING gene2gene AND GENE2DRUG - testing drug2genearray")
        console.log(drug2genearray)
        return {"drug2gene": drug2geneResultsArray, "gene2gene": gene2geneResultsArray, "newdrug2gene": drug2genearray, "newgene2gene": gene2genearray}
      }        
    }

    })
    .then((results) => {
      console.log("RESULTS - FROM GATHERING ALL OF THE INFORMATION FOR EACH EDGE - WILL COMBINE THE THE HOPS NEXT")
      console.log(results)
      

      // ### START NEW CODE - MATCH UP FIRST HOP WITH SECOND - START
      let hopones = results.newdrug2gene
      let hoptwos = results.newgene2gene
      let twohopresults = []

      // GO THROUGH ALL OF THE HOP ONE OBJECTS
      for (let index = 0; index < hoptwos.length; index++) {
        let twohopobject = {}
        const hoptwo = hoptwos[index];
        twohopobject.hoptwo = hoptwo

        // IF HOPTWO HAS SAME GENEONE THEN ADD TO OBJECT AND PUSH TO FINAL RESULT ARRAY
        for (let n = 0; n < hopones.length; n++) {
          const hopone = hopones[n];
          if(hopone.geneoneid == hoptwo.geneoneid){

            twohopobject = hopone
            // console.log("######## HOPS CONNECTED = ", twohopobject)
            // console.log("hopone.geneone = ", hopone.geneoneid)
            // console.log("hoptwo.geneone = ", hoptwo.geneoneid)

            // COMBINE BOTH HOPS TO SINGLE OBJECT
            twohopobject.edgeid_gg = hoptwo.edgeid_gg
            twohopobject.edgeinfo_gg = hoptwo.edgeinfo_gg
            twohopobject.genetwoid = hoptwo.genetwoid
            twohopobject.genetwoinfo = hoptwo.genetwoinfo
            twohopobject.genetwoname = hoptwo.genetwoname
            twohopobject.genetwosynonym = hoptwo.genetwosynonym
            twohopobject.predicate_gg = hoptwo.predicate_gg
            twohopobject.publication_gg = hoptwo.publication_gg
            twohopobject.publicationinfo_gg = hoptwo.publicationinfo_gg

            twohopresults.push(twohopobject)

          }
        if(index == hoptwos.length - 1 && n == hopones.length -1){
          console.log("***** TWOHOPRESULTS = ", twohopresults)
          return twohopresults
        }
          
        } 
      }
    })
    .then((twohoparray) =>{
      console.log("twohoparray")
      console.log(twohoparray)

      for (let x = 0; x < twohoparray.length; x++) {
        const element = twohoparray[x];
 
        //  CATEGORIZE PREDICATES FOR EACH EDGE - THIS WILL ALLOW FOR READER DESCRIMINATION WHEN REVIEWIN THE LIT
        if (this.predicate_decrease.indexOf(element.predicate_dg) > -1) {
          twohoparray[x].direction_dg = "Decrease";

        } else if (this.predicate_increase.indexOf(element.predicate_dg) > -1) {
          twohoparray[x].direction_dg = "Increase";

        } else { 
          twohoparray[x].direction_dg = "Ambiguous";
        }  

        //  CATEGORIZE PREDICATES FOR EACH EDGE - THIS WILL ALLOW FOR READER DESCRIMINATION WHEN REVIEWIN THE LIT
        if (this.predicate_decrease.indexOf(element.predicate_gg) > -1) {
          twohoparray[x].direction_gg = "Decrease";

        } else if (this.predicate_increase.indexOf(element.predicate_gg) > -1) {
          twohoparray[x].direction_gg = "Increase";

        } else { 
          twohoparray[x].direction_gg = "Ambiguous";
        }  
        if(x == twohoparray.length - 1){
          return twohoparray
        }
      }
    })
    .then((results)=> {
      console.log("CALC EXPECTED OVERALL DIRECTION")
      console.log(results)
      // let i = 0
      for (let index = 0; index < results.length; index++) {
        // const result = results[index];
        results[index].direction = "Ambiguous"
        if(results[index].direction_gg == "Increase" && results[index].direction_dg == "Increase"){
          results[index].direction = "Increase"
          // i++
          // console.log(i)
          // console.log(results[index])
        }
        if(results[index].direction_gg == "Increase" && results[index].direction_dg == "Decrease"){
          results[index].direction = "Decrease"
          // i++
          // console.log(i)
          // console.log(results[index])
}
        if(results[index].direction_gg == "Decrease" && results[index].direction_dg == "Increase"){
          results[index].direction = "Decrease"
          // i++
          // console.log(i)
          // console.log(results[index])          
        }
        if(results[index].direction_gg == "Decrease" && results[index].direction_dg == "Decrease"){
          results[index].direction = "Increase"
          // i++
          // console.log(i)
          // console.log(results[index])          
        }     
        
        if(index == results.length - 1){
          return results
        }
      }

    })
    .then( (results) => {
          // USE CONCEPT SERVICE TO GET RELATED CONCEPTS AND FIND THE CHEMBL RTX THAT WILL HAVE FDA APPROVAL
          console.log("GETTING FDA APROVAL INFO FROM RTX CHMBL DATA ---");

          // GET UNIQUE DRUGS AND THEN USE POSTSERVICE TO GET FDA INFO
          let uniqueDrugs = []
          for (let i = 0; i < results.length; i++) {
            const drugname = results[i].drugname;
            // console.log(drugname)
            // console.log(results.length)
            // console.log(i)
            // console.log(i)
            
            if(uniqueDrugs.indexOf(drugname) == -1){
              uniqueDrugs.push(drugname)

            }
            if(i == results.length - 1){
                console.log("results = ",results)
                console.log("uniqueDrugs = ",uniqueDrugs)
                return {"results": results, "uniquedrugs": uniqueDrugs}
              }
            
          }


          
        })
    .then(async (resultsobject)=> {
      // USE UNIQUE DRUG ARRAY TO GET FDA DATA
      console.log("got unique drug array - now start getting FDA info")
      // console.log({resultsobject})

      let uniqueDrugs = resultsobject["uniquedrugs"]
      let results = resultsobject["results"]

      //ARRAY TO STORE OBJECTS THAT WILL CONTAIN FDA INFO
      let arrayofdrugs = []
      let drugobject = {}
      
      for (let index = 0; index < uniqueDrugs.length; index++) {
          const drugName = uniqueDrugs[index];
          

          // if(drugName != "" && drugName != "acid"){
          if (this.badResults.indexOf(drugName) == -1) {
            let drugNameConceptData = await PostService.getConcept(drugName);
            
            // console.log({drugNameConceptData})
            try {
              let asArray = Object.entries(
                drugNameConceptData["concepts"]["rtx2_2021_02_04"]
              );

              
            // GET ONLY CHEMBL THAT MATCH NAME EXACTLY
              let asfilteredArray = asArray.filter(([key, value]) => {

                if (
                  key.includes("CHEMBL") &&
                  drugName.toLowerCase() == value.name.toLowerCase()
                ) {
                console.log({key})
                console.log({value})  
                console.log({asArray})                
                return true;
                } else {
                  return false;
                }
              });

            // GET ANY THAT MATCH NAME EXACTLY
              let asfilteredArrayall = asArray.filter(([key, value]) => {

                if (
                  drugName.toLowerCase() == value.name.toLowerCase()
                ) {
                console.log({key})
                console.log({value})  
                console.log({asArray})                
                return true;
                } else {
                  return false;
                }
              });
              let drugdata = {}
              drugdata[drugName] = {}
              try{
              
              

              drugdata[drugName].rtx = asfilteredArray[0][1];
              drugdata[drugName].chembl = asfilteredArray[0][0]
              // console.log({drugName})
              // console.log("asfilteredArray[0] = ", asfilteredArray[0])
              // console.log("asfilteredArray[0][1] = ", asfilteredArray[0][1])
              // console.log("asfilteredArray[0][0] = ", asfilteredArray[0][0])
              console.log("asfilteredArray = ", asfilteredArray)
              console.log("asfilteredArrayall = ", asfilteredArrayall)
              results[index].rtx = asfilteredArray[0][1];
              results[index].chembl = asfilteredArray[0][0]              
              // console.log("asArray = ", asArray)


                            // console.log("asfilteredArray")
              
              console.log("drugdata")
              console.log(drugdata)

              arrayofdrugs.push(drugdata[drugName])
              drugobject[drugName] = {}
              drugobject[drugName].rtx = asfilteredArray[0][1]
              drugobject[drugName].chembl = asfilteredArray[0][0]


              console.log(results[index].rtx)
              } catch {
                // console.log("drugdata = ", drugdata)
                // console.error(err)

              }


              // if (index == uniqueDrugs.length - 1) {
              //   console.log(arrayofdrugs)
              //   return results;
              // }
            } catch {
              // console.error("error getting rtx data - likely none available");
              if (index == results.length - 1) {
                // console.log({arrayofdrugs})
                // console.log({results})
                // console.log("drugobject")
                // console.log(drugobject)
            return {"results": results, "drugobject": drugobject};
              }
            }
          }
          if (index == uniqueDrugs.length - 1) {
              // console.log({arrayofdrugs})
              // console.log({results})
              // console.log("drugobject")
              // console.log(drugobject)
            return {"results": results, "drugobject": drugobject};
          }
        }

            
      
    })
    .then((results)=> {
      console.log("calculated direction now show nodes")
      console.log("results = ", results.results)
      console.log("drugobject = ", results.drugobject)
      let resutlttable = results.results
      let drugobject = results.drugobject
      let fdadrugs = Object.keys(drugobject)

      // GET FDA FILTER TAG
      for (let index = 0; index < resutlttable.length; index++) {
        const result = resutlttable[index];
        resutlttable[index].filtertags = []
        resutlttable[index].drugFDAinfo = {}
        resutlttable[index].drugFDAphase = "0"
        if(fdadrugs.indexOf(result.drugname) > -1){
          resutlttable[index].filtertags.push("FDA")
          resutlttable[index].drugFDAinfo = drugobject[result.drugname]
          let attributes = drugobject[result.drugname].rtx.attributes
          for (let i = 0; i < attributes.length; i++) {
            const att = attributes[i];

            if (att.value.includes("FDA")) {
              console.log("FOUND FDA INFO")
              let description = att.value
                .split("; ")
                .filter((el) => el.includes("FDA"));
              console.log("FDA = ", description);
              console.log("FDA[0] = ", description[0]);
              console.log("description[0].split( )[1]")
              console.log(description[0].split(" ")[1])
              resutlttable[index].drugFDAphase = description[0].split(" ")[1];
              // results[index].fdaApproved =
              //   results[index].fdaDescription.split(" ")[1];
              // console.log(results[index].fdaApproved);
              // console.log(results[index].fdaDescription);
            } 

            if(i == attributes.length - 1){
              console.log("FDA approved drug = ",resutlttable[index])
            }
          }
          // resutlttable[index].drugFDAphase = 
          
        }
        
        if(index == resutlttable.length - 1){
            return {"results": resutlttable, "drugobject": drugobject};
        }
      }

      

      
    })
    .then((results) => {
      console.log("added FDA filter")
      this.twohop_result_tabledata = results.results
      console.log("this.ShownTableData")
      console.log(this.ShownTableData)


    })


   },

    // filterTable(row, filter) {
    //   // this.filtercount = 0
    //   if (filter.indexOf(row.predicate_cleaned) == -1) {
    //     return false;
    //   } else {
    //     // this.filtercount++
    //     return true;
    //   }
    // },
    saveFile() {
      // credit: https://www.bitdegree.org/learn/javascript-download
      // let text = JSON.stringify(this.groupedResultsTable);

      let text = ""
       console.log("save result")
        
      for (let index = 0; index < this.twohop_result_tabledata.length; index++) {
        
        const result = this.twohop_result_tabledata[index];
         console.log(result)

        let headers = Object.keys(result)
        // console.log({headers})
      
      if(index == 0){
        console.log("headers index == 0")
        // HEADER ROW
        for (let i = 0; i < headers.length; i++) {
          const header = headers[i]
          if(i != headers.length - 1){
            text = text  + header + ','
          } else {
            text = text + header + '\r\n'
          }        
        }
      } else {
      // ADD REMAINING ROWS IN SAME ORDER BASED ON KEYS FROM HEADER ROW
        for (let n = 0; n < headers.length; n++) {
          let header = headers[n]
          let cell = JSON.stringify(result[header])
          // let cell = result[header]
          

          try {
            // if(cell.includes(",")){
            //   cell = "'" + cell + "'"
            // }
         
              // console.log("# result = ", index, " header = ", header, "cell = ", cell)
              cell = cell.replace(/,/gi,';')
              // cell = cell.replace("PMID",';')
              // console.log({cell})
              // console.log(typeof cell)
            // }
// CHEMBL109
              if(cell.includes("CHEMBL1187") || cell.includes("CHEMBL109")){
            console.log("# result = ", index, " header = ", header, "cell = ", cell)
              }            
          } catch(err){
            
            console.error(err)
            console.log(headers)
            console.log(headers[n])
          }

          if(n != headers.length - 1){
            text = text  + cell + ','
          } else {
            text = text + cell  + '\r\n'
          }        
        }

      }

      }

      let filename = this.concept_search + "twohop results.csv";
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
      console.log(this.groupedResultsTable[index])

      if(item._showDetails){
        // this.$set(item, '_showDetails', false)
        this.groupedResultsTable[index]._showDetails = false
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
            // let pubmedurl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" + pubString + "&rettype=json"
            let pubmedurl =
              // "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334&rettype=json";
              "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334,30612693&rettype=json";

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
            let pub = pmjson.PubmedArticleSet.PubmedArticle;
            // console.log(pmjson.PubmedArticleSet)
            console.log(Array.isArray(pmjson.PubmedArticleSet.PubmedArticle));
            // console.log("length = ", pmjson.PubmedArticleSet.PubmedArticle.length)
            // console.log(pmjson)
            // console.log(pub)

            let pubData = await PubCleanService.cleanPubmed(pub);
            console.log("pubData processsed");
            console.log(pubData);
            this.groupedResultsTable[index].pubData = pubData;
            this.groupedResultsTable[index]._showDetails = true
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
            this.groupedTableKey += 1

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
    onFiltered(filteredItems) {
      // console.log(filteredItems);
      this.filtercount = filteredItems.length;
      // this.currentPage = 1
    },
  },
    filters: {
      pretty: function (value) {
        // console.log(typeof value)
        // let fixedvalue = {}
        // fixedvalue.tabledata = value
        return JSON.stringify((value), null, 1);
      },
    },
  computed: {
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