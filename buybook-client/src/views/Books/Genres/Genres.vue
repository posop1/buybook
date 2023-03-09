<template>
  <div class="container">
    <h3 class="title">Жанры</h3>
    <GenreList :genres="genres" />
  </div>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import GenreList from '@/components/Genres/GenreList.vue'
import { TStatus } from '@/types/commonTypes'
import { IGenre } from '@/types/genre'
import { onMounted, ref } from 'vue'

const status = ref<TStatus>('loading')
const genres = ref<IGenre[]>()

const fetchBooks = async () => {
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
  fetchBooks()
})
</script>

<style lang="scss" scoped>
.title {
  text-align: center;
  font-size: 20px;
}
</style>
