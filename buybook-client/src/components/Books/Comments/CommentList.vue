<template>
  <div class="list">
    <CommentItem
      v-for="comment in props.comments"
      :comment="comment"
      :key="comment._id"
    />
  </div>
</template>

<script setup lang="ts">
import { IComment } from '@/types/book'
import CommentItem from '@/components/Books/Comments/CommentItem.vue'

interface CommentListProps {
  comments: IComment[]
}

const props = defineProps<CommentListProps>()
</script>

<style scoped lang="scss">
.list {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
