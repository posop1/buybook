<template>
  <div class="home">
    <Loader v-if="status === 'loading'" />
    <Error v-else-if="status === 'error'" />
    <BookList
      :books="booksData?.books"
      v-else
    />
  </div>
</template>

<script setup lang="ts">
import api from '@/api/instance'
import BookList from '@/components/Books/BookList.vue'
import Loader from '@/components/Loader.vue'
import Error from '@/components/Error.vue'
import { IFetchBooks } from '@/types/book'
import { onMounted, ref } from 'vue'

const booksData = ref<IFetchBooks>()
const status = ref('loading')

const fetchBooks = async () => {
  try {
    const { data } = await api.get<IFetchBooks>(`/book`)

    booksData.value = data
    status.value = 'completed'
  } catch (error) {
    status.value = 'error'
  }
}

onMounted(async () => {
  fetchBooks()
})
</script>
