<template>
    <v-sheet :theme="themeVuetify">
        <v-form @submit.prevent="selectedArticle == 0 ? AddArticle() : ChangeArticle()">
            <v-text-field v-model="title" label="Название"></v-text-field>
            <v-textarea v-model="text" label="Текст статьи" auto-grow resize></v-textarea>
            <v-btn v-if="selectedArticle == 0" color="indigo-lighten-1" type="submit" @click="$emit('submit', true)">Опубликовать</v-btn>
            <div v-else>
                <v-btn color="indigo-lighten-1" type="submit">Сохранить</v-btn>
                <v-btn color="indigo-lighten-1" @click="closeArticleForm()">Закрыть</v-btn>
            </div>
        </v-form>
    </v-sheet>
</template>

<script>
import { mapGetters, mapMutations, mapState } from 'vuex';
import axios from 'axios';
export default {
    data() {
        return {
            title: '',
            text: ''
        }
    },
    created() {
        this.getArticle();
    },
    computed: {
        ...mapGetters('theme', ['themeVuetify']),
        ...mapState('articles', ['selectedArticle', 'deletingArticle']),
    },
    methods: {
        ...mapMutations('articles', ['closeArticleForm']),
        async getArticle() {
            if (this.selectedArticle > 0) {
                try {
                    const article = await axios.get(`http://localhost:5000/article/${this.selectedArticle}`);
                    this.title = article.data.articleName;
                    this.text = article.data.articleText;
                }
                catch (e) {
                    console.log(e)
                }
            }
        },
        async ChangeArticle() {
            try {
                await axios.patch(`http://localhost:5000/article/${this.selectedArticle}`,
                    {
                        "name": this.title,
                        "text": this.text
                    },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                );
                this.$store.commit('articles/closeArticleForm')
                this.$store.dispatch('articles/fetchArticles');
            }
            catch (er) {
                console.log(er)
            }

        },
        async AddArticle() {
            try {
                await axios.post('http://localhost:5000/article', {
                    "name": this.title,
                    "text": this.text
                },
                    {
                        headers: {
                            'Content-Type': 'application/json'
                        },
                    }
                );
        
            }
            catch (er) {
                console.log(er)
            }
            finally{
                this.title = '';
                this.text = ''
            }

        }
    }
}
</script>
<style scoped lang="scss">
.v-sheet {
    width: 1000px;
    min-height: 300px;
    height: auto;
    padding: 30px;

    @media(max-width: 431px) {
        width: 90%;
    }

    .v-btn {
        @media(max-width: 431px) {
            width: 100%;
        }
    }
}
</style>