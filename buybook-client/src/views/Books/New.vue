<template>
  <div class="container">
    <h3 class="title">Новые книги</h3>
    <BookList :books="books" />
  </div>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import BookList from '@/components/Books/BookList.vue'
import { IBook, IFetchBooks } from '@/types/book'
import { TStatus } from '@/types/commonTypes'
import { onMounted, ref } from 'vue'

const status = ref<TStatus>('loading')
const books = ref<IBook[]>()

const fetchBooks = async () => {
  try {
    status.value = 'loading'
    const { data } = await api.get<IFetchBooks>('/book', {
      params: {
        sortQuery: '-createdAt'
      }
    })

    books.value = data.books
    status.value = 'complete'
  } catch (error) {
    console.log(error)
    status.value = 'error'
  }
}

onMounted(() => {
  fetchBooks()
})
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
}
</style>
