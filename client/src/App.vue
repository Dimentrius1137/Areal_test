<template>
  <Header></Header>
  <div class="content" :class="{ darkContent: darkTheme }">
    <RouterView v-cloak></RouterView>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { RouterView } from 'vue-router'
import Header from '@/components/Header.vue'
export default{
  components: { Header },
  data(){
    return{
    }
  },
  computed: {
    ...mapState('theme', ['darkTheme']),
  }
}
</script>

<style scoped lang="scss">
    [v-cloak]{
      display: none;
    }
  .content{
    width: 100%;
    background-color: #E0E0E0;
    min-height: calc(100% - 60px);
    height: auto;
    display: flex;
    justify-content: center;
  }
  .darkContent{
    background-color:rgba(18,18,18, 0.9);
    color: white;
  }
</style>
