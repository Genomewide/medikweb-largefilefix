<template>
    <div>
        <div >
            <b-row>
                <b-col cols="1">
                </b-col>
                <b-col cols="2" >
                    <div>
                        <b-form >
                        <label class="sr-only" for="Object">Object</label>
                        <b-form-input
                            v-model="concept_search"
                            id="concept_search"
                            class="mb-2 mr-sm-2 mb-sm-0"
                            placeholder="Object"
                        ></b-form-input>
                        <b-button variant="primary" v-on:click="testRobokop"
                            >testRobokop</b-button
                        >
                        <b-button variant="primary" v-on:click="getStarted"
                            >getStarted</b-button
                        >
                        </b-form>
                        {{ normID }}
                        <hr />

                        {{ normLabel }}
                        <hr />

                        {{ normCategory }}
                        <hr /> breadthFirstLayout
                        <b-button variant="primary" v-on:click="breadthFirstLayout()"
                            >breadthFirstLayout</b-button>
                        <hr />
                        <b-button variant="primary" v-on:click="colaLayout()"
                            >colaLayout</b-button>
                        <hr />
                        <b-button variant="primary" v-on:click="coseLayout()"
                            >coseLayout</b-button>
                        <hr />
                        <b-button variant="primary" v-on:click="dagreLayout()"
                            >dagreLayout</b-button>
                        <hr />
                        <b-button variant="primary" v-on:click="klayLayout()"
                            >klayLayout</b-button>
                        <hr />
                        <b-button variant="primary" v-on:click="setupLayout()"
                            >setupLayout</b-button>
                    </div>                
                </b-col>
                <b-col cols="9">
                    <!-- <b-row>
                        <div class="graph-container">
                            <div ref="graphContainer" class="cy-container"></div>
                            <button @click="addNode">Add Node</button>
                        </div>  
                    </b-row> -->
                    <b-row>
                        <div class="graph-container" style="width: 100%">
                            <cytoscape
                                
                                :key="keyCounter"
                                ref="cyto"
                                :config="config"
                                :preConfig="preConfig"
                                :layout="layout"
                                :elements="elements"
                            >
                                <cy-element
                                id="cytoscape1"
                                class="cy-container"
                                ref="cy"
                                v-for="def in elements"
                                :key="`${def.data.id}`"
                                :definition="def"
                                v-on:mousedown="showNodeInfo($event, def, def.data, def.data.id)"

                                />
                        <!-- <button @click="layoutCola()">layoutCola</button>
                        <br>
                        <button @click="changeLayout()">changeLayout</button>
                        <br>
                        <button @click="addNode()">addNode</button> 
                        <br>
                        <button @click="addParentWithChildren()">addParentWithChildren</button>  -->
                            </cytoscape>
                            <!-- <cytoscape
                                
                                :key="keyCounter"
                                ref="cyto"
                                :config="config"
                                :preConfig="preConfig"
                            >
                                <cy-element
                                id="cytoscape1"
                                class="cy-container"
                                ref="cy"
                                v-for="def in elements"
                                :key="`${def.data.id}`"
                                :definition="def"
                                />
                            </cytoscape> -->
                       
                        </div>
                    </b-row> 
          

                </b-col>
            </b-row>
        </div>

    </div>
</template>

<script>
import cytoscape from "cytoscape";
import cola from 'cytoscape-cola';
import klay from "cytoscape-klay";
import coseBilkent from 'cytoscape-cose-bilkent';
// import 'cytoscape-layout-breadthfirst';
import dagre from 'cytoscape-dagre';


import config from "../cytoscapeData/cytoStyle.js"
import exploreStart from "../cytoscapeData/exploreData.json"

// import 'vue-cytoscape/dist/vue-cytoscape.css';
import PostService from "../../PostService";
import ARSService from "../../ARSService";

export default {
    data() {
        return {
                config: config,
                elements: [
                    { data: { id: "node1",label: "node1", name: "node1" } },
                    { data: { id: "node2",label: "node1", name: "node1" } },
                    { data: { id: "edge1", source: "node1", target: "node2" } },
                ],
                concept_search: "MONDO:0005148",
                normID: "",
                normLabel: "",
                normCategory: "",
                targetNormNodeData: {},
                renciCatIDObject: {},
                doITonce: true,
                cola: cola,
                klay: klay,
                dagre: dagre,
                layout: {
                    name: 'grid',
                    // Additional options for cola layout
                },
                keyCounter: 3,
                exploreStart: exploreStart,
                catgories: [
                    "biolink:DiseaseOrPhenotypicFeature",
                    "biolink:Protein",
                    "biolink:Gene",
                    "biolink:GeneFamily",
                    "biolink:BiologicalProcessOrActivity",
                    "biolink:SmallMolecule",
                    "biolink:Drug",
                ],
                catgoriesData: {
                    "biolink_DiseaseOrPhenotypicFeature": {
                        "id": "biolink:DiseaseOrPhenotypicFeature",
                        "label": "Disease or Phenotypic Feature"
                    },
                    "biolink_Protein": {
                        "id": "biolink:Protein",
                        "label": "Protein"
                    },
                    "biolink_Gene": {
                        "id": "biolink:Gene",
                        "label": "Gene"
                    },
                    "biolink_GeneFamily": {
                        "id": "biolink:GeneFamily",
                        "label": "Gene Family"
                    },
                    "biolink_BiologicalProcessOrActivity": {
                        "id": "biolink:BiologicalProcessOrActivity",
                        "label": "Biological Process or Activity"
                    },
                    "biolink_SmallMolecule": {
                        "id": "biolink:SmallMolecule",
                        "label": "Small Molecule"
                    },
                    "biolink_Drug": {
                        "id": "biolink:Drug",
                        "label": "Drug"
                    }
                }
            }
        },

methods: {
    handleKeyPress(event) {
        if (event.ctrlKey && event.key === 'd') {
            const selectedEdges = this.cyInstance.$(':selected');
            selectedEdges.remove();
        }
    },

    async getStarted(){
        this.cyInstance.nodes().remove();
        this.elements = [];
        // this.cyInstance.remove(this.cyInstance.elements());

        console.log("this.exploreStart")
        console.log(this.exploreStart)
    
        
        let graphData = this.exploreStart
        // MAKE TARGET NODE
        let targetNodeObject = await this.makeTargetNode(this.concept_search);
        this.targetNormNodeData = targetNodeObject
        
        // ADD TARGET NODE TO GRAPH
        // this.elements.push(targetNodeObject);
        this.cyInstance.add(targetNodeObject);

        // ##########################################################################################
        // ##########################################################################################
        // START KEEP THE CODE AFTER THIS - ADDS TO ELEMENTS
        // ##########################################################################################
        // ##########################################################################################

        // ADD ALL NODES AND EDGES TO GRAPH
        let allElements = [...this.elements, ...graphData.graphNodes, ...graphData.graphEdges];
        console.log("allElements");
        console.log(allElements);

        // FILTER OUT DUPLICATES BASED ON DATA.ID
        this.elements = allElements.filter((thing, index, self) =>
            index === self.findIndex((t) => (
                t.data.id === thing.data.id
            ))
        )
        // REMOVE THE EDGE THAT I CAN NOT EXPLAIN WHY IT IS THERE - IT IS A DUPLICATE
        // TRYING TO UNDERSTAND IF THIS AFFECTS THE HIERARCHICAL LAYOUTS?
        this.elements = this.elements.filter((element) => element.data.id !== "MONDO_0005148_biolink_DiseaseOrPhenotypicFeature");

        // ##########################################################################################
        // ##########################################################################################
        // END KEEP THE CODE AFTER THIS
        // ##########################################################################################
        // ##########################################################################################

        // ADD ALL NODES AND EDGES TO GRAPH
        this.cyInstance.add(graphData.graphNodes);
        this.cyInstance.add(graphData.graphEdges);
        this.cyInstance.remove(`edge[id="MONDO_0005148_biolink_DiseaseOrPhenotypicFeature"]`);

        // REMOVE THE NODES THAT HAVE ONLY 1 EDGE AND HAVE A CATEGORY AS THEIR ID
        this.catgories.forEach(async (cat) => {
            // remove the nodes that have only 1 edge AND have cat as their id
            let sanCat =  this.sanitizeNodeId(cat)
            let node = this.cyInstance.getElementById(sanCat)
            if(node.degree() == 1){
                // REMOVE FROM CYTOSCAPE INSTANCE
                this.cyInstance.remove(node)
                // REMOVE FROM ELEMENTS
                this.elements = this.elements.filter((element) => element.data.id !== sanCat);
            }
        })

        // CHANGE THE SIZE OF THE CATEGORY NODES
        this.updateCategorySize()
        // UPDATE THE LABELS OF THE CATEGORY NODES
        this.updateCategoryNames()
        // LAYOUT THE GRAPH
        this.cyInstance.makeLayout({ name: "breadthfirst", directed: true, animate: true , fit: true}).run()
        
        
        // THE REST ARE FAILS
        // this.cyInstance.makeLayout({ name: "breadthfirst", animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cola", animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cose", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cola", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        console.log("DONE")
    },
    showNodeInfo(event, def, data, id){
        console.log("showNodeInfo")
        console.log(event)
        console.log(def)
        console.log(data.category)
        console.log(id)
        // this.nodeInfo = node
    },
    setupLayout(){
        // THE ROOT NODE ID IS MONDO_0005148 - PUT THAT NODE IN THE MIDDLE VERTICALY AT THE LEFT SIDE OF THE CONTAINER


        // GET THE DIMENSIONS OF THE CONTAINER
        let container = this.cyInstance.container();
        console.log("container")
        console.log(container)
        // GET X AND Y COORDINATES OF THE CONTAINER
        let containerX = container.getBoundingClientRect().x;
        let containerY = container.getBoundingClientRect().y;
        console.log("containerX")
        console.log(containerX)
        console.log("containerY")
        console.log(containerY)
        // GET THE WIDTH AND HEIGHT OF THE CONTAINER
        let containerWidth = container.getBoundingClientRect().width;
        let containerHeight = container.getBoundingClientRect().height;
        console.log("containerWidth")
        console.log(containerWidth)
        console.log("containerHeight")
        console.log(containerHeight)
        // GET THE CENTER OF THE CONTAINER
        let containerCenterX = containerX + containerWidth / 2;
        let containerCenterY = containerY + containerHeight / 2;
        console.log("containerCenterX")
        console.log(containerCenterX)
        console.log("containerCenterY")
        console.log(containerCenterY)
        // SET THE POSITION OF THE ROOT NODE VERITCALLY IN THE MIDDLE BUT HORIZONTALLY TO THE LEFT
        let rootX = containerX + containerWidth / 4;
        let rootY = containerCenterY;
        console.log("rootX")
        console.log(rootX)
        console.log("rootY")
        console.log(rootY)
        // SET THE POSITION OF THE ROOT NODE
        this.cyInstance.getElementById("MONDO_0005148").position({x: rootX, y: rootY})
        // MAKE THAT NODE 4X THE SIZE OF THE OTHER NODES
        this.cyInstance.getElementById("MONDO_0005148").style({width: 200, height: 200})
        // CONSOLE LOG THE ROOT NODE POSITION
        console.log("this.cyInstance.getElementById('MONDO_0005148').position()")
        console.log(this.cyInstance.getElementById("MONDO_0005148").position())
        // MOVE THE ROOT NODE THE VERTICAL CENTERE AND THE LEFT SIDE HORIZONTALLY - SHOW THIS WITH ANIMATION
        this.cyInstance.getElementById("MONDO_0005148").animate({position: {x: containerX, y: containerCenterY}}, {duration: 1000})
        // this.cyInstance.getElementById("MONDO_0005148").position({x: containerX, y: containerCenterY})

        // SHOW THE NODE IN THE NEW POSITION
        console.log("this.cyInstance.getElementById('MONDO_0005148').position()")
        console.log(this.cyInstance.getElementById("MONDO_0005148").position())



    },
    breadthFirstLayout(){
        this.cyInstance.makeLayout({ name: "breadthfirst", rankDir: 'UL',align: 'UL',ranker: 'tight-tree', root: 'MONDO_0005148',directed: true, animate: true , fit: true}).run()
    },
    colaLayout(){
        this.cyInstance.makeLayout({ name: "cola", animate: true , fit: true}).run()
    },
    coseLayout(){
        this.cyInstance.makeLayout({ name: "cose", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
    },
    dagreLayout(){
        this.cyInstance.makeLayout({ name: "dagre", animate: true , fit: true}).run()
    },
    klayLayout(){
        this.cyInstance.makeLayout({ name: "klay", animate: true , fit: true}).run()
    },

    async testRobokop2() {
        let catgories = [
            "biolink:DiseaseOrPhenotypicFeature",
            "biolink:Protein",
            "biolink:Gene",
            "biolink:GeneFamily",
            "biolink:BiologicalProcessOrActivity",
            "biolink:SmallMolecule",
            "biolink:Drug",
        ];

        // GET OBJECT READY TO HOLD THE DATA
        this.renciCatIDObject.nodeIDsCurrent = []
        this.renciCatIDObject.nodeIDS = []
        

      // GET NORMALIZED INFO ABOUT THE CURIE SUBMITTED
        let normalizedArray = await ARSService.getNodeNormArray([
            this.concept_search,
        ]);
        console.log("normalizedArray");
        console.log(normalizedArray);

      // GET THE ID, LABEL, AND CATEGORY OF THE CURIE SUBMITTED

        this.normID = normalizedArray[this.concept_search].id.identifier;
        this.normIDSanitized = this.sanitizeNodeId(normalizedArray[this.concept_search].id.identifier);
        this.normLabel = normalizedArray[this.concept_search].id.label;
        this.normCategory = normalizedArray[this.concept_search].type[0];
        console.log("normID");
        console.log(this.normID);
        console.log("normLabel");
        console.log(this.normLabel);
        console.log("normCategory");
        console.log(this.normCategory);

      // MAKE THE CYTOSCAPE NODE FOR THE STARTING CURIE SUBMITTED AND ADD IT TO THE GRAPH

        let cytoNode = {
            data: {
                id: this.normIDSanitized,
                name: this.normLabel,
                category: this.normCategory,
                db: this.normID.split(":")[0],
            },
        };
        console.log("cytoNode");
        console.log(cytoNode);
        // this.elements.push({ data: cytoNode.data });
        this.cy.add({ data: cytoNode.data });
        this.cy.fit();
        // console.log("this.elements")
        // console.log(this.elements)

      // LOOP THROUGH CATEGORIES AND GET THE NODES AND EDGES DATA FROM ROBOKOP
        
        for (let i = 0; i < catgories.length; i++) {

            let category = global.structuredClone(this.sanitizeNodeId(catgories[i])) ;
            console.log("STARTING category");
            console.log(category);
            // let expandedCat =  structuredClone(category)
            this.renciCatIDObject[category] = {
                data: [],
                nodes: [],
                edges: [],
            };
            // this.renciCatIDObject[category].data = []
            // this.renciCatIDObject[category].nodes = []
            console.log("this.renciCatIDObject");
            console.log(this.renciCatIDObject);

            console.log("testRobokop");
            console.log("Current time:", new Date());
            console.time("robokopGet()");

            let robokopGet = await PostService.robokopGet(
                this.normID,
                this.normCategory,
                catgories[i]
            );

            this.renciCatIDObject[category].data = robokopGet;
            console.log(" ##### this.renciCatIDObject #####")
            console.log(this.renciCatIDObject)

            console.log("##### CATEGORY #####");
            console.log(category);
            console.log("robokopGet");
            console.log(robokopGet);
            // CONSOLE THE STRING OF THE FIRST VALUE IN THE RESPONSE ARRAY
            // console.log("robokopGet[0]");
            // console.log(JSON.stringify(robokopGet[0]) );

            // ADD EACH OF THE DATA SETS TO renciCatIDObject
            // THIS WILL BE USED TO GET THE NODES AND EDGES FROM RENCI
            // AND ADD THEM TO THE GRAPH


            console.log("Finish time:", new Date());
            console.timeEnd("robokopGet()");
            console.log("----- getAllRenciIdsAndNormalize -----")
            console.log("this.renciCatIDObject")
            console.log(this.renciCatIDObject)
            
            // this.getAllRenciIdsAndNormalize(robokopGet, category)

        }
        //#################### END OF FOR LOOP ####################
        // REMOVE THE NODES THAT HAVE ONLY 1 EDGE AND HAVE A CATEGORY AS THEIR ID
        this.catgories.forEach(async (cat) => {
            // remove the nodes that have only 1 edge AND have cat as their id
            let sanCat =  this.sanitizeNodeId(cat)
            let node = this.cyInstance.getElementById(sanCat)
            if(node.degree() == 1){
                this.cyInstance.remove(node)
            }
        })

        // CHANGE THE SIZE OF THE CATEGORY NODES
        this.updateCategorySize()
        // UPDATE THE LABELS OF THE CATEGORY NODES
        this.updateCategoryNames()
        // LAYOUT THE GRAPH
        this.cyInstance.makeLayout({ name: "cose", animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cose", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cola", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        console.log("DONE")    
    },
    updateCategoryNames(){
        // Get all the nodes in the graph
        const nodes = this.cyInstance.nodes();

      // Iterate over the nodes and change their style type = "category"
        nodes.forEach((node) => {
        // Check some condition to determine the style
            if (node.data("type") === "category") {
                console.log("node.data")
                console.log(node.json().data)
                let name = node.json().data.name
                // console.log("name")
                // console.log(name)

                let rename = this.catgoriesData[name]
                // let rename = this.catgoriesData[node.data]
                // console.log("rename")
                // console.log(rename)

                node.data({ name: rename.label })
            } 
        });
    },
    updateCategorySize(){

      // GET ALL THE NODES
        const nodes = this.cyInstance.nodes();

      // Iterate over the nodes and change their style type = "category"
        nodes.forEach((node) => {
        // Check some condition to determine the style
        if (node.data("type") === "category") {
            let degree = node.degree()
            console.log("degree")
            console.log(degree)
            let resize = 5 * degree
            if(resize < 50){
                resize = 50
            }
            node.style("width", resize);
            node.style("height", resize);
            node.style("text-max-width", resize/2);
            node.style("font-size", resize/5);

        } 
        // else {
        //   node.style("background-color", "red");
        // }
        });
    
    },
    changeLayout() {
        console.log("changeLayout");
        this.cyInstance
            .makeLayout({ name: "klay", animate: true, fit: true })
            .run();
        this.cyInstance.fit();
        // this.cyInstance.center();
        this.keyCounter++;
    },
    addNode() {
        console.log("addNode");
        console.log(this.elements);
        const newNodeId = `node${this.keyCounter + 1}`;
        this.elements.push({ data: { id: newNodeId } });
        this.cyInstance.add({ data: { id: newNodeId } });
        // console.log(this.elements);

      // Adjust the view to show all nodes
        this.cyInstance.center();
        // this.cyInstance.fit();
        this.keyCounter++;
        console.log(this.cyInstance.data())
    },
    addParentWithChildren() {
        const parentId = 'parent';
        const childIds = ['child1', 'child2', 'child3'];

        // Add the parent node
        this.elements.push({ data: { id: parentId } });
        this.cyInstance.add({ data: { id: parentId } });

        // Add the child nodes with invisible state
        childIds.forEach((childId) => {
            this.elements.push({ data: { id: childId }, classes: 'invisible' });
            this.elements.push({ data: { source: parentId, target: childId } });
            this.cyInstance.add([
                { data: { id: childId }, classes: 'invisible' },
                { data: { source: parentId, target: childId } },
            ]);
        });
        
        this.cyInstance.makeLayout({ name: "cola", animate: true, fit: true }).run()
        this.cyInstance.center();
      // Refresh the Cytoscape graph
    //   this.cyInstance.refresh();
        // this.keyCounter++;

    //   // Bind the click event to the parent node
    //   const cy = this.cyInstance.getCy();
    //   cy.on('click', `#${parentId}`, (event) => {
    //     const parent = event.target;
    //     console.log(parent);

    //     // Toggle the visibility of the child nodes
    //     childIds.forEach((childId) => {
    //       const child = cy.$(`#${childId}`);
    //       child.toggleClass('invisible');
    //     });
    //   });
    },
    preConfig(cytoscape) {
        console.log("preConfig");
    
        cytoscape.use(this.cola);
        cytoscape.use(this.dagre);
        cytoscape.use(this.klay);
    },

    async testRobokop(){
        this.cyInstance.remove(this.cyInstance.elements());
        // MAKE TARGET NODE
        let targetNodeObject = await this.makeTargetNode(this.concept_search);
        this.targetNormNodeData = targetNodeObject
        
        // ADD TARGET NODE TO GRAPH
        this.elements.push(targetNodeObject);
        this.cyInstance.add(targetNodeObject);

        // LOOP THROUGH CATEGORIES AND GET THE RAW DATA FROM RENCI
        console.log("this.renciCatIDObject");
        console.log(this.renciCatIDObject);
        console.log("this.targetNormNodeData");
        console.log(this.targetNormNodeData);
        let renciData = await this.getRenciData(this.renciCatIDObject, this.targetNormNodeData)
        this.renciCatIDObject = renciData;
   
        // GET ALL OF THE IDS FOR NODES FROM RENCI DATA
        let gotRenciIDs = await this.getAllRenciIds(this.renciCatIDObject);
        this.renciCatIDObject = gotRenciIDs;

        // CREATE NODES FOR EACH TYPE
        // CREATE PARENT GROUPS FOR NODES AND CREATE PARENT NODES WHERE NEEDED
        // EXCLUDE DUPLICATES ACROSS CATEGORIES LIKE GENE AND PROTEIN
        let addedNodes = await this.makeNodes(this.renciCatIDObject, this.targetNormNodeData);
        this.renciCatIDObject = addedNodes;

        // CREATE EDGES FOR EACH TYPE - EDGES SHOULD BE WITH THE CATEGORY PARENT NODE?
        let addEdges = this.makeEdges(this.renciCatIDObject, this.targetNormNodeData)
        this.renciCatIDObject = addEdges;
        console.log("addEdges");
        console.log(addEdges);

        // COMBINE ALL NODES AND EDGES
        let graphData = this.makeGraph(this.renciCatIDObject);
        this.renciCatIDObject = graphData;
        console.log("graphData");
        console.log(graphData);

        // ADD ALL NODES AND EDGES TO GRAPH
        // let allElements = [...this.elements, ...graphData.graphNodes, ...graphData.graphEdges];
        // console.log("allElements");
        // console.log(allElements);
        // // FILTER OUT DUPLICATES BASED ON DATA.ID
        // this.elements = allElements.filter((thing, index, self) =>
        //     index === self.findIndex((t) => (
        //         t.data.id === thing.data.id
        //     ))
        // )
        // console.log("this.elements");
        // console.log(this.elements);
        // FILTER OUT DUPLICATES BASED ON DATA.ID
        console.log("graphData")
        console.log(graphData)
    
        this.cyInstance.add(graphData.graphNodes);
        this.cyInstance.add(graphData.graphEdges);
        this.cyInstance.fit();
        this.cyInstance.makeLayout({ name: "cola", animate: true, fit: true }).run()
            // .makeLayout({ name: "cola", fit: true })
            // .run();
        // this.cy.center();
        // this.changeLayout();
        // this.keyCounter++
        console.log("DONE")

        console.log("graphData")
        console.log(graphData)

        // ADD ALL NODES AND EDGES TO GRAPH
        this.cyInstance.add(graphData.graphNodes);
        this.cyInstance.add(graphData.graphEdges);

        // REMOVE THE NODES THAT HAVE ONLY 1 EDGE AND HAVE A CATEGORY AS THEIR ID
        this.catgories.forEach(async (cat) => {
            // remove the nodes that have only 1 edge AND have cat as their id
            let sanCat =  this.sanitizeNodeId(cat)
            let node = this.cyInstance.getElementById(sanCat)
            if(node.degree() == 1){
                this.cyInstance.remove(node)
            }
        })

        // CHANGE THE SIZE OF THE CATEGORY NODES
        this.updateCategorySize()
        // UPDATE THE LABELS OF THE CATEGORY NODES
        this.updateCategoryNames()
        // LAYOUT THE GRAPH
        this.cyInstance.makeLayout({ name: "cola", animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cose", animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cose", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        // this.cyInstance.makeLayout({ name: "cola", nodeRepulsion: 5000, nodeOverlap: 4, gravity: 0,animate: true , fit: true}).run()
        console.log("DONE")

    },

    makeGraph(graphData){
        console.log("start makeGraph");
        console.log("graphData");
        console.log(graphData);
        
        let newGraphData = global.structuredClone(graphData);
        newGraphData.graphNodes = [];
        newGraphData.graphEdges = [];
        // LOOP THROUGH THE CATEGORIES COMBINE THE NODES AND EDGES INTO ONE ARRAY

        let keys = Object.keys(newGraphData);
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            console.log("key");
            console.log(key);
            console.log("newGraphData[key].nodes")
            console.log(newGraphData[key].nodes)
            console.log("newGraphData[key].parentNodes")
            console.log(newGraphData[key].parentNodes)
            console.log("newGraphData[key].edges")
            console.log(newGraphData[key].edges)
            console.log("newGraphData[key].parentEdges")
            console.log(newGraphData[key].parentEdges)

            try {
                newGraphData.graphNodes = [...newGraphData.graphNodes, ...newGraphData[key].nodes, ...newGraphData[key].parentNodes];
                newGraphData.graphEdges = [...newGraphData.graphEdges, ...newGraphData[key].edges, ...newGraphData[key].parentEdges];
            } catch (error) {
                console.log("error");
                console.log(error);
            }

        }
        return newGraphData;
    },


    makeEdges(renciNodesObject, targetNode){
        let newRenciNodesObject = global.structuredClone(renciNodesObject);
        let targetNodeID = targetNode.data.id;
        // FOR EACH CATEGORY MAKE AN EDGE FOR THE CATEGORY PARENT NODE AND CONNECT IT TO THE TARGET NODE
        // AND THEN MAKE ALL OF THE NODES CONNECT TO THE CATEGORY PARENT NODE
        let keys = Object.keys(newRenciNodesObject);
        // CREATE FOR LOOP USING KEYS
        for (let i = 0; i < keys.length; i++) {
            let key = keys[i];
            let category = key;
            console.log("category");
            console.log(category);

            newRenciNodesObject[category].parentEdges = [];
            let categoryData = newRenciNodesObject[category];
            let parentNodeID = categoryData.parentNodes[0].data.id;

            // CREATE CATEGORY PARENT EDGE
            let categoryParentEdgeData = {
                group: "edges",
                data: {
                    id: parentNodeID + '_' + targetNodeID,
                    source: parentNodeID,
                    target: targetNodeID,
                },
            };
            newRenciNodesObject[category].parentEdges.push(categoryParentEdgeData);

            // MAKE AND EDGE FOR EACH NODE IN THE ARRAY THAT CONNECTS IT TO THE PARENT NODE ID
            let nodes = newRenciNodesObject[category].nodes;
            for (let j = 0; j < nodes.length; j++) {
                let node = nodes[j];
                let edgeData = {
                    group: "edges",
                    data: {
                        id: node.data.id + '_' + parentNodeID,
                        source: parentNodeID,
                        target: node.data.id,
                    },
                };
                newRenciNodesObject[category].edges.push(edgeData);
            }
            
        }
        return newRenciNodesObject;
    },


    async makeTargetNode(){
        // GET NORMALIZED INFO ABOUT THE CURIE SUBMITTED
        let normalizedArray = await ARSService.getNodeNormArray([
            this.concept_search,
        ]);
        console.log("normalizedArray");
        console.log(normalizedArray);

        // GET THE ID, LABEL, AND CATEGORY OF THE CURIE SUBMITTED

        this.normID = normalizedArray[this.concept_search].id.identifier;
        this.normIDSanitized = this.sanitizeNodeId(normalizedArray[this.concept_search].id.identifier);
        this.normLabel = normalizedArray[this.concept_search].id.label;
        this.normCategory = normalizedArray[this.concept_search].type[0];
        console.log("normID");
        console.log(this.normID);
        console.log("normLabel");
        console.log(this.normLabel);
        console.log("normCategory");
        console.log(this.normCategory);

      // MAKE THE CYTOSCAPE NODE FOR THE STARTING CURIE SUBMITTED AND ADD IT TO THE GRAPH

        let cytoNode = {
            group: "nodes",
            data: {
                id: this.normIDSanitized,
                idFull: this.normID,
                name: this.normLabel,
                category: this.normCategory,
                db: this.normID.split(":")[0],
                type: "target",
            },
        };
        console.log("cytoNode");
        console.log(cytoNode);
        return cytoNode;

    },


    async getRenciData(renciObject, targetNodeObject){
        let newRenciObject = global.structuredClone(renciObject)
        let newTargetNodeObject = global.structuredClone(targetNodeObject)

        let catgories = [
            "biolink:DiseaseOrPhenotypicFeature",
            "biolink:Protein",
            "biolink:Gene",
            "biolink:GeneFamily",
            "biolink:BiologicalProcessOrActivity",
            "biolink:SmallMolecule",
            "biolink:Drug",
        ];

        // LOOP THROUGH THE CATEGORIES AND GET THE RENCI DATA FOR EACH
            for (let i = 0; i < catgories.length; i++) {
                let sanitizedCategory = this.sanitizeNodeId(catgories[i]);
                let category = catgories[i];
                // console.log("category");
                // console.log(category);
                // console.log("sanitizedCategory");
                // console.log(sanitizedCategory);

                newRenciObject[sanitizedCategory] = {
                    category: category,
                    data: [],
                    nodes: [],
                    edges: [],
                };

                // GET THE RENCI DATA FOR THE CATEGORY
                console.log(newTargetNodeObject);

                let robokopGet = await PostService.robokopGet(
                    newTargetNodeObject.data.idFull,
                    newTargetNodeObject.data.category,
                    category
                );
                console.log("robokopGet");
                console.log(robokopGet);
                newRenciObject[sanitizedCategory].data = robokopGet;

            }

            return newRenciObject;
    },
    

    // USE renciCatIDObject TO GET THE NORMALIZED NODE INFO
    makeEdges2(){
        // LOOP THROUGH THE CATEGORIES IN renciCatIDObject
        // GET KEYS FROM renciCatIDObject
        let catgories = Object.keys(this.renciCatIDObject);
        for (let i = 0; i < catgories.length; i++) {
            // GO THROUGH THE RENCI DATA BY CATEEGORY AND ADD NODES AND EDGES TO THAT PART OF THE OBJECT
            let categoryData = this.renciCatIDObject[catgories[i]].data;
            this.renciCatIDObject[catgories[i]].edges = []
            this.renciCatIDObject[catgories[i]].edgeIDS = []

            // IF THERE IS DATA IN this.renciCatIDObject[catgories[i]].data THEN LOOP THROUGH IT

            // ########################################################
            //CREATE AND DEDUPE EDGES
            // ########################################################
            for (let j = 0; j < categoryData.length; j++) {
                let data = categoryData[j];
                let sanatizeSubject = this.sanitizeNodeId(data[0].id);
                let sanatizeObject = this.sanitizeNodeId(data[2].id);
                let edgeID = sanatizeSubject + "_" + sanatizeObject;
                let pks = data[1]["biolink:primary_knowledge_source"]
                let edgeSource = sanatizeSubject;
                let edgeTarget = sanatizeObject;

                let edgeData = {
                    group: 'edges',
                    data: {
                        id: edgeID,
                        source: edgeSource,
                        target: edgeTarget,
                        pks: pks,
                    },
                };
                // IF THE EDGE ID IS NOT IN THE ARRAY ADD IT
                if (!this.renciCatIDObject[catgories[i]].edgeIDS.includes(edgeID)) {
                    this.renciCatIDObject[catgories[i]].edgeIDS.push(edgeID);
                    this.renciCatIDObject[catgories[i]].edges.push(edgeData);
                    // this.elements.push({ data: edgeData.data });
                    // this.cy.add({ data: edgeData.data });
                }
                
            }
            
            // ########################################################
            //CREATE AND DEDUPE NODES
            // ########################################################
            // GET THE NODES AND EDGES FROM THE RENCI ARRAY
            // NORMALIZE THEM AND ADD THEM TO THE GRAPH

            // this.getAllRenciIdsAndNormalize(renciCatIDObject[category], category)
        }
        this.renciCatIDObject.nodeIDsCurrent = []

        console.log("this.renciCatIDObject");
        console.log(this.renciCatIDObject);
    },

    // GET THE NODES AND EDGES FROM THE RENCI ARRAY
    // NORMALIZE THEM AND ADD THEM TO THE GRAPH
    async getAllRenciIds(renciData) {
        let newRenciData = global.structuredClone(renciData);

        // GET ALL THE IDS FROM THE RENCI DATA
        let keys = Object.keys(newRenciData);

        // LOOP THROUGH THE RENCI DATA AND GET NODES
        for (let i = 0; i < keys.length; i++) {
            const category = keys[i];
            let categoryData = newRenciData[category].data;

            let allRenciIds = [];
            for (let i = 0; i < categoryData.length; i++) {
                let renciResult = categoryData[i];
                allRenciIds.push(renciResult[0].id);
                allRenciIds.push(renciResult[2].id);
            }
            
            // DEDUPE THE ARRAY
            allRenciIds = [...new Set(allRenciIds)];
            newRenciData[category].ids = allRenciIds;

        }

        return newRenciData;

    },

    async makeNodes(renciIDData, targetNormNodeData){
        let newRenciIDData = global.structuredClone(renciIDData);
        let newTargetNormNodeData = global.structuredClone(targetNormNodeData);
        let keys = Object.keys(newRenciIDData);
        renciIDData.nodeIDsCurrent = []

        // LOOP THROUGH THE RENCI DATA AND NORMALIZE TO GET DATA FOR NODES
        for (let i = 0; i < keys.length; i++) {
            const category = keys[i];
            // MAKE THE PARENT NODE FOR ALL OF THE NODES IN THE CATEGORY
            // THIS WILL BE USED TO GROUP THE NODES IN THE GRAPH
            let parentNode = {
                group: 'nodes',
                data: {
                    id: category,
                    // parent: newTargetNormNodeData.data.id,
                    name: category,
                    type: 'category',
                    category: category,
                    // parent: 'renci',
                },
            };

            // ADD THE PARENT NODE TO THE OBJECT
            newRenciIDData[category].parentNodes = [parentNode]
            
            // NORMALIZE THE IDS
            let allCatIds = newRenciIDData[category].ids;
            // console.log("allCatIds");
            // console.log(allCatIds);

            // let normalizedArray = await ARSService.getNodeNormArray(allCatIds);
            // console.log("normalizedArray");
            // console.log(normalizedArray);

            // LOOP THROUGH THE NORMALIZED ARRAY AND ADD THE NODES TO AN ARRAY IF THERE IS DATA
            if (allCatIds.length > 0) {
                // REMOVE THE ID FOR THE targetNormNodeData
                let targetNormNodeDataID = newTargetNormNodeData.data.id;
                console.log("targetNormNodeDataID");
                console.log(targetNormNodeDataID);
                let targetNormNodeDataIDIndex = allCatIds.indexOf(targetNormNodeDataID);
                if (targetNormNodeDataIDIndex > -1) {
                    allCatIds.splice(targetNormNodeDataIDIndex, 1);
                }
                // GET THE NORMALIZED DATA
                let normalizedArray = await ARSService.getNodeNormArray(allCatIds);
                // console.log("normalizedArray");
                // console.log(normalizedArray);

                // LOOP THROUGH THE NORMALIZED ARRAY WITH EACH RENCIID AND CREATE AND ADD THE NODE TO THE ARRAY
                // for (let n = 0; n < allCatIds.length; n++) {
                for (let n = 0; n < allCatIds.length && n < 20; n++) {
                // for (let n = 0; n < allCatIds.length; n++) {
                    const renciID = allCatIds[n];
                    let normData = normalizedArray[renciID];
                    
                    //IF NORMDATA IS UNDEFINED THEN SKIP IT
                    if (normData != undefined && !renciIDData.nodeIDsCurrent.includes(renciID)) {
                        // console.log("renciID")
                        // console.log(renciID)
                        // continue;

                        // console.log("normData");
                        // console.log(normData);
                        renciIDData.nodeIDsCurrent.push(renciID)
                        // CHECK TO SEE IF THE NORMALIZED CATEGORY MATCHES THE CATEGORY RENCI HAD
                        // IF IT DOES THEN CREATE PARENT NODE IF NOT ALREADY CREATED AND USE THAT ID FOR THE NODES PARENTID
                        // IF IT DOES NOT MATCH THEN CREATE A NEW NODE WITH THE CATEGORY FROM RENCI
                        // let sanitizedParentID = this.sanitizeNodeId(normData.id);
                        let sanitizedID = this.sanitizeNodeId(normData.id.identifier);
                        let nodeData = {
                            group: 'nodes',
                            data: {
                                id: sanitizedID,
                                idOG: renciID,
                                parentid: category,
                                sourceCat: newRenciIDData[category].category,
                                normName: normData.id.label,
                                name: normData.id.label,
                                normCat: normData.type[0],
                                x: Math.random() * 1000,
                                y: Math.random() * 1000,
                            },
                        };
                        // ADD THE NODE TO THE ARRAY
                        newRenciIDData[category].nodes.push(nodeData);
                    }

                    // IF NODE ID IS ALREADY IN renciIDData.nodeIDsCurrent THEN SKIP IT 
                    // if (renciIDData.nodeIDsCurrent.includes(renciID)) {
                    //     continue;
                    // } else {
                    //     renciIDData.nodeIDsCurrent.push(renciID);
                    // }
                    

                    // if(nodeData.data.sourceCat != nodeData.data.normCat){
                    //     // ADD THE NODE TO THE GRAPH
                    //     // this.cy.add({ data: nodeData.data });
                    //     console.log("nodeData");
                    //     console.log(nodeData);
                    // }
                    // ADD THE NODE ID TO THE ARRAY
                    // this.renciCatIDObject[category].nodeIDS.push(sanitizedID);
                    // ADD THE NODE ID TO THE CURRENT NODE IDS ARRAY
                    // this.renciCatIDObject.nodeIDsCurrent.push(sanitizedID);
                    // ADD THE NODE TO THE GRAPH
                    // this.cy.add({ data: nodeData.data });
                }

            }

        }
        return newRenciIDData;
    },

    sanitizeNodeId(nodeId) {
        // Remove disallowed characters using regular expressions
            const sanitizedNodeId = nodeId.replace(/[^a-zA-Z0-9_-]/g, '_');
            return sanitizedNodeId;
        }
    },
    mounted() { 
    
        cytoscape.use(cola);
        cytoscape.use(klay);
        cytoscape.use(coseBilkent);
        cytoscape.use(dagre);
        document.addEventListener('keydown', this.handleKeyPress);

    },          
    beforeDestroy() {
        // Cleanup Cytoscape instance
        this.cyInstance.destroy();
    },
    beforeUnmount() {
        document.removeEventListener('keydown', this.handleKeyPress);
    },
    computed: {
        cyInstance() {
        return this.$refs.cyto.instance;
        },
        modalCyInstance() {
        return this.$refs.modalCyto.instance;
        },
    },
    
};
</script>

<style>
.graph-container {
    border: 1px solid #ccc;
    padding: 10px;
    display: inline-block;
}

.cy-container {
    width: 800px;
    height: 600px;
}
</style>

// Path: client/src/components/cytoscapeComponents/graph.vue
