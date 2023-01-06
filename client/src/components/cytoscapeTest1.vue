<template>
  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">CYTOSCAPE TESTING</h1>
    <div>
      <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
      <cytoscape ref="cyRef" :config="config" :preConfig="preConfig">
        <cy-element
          v-for="def in elements"
          :key="`${def.data.id}`"
          :definition="def"
          v-on:mousedown="deleteNode($event, def.data.id)"
        />
      </cytoscape>
    </div>
    <div>
    <b-button class="mt-3" variant="primary" block @click="selectResult">CHEMBL.COMPOUND:CHEMBL408 </b-button>

      <!-- <b-collapse :id="'table-collapse' + index + result.name"> -->
        <b-card-text>
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
            :total-rows="cytoData.length"
            :per-page="10"
            align="fill"
            size="sm"
            class="my-0"
          ></b-pagination>

          <b-table
            bordered
            striped
            hover
            ref="selectableTable"
            responsive="true"
            table-layout:
            fixed
            :current-page="currentPage"
            :per-page="10"
            :fields="resultFields"
            :items="cytoData"
            :filter="filter"
            :filter-include-fields="[]"
            @filtered="onFiltered"
          >
           
          </b-table>
        </b-card-text>
      <!-- </b-collapse> -->
    </div>
  </div>
</template>

<script>
import klay from "cytoscape-klay";
import config from "./cytoscapeData/CytoConfig";
import cytoData from "../assets/diabetesTreatsCleaned.json";
console.log("config");
console.log(config);
const elements = [...config.elements];
delete config.elements;
console.log("cytoData");
console.log(cytoData);

export default {
  data() {
    return {
      config,
      elements,
      currentPage: 1,
      cytoData: cytoData,
      filter: null,
      resultFields: [ 
        {
          key: "resNodeCount",
          label: "#Nodes",
          sortable: true
        },
        {
          key: "drugKey",
          label: "Drug",
          sortable: true
        },
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
        },
      ],
    };
  },
  methods: {
    async selectResult(){
      // CHEMBL.COMPOUND:CHEMBL408
      let filterCytoData = cytoData.filter(x => x.drugKey == "CHEMBL.COMPOUND:CHEMBL408")
      console.log("filterCytoData")
      console.log(filterCytoData)
      // let newElements = []
      let nodes = await this.genNodes(filterCytoData)
      let edges = await this.genEdges(filterCytoData)
      this.elements = [...nodes, ...edges]
      console.log("elements")
      console.log(elements)

    },
    async genNodes(filterCytoData){
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        let nodes = []
        let nodeCheck = []
        let x = 100
        let y = 100
        for (let i = 0; i < filterCytoData.length; i++) {
          const res = filterCytoData[i];
          let fixSubjectName = res.subjectName.split(' ').join('_')
          let fixObjectName = res.objectName.split(' ').join('_')

          // if(nodeCheck.indexOf(res.subjectName) == -1){
          if(nodeCheck.indexOf(fixSubjectName) == -1){
            x = x + 50
            if(x % 500 == 0){
              y = y +100
              x = 100
            }
            let el = {}
            el.data = {}
            el.position = {}

            el.data.id = fixSubjectName
            el.position = { x: x, y: y}
            el.group = "nodes"
            // nodes = [nodes, ...el]
            nodes.push(el)
            nodeCheck.push(fixSubjectName)
          }
          if(nodeCheck.indexOf(fixObjectName) == -1){
            x = x + 50
            if(x % 500 == 0){
              y = y +100
              x = 100
            }
            let el = {}
            el.data = {}

            el.data.id = fixObjectName
            el.position = { x: x, y: y}
            el.group = "nodes"
            // nodes = [nodes, ...el]
            nodes.push(el)
            nodeCheck.push(fixObjectName)

          }
          if(i == filterCytoData.length -1){
            console.log("nodes")
            console.log(nodes)
            resolve(nodes)
          }

        }
      })
    },
    async genEdges(filterCytoData){
      return new Promise(async (resolve, reject) => { // eslint-disable-line
        let edges = []
        let edgesCheck = []
        for (let i = 0; i < filterCytoData.length; i++) {
          const res = filterCytoData[i];

          let edgeCheck = res.subjectName + "-" + res.objectName
          edgeCheck = edgeCheck.split(' ').join('_')

            if(edgesCheck.indexOf(edgeCheck) == -1){
              let el = {}
              el.data = {}
              el.data.id = edgeCheck
              el.data.source = res.subjectName.split(' ').join('_')
              el.data.target = res.objectName.split(' ').join('_')
              // el.position
              el.group = "edges"
              // edges = [edges, ...el]
              edges.push(el)
              edgesCheck.push(edgeCheck)
              
            }
            if(i == filterCytoData.length - 1){
              console.log("edges")
              console.log(edges)
              resolve(edges)
            }

        }
      })
    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    preConfig(cytoscape) {
      cytoscape.use(klay);
    },

    // async afterCreated(cy) {
    //   await this.$nextTick();

    //   this.cyInstance.makeLayout({ name: "klay" }).run();
    // },

    addNode(event) {
      console.log(event.target, this.$refs.cyRef.instance);
      if (event.target === this.$refs.cyRef.instance)
        console.log("adding node", event.target);
    },
    deleteNode(id) {
      console.log("node clicked", id);
    },
    updateNode(event) {
      console.log("right click node", event);
    },
    // preConfig(cytoscape) {
    //   console.log("calling pre-config", cytoscape);
    // },
    // afterCreated(cy) {
    //   // cy: this is the cytoscape instance
    //   console.log("after created", cy);

    //   alert(1);

    //   cy.contextMenus({
    //     menuItems: [
    //       {
    //         id: "remove",
    //         content: "remove",
    //         tooltipText: "remove",
    //         image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 },
    //         selector: "node, edge",
    //         onClickFunction: function (event) {
    //           var target = event.target || event.cyTarget;
    //           target.remove();
    //         },
    //         hasTrailingDivider: true,
    //       },
    //       {
    //         id: "hide",
    //         content: "hide",
    //         tooltipText: "hide",
    //         selector: "*",
    //         onClickFunction: function (event) {
    //           var target = event.target || event.cyTarget;
    //           target.hide();
    //         },
    //         disabled: false,
    //       },
    //     ],
    //   });
    // },
  },
};
</script>
