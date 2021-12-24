const express = require('express');
// const mongodb = require('mongodb');
// const got = require('got');

const router = express.Router();
const axios = require('axios')

const EventEmitter = require('events');

class MyEmitter extends EventEmitter {}
const eventEmitter = new MyEmitter();

let conceptsurl = "http://localhost:8080/v2/find-concepts"

let genes = ["NCBIGene:2782",
"NCBIGene:6497",
"NCBIGene:2475",
"NCBIGene:29914",
"NCBIGene:998",
"NCBIGene:255738",
"NCBIGene:3737",
"NCBIGene:3752",
"NCBIGene:4893",
"NCBIGene:2703"]

let genes2 = ["NCBIGene:2782",
"NCBIGene:6497",
"NCBIGene:2475",
"NCBIGene:29914",
"NCBIGene:998",
"NCBIGene:255738",
"NCBIGene:3737",
"NCBIGene:3752",
"NCBIGene:4893",
"NCBIGene:2703",
"NCBIGene:6016",
"NCBIGene:7139",
"NCBIGene:3756",
"NCBIGene:6262",
"NCBIGene:6654",
"NCBIGene:72",
"NCBIGene:23020",
"NCBIGene:90",
"NCBIGene:64135",
"NCBIGene:1123",
"NCBIGene:4780",
"NCBIGene:1290",
"NCBIGene:57520",
"NCBIGene:2335",
"NCBIGene:859",
"NCBIGene:5894",
"NCBIGene:7048",
"NCBIGene:26137",
"NCBIGene:79718",
"NCBIGene:3815",
"NCBIGene:348980",
"NCBIGene:5144",
"NCBIGene:2201",
"NCBIGene:5515",
"NCBIGene:5159",
"NCBIGene:2561",
"NCBIGene:2554",
"NCBIGene:7280",
"NCBIGene:347733",
"NCBIGene:203068",
"NCBIGene:6885",
"NCBIGene:60",
"NCBIGene:5879",
"NCBIGene:2617",
"NCBIGene:8621",
"NCBIGene:10320",
"NCBIGene:2146",
"NCBIGene:51422",
"NCBIGene:10049",
"NCBIGene:6595",
"NCBIGene:7415",
"NCBIGene:7169",
"NCBIGene:23299",
"NCBIGene:7046",
"NCBIGene:1759",
"NCBIGene:25",
"NCBIGene:57582",
"NCBIGene:5979",
"NCBIGene:2746",
"NCBIGene:59",
"NCBIGene:9126",
"NCBIGene:282996",
"NCBIGene:2263",
"NCBIGene:7225",
"NCBIGene:867",
"NCBIGene:775",
"NCBIGene:3736",
"NCBIGene:7132",
"NCBIGene:1108",
"NCBIGene:715",
"NCBIGene:10060",
"NCBIGene:3845",
"NCBIGene:120892",
"NCBIGene:7846",
"NCBIGene:6334",
"NCBIGene:3853",
"NCBIGene:3178",
"NCBIGene:3798",
"NCBIGene:59341",
"NCBIGene:4633",
"NCBIGene:5781",
"NCBIGene:2700",
"NCBIGene:1282",
"NCBIGene:51062",
"NCBIGene:87",
"NCBIGene:5663",
"NCBIGene:801",
"NCBIGene:1778",
"NCBIGene:64423",
"NCBIGene:2562",
"NCBIGene:5604",
"NCBIGene:7369",
"NCBIGene:64127",
"NCBIGene:2775",
"NCBIGene:4094",
"NCBIGene:10381",
"NCBIGene:1107",
"NCBIGene:3857",
"NCBIGene:3868",
"NCBIGene:3872",
"NCBIGene:6774",
"NCBIGene:2670",
"NCBIGene:8405",
"NCBIGene:9241",
"NCBIGene:3759",
"NCBIGene:79092",
"NCBIGene:71",
"NCBIGene:284252",
"NCBIGene:7276",
"NCBIGene:1991",
"NCBIGene:5605",
"NCBIGene:10382",
"NCBIGene:4854",
"NCBIGene:5296",
"NCBIGene:1311",
"NCBIGene:478",
"NCBIGene:5582",
"NCBIGene:1457",
"NCBIGene:551",
"NCBIGene:1917",
"NCBIGene:351",
"NCBIGene:22880",
"NCBIGene:1183",
"NCBIGene:2539"]

let queryData = []
// Get Posts
// USING '/' ACTUALLY MEANS '/API/POSTS' - BC APP.USE('/API/POSTS', POSTS) IN INDEX.JS DIRECTS TO THIS FILE
router.get('/', async (req, res) => {
console.log("made it to synonyms on server")
  // let index = 0
  eventEmitter.on("getSynonyn", async function () {
    let concepts = genes[2]


    try {
      // terms.array.forEach(element => {
          const res = await axios.post(conceptsurl, {
              concepts: concepts
              // name: "test text",
              // email:"sean_bean@gameofthron.es",
              // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
          });
          const data = res.data;                   
      // });

      // console.log("***2")
      // console.log(data)
      console.log(data)
  } catch(err) {
    console.log("there was an error!!!!!!")
    console.log(err)
  }
    
  
  
  
    });

    eventEmitter.emit("getSynonyn", 0)

});


  
  module.exports = router;