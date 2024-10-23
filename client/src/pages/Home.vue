<template>
    <div class="homePage">
        <h3 class="text-h3 pt-5">{{ this.checkDates ? "Комментарии за период" : "Главная страница"}}</h3>
        <v-btn class="my-5" color="indigo-lighten-1" @click="checkDates = !checkDates">{{ this.checkDates ? "К статьям" : "комментарии за период"}}</v-btn>
            <Dates v-if="checkDates"></Dates>
            <div v-else class="articleList">
                <p v-if="isLoading">Загрузка...</p>
                <v-list 
                    v-else 
                    :theme="themeVuetify">
                        <v-list-item 
                            lines="two" 
                            v-for="article in articles.sort((a, b) => { return a.id - b.id })"
                            :key="article.id">
                                <Article 
                                    :articleId="article.id" 
                                    :title="article.articleName" 
                                    :text="article.articleText">
                                </Article>
                                <CommentList 
                                    :articleId="article.id">
                                </CommentList>
                        </v-list-item>
                </v-list>
            </div>
        
    </div>
</template>

<script>
import Article from '@/components/Article.vue';
import CommentList from '@/components/CommentList.vue'
import Dates from '@/components/Dates.vue'
import { mapGetters, mapActions, mapState } from 'vuex';
export default {
    components: { Article, CommentList, Dates },
    data() {
        return {
            checkDates: false,
        }
    },
    computed: {
        ...mapGetters('theme', ['themeVuetify']),
        ...mapState('articles', ['articles', 'isLoading']),
    },
    async created() {
        await this.fetchArticles();
    },
    methods: {
        ...mapActions('articles', ['fetchArticles']),
        SetDates(){
            this.checkDates = !this.checkDates;

        }
    }
}
</script>

<style scoped lang="scss">
.homePage {
    width: 1000px;
    
    @media (max-width: 431px) {
        width: 90%;
    }
}
</style>
