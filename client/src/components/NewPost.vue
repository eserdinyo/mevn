<template lang="pug">
 .posts
    h1 Add Post
    .form
      div
        input(type='text', name='title', placeholder='TITLE', v-model='title')
      div
        textarea(rows='15', cols='15', placeholder='DESCRIPTION', v-model='description')
      div
        button.app_post_btn(@click='addPost') Add

</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  name: "NewPost",
  data() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    async addPost() {
      await PostsService.addPost({
        title: this.title,
        desc: this.description
      });
      this.$router.push({ name: "Posts" });
    }
  }
};
</script>


<style type="text/css">
.form input,
.form textarea {
  width: 500px;
  padding: 10px;
  border: 1px solid #e0dede;
  outline: none;
  font-size: 12px;
}
.form div {
  margin: 20px;
}
.app_post_btn {
  background: #4d7ef7;
  color: #fff;
  padding: 10px 80px;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: bold;
  width: 520px;
  border: none;
  cursor: pointer;
}
</style>