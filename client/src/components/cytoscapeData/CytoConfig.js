const CytoConfig = {
    elements: [
      {
        data: { id: "a" },
        position: { x: 589, y: 182 },
        group: "nodes",
        classes: "test"
      },
      {
        data: { id: "b" },
        position: { x: 689, y: 282 },
        group: "nodes"
      },
      {
        data: { id: "c" },
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
        style: { "background-color": "#4287f5", label: "data(id)" }
      },
      {
        selector: ".thedisease",
        style: { "background-color": "#61952c", label: "data(id)" }
      },
      {
        selector: ".drug",
        style: { "background-color": "#318201", label: "data(id)" }
      },
      {
        selector: ".pathway",
        style: { "background-color": "#ff7d00", label: "data(id)" }
      },
      {
        selector: ".phenotype",
        style: { "background-color": "#62942d", label: "data(id)" }
      },
      {
        selector: ".disease",
        style: { "background-color": "#008c95", label: "data(id)" }
      },
      {
        selector: ".protein",
        style: { "background-color": "#ff7d00", label: "data(id)" }
      },
      {
        selector: ".test",
        style: { "background-color": "#8cd164", label: "data(id)" }
      },
      {
        selector: ".smallmolecule",
        style: { "background-color": "#5daadc", label: "data(id)" }
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#cccccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle"
        }
      },
      {
        selector: ':selected',
        css: {
          // 'background-color': 'SteelBlue',
          'line-color': 'black',
          'target-arrow-color': 'black',
          'source-arrow-color': 'black',
          'border-width' : '5px',
          'border-color' : 'yellow',
          'border-opacity' : '0.5'
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
  