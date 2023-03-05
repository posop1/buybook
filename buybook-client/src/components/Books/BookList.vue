<template>
  <div class="book__list">
    <BookItem
      v-for="book in books"
      :key="book._id"
      :book="book"
    />
  </div>
</template>

<script setup lang="ts">
import { IBook } from '@/types/book'
import BookItem from './BookItem.vue'

interface BookListProps {
  books: IBook[] | undefined
}

const { books } = defineProps<BookListProps>()
</script>

<style lang="scss" scoped>
.book__list {
  padding: 20px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}
</style>
