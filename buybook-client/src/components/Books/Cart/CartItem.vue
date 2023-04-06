<template>
  <div class="book__item">
    <RouterLink :to="`/book/${book?._id}`">
      <img
        :src="book?.imgUrl"
        alt="image"
        class="image"
      />
    </RouterLink>
    <h5 class="title">{{ book?.title }}</h5>
    <span class="author">{{ book?.author }}</span>
    <div class="genres">
      <RouterLink
        v-if="genres"
        v-for="genre in genres"
        :to="`/genres/${genre._id}`"
        class="genre"
        >{{ genre.name }}
      </RouterLink>
    </div>
    <div class="price__rating__container">
      <span class="price">{{ book?.price }}р.</span>
      <span class="rating"><StarIcon /> {{ book?.rating }}</span>
    </div>
    <button
      class="btn"
      @click="removeHandler"
    >
      Удалить из корзины
    </button>
  </div>
</template>

<script setup lang="ts">
import { IBook } from '@/types/book'
import StarIcon from '@/components/icons/StarIcon.vue'
import { onMounted, ref } from 'vue'
import { IGenre } from '@/types/genre'
import api from '@/api/instance'
import { key } from '@/store/store'
import { useStore } from 'vuex'

interface CartItemProps {
  book: IBook
}

const { book } = defineProps<CartItemProps>()
const store = useStore(key)

const genres = ref<IGenre[]>()

const fetchGenres = async () => {
  try {
    const { data } = await api.get<IGenre[]>(`/book/${book?._id}/genres`)

    genres.value = data
  } catch (error) {
    console.log(error)
  }
}

const removeHandler = () => {
  store.dispatch('removeBookInCart', book)
}

onMounted(() => {
  fetchGenres()
})
</script>

<style scoped lang="scss">
.book__item {
  padding: 15px;
  border-radius: 15px;
  display: flex;
  flex-direction: column;
  background: #080808;
  gap: 8px;

  .image {
    max-width: 230px;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.4;
    }
  }

  .title {
    font-size: 15px;
  }

  .author {
    font-size: 12px;
    opacity: 0.6;
  }

  .genres {
    display: flex;
    gap: 5px;

    .genre {
      font-size: 12px;
      opacity: 0.6;

      transition: 0.2s ease-in-out;

      &:hover {
        opacity: 1;
      }
    }
  }

  .price__rating__container {
    display: flex;
    justify-content: space-between;

    span {
      font-size: 14px;
    }
  }

  .btn {
    border: none;
    background: none;
    color: #fff;
    font-size: 14px;
    font-weight: bold;
    padding: 10px 20px;
    border-radius: 15px;
    cursor: pointer;
    transition: 0.2s ease-in-out;

    &:hover {
      opacity: 0.6;
    }
  }
}
</style>
