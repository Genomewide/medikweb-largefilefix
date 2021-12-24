<template>
  <div class="treeview" >
    <!-- <svg>
  <rect x="120" y="100" width="100" height="100" rx="15" />


</svg> -->
    <!-- <hierarchical-edge-bundling height="100%" identifier="id" :data="tree" :links="links" node-text="name"/> -->
    
    <tree :data="treeData" node-text="name" layoutType="circular" type="cluster" :key="treeKey">
      <template #node="{ data, node: { depth }, isRetracted }">
        <!-- <template #node="{data, node: {depth}, radius, isRetracted}"> -->
        <template v-if="data.children && data.children.length">
          <path :fill="isRetracted ? 'red' : 'blue'" d="M190.5..">
            <title>{{ data.text }} {{ depth }}</title>
          </path>
        </template>
        <template v-else>
          <circle r="6" :stroke="'blue' ? 'blue' : 'yellow'">
            <title>{{ data.text }} {{ depth }}</title>
          </circle>
        </template>
      </template>
      </tree>
      {{treeData}}
  </div>
</template>
    
  

<script>
import { tree } from "vued3tree";

export default {
  components: {
    tree,
  },
  props: ["treeData"],
  mounted: function () {
  this.treeDataGraphed = this.treeData;
  },
  data() {
    return {
      treeDataGraphed: {
        name: "test",
        children: [
          {
            name: "biolink:GeneProduct",
            children: [
              {
                name: "C-Jun-amino-terminal kinase-interacting protein 3 (human)",
                value: 83,
              },
            ],
          },
          {
            name: "biolink:Gene",
            children: [
              {
                name: "HGNC:6884",
                value: 83,
              },
              {
                name: "MAPK8IP3",
                value: 83,
              },
            ],
          },
          {
            name: "biolink:NamedThing",
            children: [
              {
                name: "PANTHER:PTHR13886",
                value: 83,
              },
            ],
          },
          {
            name: "biolink:SequenceVariant",
            children: [
              {
                name: "dbSNP:rs1567128142",
                value: 83,
              },
              {
                name: "dbSNP:rs770703007",
                value: 83,
              },
              {
                name: "dbSNP:rs1567198751",
                value: 83,
              },
              {
                name: "dbSNP:rs1567203083",
                value: 83,
              },
              {
                name: "dbSNP:rs1567214097",
                value: 83,
              },
            ],
          },
          {
            name: "biolink:NamedThing|biolink:GenomicEntity",
            children: [
              {
                name: "chr16p13.3 (Human)",
                value: 83,
              },
            ],
          },
          {
            name: "biolink:Publication|biolink:InformationContentEntity|biolink:NamedThing",
            children: [
              {
                name: "PMID:10523642",
                value: 83,
              },
              {
                name: "PMID:10629060",
                value: 83,
              },
            ],
          },
        ],
      },
    };
  },
};
//...
</script>

<style>
.viewport {
  width: 100%;
  height: 500px;
}
.treeview {
  width: 100%;
  height: 500px;
}
</style>