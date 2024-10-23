<template>
    <v-sheet class="comment">
        <span class="text">{{ new Date(commentDate).toLocaleString() }}</span>
        <div class="comment-items">
            <p class="comment__text">{{ commentText }}</p>
            <div class="icons">
                <editMark class="icon" @click="setSelectedComment(commentIdx)"/>
                <removeMark class="icon" @click="RemoveComment(commentIdx)"/>
            </div>

        </div>
   
    </v-sheet>
    <CommentForm v-if="commentIdx == selectedComment" :commentText="commentText" :commentId="commentIdx"
        @updateCommentList="async () => { await this.fetchComments(articleId); this.getComments() }"></CommentForm>
</template>
<script>
import axios from 'axios';
import { mapActions, mapMutations, mapState } from 'vuex';
import CommentForm from './CommentForm.vue';
import editMark from '../assets/icons/editMark.svg'
import removeMark from '../assets/icons/removeMark.svg'
export default {
    props: ["articleId", "commentIdx", "getComments", "commentText", "commentDate"],
    components: { CommentForm, editMark, removeMark },
    data() {
        return {
        }
    },
    async created() {
    },
    computed: {
        ...mapState('comments', ['selectedComment']),
    },
    methods: {
        ...mapActions('comments', ['fetchComments']),
        ...mapMutations('comments', ['setSelectedComment']),
        async RemoveComment(commentIdx) {
            await axios.delete(`http://localhost:5000/article/${this.articleId}/comment/${commentIdx}`);
            await this.fetchComments(this.articleId);
            this.getComments();
        }
    }
}
</script>
<style scoped lang="scss">
    .comment{
        width: 100%;
        cursor: default;
        display: flex;
        flex-direction: column;

        &-items{
            display: flex;
            justify-content: space-between;
            .icons{
                transition: all 0.3s ease-out;
                display: flex;
                opacity: 0;
                padding: 0px 20px;
                .icon{
                    cursor:pointer;
                    width: 25px;
                    height: 25px;
                    margin-left: 10px
                }
            }
        }
        &__text{
            display: flex;
            justify-content: start;
            gap: 30px
        }
    }
    .comment:hover{
            .icons{
                opacity: 1;
            }
        }
</style>