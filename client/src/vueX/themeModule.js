const themeModule = {
    state: {
        darkTheme: false,
    },
    getters: { 
        themeVuetify(state) {
        if (state.darkTheme) {
            return "dark"
        } else {
            return "light"
        }
    },
        
     },
    mutations: { 
        setDarkTheme(state){
            state.darkTheme = !state.darkTheme;
        },
    },
    actions: { 

     },
    
    namespaced: true,
  }
  export default themeModule