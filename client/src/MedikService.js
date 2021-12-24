import axios from 'axios';

const url = 'api/posts/';

class PostService {


    static postMedik = (url, packet) => {
        console.log("started pingmedik");
        return new Promise(async (resolve, reject) => { // eslint-disable-line
          
          try {
            const res = await axios.post(url, {
              concepts: packet,
    
            });
            const data = res.data;
            // });
    
            // console.log("***2")
            // console.log(data)
            resolve(data);
          } catch (err) {
            reject(err);
          }
        });
      }


    // Get Posts
    static getPost() {
        // /*eslint no-promise-executor-return: "error"*/
        return new Promise( async (resolve, reject) => { // eslint-disable-line
            try {
                const res = await axios.get(url);
                const data = res.data;
                console.log("***2")
                console.log(data)
                resolve(data)
            } catch(err) {
                reject(err)
            }
        });
    }

    // Create Posts
    static insertPost(text) {
        console.dir("insertPost")
        console.dir(text)
        return axios.post(url, {
            text: text
            // name: "test text",
            // email:"sean_bean@gameofthron.es",
            // password:"$2b$12$UREFwsRUoyF0CRqGNK0LzO0HM/jLhgUCNNIJ9RJAqMUQ74crlJ1Vu"
        });
    }
    
    // Delete Posts
    static deletePost(id) {
        return axios.delete(`${url}${id}`)
    }

}


export default PostService;