<template>
 <div id="chart" />

</template>
    
  

<script>
// import { tree } from "vued3tree";
import * as d3 from "d3";

export default {
  // components: {
  //   tree,
  // },
  // props: ["treeData"],
  mounted: function () {
  this.treeDataGraphed = this.treeData;
  },
  data() {
   return {
     width: 750,
     height: 400,
     margin: {
       top: 50,
       right: 50,
       left: 50,
       bottom: 50,
     },
   };
  }, // end data
  methods: {
   init() {
     //We are accessing the div with the id chart using d3's select method and appending svg
     const svg = d3
       .select("#chart")
       .append("svg")
         .attr("width", this.width)
         .attr("height", this.height)
       .append("g")
       .style(
         "transform",
         `translate(${this.margin.left}px, ${this.margin.top}px)`
       );
    }
  } // end methods

} // end export
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