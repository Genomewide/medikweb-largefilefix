<template>

  <div class="container" style="margin-bottom: 100px">
    <h1 class="text-center">ARS DRUG TO GENE QUERY NEXT</h1>
    <div>
        test
            <h1 class="text-center">ARS DRUG TO GENE QUERY NEXT</h1>

        <!-- <cytoscape ref="cyRef" :config="config" v-on:mousedown="addNode" v-on:cxttapstart="updateNode"> -->
        <cytoscape ref="cyRef" :config="config" >
        <cy-element
            v-for="def in elements"
            :key="`${def.data.id}`"
            :definition="def"
            v-on:mousedown="deleteNode($event, def.data.id)"
        />
        </cytoscape>
    </div>
  </div>
</template>

<script>
import config from "./cytoscapeData/CytoConfig";
console.log("config")
console.log(config)
const elements = [...config.elements];
delete config.elements;

export default {
  data() {
    return {
      config,
      elements
    };
  },
  methods: {
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
    preConfig(cytoscape) {
      console.log("calling pre-config", cytoscape);
    },
    afterCreated(cy) {
      // cy: this is the cytoscape instance
      console.log("after created", cy);

      alert(1);

      cy.contextMenus({
        menuItems: [
          {
            id: "remove",
            content: "remove",
            tooltipText: "remove",
            image: { src: "remove.svg", width: 12, height: 12, x: 6, y: 4 },
            selector: "node, edge",
            onClickFunction: function(event) {
              var target = event.target || event.cyTarget;
              target.remove();
            },
            hasTrailingDivider: true
          },
          {
            id: "hide",
            content: "hide",
            tooltipText: "hide",
            selector: "*",
            onClickFunction: function(event) {
              var target = event.target || event.cyTarget;
              target.hide();
            },
            disabled: false
          }
        ]
      });
    }
  }
};
</script>
