<template>
    <ArticleForm v-if="articleId == selectedArticle">
    </ArticleForm>
    <v-sheet v-else rounded>
        <div class="title mb-5">
            <h5 class="text-h5"> {{ title }}</h5>
            <EditBtn @edit="EditArticle($event)"/>
        </div>
 
    <p class="text-body-3">{{ text }}</p>
    </v-sheet>

</template>

<script>
import axios from 'axios';
import EditBtn from './EditBtn.vue';
import ArticleForm from './ArticleForm.vue';
import { mapActions, mapMutations, mapGetters, mapState } from 'vuex';

    export default{
        components: { ArticleForm, EditBtn },
        props: ["title", "text", "articleId"],
        data(){
            return{
            }
        },
        created(){
        },
        computed: {
            ...mapState('articles', ['selectedArticle', 'deletingArticle'])
        },
        methods: {
        ...mapMutations('articles', ['setSelectedArticle', 'setDeletingArticle']),
        ...mapActions('articles', ['RemoveArticle', 'fetchArticles']),
        
        async EditArticle(operation){
          if(operation == 'editing'){
            this.setSelectedArticle(this.articleId)
          }
          if(operation == 'delete'){
            this.setDeletingArticle(this.articleId)
            await this.RemoveArticle();
            await this.fetchArticles();
          }
        }
        }
    }
</script>

<style scoped lang="scss">
    .v-sheet{
        width: 100%;
        height: auto;
        cursor:default;
        @media (max-width: 431px){
            width: 100%;
        }
        .title{
            display: flex;
            justify-content: space-between;
        }
    }
</style>