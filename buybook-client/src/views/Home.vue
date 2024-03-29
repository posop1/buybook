<template>
  <div class="home">
    <Loader v-if="status === 'loading'" />
    <Error v-else-if="status === 'error'" />
    <div
      v-else
      class="badges"
    >
      <BookBadgeList
        :to="'/new'"
        :title="'Новые книги'"
        :books="newBooks"
      />
      <BookBadgeList
        :to="'/popular'"
        :title="'Популярные книги'"
        :books="popularBooks"
      />
      <GenreBadgeList
        :title="'Жанры'"
        :to="'/genres'"
        :genres="genres"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import BookBadgeList from '@/components/Books/BookBadgeList.vue'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'
import { IBook, IFetchBooks } from '@/types/book'
import { TStatus } from '@/types/commonTypes'
import { ref, onMounted } from 'vue'
import GenreBadgeList from '@/components/Genres/GenreBadgeList.vue'
import { IGenre } from '@/types/genre'

const newBooks = ref<IBook[]>()
const popularBooks = ref<IBook[]>()
const genres = ref<IGenre[]>()

const status = ref<TStatus>('loading')

const fetchNewBooks = async () => {
  try {
    status.value = 'loading'
    const { data } = await api.get<IFetchBooks>('/book', {
      params: {
        limit: 5,
        sortQuery: '-createdAt'
      }
    })

    newBooks.value = data.books
    status.value = 'complete'
  } catch (error) {
    console.log(error)
    status.value = 'error'
  }
}

const fetchPopularBooks = async () => {
  try {
    status.value = 'loading'
    const { data } = await api.get<IFetchBooks>('/book', {
      params: {
        limit: 5,
        sortQuery: '-views'
      }
    })

    popularBooks.value = data.books
    status.value = 'complete'
  } catch (error) {
    console.log(error)
    status.value = 'error'
  }
}

const fetchGenres = async () => {
  try {
    status.value = 'loading'
    const { data } = await api.get<IGenre[]>('/genre')

    genres.value = data
    status.value = 'complete'
  } catch (error) {
    console.log(error)
    status.value = 'error'
  }
}

onMounted(() => {
  fetchNewBooks()
  fetchPopularBooks()
  fetchGenres()
})
</script>

<style scoped lang="scss">
.badges {
  display: flex;
  flex-direction: column;
  gap: 20px;
}
</style>
