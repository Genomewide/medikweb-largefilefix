<template>
  <div class="container">
    <h1>TRAPI MEDIK GENE QUERY drug to gene</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="Concept 2 drugs" active>
            <b-card-text>
              <div class="create-post">
                <div>
                  <div class="container">
                    <!-- <b-row>
                      <div
                        v-for="(concept, index) in select_concepts"
                        v-bind:index="index"
                        v-bind:key="concept._id"
                      >
                        <b-col
                          ><b-button size="sm">{{
                            concept.name
                          }}</b-button></b-col
                        >
                      </div>
                    </b-row> -->
                  </div>

                  <b-form  inline>
                    <!-- <label class="sr-only" for="Object">Object</label>
                    <b-form-input
                      v-model="concept_search"
                      id="concept_search"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Object"
                    ></b-form-input> -->
                    <b-button variant="primary" v-on:click="get_medikresults">
                      Submit Query
                    </b-button>
                    <!-- <b-spinner small type="grow"></b-spinner> -->
                    <!-- <div v-if="synonym_drugs.length">
                      Number of results {{ drug_data.length }}
                    </div> -->
                  </b-form>
                  <br />
                </div>
                <div class="container">
                  <div>
                    <b-form-textarea
                      id="textarea"
                      v-model="textarea"
                      placeholder="Enter something..."
                      rows="3"
                      max-rows="6"
                    ></b-form-textarea>

                    <pre class="mt-3 mb-0">{{ text }}</pre>
                  </div>
                  <div class="container">
                    <h5></h5>
                  </div>
                </div>
              </div>
              <hr />

              <div>
                <div>
                  <!-- <textarea v-model="textarea" rows="8" cols="40"></textarea> -->
                  <pre>{{ textarea | pretty }}</pre>
                </div>
              </div>
              <div>
                <hr />
                <form inline>
                  <b-button style="margin-right:20px; margin-bottom:20px" variant="secondary" v-on:click="showNodesButton">
                    Nodes
                  </b-button>                  
                  <b-button style="margin-right:20px; margin-bottom:20px" variant="secondary" v-on:click="showEdgesButton">
                    Edges
                  </b-button>                  
                  <b-button style="margin-right:20px; margin-bottom:20px" variant="secondary" v-on:click="showResultsButton">
                    Results
                  </b-button>
                </form>
                <b-card>
                  <b-card-text>
                    
                <pre v-if="showResults == true">{{ returnedResults | prettyResults }}</pre>
                <pre v-if="showNodes == true">{{ returnedNodes | prettyNodes }}</pre>
                <pre v-if="showEdges == true">{{ returnedEdges | prettyEdges }}</pre>

                  </b-card-text>

                </b-card>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      <b-card> </b-card>
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
var parser = require("fast-xml-parser");
import axios from "axios";

// import got from 'got';
// const EventEmitter = require("events");

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();

export default {
  name: "PostComponent",
  // components: {
  //   VueJsonPretty,
  // },
  data() {
    return {
      error: "",
      text: "",
      textarea:
        '{"message":{"query_graph":{"nodes":{"n2":{"id":"NCBIGene:1565"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2"}}}}}',
      jsonstr:
        '{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}',
      textarea_alt:'{"message":{"query_graph":{"nodes":{"n2":{"id":"MONDO:0005148"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2", "predicate":"treat"}}}}}',
      mediget: {},
      nodes: [],
      edges: [],
      subject: "chemical",
      predicate: "HGNC:2625",
      concept_search: "HGNC:2625",
      noreesults: false,
      // HGNC:6884"
      // "HGNC:2625"
      object: "HGNC:5006",
      concept_data: {},
      //concept table
      concepts_table: [],
      selected: [],
      
      shownItems: [],
      select_concepts: [],
      conceptFields: [
        "Selected",

        {
          key: "db",
          label: "Database",
          sortable: true,
        },
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "category",
          label: "Category",
          sortable: true,
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
        },
      ],

      queryResults: [],
      drug_fields2: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
        },
        {
          key: "relation",
          label: "Relation",
          sortable: true,
        },
        {
          key: "object_name",
          label: "Index",
          sortable: true,
        },
        // {
        //   key: "rxnorm",
        //   label: "RxN",
        //   sortable: true,
        //   tdClass: "db_colwidth"
        // },
        // {
        //   key: "drugbank",
        //   label: "DB",
        //   sortable: true,
        //   tdClass: "db_colwidth"
        // },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "publications",
          label: "publications",
          sortable: true,
        },
      ],
      drug_data: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_data: [],
      // reverting and moved the below from older copyright
      synonym_drugs: [],
 
      returnedResults: '{"message":{}}',
      returnedNodes: '{"message":{}}',
      returnedEdges: '{"message":{}}',
      showNodes: true,
      showEdges: false,
      showResults: false
    };
  },
  methods: {
    async getSynonyms_service() {
      this.drugStartTime = new Date();
      try {
        this.synonym_drugs = [];
        this.concept_data = await PostService.getSynonyms(this.concept_search);
        console.log("await PostService.getSynonyms(this.concept_search);");
        console.log(await PostService.getSynonyms(this.concept_search));
        // this.synonyms_returned = this.concept_data["synonyms"]
        let syn_ids = Object.keys(this.concept_data["synonyms"]);
        console.log("syn_ids");
        console.log(syn_ids);

        let id_obj = [];
        for (let index = 0; index < syn_ids.length; index++) {
          // ONLY KEEP THE CURIESS THAT WILL INCLUDE LINK TO DRUGS BC WE HAVE TO WAIT TIME PER CURIE TO RETURN INFO
          if (
            syn_ids[index].includes("NCBI") |
            syn_ids[index].includes("UniProtKB") |
            syn_ids[index].includes("UMLS")
          ) {
            id_obj.push({ id: syn_ids[index] });
            console.log("found one = " + syn_ids[index]);
          }

          // const element = syn_ids[index];
          console.log("index");
          console.log(index);

          if (index == syn_ids.length - 1) {
            console.log("getting drugs");
            this.synonym_drugs = await PostService.queryPost(id_obj);

            console.log(this.synonym_drugs);
            this.drugEndTime = new Date();

            // console.log(await PostService.queryPost(id_obj))
            // console.log(this.synonyms_info)
          }
        }
      } catch (err) {
        console.log(err);
      }
    },

    async get_medikresults() {
      this.drugStartTime = new Date();
      try {
        // this.synonym_drugs = [];
        let query = JSON.parse(this.textarea);
        this.concept_data = await PostService.query_raw(query);
        console.log("await PostService.query_raw(query);");
        console.log(await PostService.query_raw(query));
        console.log("this.concept_data from format tester");
        console.log(this.concept_data);
        let results = this.concept_data;
        console.log("results count = ", results.message.results.length);
        console.log(results.message.results);
        this.returnedNodes = JSON.stringify(
          results.message.knowledge_graph.nodes
        );
        this.returnedEdges = JSON.stringify(
          results.message.knowledge_graph.edges
        );
        this.returnedResults = JSON.stringify(results.message.results);
        // console.log(results.message.results)
        // console.log(results.message.results)
      } catch (err) {
        console.log(err);
      }
    },
    // batchresults(start, stop) {

    // },
    async getPubmed() {
      try {
        // terms.array.forEach(element => {
        // let puubmedurl = "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=" + pmid + "&rettype=json"
        let puubmedurl =
          "https://eutils.ncbi.nlm.nih.gov/entrez/eutils/efetch.fcgi?db=pubmed&id=30945334,30612693&rettype=json";

        const res = await axios.get(puubmedurl);
        const xmlData = res.data;
        var pmjson = parser.parse(xmlData);
        console.log(pmjson);
      } catch (err) {
        console.error(err);
      }
    },
    showNodesButton() {
      this.showNodes = true;
      this.showEdges = false;
      this.showResults = false;
    },
    showEdgesButton() {
      this.showNodes = false;
      this.showEdges = true;
      this.showResults = false;
    },
    showResultsButton() {
      this.showNodes = false;
      this.showEdges = false;
      this.showResults = true;
    },
  },
  filters: {
    pretty: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
    prettyResults: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
        prettyNodes: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
        prettyEdges: function (value) {
      return JSON.stringify(JSON.parse(value), null, 2);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* div.container { max-width: 800px; margin: 0 auto; } */
.colwidth {
  max-width: 100px;
}
.db_colwidth {
  max-width: 5px;
}

</style>
