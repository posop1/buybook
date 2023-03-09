<template>
  <div class="genre__container">
    <RouterLink
      :to="`/genres/${genre._id}`"
      class="genre"
    >
      <span>{{ genre.name }}</span>
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { IGenre } from '@/types/genre'

interface GenreItemProps {
  genre: IGenre
}

const { genre } = defineProps<GenreItemProps>()
</script>

<style lang="scss" scoped>
.genre__container {
  padding: 20px;
  background: #080808;
  min-width: 300px;
  min-height: 200px;
  border-radius: 10px;
}

.genre {
  width: 100%;
  height: 100%;
  background: #f33f3f;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 5px;

  transition: 0.2s ease-in-out;

  span {
    font-size: 24px;
    font-weight: bold;
  }

  &:hover {
    opacity: 0.6;
  }
}
</style>
