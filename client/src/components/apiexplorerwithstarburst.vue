<template>
  <div class="container">
    <h1>TRAPI MEDIK API Explorer</h1>
    <div>
      <b-card no-body>
        <b-tabs card>
          <b-tab title="API Format Testing" active>
            <b-card-text>
              <div class="create-post">
                <div>
                  <div class="container">
                    <b-row>
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
                    </b-row>
                  </div>

                  <b-form inline>
                    <b-button variant="primary" v-on:click="get_medikresults">
                      Submit Query test
                    </b-button>
                    <!-- <b-button variant="primary" v-on:click="hitapifromcient">
                      hitapifromcient
                    </b-button> -->
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
              <b-tabs card>
                <b-tab title="Formatted JSON" active>
                  <div>
                    <div>
                      <pre>{{ textarea | pretty }}</pre>
                    </div>
                  </div>
                </b-tab>
                <b-tab title="Results">
                  <b-row>
                    <b-col>
                      Showing {{ totalRows }} of {{ tableResults.length }}
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
                        :current-page="currentPage"
                        :per-page="perPage"
                        table-layout:
                        fixed
                        sticky-header="1000px"
                        :fields="fields"
                        :items="tableResults"
                        :filter="filter"
                        :filter-include-fields="[]"
                        @filtered="onFiltered"
                      ></b-table>
                    </b-col>
                  </b-row>
                </b-tab>
                <b-tab title="Results Summary">
                  <b-row>
                    <b-col>
                      <b-form style="margin-top: 20px; margin-bottom: 20px">
                        <!-- predCounts: {},
      subcatCounts: {},
      objcatCounts: {} -->
                      </b-form>
Predicates:
                      <b-table
                        bordered
                        striped
                        hover
                        table-layout:
                        fixed
                        sticky-header="1000px"
                        :items="predCounts"
                      ></b-table>
                    </b-col>
                    <b-col>
                      <b-form style="margin-top: 20px; margin-bottom: 20px">
                        <!-- predCounts: {},
      subcatCounts: {},
      objcatCounts: {} -->
                      </b-form>
Subject Cat.
                      <b-table
                        bordered
                        striped
                        hover
                        table-layout:
                        fixed
                        sticky-header="1000px"
                        :items="subcatCounts"
                      ></b-table>
                    </b-col>
                    <b-col>
                      <b-form style="margin-top: 20px; margin-bottom: 20px">
                        <!-- predCounts: {},
      subcatCounts: {},
      objcatCounts: {} -->
                      </b-form>
Object Cat.
                      <b-table
                        bordered
                        striped
                        hover
                        table-layout:
                        fixed
                        sticky-header="1000px"
                        :items="objcatCounts"
                      ></b-table>
                    </b-col>
                  </b-row>
                </b-tab>
              </b-tabs>
<b-card> 
<starburst :starburst-data="starburstData"/>

</b-card>
              <div>
                <hr />
                <form inline>
                  <b-button
                    style="margin-right: 20px; margin-bottom: 20px"
                    variant="secondary"
                    v-on:click="showNodesButton"
                  >
                    Nodes
                  </b-button>
                  <b-button
                    style="margin-right: 20px; margin-bottom: 20px"
                    variant="secondary"
                    v-on:click="showEdgesButton"
                  >
                    Edges
                  </b-button>
                  <b-button
                    style="margin-right: 20px; margin-bottom: 20px"
                    variant="secondary"
                    v-on:click="showResultsButton"
                  >
                    Results
                  </b-button>
                </form>
                <b-card>
                  <b-card-text>
                    <pre v-if="showResults == true">
                      # of results = {{resultsLength}}
                      <br />
                  {{ returnedResults | prettyResults }}
                  </pre>
                    <pre v-if="showNodes == true">
                      # of nodes = {{nodeLength}}
                      <br />
                  {{ returnedNodes | prettyNodes }}</pre>
                    <pre v-if="showEdges == true">
                      # of edges = {{edgeLength}}
                      <br />
                  {{ returnedEdges | prettyEdges }}</pre>
                  </b-card-text>
                </b-card>
              </div>
            </b-card-text>
          </b-tab>
        </b-tabs>
      </b-card>
      
    </div>
  </div>
</template>

<script>
import PostService from "../PostService";
import TrapiResultClean from "../TrapiResultClean";
var parser = require("fast-xml-parser");
import axios from "axios";

import starburst from "./starburst.vue"
// import got from 'got';
// const EventEmitter = require("events");

// class MyEmitter extends EventEmitter {}
// const eventEmitter = new MyEmitter();


export default {
  name: "PostComponent",
  components: {
    starburst
  },
  data() {
    return {
      filter: null,
      perPage: 10,
      currentPage: 1,
      totalRows: 1,
      error: "",
      text: "",
      textarea:
        '{"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n1","object": "n2"}}}}}',
      // '{"message":{"query_graph":{"nodes":{"genetwo":{"id":"NCBIGene:203547"},"drug":{"category":"chem"},"geneone":{"category":"gene"}},"edges":{"drug2gene":{"subject":"drug","object":"geneone"},"gene2gene":{"subject":"geneone","object":"genetwo"}}}}}',        // '{"message":{"query_graph":{"nodes":{"n2":{"id":"NCBIGene:1565"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2"}}}}}',
      // '{"message":{"query_graph":{"nodes":{"genetwo":{"id":"NCBIGene:1565"},"drug":{"category":"chem"},"geneone":{"category":"gene"}},"edges":{"drug2gene":{"subject":"drug","object":"geneone"},{"drug2gene":{"geneone":"n4","object":"genetwo"}}}}}',

      jsonstr:
        '{"id":1,"name":"A green door","price":12.50,"tags":["home","green"]}',
      textarea_alt:
        '{"message":{"query_graph":{"nodes":{"n2":{"id":"MONDO:0005148"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2", "predicate":"treat"}}}}}',
      // '{"message":{"query_graph":{"nodes":{"n2":{"id":"MONDO:0000022"},"n4":{"category":"chem"}},"edges":{"e0":{"subject":"n4","object":"n2", "predicate":"treat"}}}}}',

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
      fields: [
        {
          key: "subjectName",
          label: "Sub. Name",
          sortable: true,
        },
        {
          key: "subject",
          label: "Sub. ID",
          sortable: true,
        },
        {
          key: "subjectCat",
          label: "Sub. Cat.",
          sortable: true,
        },

        {
          key: "predicate",
          label: "Pred.",
          sortable: true,
        },
        {
          key: "objectName",
          label: "Obj. Name",
          sortable: true,
        },
        {
          key: "object",
          label: "Obj.",
          sortable: true,
        },
        {
          key: "objectCat",
          label: "Obj. Cat.",
          sortable: true,
        },
        {
          key: "source",
          label: "KG",
          sortable: true,
        },
      ],

      queryResults: [],
  
      drug_data: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_data: [],
      // reverting and moved the below from older copyright
      synonym_drugs: [],

      returnedResults: '{"message":{}}',
      returnedNodes: '{"message":{}}',
      returnedEdges: '{"message":{}}',
      nodeLength: 0,
      edgeLength: 0,
      resultsLength: 0,
      showNodes: false,
      showEdges: false,
      showResults: false,
      JSONquery: {},
      tableResults: [],
      totallength: 0,
      predCounts: [],
      subcatCounts: [],
      objcatCounts: [],
      starburstData: {},
    };
  },
  methods: {
groupBy(objectArray, property) {
   return objectArray.reduce((acc, obj) => {
      const key = obj[property];
      if (!acc[key]) {
         acc[key] = [];
      }
      // Add object to list for given key's value
      acc[key].push(obj);
      return acc;
   }, {});
},

// const personGroupedByColor = groupBy(person, "color");

    async get_medikresults() {
      this.drugStartTime = new Date();
      this.showNodes = false;
      this.showEdges = false;
      this.showResults = false;
      this.tableResults = [];

      // try {
      // this.synonym_drugs = [];
      try {
        this.JSONquery = JSON.parse(this.textarea);
        console.log(
          "get_medikresults - query - sent to PostService.query_raw(query)"
        );
        console.log("query = ", this.JSONquery);
      } catch (err) {
        console.error(err);
      } // let query = JSON.parse(this.textarea);

      PostService.query_raw(this.JSONquery)
        .then(async (query_raw_results) => {
          console.log("query_raw_results");
          console.log(query_raw_results);

          this.concept_data = query_raw_results;
          // console.log("await PostService.query_raw(query);");
          // console.log(this.concept_data);
          let cleanedResults = await TrapiResultClean.TrapiResultClean(
            this.concept_data
          );
          console.log("RETURNED FROM TRAPICLEAN = ", cleanedResults);
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
          // console.log("this.returnedResults.length")
          // console.log(this.returnedResults.length)

          // GET LENGTH
          this.nodeLength = Object.keys(JSON.parse(this.returnedNodes)).length;
          this.edgeLength = Object.keys(JSON.parse(this.returnedEdges)).length;
          this.resultsLength = Object.keys(
            JSON.parse(this.returnedResults)
          ).length;

          // console.log(this.returnedNodes)
          console.log(this.nodeLength);
          console.log(this.edgeLength);
          console.log(this.resultLength);
          this.drugEndTime = new Date();

          console.log("start = ", this.drugStartTime);
          console.log("end = ", this.drugEndTime);
        })
        .catch((error) => {
          console.error(error);
        })
        .then(() => {
          console.log("STARTED EDGE PARSING");
          let edges = JSON.parse(this.returnedEdges);
          let nodes = JSON.parse(this.returnedNodes);
          console.log({ edges });
          console.log({ nodes });
          let keys = Object.keys(edges);
          // console.log("keys")
          // console.log(keys)
          this.totallength = keys.length;
          for (let index = 0; index < keys.length; index++) {
            const key = keys[index];
            // console.log("key = ", key)
            // console.log("keyslength = ", keys.length)
            let result = edges[key];
            // console.log("result")
            // console.log(result)
            let subjectid = result.subject;
            let objectid = result.object;
            // console.log({subjectid})
            // console.log({objectid})
            // console.log("nodes[subjectid]")
            // console.log(nodes[subjectid])
            // console.log("nodes[objectid]")
            // console.log(nodes[objectid])
            result.subjectAtt = nodes[subjectid].attributes;
            result.subjectCat = nodes[subjectid].category;
            result.subjectName = nodes[subjectid].name;

            result.objectAtt = nodes[objectid].attributes;
            result.objectCat = nodes[objectid].category;
            result.objectName = nodes[objectid].name;

            result.source = key.split(".")[0];
            // console.log("result done")
            // console.log(result)
            this.tableResults.push(result);

            if (index == keys.length - 1) {
              return;
            }
          }
        })
        .then(() => {
          console.log("this.tableResults");
          console.log(this.tableResults);

          // GET ALL UNIQ SPO RELATIONSHIPS TO ALLOW COUNTING

          let unique_spoArray = [];
          let spoArray = [];
          let predsArray = [];
          for (let index = 0; index < this.tableResults.length; index++) {
            const result = this.tableResults[index];
            let spoID = result.subjectCat + result.predicate + result.objectCat;
            let pred = result.predicate;
            spoArray.push(spoID);
            if (unique_spoArray.indexOf(spoID) == -1) {
              unique_spoArray.push(spoID);
            }
            if (predsArray.indexOf(pred) == -1) {
              predsArray.push(pred);
            }

            if (index == this.tableResults.length - 1) {
              // console.log(unique_spoArray)
              // console.log(spoArray)
              this.totalRows = this.tableResults.length;
              return;
            }
          }
        })
        .then(() => {
          console.log("done");
          let objcatArray = [];
          let subcatArray = [];
          let subcatCounts = {};
          let objcatCounts = {};
          let predArray = [];
          let predCounts = {};
          for (let index = 0; index < this.tableResults.length; index++) {
            const row = this.tableResults[index];
            const pred = row.predicate;
            const objCat = row.objectCat;
            const subCat = row.subjectCat;
            if (predArray.indexOf(pred) == -1) {
              predArray.push(pred);
              predCounts[pred] = { type: pred, count: 1 };
            }
            if (predArray.indexOf(pred) > -1) {
              predCounts[pred].count++;
            }

            if (objcatArray.indexOf(objCat) == -1) {
              objcatArray.push(objCat);
              objcatCounts[objCat] = { type: objCat, count: 1 };
            }
            if (objcatArray.indexOf(objCat) > -1) {
              objcatCounts[objCat].count++;
            }

            if (subcatArray.indexOf(subCat) == -1) {
              subcatArray.push(subCat);
              subcatCounts[subCat] = { type: subCat, count: 1 };
            }
            if (subcatArray.indexOf(subCat) > -1) {
              subcatCounts[subCat].count++;
            }

            if (index == this.tableResults.length - 1) {
              this.predCounts = Object.values(predCounts)
              this.subcatCounts = Object.values(subcatCounts)
              this.objcatCounts = Object.values(objcatCounts)

              let summary = {
                predSum: predCounts,
                subCatSum: subcatCounts,
                objCatCounts: objcatCounts,
                objcatArray: objcatArray,
                predArray: predArray,
                subcatArray: subcatArray

              };
              // console.log("summary = ", summary);
              return summary
            }
          }
        })
        .then((summary) => {

          console.log(summary)
          // START DATA OBJECT
          // NAME = SEARCH TERM
          // CHILDREN = ARRAY
          let data = {}
          data.name = "test"
          data.children = []
          let subcatArray = summary.subcatArray

          // FOR EVERY UNIQUE SUBJECT CATEGORY IN SUCATARRAY - START A CHILD
          for (let i = 0; i < subcatArray.length; i++) {
            let group = {}
            const subcat = subcatArray[i];
            group.name = subcat
            group.children = []
            // group.add({"name": subcat, "children": []})

            // GO THROUGH ALL OF THE RESULTS - COLECT TERMS AND PUT IN OBJECT TO GO IN THE ARRAY CALLED CHILDREN
            for (let n = 0; n < this.tableResults.length; n++) {
              const row = this.tableResults[n];
              // console.log("row = ", row)
              // console.log("row.subCat = ", row.subjectCat)
              // console.log("subcat = ", subcat)

              if(row.subjectCat == subcat){
                // console.log(subCat == subcat)

                let child = {}
                // console.log("row.subjectName")
                // console.log(row.subjectName)
                if(row.subjectName == false){
                  // console.log("found false value")
                  // console.log(row.object)
                  child.name = row.subject
                } else {
                  child.name = row.subjectName
                } 

                // if(row.subjectName == "false"){
                //   console.log("found false text")
                //   child.name = row.object
                // } 
                child.value = 0
                group.children.push(child)

              }

              if(n == this.tableResults.length - 1){
                // console.log("group.children.length")
                // console.log(group.children.length)
                data.children.push(group)

              }             
              
            }
            if(i == subcatArray.length - 1){
              
              return data
            }
            
          }

        })
        .then((data)=> {
          console.log("data = ", data)
          let total = this.tableResults.length
          for (let i = 0; i < data.children.length; i++) {
            const child = data.children[i];
            // console.log("##### child")
            // console.log(child)
            // let childrencount = child.children.length
            console.log(child.children.length)
            for (let x = 0; x < child.children.length; x++) {
              // const grandchild = child.children[x];
              // console.log(data.children[i].children[x])
              // console.log("----- grandchild")
              // console.log(grandchild)
              // console.log(total)
              // console.log(grandchild.length)
              // console.log(total/grandchild.length *1000)
              data.children[i].children[x].value = Math.round(1/total *1000)
              
            }
            if(i == data.children.length - 1){
              console.log("data")
              console.log(data)
              this.starburstData = data
            }

            
          }

        })
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      // this.currentPage = 1;
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
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.concepts_table.length;
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
/* div.container { max-width: 800px; margin: 0 auto; } */
/* .colwidth {
  max-width: 100px;
}
.db_colwidth {
  max-width: 5px;
} */
</style>
