<template>
    <v-form @submit.prevent="this.selectedComment == 0 ? AddComment() : ChangeComment(commentId)">
        <v-text-field v-model="comment" label="Комментарий"></v-text-field>
        <v-btn color="indigo-lighten-1" type="submit">Сохранить</v-btn>
    </v-form>
</template>
<script>
import axios from 'axios';
import { mapMutations, mapState, mapActions } from 'vuex';
export default {
    emits: ['updateCommentList'],
    props: ['commentText', 'commentId', 'articleId', 'getComments'],
    data() {
        return {
            comment: ''
        }
    },
    created() {
        this.comment = this.commentText;

    },
    computed: {
        ...mapState('comments', ['selectedComment']),
    },
    methods: {
        ...mapActions('comments', ['fetchComments']),
        ...mapMutations('comments', ['setSelectedComment', 'setCommentText']),
        async AddComment() {
            await axios.post(`http://localhost:5000/article/${this.articleId}/comment`,
                {
                    "text": this.comment
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );
            this.$emit('updateCommentList');
            this.comment = '';
        },
        async ChangeComment(commentIdx) {
            this.setCommentText(this.comment);
            this.setSelectedComment(commentIdx);
            await axios.patch(`http://localhost:5000/article/${this.articleId}/comment/${this.selectedComment}`,
                {
                    "text": this.comment
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                }
            );

            this.setSelectedComment(0);
            this.$emit('updateCommentList');

        },

    }
}
</script>