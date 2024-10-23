<template>
    <v-layout>
      <v-main class="d-flex flex-column align-center">
        <h3 class="text-h3 my-5">Новая статья</h3>
        <ArticleForm v-show="!isSubmited" @submit="isSubmited = $event"></ArticleForm>
        <h5 v-show="isSubmited" class="text-h5">Статья отправлена</h5>
        <v-btn v-show="isSubmited" color="indigo-lighten-1" @click="isSubmited = !isSubmited">Добавить ещё</v-btn>
      </v-main>
    </v-layout>
  </template>
  
  <script>
  import Article from '@/components/Article.vue';
  import ArticleForm from '@/components/ArticleForm.vue';
    export default {
      components: { ArticleForm, Article },
      data() {
        return{
          isSubmited: false,

        }
      }
       

    }
  </script>
  <style>
    .v-list-item {
      cursor: pointer;
    }
  </style>
  