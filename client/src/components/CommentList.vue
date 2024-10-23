<template>
    <v-list>
        <v-list-item lines="three" v-for="comment in commentList">
            <Comment 
                :articleId="articleId" 
                :commentIdx="comment.id" 
                :commentText="comment.commentText"
                :commentDate="comment.createdAt"
                :getComments="getComments">
            </Comment>
        </v-list-item>
        <CommentForm style="padding: 0 20px;" @updateCommentList="async () => { await this.fetchComments(articleId); getComments(); }"
            :getComments="getComments" :articleId="articleId">

        </CommentForm>
    </v-list>
</template>
<script>
import CommentForm from './CommentForm.vue';
import { mapActions, mapState } from 'vuex';
import Comment from './Comment.vue';
export default {
    props: ['articleId'],
    components: { Comment, CommentForm },
    data() {
        return {
            isLoading: true,
            commentList: [],
            isEditing: false
        }
    },
    computed: {
        ...mapState('comments', ['comments']),

    },
    async created() {
        await this.fetchComments(this.articleId);
        this.getComments();
        console.log(this.articleId)
    },
    methods: {
        ...mapActions('comments', ['fetchComments', 'AddComment']),
        async getComments() {
            const data = await this.comments[this.articleId];
            this.commentList = data.sort((a, b) => { return a.id - b.id })
        },

    }
}
</script>