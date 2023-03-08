<template>
  <div class="badge">
    <div class="title">
      <h3>{{ title }}</h3>
      <RouterLink
        to="/new"
        class="link"
        >Подробнее</RouterLink
      >
    </div>
    <hr />
    <div class="book__list">
      <BookItem
        v-for="book in books"
        :key="book._id"
        :book="book"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { IBook } from '@/types/book'
import BookItem from './BookItem.vue'

interface BookBadgeListProps {
  title: string
  books?: IBook[]
}

const { title, books } = defineProps<BookBadgeListProps>()
</script>

<style lang="scss" scoped>
.title {
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    font-size: 16px;
  }
  .link {
    font-size: 16px;
    text-decoration: underline;

    &:hover {
      text-decoration: none;
    }
  }
}
hr {
  margin: 15px 0px;
}
.badge {
  padding: 20px 90px;

  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: column;
}
.book__list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: 30px;
}
</style>
