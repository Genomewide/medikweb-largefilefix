<template>
  <div class="container" style="padding-bottom: 20px">
    <h1>TRAPI MEDIK CONCEPT TEXT MATCHER</h1>
    <div>
      <b-card no-body style="padding-bottom: 20px" :key="componentKey">
        <b-tabs card>
          <b-tab title="Find Objects related to genes" active>
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
              <!-- <hr />
              <h2>this.componentKey = {{this.componentKey}}</h2>  -->

                <!-- <b-table
                  bordered
                  striped
                  hover
                  selectable
                  ref="synonymTable"
                  responsive="true"
                  table-layout:
                  fixed
        
                  :items="synonyms"
            
                >
            
                </b-table>

              <hr />
              <h2>araxsynonymTable equivalent identifiers n = {{araxSynonyms_equivalentids.length}}</h2> 
                <b-table
                  bordered
                  striped
                  hover
                  selectable
                  ref="araxsynonymTableEqIDs"
                  responsive="true"
                  table-layout:
                  fixed
                  :items="araxSynonyms_equivalentids"
            
                >
            
                </b-table>

              <hr />
              <h2>araxsynonymTable nodes n = {{araxSynonyms_nodes.length}}</h2> 
                <b-table
                  bordered
                  striped
                  hover
                  selectable
                  ref="araxsynonymTableNodes"
                  responsive="true"
                  table-layout:
                  fixed
        
                  :items="araxSynonyms_nodes"
            
                >
            
                </b-table>
                {{tree}} -->
            
            </b-card-text>
          </b-tab>
          <b-tab title="Selected Terms" >

              <b-row style="padding-bottom:20px">
                <b-button 
                  style="margin-left: 10px"
                  variant="warning"
                  v-on:click="setSubject"
                  >Set as Subject</b-button
                > 
                <b-button 
                  style="margin-left: 10px"
                  variant="success"
                  v-on:click="setObject"
                  >Set as Object</b-button
                > 
                <div>
                  
                <!-- <b-button 
                  style="margin-left: 10px"
                  variant="primary"
                  v-on:click="increasePredicates"
                  >increasePredicates</b-button
                >  -->
                  <b-button v-b-modal.modal-lg>Select from Predicate Tree</b-button>

                  <b-modal id="modal-lg" size="lg" title="predicateTree">
                    <p class="my-4">Select Predicates</p>
                    <div>
                        <b-form-input v-model="predicateText" placeholder="Enter your name"></b-form-input>
                            <b-input-group-append>
                              <b-button variant="info" v-on:click="selectAll">Select All</b-button>
                            </b-input-group-append>
                        <div class="mt-2">Value: {{ predicateText }} - {{predicateText.length}}</div>
                        <!-- <div>{{matchingPredicate}}</div> -->
                        <b-form-group 
                      label="Individual stacked checkboxes (default)"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox
                        v-for="predicate in matchingPredicate"
                        v-model="predicateSelected"
                        :key="predicate"
                        :value="predicate"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-3a"
                      >
                        {{ predicate }}
                      </b-form-checkbox>
                    </b-form-group>
                    </div>
                    <!-- {{predicateTree}} -->
                    <b-form-group
                      label="Individual stacked checkboxes (default)"
                      v-slot="{ ariaDescribedby }"
                    >
                      <b-form-checkbox
                        v-for="branch in predicateTree"
                        v-model="predicateSelected"
                        :key="branch.name"
                        :value="branch.name"
                        :aria-describedby="ariaDescribedby"
                        name="flavour-3a"
                      >
                        {{ branch.name }}
                        
                          
                          <b-form-checkbox
                            v-for="branchchild in branch.children"
                            v-model="predicateSelected"
                            :key="branchchild.name"
                            :value="branchchild.name"
                            :aria-describedby="ariaDescribedby"
                            name="flavour-3b"
                          >
                            {{ branchchild.name }}
                                <b-form-checkbox
                                  v-for="branchchild in branchchild.children"
                                  v-model="predicateSelected"
                                  :key="branchchild.name"
                                  :value="branchchild.name"
                                  :aria-describedby="ariaDescribedby"
                                  name="flavour-3b"
                                >
                                  {{ branchchild.name }}

                                    <b-form-checkbox
                                      v-for="branchchild in branchchild.children"
                                      v-model="predicateSelected"
                                      :key="branchchild.name"
                                      :value="branchchild.name"
                                      :aria-describedby="ariaDescribedby"
                                      name="flavour-3b"
                                    >
                                      {{ branchchild.name }}

                                    <b-form-checkbox
                                      v-for="branchchild in branchchild.children"
                                      v-model="predicateSelected"
                                      :key="branchchild.name"
                                      :value="branchchild.name"
                                      :aria-describedby="ariaDescribedby"
                                      name="flavour-3b"
                                    >
                                      {{ branchchild.name }}
                                                              
                                    </b-form-checkbox> 
                                    </b-form-checkbox> 

                                </b-form-checkbox>                          </b-form-checkbox>
                      </b-form-checkbox>
                    </b-form-group>
                    {{predicateSelected}}
     <!-- <b-form-checkbox-group >
                      <b-form-checkbox
                        v-for="branch in options"
                        :key="branch.name"
                        :value="branch.name"
                        :class="options.class"
                        v-bind="option.attrs"
                      >{{ option.text }}</b-form-checkbox>
                    </b-form-checkbox-group> -->
                  </b-modal>
                </div>
                <b-button 
                  style="margin-left: 10px"
                  variant="secondary"
                  v-on:click="getARAX"
                  >getARAX</b-button
                > 
                </b-row>
                <b-row style="margin-top:20px; min-height:200px">
                    <b-card-group deck style="width:100%">
                      <b-card >
                          <template #header>
                            <h3 class="mb-0">Subject(s)</h3>
                          </template>
                        <b-card-text>
                          <li class="bulletFont" v-for="(item, index) in subject" :key="`item-${index}`">
                              {{ item }}
                          </li>
                        </b-card-text>
                      </b-card>
                      <b-card >
                        <template #header>
                            <h3 class="mb-0">Predicate(s)</h3>
                          </template>
                        <b-card-text >
                          <li class="bulletFont" v-for="(item, index) in predicateSelected" :key="`item-${index}`">
                              {{ item }}
                          </li>
                        </b-card-text>

                      </b-card>
                      <b-card>
                        <template #header>
                            <h3 class="mb-0">Objects(s)</h3>
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
                  <!-- resultsFields -->

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

                <!-- <b-card title="Count of Categories">
                
                  <b-card-text>
                    <b-table :items="dbTable"> </b-table>
                  </b-card-text>
                </b-card> -->
              </b-card-group>
            </div>
          </b-tab>
                    <b-tab title="All edges 2 hop">
              <hr />
              <div>
                <!-- <b-button v-b-toggle.collapse-1 variant="primary" 
                  >Review Selected</b-button
                > -->
                <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card title="catCountTable">
                  <!-- {{ concepts_table }} -->
                  <!-- selectable table =  {{$refs.selectableTable}} -->
                  <b-table
                    bordered
                    striped
                    hover
                    ref="subCountTable"
                    table-layout:
                    fixed
                    :sticky-header="true"
                    :items="catCountTable"
                    :fields="countFields"
                  >
                  </b-table>
                </b-card>
                <!-- </b-collapse> -->
              </div>
              <div>
                <!-- <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                > -->
                <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card title="catCountTable">
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
import PostService from "../PostService";
import synonymService from "../synonymService";
import TrapiResultClean from "../TrapiResultClean";
var parser = require("fast-xml-parser");
import axios from "axios";

import NodeFinderService from "../NodeFinderService";
import predicateTree from "../assets/predicateTree.json"
import predicateList from "../assets/predicateList.json"
import ARAXService from "../ARAXService";

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
      searchResults:[]
    };
  },
  methods: {
    onSubmit(event) {
      event.preventDefault();
      // alert(JSON.stringify(this.form))
    },
    async getAllEdges (){
      // this.tree = testjson

      let queryForward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n1","object": "n2"}}}}}
      let queryBackward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n2","object": "n1"}}}}}
      // let edges = {}
      // let nodes = {}

      synonymService.allSynonyms(this.concept_search)
      .then(async (synonymData) => {
        // console.log(synonymData)
        this.allSynonyms = synonymData.synonymIdArray
        let allResults = []
        // let allResultsForward = []
        // let allResultsBackward = []
        
        for (let i = 0; i < this.allSynonyms.length; i++) {
          const synonym = this.allSynonyms[i];
          console.log("SYNONYM TO GET DRUG RESULTS = ", synonym)

          // GET RESULTS - CURRIE AS OBJECT let allResults

          queryForward.message.query_graph.nodes.n2.id = synonym
          let queryResults = await PostService.query_raw(queryForward)
          // console.log({queryResults})

          let cleanedResultsForward = await TrapiResultClean.TrapiResultClean(queryResults);
          // console.log("index for synonym = ", i)
          // console.log("length = ", cleanedResultsForward.length) // allResults
          // allResultsForward = allResultsForward.concat(cleanedResultsForward)
          allResults = allResults.concat(cleanedResultsForward)

          // GET RESULTS - CURRIE AS SUBJECT

          queryBackward.message.query_graph.nodes.n2.id = synonym
          queryResults = await PostService.query_raw(queryBackward)
          // console.log({queryResults})

          let cleanedResultsBackward = await TrapiResultClean.TrapiResultClean(queryResults);
          // console.log("index for synonym = ", i)
          // console.log("length = ", cleanedResultsBackward.length)
          // allResultsBackward = allResultsBackward.concat(cleanedResultsBackward) 
          allResults = allResults.concat(cleanedResultsBackward) 
          
          if(i == this.allSynonyms.length - 1){
            // let allResults = {"allResultsBackward": allResultsBackward, "allResultsForward": allResultsForward}
            return allResults
          }
        }
      })
      .then((allResults) => {
        console.log("finished! => ", allResults)
        let uniquePredArray = []
        let predCount = {}
        let uniqueCatArray = []
        let catCount = {}
        // console.log("allResults length = ", allResults.length)

        for (let i = 0; i < allResults.length; i++) {
          const result = allResults[i];
          // console.log(i)
          // let catFilter = {}

          if(this.allSynonyms.indexOf(result.subject) > -1){
            allResults[i].hitType = "subject"
            if(uniqueCatArray.indexOf(result.objectCat) == -1){
              uniqueCatArray.push(result.objectCat)
              catCount[result.objectCat] = { "category": result.objectCat, "count": 1}
            } else {
              catCount[result.objectCat].count ++
            }

          } else {
            allResults[i].hitType = "object"
            let obCat = result.objectCat
            if(uniqueCatArray.indexOf(result.objectCat) == -1){
              
              uniqueCatArray.push(result.subjectCat)
              catCount[result.subjectCat] = { "category": result.subjectCat, "count": 1}
            } else {
              // console.log(catCount)
              // console.log(uniqueCatArray)
              // console.log(catCount[obCat])
              // console.log(catCount[result.subjectCat][count])
              catCount[obCat].count ++
            }            
          }
          if(uniquePredArray.indexOf(result.predicate) == -1){
              uniquePredArray.push(result.predicate)
              predCount[result.predicate] = { "category": result.predicate, "count": 1}
            } else {
              predCount[result.predicate].count ++
            }

          if(i == allResults.length -1){
            console.log(predCount)
            console.log(catCount)
            this.preCountTable = Object.values(predCount)
            this.catCountTable = Object.values(catCount)
            console.log(this.preCountTable)
            return allResults

          }
          
        }

      })
      .then(async (allResults)=> {
        let groupedRes = await TrapiResultClean.TrapiResultGroup(allResults, "hitType")
        console.log(groupedRes)
        let subjectRes = groupedRes.subject
        // let objectRes = groupedRes.object
        let catGroupArray = [
          {group: "gene", tag: "gene"}, 
          {group: "thing", tag: "thing"},
          {group: "process", tag: "process"},
          {group: "phenotyp", tag: "disease"},
          {group: "anatomic", tag: "anatomic"},
          {group: "cell", tag: "cell"},
          {group: "organism", tag: "gene"},
          {group: "molecularactivity", tag: "molecularactivity"},
          {group: "molecularentity", tag: "molecularentity"},
          {group: "biological", tag: "biological"},
          {group: "information", tag: "information"},
          {group: "disease", tag: "disease"},
          {group: "genomic", tag: "gene"},
          {group: "protein", tag: "gene"},
          {group: "chem", tag: "chem"},
          {group: "sequen", tag: "seqFeature"},
          {group: "all", tag: "all"},
          {group: "public", tag: "publication"}
       
        ]        
        
        // "thing", "process" ,"phenotyp" , "anatomic"  , "cell", "organism",  "molecularactivity", "molecularentity", "biological,", "chem", "information", "path"]

        for (let i = 0; i < subjectRes.length; i++) {
          const res = subjectRes[i]
          subjectRes[i].objectCatGroup = ""
          // console.log(res)
          let foundit = false
          for (let n = 0; n < catGroupArray.length; n++) {
            const groupinfo = catGroupArray[n];

            if(res.objectCat.toLowerCase().includes(groupinfo.group)){
              // console.log("result had gene in object = ", res)
              subjectRes[i].objectCatGroup = groupinfo.tag
              // n = catGroupArray.length
              foundit = true
            } 
            if(n == catGroupArray.length - 1 && foundit == false){
              subjectRes[i].objectCatGroup = res.objectCat
            }

          }  
          if(i == subjectRes.length - 1){
            groupedRes.subject = subjectRes
            return groupedRes
          }       
        }        

      })
      .then( async(groupedRes)=>{
        let objectRes = groupedRes.object
        // let objectRes = groupedRes.object
        let catGroupArray = [
          {group: "gene", tag: "gene"}, 
          {group: "thing", tag: "thing"},
          {group: "process", tag: "process"},
          {group: "phenotyp", tag: "disease"},
          {group: "anatomic", tag: "anatomic"},
          {group: "cell", tag: "cell"},
          {group: "organism", tag: "gene"},
          {group: "molecularactivity", tag: "molecularactivity"},
          {group: "molecularentity", tag: "molecularentity"},
          {group: "biological", tag: "biological"},
          {group: "information", tag: "information"},
          {group: "disease", tag: "disease"},
          {group: "genomic", tag: "gene"},
          {group: "protein", tag: "gene"},
          {group: "chem", tag: "chem"},
          {group: "sequen", tag: "seqFeature"},
          {group: "all", tag: "all"},
          {group: "public", tag: "publication"}
       
        ]        
        
        // "thing", "process" ,"phenotyp" , "anatomic"  , "cell", "organism",  "molecularactivity", "molecularentity", "biological,", "chem", "information", "path"]

        for (let i = 0; i < objectRes.length; i++) {
          const res = objectRes[i]
          objectRes[i].subjectCatGroup = ""
          // console.log(res)
          let foundit = false
          for (let n = 0; n < catGroupArray.length; n++) {
            const groupinfo = catGroupArray[n];

            if(res.objectCat.toLowerCase().includes(groupinfo.group)){
              // console.log("result had gene in object = ", res)
              objectRes[i].subjectCatGroup = groupinfo.tag
              // n = catGroupArray.length
              foundit = true
            } 
            if(n == catGroupArray.length - 1 && foundit == false){
              objectRes[i].subjectCatGroup = res.objectCat
            }

          }  
          if(i == objectRes.length - 1){
            groupedRes.object = objectRes
            return groupedRes
          }       
        }     
      })
      .then(async(groupedRes)=> {
        let tree = {}



        console.log("start grouping")
        groupedRes.subject = await TrapiResultClean.TrapiResultGroup(groupedRes.subject, "objectCatGroup")
        console.log("finished first grouping")

        groupedRes.object = await TrapiResultClean.TrapiResultGroup(groupedRes.object, "subjectCatGroup")
        console.log("groupedRes")
        console.log(groupedRes)

        let subjects = groupedRes.subject
        let objects = groupedRes.object

        let subKeys = Object.keys(subjects)
        let objKeys = Object.keys(objects)

        tree.name = this.concept_search
        tree.children = []

        let subject = {}
        subject.name = "subject"
        subject.children = []

        let object = {}
        object.name = "object"
        object.children = []

        for (let i = 0; i < subKeys.length; i++) {
          const subKey = subKeys[i];
          let child = {}
          child.name = subKey
          child.children = subjects[subKey]
          subject.children.push(child)
 
          if(i == subKeys.length  -1) {

            for (let n = 0; n < objKeys.length; n++) {
              const objKey = objKeys[n];
              let child = {}
              child.name = objKey
              child.children = subjects[objKey]
              object.children.push(child)

              if(n == objKeys.length - 1){

                console.log(subject)
                console.log(object)
                tree.children.push(subject)
                tree.children.push(object)
                return tree


              }

            }

          }

        }
      })
      .then((tree) => {
        this.tree = tree
        this.componentKey = this.componentKey+=1
        console.log("this.tree")
        console.log(this.tree)
      })

  


    },

    async getSynonyms (){
      this.araxSynonyms = []
      this.synonyms = []
      // let array = []
      // let test = array.filter(value => value == 2)
      // console.log(test)
      synonymService.allSynonyms(this.concept_search)
      .then((results) =>{
        this.synonyms = results.nodeNormalSyn[this.concept_search].equivalent_identifiers
        this.araxSynonyms_equivalentids = results.araxSynonyms_equivalentids
        this.araxSynonyms_nodes = results.araxSynonyms_nodes

        return results.synonymIdArray

      })
      .then(async (synonymIdArray)=> {
        let allDoubleCheckSyn = []
        for (let i = 0; i < synonymIdArray.length; i++) {
          const syn = synonymIdArray[i];

          try {
            let synSynData = await synonymService.allSynonyms(syn)
            if(synSynData == []){
                if(i == synonymIdArray.length - 1){
                  return allDoubleCheckSyn
                } 
                  else {
                    continue
                  }             
            }
              else {
                let newSyns = synSynData.synonymIdArray
                allDoubleCheckSyn = allDoubleCheckSyn.concat(newSyns.filter(value => !allDoubleCheckSyn.includes(value)));
  
                  if(i == synonymIdArray.length - 1){
                    return allDoubleCheckSyn
                  }                
              }

          } 
            catch (err) {
              console.log(err)
                if(i == synonymIdArray.length - 1){
                  return allDoubleCheckSyn
                }
          }
        }
      })
      .then((allDoubleCheckSyn) => {
        console.log({allDoubleCheckSyn})
      })
    },


    async setSubject(){
      for (let i = 0; i < this.selectedRows.length; i++) {
        let curie = this.selectedRows[i].curie
        this.subject.push(curie)
        console.log(curie) 
        if(i == this.selectedRows.length - 1){
          this.ARAXquery.message.query_graph.nodes.n00.ids = this.subject
        }  
      }

    },
    async setObject(){
      for (let i = 0; i < this.selectedRows.length; i++) {
        let curie = this.selectedRows[i].curie
        this.object.push(curie)
        console.log(curie)  
        if(i == this.selectedRows.length - 1){
          this.ARAXquery.message.query_graph.nodes.n01.ids = this.object
        }        
      }
    },
    selectAll(){
      this.predicateSelected = this.matchingPredicate
      this.predicates = this.predicateSelected
    },

//     increasePredicates(){
//       this.predicateSelected = [
//       "biolink:increases_abundance_of",
//       "biolink:increases_activity_of",
//       "biolink:increases_expression_of",
//       "biolink:increases_response_to",
//       "biolink:increases_secretion_of",
//       "biolink:increases_stability_of",
//       "biolink:increases_synthesis_of",
//       "biolink:has_increased_amount",
//       "biolink:increased_amount_of",
//       "biolink:increases_amount_or_activity_of",
//       entity_positively_regulated_by_entity
// entity_positively_regulates_entity
// entity_regulated_by_entity
// positively_regulated_by
// positively_regulates
// process_positively_regulated_by_process
// process_positively_regulates_process
//       ]
//     },
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
      // console.log("NodeFinderService")
      // console.log(NodeFinderService)

      // let i = 0;
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

    async getARAX() {
      // predicateSelected
      this.searchResults = []
      // SET PREDICATES BEFORE RUNNING QUERY
      if(this.predicateSelected.length > 0){
      this.ARAXquery.message.query_graph.edges.e00.predicates = this.predicateSelected

      }
   
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
        this.searchResults = cleanedResults
      })

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
