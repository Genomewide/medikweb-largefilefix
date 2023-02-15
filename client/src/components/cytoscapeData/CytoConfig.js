const CytoConfig = {
    elements: [
      {
        data: { id: "a" , name : "a node"},
        position: { x: 589, y: 182 },
        group: "nodes",
        classes: "test"
      },
      {
        data: { id: "b" , name : "b node"},
        position: { x: 689, y: 282 },
        group: "nodes"
      },
      {
        data: { id: "c", name : "c node"},
        position: { x: 10, y: 100 },
        group: "nodes"
      },
      {
        data: { id: "ab", source: "a", target: "b" },
        group: "edges"
      }
    ],
    style: [
      {
        selector: "node",
        // style: { "background-color": "#4287f5", label: "data(id)" }
        // style: { "background-color": "#4287f5", label: "data(name)" , height: function(ele){ return ele.degree() * 10 }, width: function(ele){ return ele.degree() * 10 }}
        style: { "background-color": "#4287f5", label: "data(name)" , height: 50, width: 50}
      },
      {
        selector: "node[[degree = 2]]",
        style: { "background-color": "#4287f5", label: "data(name)" , height: 50, width: 50}

      },
      {
        selector: ':parent',
        css: {
          //shape: 'rectangle',
          // shape: 'cutrectangle',
          shape: 'roundrectangle',
        }
      },
      {
        selector: ".parentGroup",
        style: { "background-color": "#b0d4eb" }
      }, 
      {
        selector: ".grandParentGroup",
        style: { "background-color": "#db37d3", shape: 'ellipse'}
      }, 
      {
        selector: ".thedisease",
        style: { "background-color": "#61952c" }
      },
      {
        selector: ".thedrug",
        style: { "background-color": "#318201"}
      },
      {
        selector: ".Pathway",
        style: { "background-color": "#ff7d00"}
      },
      {
        selector: ".phenotype",
        style: { "background-color": "#62942d"}
      },
      {
        selector: ".Disease",
        style: { "background-color": "#008c95"}
      },
      {
        selector: ".DiseaseOrPhenotypicFeature",
        style: { "background-color": "#ff7d00" }
      },
      {
        selector: ".ThingWithTaxon",
        style: { "background-color": "#f6c9b6" }
      },
      {
        selector: ".Protein",
        style: { "background-color": "#ff7d00"}
      },
      {
        selector: ".test",
        style: { "background-color": "#8cd164"}
      },
      {
        selector: ".SmallMolecule",
        style: { "background-color": "#5daadc"}
      },

      {
        selector: ".hidden",
        style: { display: 'none'}
      }, 
      // 
      {
        selector: "edge",
        style: {
          width: 3,
          "curve-style": "bezier",
          "line-color": "#cccccc",
          // "target-arrow-color": "#cccccc", 
          // "target-arrow-color": "#FF0000",
          "target-arrow-color": "#a9a9a9",
          // "target-arrow-color": "",
          "target-arrow-shape": "vee",
          "arrow-scale": 2
          // "curve-style": "taxi"
        }
      },
      {
        selector: ".parentEdge",
        style: {
          width: 3,
          "curve-style": "bezier",
          "line-color": "#379bdb",
          // "target-arrow-color": "#379bdb",
          "target-arrow-color": "#FF0000",
          // "target-arrow-shape": "vee",
          // "arrow-scale": 2
          // "curve-style": "taxi"
        }
      }, 
      {
        selector: ".pathEdge",
        style: {
          width: 6,
          "curve-style": "bezier",
          "line-color": "#000000",
          // "target-arrow-color": "#379bdb",
          "target-arrow-color": "#FF0000",
          // "target-arrow-shape": "vee",
          // "arrow-scale": 2
          // "curve-style": "taxi"
        }
      }, 
      {
        selector: ".pathNode",
        // style: { "background-color": "#000000"}
        css: {
          // 'background-color': '#000000',
          // 'width': 3,
          'line-color': '#008c95',
          // 'target-arrow-color': '#008c95',
          // 'source-arrow-color': '#008c95',
          'border-width' : '6px',
          'border-color' : '#000000',
          // 'border-opacity' : '0.3'
        }
      },

      {
        selector: ':selected',
        // style: {
        //   width: 5,
          
        // },
        css: {
          'background-color': '#f44336',
          // 'width': 3,
          'line-color': '#008c95',
          // 'target-arrow-color': '#008c95',
          // 'source-arrow-color': '#008c95',
          'border-width' : '5px',
          'border-color' : 'yellow',
          'border-opacity' : '0.3'
        }
      }
    ],
    // layout: { name: "grid", rows: 1 } 
    // layout: { name: "klay" }
    // green #62942d #008c95 #008c94
    // blues #223077 #5daadc #00b7d5 #5ec6dd #b6dee6  #004f73
    // smallmolecule #5daadc
    // orange #ff7d00 #ff612d
    // purple #502d7f #764d99 #ad4392 #780755
    // beige #f6c9b6
    // pink #fbb6a9 #fcb5a9 #f94a5e 
    // red #f40000
    // yellow #fdb900
    // brown #a70019 #771c3f #620226
    // bone #f5ecd0
    // biolink:Pathway #ff7d00
    // phenotype #62942d
    // disease #008c95
  };
  
  export default CytoConfig;
  