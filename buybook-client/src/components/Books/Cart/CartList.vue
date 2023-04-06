<template>
  <div class="list">
    <CartItem
      v-for="book in props.books"
      :book="book"
      :key="book._id"
    />
  </div>
</template>

<script setup lang="ts">
import { IBook } from '@/types/book'
import CartItem from './/CartItem'

interface CartListProps {
  books: IBook[]
}

const props = defineProps<CartListProps>()
</script>

<style scoped lang="scss">
.list {
  display: flex;
  gap: 20px;
}
</style>
