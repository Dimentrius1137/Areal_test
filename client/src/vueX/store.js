import { createStore } from "vuex";
import themeModule from "./themeModule";
import articleModule from "./articleModule";
import commentModule from "./commentModule";
const store = createStore({
  modules: {
    theme: themeModule,
    articles: articleModule,
    comments: commentModule
  }
});
export default store