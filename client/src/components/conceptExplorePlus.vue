<template>
  <div class="container" style="padding-bottom: 20px">
    <h1>TRAPI MEDIK CONCEPT EXPLORER PLUS</h1>
    <div>
      <b-card no-body style="padding-bottom: 20px">
        <b-tabs card>
          <b-tab title="Find Objects related to genes" active>
            <b-card-text>
              <div class="create-post">
                <div>
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
                    <b-button variant="primary" v-on:click="getSynonyms"
                      >getSynonyms</b-button
                    >
                    <b-button 
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="getAllEdges"
                      >getAllEdges</b-button
                    >              
                    <b-button 
                      style="margin-left: 10px"
                      variant="success"
                      v-on:click="testMedik"
                      >testMedik</b-button
                    >   

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
                  :select-mode="selectMode"
                  :current-page="currentPage"
                  :per-page="perPage"
                  :fields="conceptFields"
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
              <hr />
              <h2>Synonym node normalizer n = {{synonyms.length}}</h2> 

                 <b-table
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
                {{tree}}
              <!-- <div>
                <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                >
                <b-collapse id="collapse-1" class="mt-2">
                  <b-card v-if="selectedRows.length > 0">
               
                    <b-table
                      bordered
                      striped
                      hover
                      ref="selectedTable"
                      :sticky-header="true"
                      :fields="selectedFields"
                      :items="selectedRows"
                    >
                    </b-table>
                  </b-card>
                </b-collapse>
              </div> -->
            </b-card-text>
          </b-tab>
          <b-tab title="Selected Terms">
            <b-card-text>
              <hr />
              <div>
                <!-- <b-button v-b-toggle.collapse-1 variant="primary"
                  >Review Selected</b-button
                > -->
                <!-- <b-collapse id="collapse-1" class="mt-2"> -->
                <b-card v-if="selectedRows.length > 0">
                  <!-- {{ concepts_table }} -->
                  <!-- selectable table =  {{$refs.selectableTable}} -->
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
                <!-- </b-collapse> -->
              </div>
            </b-card-text>
          </b-tab>
          <b-tab title="Breakdown">
            <div>
              <b-card-group deck>
                <b-card title="Count of CURIEs">
                  <b-card-text>
                    <b-table :items="curieCount"> </b-table>
                  </b-card-text>
                </b-card>

                <b-card title="Title" header-tag="header" footer-tag="footer">
                  <template #header>
                    <h6 class="mb-0">Count of KGs</h6>
                  </template>
                  <b-card-text>
                    <b-table :items="dbCount"> </b-table>
                  </b-card-text>
                </b-card>
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
            <div class="border border-primary rounded" >
        <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
        <!-- <cytoscape :key="keyCounter" ref="cyto" :config="config" :preConfig="preConfig" :afterCreated="updateGraph"> -->
        <cytoscape
          :key="keyCounter"
          ref="cyto"
          :config="config"
          :preConfig="preConfig"
        >
          <!-- <cytoscape :key="keyCounter" ref="cyto" :config="config"  > -->
          <cy-element
            ref="cy"
            v-for="def in elements"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="deleteNode($event, def, def.data, def.data.id)"
          />
          <!-- <cy-element
          ref="cy"
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def.data.id)"
        /> -->
        </cytoscape>
      </div>
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
// conceptExploreComponent
// import conceptExploreComponent from "./conceptExploreComponent";

// import * as d3 from "d3";

import testjson from "./testjson.json"

import config3 from "./cytoscapeData/CytoConfig";
// import config2 from "./cytoscapeData/CytoConfig2";
// import cytoData from "../assets/diabetesTreatsCleaned.json";
import cytoscape from "cytoscape";
import klay from "cytoscape-klay";

// console.log("config");
// console.log(config);
// const elements = [config.elements];
// delete config.elements;
console.log("config3");
console.log(config3);
const elements = [...config3.elements];
// const modalElements = [...config2.elements];
delete config3.elements;
// delete config2.elements;
// console.log("cytoData");
// console.log(cytoData);

export default {
  name: "ConceptExplorerPlus",
//      components: {
//  conceptExploreComponent
//   },
  // mounted: function () {

  // },
  data() {
    return {
      cytoscape,
      config3,
      elements,
      klay: klay,
      keyCounter: 0,
      testjson: testjson,
      error: "",
      text: "",
      mediget: {},
      nodes: [],
      edges: [],
      subject: "chemical",
      predicate: "UMLS:C0004096",
      concept_search: "HGNC:6884",
      // HGNC:6884"
      // "HGNC:2625"
      object: "HGNC:6884",
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
        },
        {
          key: "category",
          label: "Category",
          sortable: true,
        },
        {
          key: "id",
          label: "ID",
          sortable: true,
        },
        {
          key: "db",
          label: "Database",
          sortable: true,
        },
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
      componentKey: 0
    };
  },
  methods: {

    async testMedik(){
      console.log("testMedik")
      // let nodes = []
      let queryForward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n1","object": "n2"}}}}}
      let queryBackward = {"message": {"query_graph": {"nodes": {"n1": {},"n2": {"id": "HGNC:6884"}},"edges": {"e1": {"subject": "n2","object": "n1"}}}}}
      let queryResultsForward = await PostService.query_raw(queryForward)
      let queryResultsBackward = await PostService.query_raw(queryBackward)
      console.log(queryResultsForward)
      console.log(queryResultsBackward)
      console.log("elements")
      console.log(elements)

      // let cleanedResultsForward = await this.cleanMedikResults(queryResultsForward)
      // console.log("cleanedResultsForward")
      // console.log(cleanedResultsForward)

      // let cleanedResultsBackward = await this.cleanMedikResults(queryResultsBackward)
      // console.log("cleanedResultsBackward")
      // console.log(cleanedResultsBackward)
    
    let forwardNodes = queryResultsForward.message.knowledge_graph.nodes
    console.log("forwardNodes")
    console.log(forwardNodes)

    let forwardCytoNodes = this.getNodesFromTrapi(forwardNodes)
    console.log("forwardCytoNodes")
    console.log(forwardCytoNodes)

    let forwardEdges = queryResultsForward.message.knowledge_graph.edges
    console.log("forwardEdges")
    console.log(forwardEdges)

    let forwardCytoEdges = this.getEdgesFromTrapi(forwardEdges)
    console.log("forwardCytoEdges")
    console.log(forwardCytoEdges)

    let backwardNodes = queryResultsBackward.message.knowledge_graph.nodes
    console.log("backwardNodes")
    console.log(backwardNodes)

    let backwardCytoNodes = this.getNodesFromTrapi(backwardNodes)
    console.log("backwardCytoNodes")
    console.log(backwardCytoNodes)

    let backwardEdges = queryResultsBackward.message.knowledge_graph.edges
    console.log("backwardEdges")
    console.log(backwardEdges)

    let backwardCytoEdges = this.getEdgesFromTrapi(backwardEdges)
    console.log("backwardCytoEdges")
    console.log(backwardCytoEdges)

    // let uniqueNodes = []
    // let uniqueEdges = []

    console.log("GOT THEM ALL")
    this.elements = [elements, ...forwardCytoNodes, ...backwardCytoNodes, ...forwardCytoEdges, ...backwardCytoEdges]



    },
    getNodesFromTrapi(nodes){
      let nodesKeys = Object.keys(nodes)
      let nodesList = []
      for (let i = 0; i < nodesKeys.length; i++){
        const node = nodesKeys[i];
        let nodeInfo = nodes[node]
        // console.log("nodeInfo")
        // console.log(nodeInfo)
        // console.log(nodeInfo.name)
        // console.log(node)
        let cytoNode = {}
        cytoNode.data = {}
        cytoNode.data.id = ""
        cytoNode.data.name = ""
        let fixNodeName = ""

        if(nodeInfo.name == false){
          // console.log("getting name")
          // console.log(nodeInfo.name)
          fixNodeName = node.split(":").join("_")
        } else {
          // console.log("else getting name")
          fixNodeName = nodeInfo.name.split(" ").join("_")
        }

        // let fixNodeName = nodeInfo.name.split(" ").join("_");
        let fixNodeId = node.split(":").join("_");
        let fixNodeGroup = nodeInfo.category.split(":")[1]

        cytoNode.data.name = fixNodeName
        cytoNode.data.id = fixNodeId
        cytoNode.data.category = nodeInfo.category
        cytoNode.group = fixNodeGroup

        nodesList.push(cytoNode)
      }
      return nodesList
    },

    getEdgesFromTrapi(edges){
      let edgesKeys = Object.keys(edges)
      let edgesList = []
    //  {
    //     data: { id: "ca", source: "c", target: "a" },
    //     group: "edges"
    //   }
      for (let i = 0; i < edgesKeys.length; i++){
        const edge = edgesKeys[i];
        let edgeInfo = edges[edge]
        let cytoEdge = {}
        cytoEdge.data = {}
        cytoEdge.data.id = ""
        cytoEdge.data.source = ""
        cytoEdge.data.target = ""
        cytoEdge.data.edgeId = edge
        cytoEdge.group = "edges"

        let source = edgeInfo.subject.split(":").join("_");
        let target = edgeInfo.object.split(":").join("_");
        let edgeId = source & "_" & target


        cytoEdge.data.id = edgeId
        cytoEdge.data.source = source
        cytoEdge.data.target = target

        edgesList.push(cytoEdge)

      }
      return edgesList
    },
    cleanMedikResults(resultsToClean){
      return new Promise(async (resolve, reject) => { // eslint-disable-line

      // GET THE EDGE AND THEN USE THE NODE DATA TO ADD IN THE NODE INFORMATION
      console.log("cleanMedikResults")
      console.log(resultsToClean)
      console.log(resultsToClean.message)
      console.log(resultsToClean.message.knowledge_graph)
      // get edges
      let edges = resultsToClean.message.knowledge_graph.edges
      let edgesKeys = Object.keys(edges)
      
      let nodes = resultsToClean.message.knowledge_graph.nodes
      let results = []

      for (let i = 0; i < edgesKeys.length; i++){
        const edge = edgesKeys[i];

        let fullEdge = edges[edge]

        // fullEdge.subjectName = nodes[fullEdge.subject].name
        // get the subject and object
        let subjectInfo = nodes[fullEdge.subject]
        let objectInfo = nodes[fullEdge.object]
        // get the subject and object name
        
        fullEdge.subjectName = subjectInfo.name
        fullEdge.objectName = objectInfo.name
        // get the subject category
        fullEdge.subjectCategory = subjectInfo.category
        fullEdge.objectCategory = objectInfo.category
        // get the subject and object attributes
        fullEdge.subjectAttributes = subjectInfo.attributes
        fullEdge.objectAttributes = objectInfo.attributes

        results.push(fullEdge)
      }

      resolve(results) 

      });
      
    },

    loadCytosccapeDataFromCleanedResults(cleanedResults){
      console.log("loadCytosccapeDataFromCleanedResults")
      console.log(cleanedResults)

    },
    preConfig(cytoscape) {
      console.log("preConfig");
      console.log("cytoscape")
      console.log(cytoscape)
      // console.log('this.$refs["cy-element"]')
      // console.log(this.$refs["cy-element"])
      // console.log("this.$refs.cy")
      // console.log(this.$refs.cy)
      // console.log("document.getElementById('cytoscape-div')")
      // console.log(document.getElementById('cytoscape-div').clientHeight)
      // console.log(document.getElementById('cytoscape-div').clientWidth)
      // // cy-element
      // console.log("this.$refs.cy.instance")
      // console.log(this.$refs.cy.instance)
      cytoscape.use(this.klay);
    },
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

//     testGroupBy(list, key){

// function groupArrayOfObjects(list, key) {
//   return list.reduce(function(rv, x) {
//     (rv[x[key]] = rv[x[key]] || []).push(x);
//     return rv;
//   }, {});
// }

// // var people = [
// //     {sex:"Male", name:"Jeff"},
// //     {sex:"Female", name:"Megan"},
// //     {sex:"Male", name:"Taylor"},
// //     {sex:"Female", name:"Madison"}
// // ];
// var groupedPeople=groupArrayOfObjects(list, key);
// console.log(groupedPeople);//will be the Males 
// console.log(groupedPeople)

//     },
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


    // async getSynonyms (){
    //   this.araxSynonyms = []
    //   this.synonyms = []
    //   // let syns = await ARAXService.getSynonyms()
    //   // PostService.query_raw(this.JSONquery)
     



    // },
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

      let i = 0;
      try {
        this.concept_data = await PostService.getConcept(this.concept_search);
        console.log("this.concept_search");
        console.log(this.concept_search);
        console.log(this.concept_data);
        let set = await PostService.getConcept(this.concept_search);
        let results = set["concepts"];
        let dbkeys = Object.keys(results);

        // GO THROUGH EACH DATABASE
        dbkeys.forEach((dbkey) => {
          let db = results[dbkey];
          let conceptkeys = Object.keys(db);

          conceptkeys.forEach((conceptkey) => {
            let concept_data = db[conceptkey];
            // console.log("concept_data");
            // console.log(concept_data);
            // let categoriesKept = [
            //   "biolink:Gene",
            //   "biolink:MolecularEntity",
            //   "biolink:NamedThing"
            // ];
            try {
              // if (categoriesKept.indexOf(concept_data["category"]) !== -1) {
              let concept = {};
              concept.index = i;
              concept.db = dbkey;
              concept.id = conceptkey;
              concept.category = concept_data["category"];
              concept.name = concept_data["name"];
              concept.selected = false;
              // if ()
              this.concepts_table.push(concept);
              i++;
              this.totalRows = this.concepts_table.length;
              // console.log("this.totalRows = ", this.totalRows)
              // }
            } catch (err) {
              console.log("error at concept - ", err);
            }
          });
        });

        console.log("finshed concept services");
        console.log(this.concepts_table);
      } catch (err) {
        this.error = err;
      }
    },
    myRowClickHandler(item) {
      // this.select_concepts = this.concepts_table.filter(row => row.selected == true)
      console.log("myRowClickHandler");
      for (var i = 0; i < this.concepts_table.length; i++) {
        if (this.concepts_table[i].index === item.index) {
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
      console.log("start curieCount");
      let ids = [];
      let idTable = [];

      let countTable = this.concepts_table;

      for (let index = 0; index < countTable.length; index++) {
        const el = countTable[index];

        let id = el.id.split(":")[0];
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
    },
    dbCount: function () {
      console.log("start dbCount");
      let dbs = [];
      let dbTable = [];

      let countTable = this.concepts_table;

      for (let index = 0; index < countTable.length; index++) {
        const el = countTable[index];

        let db = el.db;

        // COUNT EACH DATABASE OCCURANCE
        if (dbs.indexOf(db) == -1) {
          dbs.push(db);
          dbTable.push({ dbName: db, dbcount: 1 });
        } else {
          for (let index = 0; index < dbTable.length; index++) {
            const element = dbTable[index];
            if (element.dbName == db) {
              dbTable[index].dbcount++;
            }
          }
        }
      }
      return dbTable;
    },
  },
  // created() {
  //   this.fetchUserData;
  // },
  // mounted() {
  //   // Set the initial number of items
  //   this.totalRows = this.concepts_table.length;
  // },

};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style >
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
