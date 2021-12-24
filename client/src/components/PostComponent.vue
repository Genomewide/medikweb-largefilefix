<template>
  <div class="container">
    <h1> Latest Posts</h1>
      <div class="create-post">
        <label for="create-post">Say something...
          <input type="text" id="create-post" v-model = "text" placeholder="create a post">
          <button v-on:click="createPost">Post!</button>
        </label>
        </div>    
      <hr>
    <p class="error" v-if="error"> {{error}}</p>
    <p>{{posts.length}}</p>
    <div class="posts-container">
      <div class="post"
      v-for="(post, index) in posts"
      v-bind:item="post"
      v-bind:index="index"
      v-bind:key="post._id"
      v-on:click="deletePost(post._id)"
      >
      <!-- {{`${post.createdAt.getDate()}/${post.createdAt.getMonth()}/${post.createdAt.getFullYear()}`}} -->
      {{`${post.createdAt}`}}
      <p class="text">{{post.name}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import PostService from '../PostService'

export default {
  name: 'PostComponent',
  data() {
    return {
      posts: [],
      error: '',
      text: '',
      mediget: {}
    }
  },
  async created() {
    try {
      this.posts = await PostService.getPost();
      console.log(await PostService.getPost())
    } catch(err) {
      this.error = err.message
    }
     try {
      this.mediget = await PostService.mediget();
      console.log(this.mediget)
    } catch(err) {
      this.error = err.message
    }   
  },
  methods: {
    async createPost(){
      console.log("createpost start");
      await PostService.insertPost(this.text);
      console.log("after postservice.insert");
      this.posts = await PostService.getPost();
    },
    async deletePost(id){
      await PostService.deletePost(id);
      this.posts = await PostService.getPost();
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div.container { max-width: 800px; margin: 0 auto; }

p.error { border: 1px solid #ff5b5f; background-color: #ffc5c1; padding: 10px; margin-bottom: 15px; }

div.post { position: relative; border: 1px solid #5bd658; background-color: #bcffb8; padding: 10px 10px 30px 10px; margin-bottom: 15px; }

div.created-at { position: absolute; top: 0; left: 0; padding: 5px 15px 5px 15px; background-color: darkgreen; }

p.text { font-size: 22px; font-weight: 700; margin-bottom: 0; }
</style>
