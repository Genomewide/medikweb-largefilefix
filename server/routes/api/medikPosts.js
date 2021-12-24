const express = require('express');
const mongodb = require('mongodb');
const request = require('request');

const router = express.Router();

const mediurl = 'http://localhost:8080/query'

const formData = {"message": {
    "query_graph": {
      "nodes": {
        "n0": {
          "id": "UMLS:C0935989"
        },
        "n1": {
          "category": "gene"
        },
        "n2": {
          "id": "UMLS:C0004096"
        }
      },
      "edges": {
        "e0": {
          "predicate": "negatively_regulates",
          "subject": "n0",
          "object": "n1"
        },
        "e1": {
          "predicate": "gene_associated_with_condition",
          "subject": "n1",
          "object": "n2"
        }
    }
    }
    }
}

// const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';

router.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});



// app.get('/', (req, res) => {
//   console.log("medikPosts.js")
//   request(
//     { url: mediurl,
//       form: formData},
//     (error, response, body) => {
//       console.log("body")
//       console.log(body)
//       if (error || response.statusCode !== 200) {
//         return res.status(500).json({ type: 'error', message: err.message });
//       }

//       res.json(JSON.parse(body));
//     }
//   )
// });


request.post(
 {
   url: mediurl,
   form: formData
 },
 function (err, httpResponse, body) {
   console.log(err, body);
   
 }
);

  
  module.exports = router;