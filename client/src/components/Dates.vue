<template>
    <div class="dates">
        <v-sheet :theme="themeVuetify" rounded class="dates-card">
            <div class="container-fields">
                <v-text-field label="начало" type="date" v-model="dateFrom"></v-text-field>  
                <v-text-field label="Конец" type="date" v-model="dateTo"></v-text-field>
            </div>

            <v-btn class="dates-card__btn" color="indigo-lighten-1" @click="getCommentsByDates">Найти</v-btn>
        </v-sheet>
        
        <v-sheet :theme="themeVuetify" v-if="isLoad" class="list" rouded>
            Статьи:
            <v-list class="list-article">

                <v-list-item class="list-article__item" v-for="article in articles"><span class="date">{{ new Date(article.createdAt).toLocaleDateString() }}</span>{{article.articleName 
                    }} 

                    <v-list class="list-comment">
                        Комментарии:
                        <v-list-item class="list-comment__item" v-for="comment in article.Comments">{{ comment.commentText}}</v-list-item>
                    </v-list>
                </v-list-item>
            </v-list>
        </v-sheet>
        
    </div>
    
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
    export default{
        data(){
            return{
                dateFrom: null,
                dateTo: null,
                articles: [],
                isLoad: false
            }
        },
        computed: {
            ...mapGetters('theme', ['themeVuetify']),
        },
        methods: {
            async getCommentsByDates(){
                this.isLoad = true;
                const currFormatDFrom = new Date(this.dateFrom).toISOString();
                const currFormatDTo = new Date(this.dateTo).toISOString();
                const commentsData = await axios.get(`http://localhost:5000/analytic/comments?dateFrom=${currFormatDFrom}&dateTo=${currFormatDTo}`);
                this.articles = commentsData.data
            }
        }
    }
</script>
<style scoped lang="scss">
    .dates{
        width: 100%;
        display: flex;
        flex-direction: column;
        &-card{
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-bottom: 30px;
            padding: 20px;
            .container-fields{
                width: 50%;
                display: flex;
                gap: 30px;
                @media(max-width: 431px){
                    width: 70%;
                    flex-direction: column;
                    gap: 0px;
                }
            }
            &__btn{
                width: 100px;
            }
        }
        .list{
            width: 100%;
            padding: 20px;
            font-weight:bolder;
            font-size: 1.25rem;
            &-article{
                .date{
                    font-weight:500;
                    font-size: 1rem;
                    margin-right: 20px;
                }
                &__item{
                    margin-bottom: 10px;
                    font-weight:500;
                    font-size: 1.5rem;
         
                }
            }
            &-comment{
                padding-left: 30px;
                border-bottom: 1px solid #8b8b8b;
                border-top: 1px solid #8b8b8b;
                font-weight:bolder;
                font-size: 1.25rem;
                &__item{
                    font-weight:500;
                    font-size: 1rem;
                }
            }
        }
    }
</style>