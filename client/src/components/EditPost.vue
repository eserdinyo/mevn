<template lang="pug">
  .posts
    h1 Edit Post
    .form
      div
        input(type='text', name='title', placeholder='TITLE', v-model='title')
      div
        textarea(rows='15', cols='15', placeholder='DESCRIPTION', v-model='desc')
      div
        button.app_post_btn(@click='updatePost') Update

</template>

<script>
import PostsService from "@/services/PostsService";

export default {
  name: "EditPost",
  data() {
    return {
      title: "",
      desc: ""
    };
  },
  methods: {
    async getPost() {
      const res = await PostsService.getPost({
        id: this.$route.params.id
      });
      this.title = res.data.title;
      this.desc = res.data.desc;
    },
    async updatePost() {
      await PostsService.updatePost({
        id: this.$route.params.id,
        title: this.title,
        desc: this.desc
      });
      this.$router.push({ name: "Posts" });
    }
  },
  mounted() {
    this.getPost();
  }
};
</script>


<style>
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
