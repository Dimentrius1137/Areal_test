import axios from 'axios';
const articleModule = {
    state: {
      articles: [],
      isLoading: true,
      selectedArticle: 0,
      deletingArticle: 0,
    },
    getters: { 

    },
    mutations: { 

      setSelectedArticle(state, id){
        state.selectedArticle = id;
      },
      closeArticleForm(state){
        state.selectedArticle = 0;
      },
      setDeletingArticle(state, id){
          state.deletingArticle = id
      },   
  
      setLoading(state, load){
        state.isLoading = load;
      },
      setArticles(state, data){
        state.articles = data
      },
    },
    actions: { 
      async fetchArticles({ commit }){
        try{
          const articles = await axios.get('http://localhost:5000/articles');
          commit("setArticles", articles.data);
        }
        catch(e){
          
          console.log(e);
        }
        finally{
          commit("setLoading", false)
        }
      },
      async RemoveArticle({state}){
        await axios.delete(`http://localhost:5000/article/${state.deletingArticle}`);
      } 
     },

    namespaced: true,
  }

export default articleModule;
  