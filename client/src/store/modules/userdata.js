// import axios from 'axios'
const mongodb = require('mongodb');
// const got = require('got');


const uri = 'mongodb+srv://acrouse123:pinksky860@cluster0.4qgmd.mongodb.net/cluster0?retryWrites=true&w=majority';let email = "acrouse.uab@gmail.com"

const state = {
    userdata: { "_id": { "$oid": "60f1ec34b43af79226b36c2c" }, "first_name": "Andy", "last_name": "Crouse", "email": "acrouse.uab@gmail.com" }



}
const getters = {
    getuserdata: (state) => state.userdata

}


const actions = {
    async fetchUserData(){
        // async fetchUserData({ commit}){
            // let userdata = await drugs.find({chebi_par_id: { $in : chebi_ids }}).project({chebi_par_id:1, molecule_chembl_id: 1, first_approval: 1, pref_name: 1, black_box_warning: 1, availability_type: 1, black_box_warning:1, max_phase:1}).toArray()
        console.log(loadFDACollection)
        const users = await loadFDACollection();
        let userdata = await users.find({chebi_par_id: email}).toArray()
        users.close()
        console.log("actions userdata")
        console.log(userdata)
    }
    
}

// const mutations = {

// }


async function loadFDACollection() {
    const client = await mongodb.MongoClient.connect(
        uri,
        {
            useUnifiedTopology: true
        }
    );
    return client.db('user_data').collection('users');

}
export default {
    state,
    getters,
    actions
}

// export default {
//     state,
//     getters,
//     actions,
//     mutations
// }
