<template>

  <div>
    <svg >
  <defs>
    <marker id="m-end" markerWidth="10" markerHeight="10" refX="9" refY="3" orient="auto" markerUnits="strokeWidth" >
      <path d="M0,0 L0,6 L9,3 z"></path>
    </marker>
        <marker id="m-start" markerWidth="6" markerHeight="6" refX="-4" refY="3" orient="auto" markerUnits="strokeWidth" >
      <rect width="3" height="6"></rect>
    </marker>
  </defs>
</svg>

    
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options"  :link-cb="lcb"/>

  </div>
      <!-- <div class="title">
    <h1> <a href="https://github.com/emiliorizzo/vue-d3-network">vue-d3-network</a> </h1> 
    <ul class="menu">
      <li>
        <label> Node size  </label>
        <input type="range" min="1" max="100" v-model='nodeSize' /> {{ options.nodeSize }}
      </li>
      <li>
        <label>Render as  </label>
      <input type="radio" :value='false' v-model='canvas' />
      <label>SVG</label>
      <input type="radio" :value='true' v-model='canvas' />
      <label>Canvas</label>
      </li>  
    </ul>
    </div>
    <d3-network ref='net' :net-nodes="nodes" :net-links="links" :options="options" /> 
  </div>-->
    <!-- TEST -->
    <!-- <svg>
  <rect x="120" y="100" width="100" height="100" rx="15" />


</svg> -->
    <!-- <hierarchical-edge-bundling height="100%" identifier="id" :data="tree" :links="links" node-text="name"/> -->
    
    <!-- <tree :data="treeData" node-text="name" layoutType="circular" type="cluster" :key="treeKey">
      <template #node="{ data, node: { depth }, isRetracted }">
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
      {{treeData}} -->
  <!-- </div> -->
</template>
    
  

<script>
import D3Network from "vue-d3-network";

export default {
  components: {
    D3Network,
  },
  // props: ["treeData"],
  // mounted: function () {
  // this.treeDataGraphed = this.treeData;
  // },
   data () {
    return {
       nodes: [
        { id: 1, name: 'my awesome node 1'},
        { id: 2, name: 'my node 2'},
        { id: 3, name:'orange node', _color: 'orange' },
        { id: 4, name:'blue node',_color: '#00aaff'},
        { id: 5 },
        { id: 6 },
        { id: 7 },
        { id: 8 },
        { id: 9 },
        { id: 10 },
        { id: 11 },
        { id: 12 },
        { id: 13 },
        { id: 14 },
      ],
      links: [
        { sid: 1, tid: 2, _color: "black" },
        { sid: 2, tid: 8 , _color: "black" },
        { sid: 4, tid: 3 , _color: "black" },
        { sid: 4, tid: 5 , _color: "black" },
        { sid: 4, tid: 9 , _color: "black" },
        { sid: 5, tid: 6 , _color: "black" },
        { sid: 7, tid: 8 , _color: "black" },
        { sid: 5, tid: 8 , _color: "black" },
        { sid: 3, tid: 8 , _color: "black" },
        { sid: 7, tid: 9 , _color: "black" },
        { sid: 3, tid: 9 , _color: "black" },
        { sid: 10, tid: 6 , _color: "black" },
        { sid: 11, tid: 6 , _color: "black" },
        { sid: 12, tid: 6 , _color: "black" },
        { sid: 13, tid: 6 , _color: "black" },
        { sid: 14, tid: 6, _color: "black"  }
        
      ],
      nodeSize:10,
      canvas:false

    }
  },
  computed:{
    options(){
      return{
        force: 3000,
        size:{ w:600, h:600},
        nodeSize: this.nodeSize,
        nodeLabels: true,
        canvas: this.canvas,
        linkWidth:2,
        strLinks: true
      }
    }
  },
  methods:{
    lcb (link) {
      link._svgAttrs = { 'marker-end': 'url(#m-end)',
                       'marker-start': 'url(#m-start)'}
      return link
    }
  }
};
//...
</script>

<style scoped>

@import '/../node_modules/vue-d3-network/dist/vue-d3-network.css';
@import url('https://fonts.googleapis.com/css?family=PT+Sans');

body{
  font-family: 'PT Sans', sans-serif;
  background-color: #eee;
}
.title{
  position:absolute;
  text-align: center;
  left: 2em;
}
h1,a{
  color: #1aad8d;
  text-decoration: none;
}

ul.menu {
  list-style: none;
  position: absolute;
  z-index: 100;
  min-width: 20em;
  text-align: left;
}
ul.menu li{
  margin-top: 1em;
  position: relative;
}
.node {
  color: #1aad8d;
}
.greenNode{
  color: #1aad8d;
}
#m-end path, #m-start{
  fill: rgba(18, 120, 98, 0.8);
}

</style>