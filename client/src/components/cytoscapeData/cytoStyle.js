const cytoStyle =
{
  style: [
    {
      selector: "node",
      style: {
        "background-color": "#666",
        label: "data(name)",
      },
    },
    {
      selector: 'node[type = "category"]',
      style: {
        "background-color": "#3F88C5",
        label: "data(name)",
        "text-wrap": "wrap",
        
        "text-halign": "center",
        "text-valign": "center",
        // shape: "circle",
        // width: (node) => {
        //   const degree = node.degree();
        //   const nodeSize = 25 * degree;
        //   console.log("node", node)
        //   console.log("degree", degree);
        //   console.log("nodeSize", nodeSize);
        //   // const minSize = 20; // Minimum size for nodes
        //   // const maxSize = 3000; // Maximum size for nodes
        //   // const sizeRange = maxSize - minSize; // Range of sizes

        //   // // Calculate node size based on degree
        //   // // const normalizedDegree = (degree - 1) / (this.maxDegree - 1); // Normalize the degree between 0 and 1
        //   // const normalizedDegree = (degree - 1) / 20 ; // Normalize the degree between 0 and 1
        //   // const nodeSize = minSize + normalizedDegree * sizeRange; // Calculate the size based on the degree

        //   return `${nodeSize}px`; // Return the size as a string with 'px' unit
        // },
        // height: (node) => {
        //   return node.style("width"); // Set the height equal to the width to maintain a circle shape
        // },
      },
    },

    {
      selector: 'node[type = "target"]',
      style: {
        "background-color": "#D00000",
        label: "data(name)",
        // 'node-repulsion': 5000,
        // 'gravity': -100,
        // 'idealEdgeLength': 1000,
      },
    },
    {
      selector: 'node[parentid = "biolink_BiologicalProcessOrActivity"]',
      style: {
        "background-color": "#D00000",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_DiseaseOrPhenotypicFeature"]',
      style: {
        "background-color": "#FFBA08",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_Drug"]',
      style: {
        "background-color": "#136F63",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_Gene"]',
      style: {
        "background-color": "#032B43",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_GeneFamily"]',
      style: {
        "background-color": "#032B43",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_Protein"]',
      style: {
        "background-color": "#032B43",
        label: "data(name)",
      },
    },
    {
      selector: 'node[parentid = "biolink_SmallMolecule"]',
      style: {
        "background-color": "#136F63",
        label: "data(name)",
      },
    },
    {
      selector: "edge",
      style: {
        width: 3,
        "line-color": "#ccc",
        "target-arrow-color": "#ccc",
        "target-arrow-shape": "triangle",
        "curve-style": "bezier",
      },
    },
  ]
}

// cytoStyle.maxDegree = 10; // Replace '10' with your desired maximum degree value

export default cytoStyle;
