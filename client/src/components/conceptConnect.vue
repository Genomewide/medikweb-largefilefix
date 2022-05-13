<template>
  <div class="container" style="padding-bottom: 20px">
    <h1>CONCEPT CONNECT</h1>
    <div>
      <b-card no-body style="padding-bottom: 20px" :key="componentKey">
        <b-tabs card>
          <b-tab title="Find Objects related to genes" >
            <b-card-text >
              <div class="create-post" >
                <div :key="componentKey">
                  <b-form @submit="onSubmit" inline>
                    <label class="sr-only" for="Object">Object</label>
                    <b-form-input
                      v-model="concept_search"
                      id="concept_search"
                      class="mb-2 mr-sm-2 mb-sm-0"
                      placeholder="Object"
                    ></b-form-input>

                    <b-button variant="primary" v-on:click="getConcept_service"
                      >Get Related Concepts</b-button
                    >
                    <b-form-checkbox
                        v-model="getCategories"
                        :value="true"
                        :unchecked-value="false"
                      >
                        Get Categories
                      </b-form-checkbox>
                    <!-- <b-button variant="primary" v-on:click="getSynonyms"
                      >getSynonyms</b-button
                    >
                    <b-button 
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="getAllEdges"
                      >getAllEdges</b-button
                    >               -->
                    <!-- <b-button 
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="testGroupBy"
                      >testGroupBy</b-button
                    >    -->

                    <div
                      style="padding-left: 10px"
                      v-if="concepts_table.length > 0"
                    >
                      Results: &nbsp;{{ totalRows }} of
                      {{ concepts_table.length }}
                    </div>
                    <b-button
                      v-if="concepts_table.length > 0"
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="selectAllRows"
                      >Select All</b-button
                    >

                    <div
                      style="padding-left: 10px"
                      v-if="selectedRows.length > 0"
                    >
                      Selected: &nbsp;{{ selectedRows.length }}
                    </div>
                    <!-- <div>{{ getuserdata }}</div> -->
                    <b-button
                      style="margin-left: 10px"
                      v-if="selectedRows.length > 0"
                      variant="danger"
                      v-on:click="clearSelected"
                      >Clear Selection</b-button
                    >
                  </b-form>
                  <hr />
                  <!-- <b-row style="margin-top: 20px"> -->
                  <!-- <b-col> -->
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
                  <!-- </b-col> -->
                  <!-- </b-row> -->
                </div>
              </div>

              <b-pagination
                style="padding-bottom: 20px"
                v-model="currentPage"
                :total-rows="totalRows"
                :per-page="perPage"
                align="fill"
                size="sm"
                class="my-0"
              ></b-pagination>
              <div>
                <b-table
                  
                  bordered
                  striped
                  hover
                  selectable
                  ref="selectableTable"
                  responsive="true"
                  table-layout:
                  fixed
                  :fields="matchTermFields"
                  :select-mode="selectMode"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :items="concepts_table"
                  @row-clicked="myRowClickHandler"
                  :filter="filter"
                  :filter-include-fields="[]"
                  @filtered="onFiltered"
                >
                  <template #cell(selected)="data">
                    <template v-if="data.value">
                      <span aria-hidden="true">&check;</span>
                      <span class="sr-only">Selected</span>
                    </template>
                    <template v-else>
                      <span aria-hidden="true">&nbsp;</span>
                      <span class="sr-only">Not selected</span>
                    </template>
                  </template>
                </b-table>
              </div>
          
            
            </b-card-text>
          </b-tab>
          <b-tab title="Selected Terms" active>

              <b-row style="padding-bottom:20px">
                <!-- <b-button 
                  style="margin-left: 10px"
                  variant="danger"
                  v-on:click="setSubjectExample"
                  >Set as Term 1 example</b-button
                >  -->
                <b-button 
                  style="margin-left: 10px"
                  variant="warning"
                  v-on:click="setSubject"
                  >Set as Term 1</b-button
                > 
                <b-button 
                  style="margin-left: 10px"
                  variant="success"
                  v-on:click="setObject"
                  >Set as Term 2</b-button
                > 
              
                <b-button 
                  style="margin-left: 10px"
                  variant="secondary"
                  v-on:click="findLinks"
                  >findLinks</b-button
                > 
                <b-button 
                  style="margin-left: 10px"
                  variant="secondary"
                  v-on:click="findLinksTwo"
                  >findLinksTwo</b-button
                > 
                <b-button 
                  style="margin-left: 10px"
                  variant="secondary"
                  v-on:click="getOverlapTriples"
                  >getOverlapTriples</b-button
                > 
                <b-button 
                  style="margin-left: 10px"
                  variant="secondary"
                  v-on:click="findLinksThree"
                  >findLinksThree</b-button
                > 
                </b-row>
                <b-row style="margin-top:20px; min-height:200px">
                    <b-card-group deck style="width:100%">
                      <b-card >
                          <template #header>
                            <h3 class="mb-0">Term 1</h3>
                          </template>
                        <b-card-text>
                          <div>

                          </div>
                          <!-- <li class="bulletFont" v-for="(item, index) in subject_default" :key="`item-${index}`"> 
                              {{ item }}
                          </li> -->
                          <li class="bulletFont" v-for="(item, index) in subject" :key="`item-${index}`"> 
                              {{ item }}
                          </li>
                        </b-card-text>
                        
                      </b-card>
                    
                      <b-card>
                        <template #header>
                            <h3 class="mb-0">Term 2</h3>
                          </template>
                      
                        <b-card-text>

                          <li class="bulletFont" v-for="(item, index) in object" :key="`item-${index}`">
                              {{ item }}
                          </li>
                        </b-card-text>
                      </b-card>
                    </b-card-group>
                  </b-row>
                <b-row>
                  <!-- resultsFields -->
                                  <b-table
                          id="term1Table"
                            bordered
                            striped
                            hover
                            ref="selectedTable"
                            table-layout:
                            fixed
                            :sticky-header="true"
                            
                            :items="overlapCuries"
                            :current-page="currentPage"
                          >
                          </b-table>
                <b-card v-if="searchResults.length > 0">

                  <b-table
                    bordered
                    striped
                    hover
                    ref="selectedTable"
                    table-layout:
                    fixed
                    :sticky-header="true"
                    :fields="resultsFields"
                    :items="searchResults"
                  >
                  </b-table>
                </b-card>
                </b-row>
                <b-row>
                <b-card v-if="selectedRows.length > 0">

                  <b-table
                    bordered
                    striped
                    hover
                    ref="selectedTable"
                    table-layout:
                    fixed
                    :sticky-header="true"
                    :fields="selectedFields"
                    :items="selectedRows"
                  >
                  </b-table>
                </b-card>
                </b-row>

          </b-tab>
          <b-tab title="Breakdown">
            <div>
              <b-card-group deck>
                <b-card title="Count of CURIEs">
                  <b-card-text>
                    <b-table v-if="curieCount.length > 0" :items="curieCount"> </b-table>
                  </b-card-text>
                </b-card>

                <b-card title="Count of Categories">
                
                  <b-card-text>
                    <b-table :items="dbTable"> </b-table>
                  </b-card-text>
                </b-card>
              </b-card-group>
              <b-card-group deck>
                <b-card title="Count of Predicates">
                  <b-card-text>
                    <b-table v-if="curieCount.length > 0" :items="predicateCount"> </b-table>
                  </b-card-text>
                </b-card>

            
              </b-card-group>
            </div>
          </b-tab>
                    <b-tab title="All edges 2 hop">
              <hr />
              <div>
                              <b-card-group deck>
                <b-card title="Hop 1">
                  <b-card-text>
                    <!-- <b-table v-if="curieCount.length > 0" :items="curieCount"> </b-table> -->
                  </b-card-text>
                </b-card>

                <b-card title="Hop 2">
                
                  <b-card-text>
                    <!-- <b-table :items="dbTable"> </b-table> -->
                  </b-card-text>
                </b-card>
              </b-card-group>

              </div>
              <div>
                <!-- <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                > -->
                <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card title="catCountTable" :key="componentKey">
                  <!-- {{ concepts_table }} -->
                  <!-- selectable table =  {{$refs.selectableTable}} -->
                  <b-table
                    bordered
                    striped
                    hover
                    ref="catCountTable"
                    table-layout:
                    fixed
                    :sticky-header="true"
                    :items="preCountTable"
                    :fields="countFields"
                  >
                  </b-table>
                </b-card>
                <!-- </b-collapse> -->
              </div>
          </b-tab>
          <b-tab title="Diagram">
<!-- <conceptExploreComponent :conceptData="tree" /> -->
<!-- {{testjson}} -->
          </b-tab>
        </b-tabs>
      </b-card>
            <div>
    <!-- <svg id="vizTreeII" class="container-border" /> -->
  </div>
    </div>
  </div>
</template>

<script>
// import { mapGetters, mapActions } from "vuex";
// import PostService from "../PostService";
// import synonymService from "../synonymService";
import TrapiResultClean from "../TrapiResultClean";
var parser = require("fast-xml-parser");
import axios from "axios";

import NodeFinderService from "../NodeFinderService";
import predicateTree from "../assets/predicateTree.json"
import predicateList from "../assets/predicateList.json"
import term1Results from "../assets/cannabidiol_results.json"
import term2Results from "../assets/valproicacid_results.json"
import ARAXService from "../ARAXService";
// import searchResults2 from "../../datafiles/searchResults2.json"

export default {
  name: "ConceptExplorerTextMatch",
//      components: {
//  conceptExploreComponent
//   },
  // mounted: function () {

  // },
  data() {
    return {
      getCategories: false,
      predicateSelected: [],
      predicateTree: predicateTree,
      predicateList: predicateList,
      predicateText: "",
      subject_default: ["MONDO:0005147",
"MONDO:0005148",
"MONDO:0005406",
"MONDO:0006920",
"MONDO:0008185",
"MONDO:0008491",
"MONDO:0008696",
"MONDO:0008812",
"MONDO:0009192",
"MONDO:0009419",
"MONDO:0009517",
"MONDO:0009575",
"MONDO:0009874",
"MONDO:0010026",
"MONDO:0010773",
"MONDO:0010785",
"MONDO:0010802",
"MONDO:0012520",
"MONDO:0012819",
"MONDO:0013225",
"MONDO:0013478",
"MONDO:0014497",
"MONDO:0014523",
"MONDO:0015308",
"MONDO:0015967",
"MONDO:0016391",
"MONDO:0016464",
"MONDO:0017230",
"MONDO:0018320",
"MONDO:0018573",
"MONDO:0018575",
"MONDO:0018911",
"MONDO:0019017",
"MONDO:0019193"],
      subject: [],
      object: [],
      predicates:[],
      ARAXquery: {
        "message": {
          "query_graph": {
            "edges": {
              "e00": {
                "constraints": [],
                "object": "n01",
                "subject": "n00"
              }
            },
            "nodes": {
              "n00": {
                "constraints": [],
                "is_set": false
              },
              "n01": {
                "constraints": [],
                "is_set": false
              }
            }
          }
        },
        "submitter": "UI Dev ABC",
        "stream_progress": true,
        "query_options": {
          "kp_timeout": "30",
          "prune_threshold": "50"
        }
      },

      // testjson: testjson,
      error: "",
      text: "",
      mediget: {},
      nodes: [],
      edges: [],
      // subject: "chemical",
      // predicate: "UMLS:C0004096",
      // concept_search: "covid",
      concept_search: "diabetes",
      // HGNC:6884"
      // "HGNC:2625"
      // object: "HGNC:6884",
      concept_data: {},
      //concept table
      selectMode: "multi",
      currentPage: 1,
      perPage: 10,
      totalRows: 1,
      concepts_table: [],

      selected: [],
      shownItems: [],
      select_concepts: [],
      matchTermFields: [
        {
          key: "selected",
          label: "Select",
          thStyle: { "max-width": "50px" },
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
        {
          key: "curie",
          label: "Curie",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
        {
          key: "categories",
          label: "Categories",
          sortable: true,
          thStyle: { "max-width": "50px" },
        }
  
      ],
      countFields: [
                {
          key: "category",
          label: "Category",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
        {
          key: "count",
          label: "Count",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
      ],
      conceptFields: [
        {
          key: "selected",
          label: "Select",
          thStyle: { "max-width": "50px" },
        },
        {
          key: "name",
          label: "Name",
          sortable: true,
          thStyle: { "max-width": "100px" },
        },
        {
          key: "category",
          label: "Category test",
          sortable: true,
          thClass: "id_colwidth",
        },
        {
          key: "id",
          label: "ID",
          sortable: true,
          thClass: "id_colwidth",
        },
        {
          key: "db",
          label: "Database",
          sortable: true,
        },
      ],
      selectedFields: [
        {
          key: "name",
          label: "Name",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
        {
          key: "curie",
          label: "Curie",
          sortable: true,
          thStyle: { "max-width": "50px" },
        },
        {
          key: "categories",
          label: "Categories",
          sortable: true,
          thStyle: { "max-width": "50px" },
        }
      ],
 
      queryResults: [],
    
      query_fields: [
        {
          key: "subject_name",
          label: "Subject",
          sortable: true,
          tdClass: "colwidth",
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
        {
          key: "rxnorm",
          label: "RxN",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "drugbank",
          label: "DB",
          sortable: true,
          tdClass: "db_colwidth",
        },
        {
          key: "chembl",
          label: "CHEMBL",
          sortable: true,
          tdClass: "db_colwidth",
        },
      ],
      resultsFields: [
        {
          key: "subjectName",
          label: "Subject",
          thStyle: { "max-width": "50px" }
        },
        {
          key: "predicate",
          label: "Predicate",
          sortable: true,
          thStyle: { "max-width": "100px" }
        },
        {
          key: "objectName",
          label: "Object",
          sortable: true,
        }

      ],
      drugs_selected: [],

      synonyms_returned: [],
      synonyms_info: [],
      synonym_drugs: [],
      drugStartTime: "",
      drugEndTime: "",
      synonym_tabledata: [],
      filter: null,
      filterOn: [],
      araxSynonyms_equivalentids: [],
      araxSynonyms_nodes: [],
      synonyms: [],
      araxSynonyms_nodes_list: [],
      allSynonyms: [],
      preCountTable: [],
      catCountTable: [],
      tree: {test: "test tree"},
      componentKey: 0,
      dbTable: [],
      searchResults1:term1Results,
      searchResults2:term2Results,
      termNumber: 1,
      searchResults:[],
      overlapCuries: [],
      // overlapCuriesFields:{

      // }
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
    },

    async setSubjectExample(){
      // this.subject = []
      this.termNumber = 1
      console.log("this.subject_default")
      console.log(this.subject_default)
      for (let i = 0; i < this.subject_default.length; i++) {
        let curie = this.subject_default[i]
        this.subject.push(curie)
        console.log(curie) 
        if(i == this.subject_default.length - 1){
          console.log("RUNNING TERM1 SEARCH")
          delete this.ARAXquery.message.query_graph.nodes.n01.ids
          this.ARAXquery.message.query_graph.nodes.n00.ids = this.subject
          this.getARAX_sbuject_object()
        }  
      }

    },
    async setSubject(){
      this.subject = []
      this.termNumber = 1
      console.log("this.selectedRows")
      console.log(this.selectedRows)
      for (let i = 0; i < this.selectedRows.length; i++) {
        let curie = this.selectedRows[i].curie
        this.subject.push(curie)
        console.log(curie) 
        if(i == this.selectedRows.length - 1){
          console.log("RUNNING TERM1 SEARCH")
          delete this.ARAXquery.message.query_graph.nodes.n01.ids
          this.ARAXquery.message.query_graph.nodes.n00.ids = this.subject
          this.getARAX_sbuject_object()
        }  
      }

    },
    async setObject(){
      this.object = []
      this.termNumber = 2
      for (let i = 0; i < this.selectedRows.length; i++) {
        let curie = this.selectedRows[i].curie
        this.object.push(curie)
        console.log(curie)  
        if(i == this.selectedRows.length - 1){
          delete this.ARAXquery.message.query_graph.nodes.n00.ids
          this.ARAXquery.message.query_graph.nodes.n01.ids = this.object
          this.getARAX_sbuject_object()
        }        
      }
    },
    selectAll(){
      this.predicateSelected = this.matchingPredicate
      this.predicates = this.predicateSelected
    },

    async getConcept_service() {
      console.log("********* getconcept");
      this.concepts_table = [];
      this.select_concepts = [];
      this.queryResults = [];
      this.selected = [];
      this.shownItems = [];
      this.drugs_selected = [];
      this.totalRows = 1;
      this.filter = null;
  
      try {
        NodeFinderService.textMatch(this.concept_search)
        .then(async (data) => {
          this.concept_data = data
          console.log("this.concept_data");
          console.log(this.concept_data);
          let matchKeys = Object.keys(this.concept_data);

          // SET TOTAL ROWS FOR PAGINATION CALCULATION
          this.totalRows = matchKeys.length

          for (let i = 0; i < matchKeys.length; i++) {
            let curie = matchKeys[i];
            let match = this.concept_data[curie]
            console.log("match")
            console.log(match)
            let matchObject = {"selected": false, "curie": curie, "name": this.concept_data[curie][0], "alternateName(s)": this.concept_data[curie], "categories" : "" }
            this.concepts_table.push(matchObject)

            if(i == matchKeys.length - 1){
              console.log("this.concepts_table")
              console.log(this.concepts_table)              
              return
            }
            
          }
        })
        .then(async () => {

          if(this.getCategories == true){
            for (let i = 0; i < this.concepts_table.length; i++) {
              let curie = this.concepts_table[i].curie
              this.concepts_table[i].curieInfo = await NodeFinderService.getARAXSynonyms(curie)
              try {
                let keys = Object.keys(this.concepts_table[i].curieInfo[curie].categories)
                this.concepts_table[i].category = keys[0]
                this.concepts_table[i].categories = keys[0] + " (of " + keys.length + ")"

              }
              catch (err){
                this.concepts_table[i].categories = "None found"
                this.concepts_table[i].category = "None found"
                console.log(err)
              }
              this.componentKey++
              if(i == this.concepts_table.length){
                return
              }
              
              
            }            
          } else {
            return
          }

        })
        .then(async () => {
          console.log("this.concepts_table")
          console.log(this.concepts_table)
          this.componentKey++
          this.dbCount()
        })

      } catch (err) {
        this.error = err;
      }
    },
    dbCount () {
      console.log("start dbCount");
      let dbs = [];
      let dbTable = this.dbTable

      let countTable = this.concepts_table;

      for (let index = 0; index < countTable.length; index++) {
        const el = countTable[index];

        let db = el.category;
        // console.log("~~~~~~ DBCOUNT ", db)

        // COUNT EACH DATABASE OCCURANCE
        if (dbs.indexOf(db) == -1) {
          dbs.push(db);
          dbTable.push({ Category: db, Count: 1 });
        } else {
          for (let index = 0; index < dbTable.length; index++) {
            const element = dbTable[index];
            if (element.Category == db) {
              dbTable[index].Count++;
            }
          }
        }
      }
      
    },

    async getARAX_sbuject_object() {
      // predicateSelected
      this.searchResults = []
      // SET PREDICATES BEFORE RUNNING QUERY
      // if(this.predicateSelected.length > 0){
      // this.ARAXquery.message.query_graph.edges.e00.predicates = this.predicateSelected

      // return new Promise(async (resolve, reject) => { // eslint-disable-line

      try{
          ARAXService.araxQuery(this.ARAXquery)
          .then(async (ARAXQueryData)=> {
            // console.log("ARAXQueryData")
            // console.log(ARAXQueryData)
          
            let ARAXResultsArray = ARAXQueryData.split("\n")

            let ARAXResults = ARAXResultsArray[ARAXResultsArray.length - 2]
            let ARAXResultsJSON = JSON.parse(ARAXResults)

            let cleanedResults = await TrapiResultClean.ARAXResultClean(ARAXResultsJSON);
            // console.log("cleanedResults")
            // console.log(cleanedResults)
            return cleanedResults
          })
          .then(async(cleanedResults)=>{
            // GET SUBJECT CATEGORY AND DESCRIPTION
            for (let i = 0; i < cleanedResults.length; i++) {
              // let result = cleanedResults[i];
              
              let subjectAtt = cleanedResults[i].subjectAtt
              cleanedResults[i].subjectDes = ""
              for (let n = 0; n < subjectAtt.length; n++) {
                let subAtt = subjectAtt[n];
                if(subAtt.attribute_type_id == "biolink:category"){
                  cleanedResults[i].subjectCats = subAtt.value
                  cleanedResults[i].subjectCat = subAtt.value[0]
                }
                if(subAtt.attribute_type_id == "biolink:description"){
                  cleanedResults[i].subjectDes = subAtt.value
                }   
                if(n == subjectAtt.length - 1 && i == cleanedResults.length - 1){
                  return cleanedResults
                }
              }          
            }
          })
          .then(async(cleanedResults)=>{
            // GET OBJECT CATEGORY AND DESCRIPTION
            for (let i = 0; i < cleanedResults.length; i++) {
              
              let objectAtt = cleanedResults[i].objectAtt
              cleanedResults[i].objectDes = ""
              for (let n = 0; n < objectAtt.length; n++) {
                let objAtt = objectAtt[n];
                if(objAtt.attribute_type_id == "biolink:category"){
                  cleanedResults[i].objectCats = objAtt.value
                  cleanedResults[i].objectCat = objAtt.value[0]
                }
                if(objAtt.attribute_type_id == "biolink:description"){
                  cleanedResults[i].objectDes = objAtt.value
                }   
                if(n == objectAtt.length - 1 && i == cleanedResults.length - 1){
                  return cleanedResults
                }
              }

              
            }

          })
          .then(async(cleanedResults)=>{
            console.log("DONE - cleanedResults FROM ARAX")
            console.log(cleanedResults)
            if(this.termNumber == 1){
              this.searchResults1 = cleanedResults
              // resolve()
            }
            else if(this.termNumber == 2){
              this.searchResults2 = cleanedResults
              // resolve()
            }
            // else{
            //   resolve()
            // }
          })

      } catch (err) {
        console.log(err)
        // reject(err)
      }
    // })
},
    findLinksTwo(){
      // let term1ResultCuries = []
      // let term2ResultCuries = []
      let matches = []
      console.log(this.searchResults1.length)
      console.log(this.searchResults2.length)
      // for (let i = 0; i < 10; i++) {
      for (let i = 0; i < this.searchResults1.length; i++) {
        let triple1 = this.searchResults1[i];
        // console.log("i = ", i)
        for (let n = 0; n < this.searchResults2.length; n++) {
        // for (let n = 0; n < 10; n++) {
          
          let match = {}
          let triple2 = this.searchResults2[n];
            console.log(triple2.subject == triple1.object)

          if(triple2.subject == triple1.object){
        
            // match.subject1 = triple1.subject
            // match.object1 = triple1.object
            // match.subject2 = triple2.subject
            // match.object2 = triple2.object
            console.log(triple1.subjectName)
            console.log("triple1")
            console.log(triple1)
            console.log("triple2")
            console.log(triple2)
            match.subject1Name = triple1.subjectName
            match.predicate1 = triple1.predicate
            match.object1Name = triple1.objectName
            match.subject2Name = triple2.subjectName
            match.predicate2 = triple2.predicate
            match.object2Name= triple2.objectName
            matches.push(match)
            // console.log(match)
            if( i == this.searchResults1.length - 1 && n == this.searchResults2.length - 1){
            // if( i < 9 && n < 9){
              console.log("ALL matches")
              console.log(matches)
              this.overlapCuries = matches
            }
          }
            if( i == this.searchResults1.length - 1 && n == this.searchResults2.length - 1){
            // if( i < 9 && n < 9){
              console.log("ALL matches")
              console.log(matches)
              this.overlapCuries = matches
            }

          
        }
        
      }

    },
    findLinksThree(){
      function onlyUnique(value, index, self) {
        return self.indexOf(value) === index;
      }

      // let term1ResultCuries = []
      // let term2ResultCuries = []  

      let term1Subjects =  this.searchResults1.map(x => x.subject)  
      let term1objects =  this.searchResults1.map(x => x.object)  
      console.log(term1Subjects.length)
      console.log(term1objects.length)
      let term1Curies = term1Subjects.concat(term1objects)
      console.log(term1Curies)
      let term1CuriesUnique = term1Curies.filter(onlyUnique)
      console.log("term1CuriesUnique")
      console.log(term1CuriesUnique)

      let term2Subjects =  this.searchResults2.map(x => x.subject)  
      let term2objects =  this.searchResults2.map(x => x.object)  
      console.log(term2Subjects.length)
      console.log(term2objects.length)
      let term2Curies = term2Subjects.concat(term2objects)
      console.log(term2Curies)
      let term2CuriesUnique = term2Curies.filter(onlyUnique)
      console.log("term2CuriesUnique")
      console.log(term2CuriesUnique)

      let overlap = term2CuriesUnique.filter(x => term1CuriesUnique.indexOf(x) !== -1)
      // let overlap21_sub_sub = term2Subjects.filter(x => term1Subjects.indexOf(x) !== -1)
      // let overlap21_sub_obj = term2Subjects.filter(x => term1objects.indexOf(x) !== -1)
      // let overlap21_obj_sub = term2objects.filter(x => term1Subjects.indexOf(x) !== -1)
      // let overlap21_obj_obj = term2objects.filter(x => term1objects.indexOf(x) !== -1)
      // console.log("overlap21_sub_sub")
      // console.log(overlap21_sub_sub)
      // console.log("overlap21_sub_obj")
      // console.log(overlap21_sub_obj)
      // console.log("overlap21_obj_sub")
      // console.log(overlap21_obj_sub)
      // console.log("overlap21_obj_obj")
      // console.log(overlap21_obj_obj)
      // let overlap = term2CuriesUnique.filter(x => term1CuriesUnique.indexOf(x) !== -1)
      // let overlap = term2CuriesUnique.filter(x => term1CuriesUnique.indexOf(x) !== -1)
      
      console.log("overlap")
      console.log(overlap)
      // let term1match = this.searchResults1.filter(x => (x.subject == "MONDO:0005090" || x.object == "MONDO:0008062"))
      // let term2match = this.searchResults2.filter(x => (x.subject == "MONDO:0005090" || x.object == "MONDO:0008062"))
      // console.log("term1match")
      // console.log(term1match)
      // console.log("term2match")
      // console.log(term2match)

      let matchResults1 = this.searchResults1.filter(x => overlap.indexOf(x.subject) !== -1 || overlap.indexOf(x.object) !== -1)
      let matchResults2 = this.searchResults2.filter(x => overlap.indexOf(x.subject) !== -1 || overlap.indexOf(x.object) !== -1)
      console.log("matchResults1")
      console.log(matchResults1)
      console.log("matchResults2")
      console.log(matchResults2)

// "MONDO:0005090" "MONDO:0008062"
    // var filteredArray = term1CuriesUnique.filter(function(n) {
    //   return term2CuriesUnique.indexOf(n) !== -1;
    // });
    // console.log("filteredArray")
    // console.log(filteredArray)


    },

    findLinks(){
      let term1ResultCuries = []
      let term2ResultCuries = []
      console.log(this.searchResults1.length)
      console.log(this.searchResults2.length)
      for (let i = 0; i < this.searchResults1.length; i++) {
        const triple1 = this.searchResults1[i];
        term1ResultCuries.push(triple1.subject)
        term1ResultCuries.push(triple1.object)
        console.log(i)
        console.log(triple1.subject)
        console.log(triple1.object)
        if(i == this.searchResults1.length - 1){
          console.log("term1ResultCuries - DONE")
          // console.log(term1ResultCuries)
          for (let n = 0; n < this.searchResults2.length; n++) {
            const triple2 = this.searchResults2[n];
            term2ResultCuries.push(triple2.subject)
            term2ResultCuries.push(triple2.object)
            console.log(n)
            console.log(triple1.subject)
            console.log(triple1.object)

            if(n == this.searchResults2.length - 1){
              console.log("term2ResultCuries")
              console.log(term2ResultCuries)              
              this.overlapCuries = term1ResultCuries.filter(curie => term2ResultCuries.includes(curie))
              // this.overlapCuries = term1ResultCuries.filter(curie => term2ResultCuries.includes(curie))
              console.log("this.overlapCuries")
              console.log(this.overlapCuries)
              console.log(this.overlapCuries.length)
              // console.log(this.searchResults2.length)
            }

          }
        }

        
      }

    },
    getOverlapTriples(){
      let matches = []
      console.log("this.searchResults1")
      console.log(this.searchResults1)
      console.log("this.searchResults2")
      console.log(this.searchResults2)
      console.log(this.searchResults1.length)
      console.log(this.searchResults2.length)
      // this.overlapCuries
      // let matches = []
      for (let i = 0; i < this.searchResults1.length; i++) {
        const res1 = this.searchResults1[i];
        for (let n = 0; n < this.searchResults2.length; n++) {
          const res2 = this.searchResults2[n];
          let match = {}
          this.componentKey++
          let test = (res1.subject ==res2.subject || res1.subject == res2.Object || res1.Object == res2.subject || res1.Object == res2.object)
          console.log(test)
          if(res1.subject ==res2.subject || res1.subject == res2.Object || res1.Object == res2.subject || res1.Object == res2.object){
            match.subject1Name = res1.subjectName
            match.object1Name = res1.objectName
            match.subject2Name = res2.subjectName
            match.object2Name= res2.objectName
            this.overlapCuries.push(match)
            matches.push(match)
            this.componentKey++
            if(n == this.searchResults2.length - 1 && i == this.searchResults1.length - 1){
              this.overlapCuries = matches
            }

          }
            if(n == this.searchResults2.length - 1 && i == this.searchResults1.length - 1){
              this.overlapCuries = matches
            }
          
        }
        
      }


    },
  
    myRowClickHandler(item) {
      // this.select_concepts = this.concepts_table.filter(row => row.selected == true)
      console.log("myRowClickHandler");
      console.log("itemClicked = ", item)
      for (var i = 0; i < this.concepts_table.length; i++) {
        if (this.concepts_table[i].curie === item.curie) {
          // console.log(item);
          // this.select_concepts.push(item);
          this.concepts_table[i].selected = !this.concepts_table[i].selected;
        }
      }
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // console.log(item); // This will be the item data for the row
    },

    selectAllRows() {
      for (var i = 0; i < this.concepts_table.length; i++) {
        this.concepts_table[i].selected = true;
        // }
      }
    },
    clearSelected() {
      for (var i = 0; i < this.concepts_table.length; i++) {
        this.concepts_table[i].selected = false;
        // }
      }
    },
    drugClickHandler(item) {
      console.log("item");
      console.log(item);
      for (var i = 0; i < this.queryResults.length; i++) {
        console.log("this.queryResults[i]");

        console.log(this.queryResults[i].index);
        console.log(this.queryResults[i]);
        if (this.queryResults[i].index === item.index) {
          this.drugs_selected.push(this.queryResults[i]);
          this.queryResults.splice(i, 1);
          console.log("this.queryResults[i]");
          console.log(this.queryResults[i]);
        }
      }
      // 'record' will be the row data from items
      // `index` will be the visible row number (available in the v-model 'shownItems')
      // console.log(item); // This will be the item data for the row
    },
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
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    increment() {
      this.$store.commit("increment");
      console.log(this.$store.state.count);
    },
    // ...mapActions(["fetchUserData"]),
  },
  computed: {
    totalRows1: function(){
      return this.searchResults1.length
    },
    // ...mapGetters(["getuserdata"]),
    matchingPredicate: function (){
      // console.log("matchingPredicate")
      if(this.predicateText.length > 0){
        return this.predicateList.predicates.filter(predicate => predicate.indexOf(this.predicateText)>0)
        
      } else {
        return this.predicateList.predicates
      }
    },
    selectedRows: function () {
      // const rebels = pilots.filter(pilot => pilot.faction === "Rebels");

      let selectedRows = this.concepts_table.filter(
        (row) => row.selected == true
      );
      // console.log("selectedRows");
      // console.log(selectedRows);
      // return this.concepts_table.filter(row => row.selected == true)
      // for (let index = 0; index < this.concepts_table.length; index++) {
      //   if (this.concepts_table[index].selected) {
      //     selectedRows.Push()
      //   }
      //   const element = this.concepts_table[index];
      //   console.log(element)

      // }

      return selectedRows;
    },
    curieCount: function () {
      if(this.concepts_table.length > 0){
          console.log("start curieCount");
          let ids = [];
          let idTable = [];

          let countTable = this.concepts_table;

          for (let index = 0; index < countTable.length; index++) {
            const el = countTable[index];

            let id = el.curie.split(":")[0];
            // COUNT EACH TYPE OF CURIE
            if (ids.indexOf(id) == -1) {
              ids.push(id);
              idTable.push({ idName: id, idcount: 1 });
            } else {
              for (let index = 0; index < idTable.length; index++) {
                const element = idTable[index];
                if (element.idName == id) {
                  idTable[index].idcount++;
                }
              }
            }
          }
          return idTable;
          }
          else {
            return []
          }
      
    },

    predicateCount: function () {

      if(this.searchResults.length > 0){
          console.log("start curieCount");
          let ids = [];
          let idTable = [];

          let countTable = this.searchResults;

          for (let index = 0; index < countTable.length; index++) {
            const el = countTable[index];

            let id = el.predicate.split(":")[1];
            // COUNT EACH TYPE OF CURIE
            if (ids.indexOf(id) == -1) {
              ids.push(id);
              idTable.push({ idName: id, idcount: 1 });
            } else {
              for (let index = 0; index < idTable.length; index++) {
                const element = idTable[index];
                if (element.idName == id) {
                  idTable[index].idcount++;
                }
              }
            }
          }
          return idTable;
          }
          else {
            return []
          }
      
    }
 
  },


};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
.bulletFont{
 font-size:smaller;
}
#vizTreeII circle {
  fill: #fff;
  stroke: #99cc00;
  stroke-width: 3px;
}
#vizTreeII .node text {
  font: 12px sans-serif;
}
#vizTreeII .link {
  fill: none;
  stroke: #ccc;
  stroke-width: 2px;
}
.vert-text-btn {
  display: block;
  transform: rotate(90deg);
  margin: 50px;

  border-width: 5px;
}
</style>
