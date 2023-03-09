<template>
  <div class="genre__list">
    <GenreItem
      v-for="genre in genres"
      :key="genre._id"
      :genre="genre"
    />
  </div>
</template>

<script setup lang="ts">
import { IGenre } from '@/types/genre'
import GenreItem from './GenreItem.vue'

interface GenreListProps {
  genres: IGenre[] | undefined
}

const { genres } = defineProps<GenreListProps>()
</script>

<style lang="scss" scoped>
.genre__list {
  margin-top: 30px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 50px;
}
</style>
