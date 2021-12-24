const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// const https = require('https');

const app = express();

console.log("this is the server")

//middleware
app.use(bodyParser.json());
app.use(cors());

// connect to posts file in other folder
const posts = require('./routes/api/posts')
const concepts = require('./routes/api/concepts')
const medikQuery = require('./routes/api/medikQuery')
const chembl = require('./routes/api/mongoChembl')
const synonyms = require('./routes/api/synonyms')
const query = require('./routes/api/query')
const query_raw = require('./routes/api/query_raw')
const mongoumls = require('./routes/api/mongoUMLS')
const synonymService = require('./routes/api/synonymService')
const araxService = require('./routes/api/araxService')
// const mediposts = require('./routes/api/medikPosts')

// any route that goes to api/post will be directed to posts
app.use('/api/posts', posts);
app.use('/api/posts/concepts', concepts);
app.use('/api/posts/medikquery', medikQuery);
app.use('/api/posts/chembl', chembl);
app.use('/api/posts/synonyms', synonyms);
app.use('/api/posts/query', query);
app.use('/api/posts/query_raw', query_raw);
app.use('/api/posts/mongoumls', mongoumls);
app.use('/api/posts/synonymservice', synonymService);
app.use('/api/posts/araxservice', araxService);
// app.use('/api/medikposts', mediposts);


// HANDLE PRODUCTIOIN
if(process.env.NODE_ENV === 'production'){
    // Static folder
    app.use(express.static(__dirname + '/public/'))

    // HANDLE SPA - must go below theh post route above
    app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'))
}

// console.log(listEndpoints(app));

const port = process.env.PORT || 5001;

app.listen(port, () => console.log(`Server stared on port ${port}`))
