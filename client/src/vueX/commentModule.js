import axios from 'axios';
const commentModule = {
    state: {
        comments: {},
        selectedComment: 0
    },
    getters: {},
    mutations: {
        setSelectedComment(state, payload) {
            state.selectedComment = payload
        },
        setCommentText(state, payload) {
            state.newComment = payload
        },
        setComments(state, data) {
            state.comments = data;
        },
    },
    actions: {
        async fetchComments({ commit }, id) {
            try {
                const data = await axios.get(`http://localhost:5000/article/${id}/comments`);
                const comments = {};
                comments[id] = data.data[0].Comments;
                commit('setComments', comments);
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true,
}

export default commentModule;