<template>
  <div class="comment">
    <div></div>
    <span>{{ props.comment.comment }}</span>
  </div>
</template>

<script setup lang="ts">
import { IComment } from '@/types/book'

interface CommentItemProps {
  comment: IComment
}

const props = defineProps<CommentItemProps>()
</script>

<style scoped lang="scss">
.comment {
  display: flex;
  align-items: center;
  gap: 10px;

  div {
    background: lightgray;
    padding: 10px;
    border-radius: 50px;
  }
}
</style>
