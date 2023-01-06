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
        style: { "background-color": "#4287f5", label: "data(id)" }
      },
      {
        selector: ".test",
        style: { "background-color": "#8cd164", label: "data(id)" }
      },
      {
        selector: "edge",
        style: {
          width: 3,
          "line-color": "#cccc",
          "target-arrow-color": "#ccc",
          "target-arrow-shape": "triangle"
        }
      }
    ],
    // layout: { name: "grid", rows: 1 }
    layout: { name: "klay" }
  };
  
  export default CytoConfig;
  