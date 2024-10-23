<template>
  <div class="header" :class="{ darkHeader: darkTheme }">
    <div class="nav-links">
        <RouterLink class="link" to="/">
          <v-btn color="indigo-lighten-1">
          Главная
        </v-btn>
        </RouterLink>
        <v-btn variant="plain" @click="setDarkTheme">
          Тема 
          <br>
          {{ themeTitle }}
        </v-btn>
        <RouterLink class="link" to="/addArticle">
          <v-btn color="green-darken-1">
            Добавить статью
          </v-btn>
        </RouterLink>
    </div>
  </div>
</template>

<script>
import { RouterLink } from 'vue-router';
import { mapMutations, mapState } from 'vuex';
export default{
  data(){
    return{ 
        
    }
  },
    computed: {
      ...mapState('theme', ['darkTheme']),
        themeTitle() {
            if (this.darkTheme) {
                return "Тёмная"
            } else {
                return "Светлая"
            }
        }
    },
  methods: {
    ...mapMutations('theme', ['setDarkTheme']),
  }
}
</script>

<style scoped lang="scss">
.header{
  width: 100%;
  height: 60px;
  display: flex;
  justify-content: center;

  .nav-links{
        width: 1000px;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px;
        @media(max-width: 431px) {
        width: 100%;
        .v-btn{
          font-size: 12px;
        }
      }
    }
    
}
.darkHeader{
  background-color: #212121;
  color: white;
}
   

</style>