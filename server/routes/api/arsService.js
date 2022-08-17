const express = require('express');
const router = express.Router();

// const mongodb = require('mongodb');
// const got = require('got');
const axios = require('axios')
// const parser = require('fast-xml-parser')


let getSynonymsServer = (searchterm) => {
  console.log("#### started getSynonymsServer  - seatrchterm = ", searchterm)
  return new Promise(async (resolve, reject) => { // eslint-disable-line
    let url = 'https://arax.ncats.io/api/arax/v1.2/query'
    try {
      const res = await axios.post(url, query);
      const data = res.data;
      // });

      console.log("***2 getSynonymsServer")
      console.log(data)
      resolve(data);
    } catch (err) {
      reject(err);
    }
  });
}

router.post('/',  (req, res) => {
  console.log("********** posting with query_raw - server side")
  let searchterm = req.body.concepts
  console.log("req.body = ", JSON.stringify(req.body))
  console.log("terms = ", JSON.stringify(terms))

// ################ - trying new - ################

getSynonymsServer(searchterm)
.then((results)=>{
  console.log("################ getSynonymsServer ################")
  console.log(results)
})

 
});

  
  module.exports = router;