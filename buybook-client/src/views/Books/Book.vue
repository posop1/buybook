<template>
  <div class="container">
    <Loader v-if="status === 'loading'" />
    <div
      class="book"
      v-if="status === 'complete'"
    >
      <img
        :src="book?.imgUrl"
        alt="book image"
        class="book__img"
      />
      <div class="main__container">
        <h2 class="title">{{ book?.title }}</h2>
        <p class="author">{{ book?.author }}</p>

        <p class="rating">
          <StarIcon />
          {{ book?.rating }}
        </p>

        <div class="genres">
          <RouterLink
            v-if="genres"
            v-for="genre in genres"
            :key="genre"
            :to="`/genre/${genre._id}`"
            class="genre"
          >
            {{ genre.name }}
          </RouterLink>
        </div>
        <div class="btn__container">
          <button
            v-if="!isExistInCart"
            class="btn"
            @click="cartHandler"
          >
            Add to Cart
          </button>
          <button
            v-else
            class="btn"
            @click="cartHandler"
          >
            Remove from Cart
          </button>
          <button class="btn icon">
            <HeartIcon />
          </button>
        </div>
        <hr />
        <p class="description">{{ book?.description }}</p>
        <form
          class="form"
          @submit.prevent
        >
          <input
            v-model="comment"
            type="text"
            placeholder="Comment..."
          />
          <button @click="addComment">Add Comment</button>
        </form>
        <CommentList
          v-if="comments"
          :comments="comments"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { IBook, IComment } from '@/types/book'
import { IGenre } from '@/types/genre'
import { TStatus } from '@/types/commonTypes'
import api from '@/api/instance'
import { useRoute } from 'vue-router'
import CommentList from '@/components/Books/Comments/CommentList.vue'
import Loader from '@/components/Loader.vue'
import StarIcon from '@/components/icons/StarIcon.vue'
import HeartIcon from '@/components/icons/HeartIcon.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { removeBookInCart } from '@/store/modules/cart/actions'

const route = useRoute()
const store = useStore(key)

const book = ref<IBook>()
const genres = ref<IGenre[]>()
const comments = ref<IComment[]>()
const status = ref<TStatus>('loading')
const comment = ref('')
const cart = store.getters.getBooksInCart

const isExistInCart = ref(cart.some((i: IBook) => i._id === book.value?._id))

const fetchBook = async () => {
  try {
    status.value = 'loading'

    const { data } = await api.get<IBook>(`/book/${route.params.id}`)

    book.value = data

    status.value = 'complete'
  } catch (e) {
    console.log(e)
    status.value = 'error'
  }
}

const fetchGenres = async () => {
  try {
    status.value = 'loading'

    const { data } = await api.get<IGenre[]>(`/book/${route.params.id}/genres`)
    genres.value = data

    status.value = 'complete'
  } catch (e) {
    console.log(e)
    status.value = 'error'
  }
}

const fetchComments = async () => {
  try {
    status.value = 'loading'

    const { data } = await api.get<IComment[]>(`/book/${route.params.id}/comments`)

    comments.value = data

    status.value = 'complete'
  } catch (e) {
    console.log(e)
    status.value = 'error'
  }
}

const cartHandler = () => {
  if (isExistInCart.value) {
    store.dispatch('removeBookInCart', book.value)
    isExistInCart.value = false
  } else {
    store.dispatch('addBookInCart', book.value)
    isExistInCart.value = true
  }
}

const addComment = async () => {
  try {
    const { data } = await api.post('/comments', {
      bookId: route.params.id,
      comment: comment.value
    })

    comments.value?.push(data)
  } catch (e) {
    console.log(e)
  }
}

onMounted(() => {
  fetchBook()
  fetchGenres()
  fetchComments()
})
</script>

<style scoped lang="scss">
.book {
  display: flex;
  gap: 30px;
}

.book__img {
  height: 600px;
}

.main__container {
  display: flex;
  flex-direction: column;
  gap: 10px;

  .title {
    font-size: 28px;
  }

  .author {
    opacity: 0.6;
  }

  .rating {
  }

  .genres {
    display: flex;
    gap: 15px;

    .genre {
      font-size: 16px;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .description {
    font-size: 16px;
    max-width: 700px;
  }

  .btn__container {
    display: flex;
    gap: 25px;

    .btn {
      font-size: 16px;
      background: #fff;
      border: none;
      color: #080808;
      padding: 8px 15px;
      border-radius: 10px;
      cursor: pointer;
      transition: all 0.3s ease-in-out;

      &:hover {
        opacity: 0.5;
      }
    }

    .icon {
      font-size: 0;
    }
  }

  .form {
    margin-top: 50px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    input {
      width: 100%;
      font-size: 16px;
      border: none;
      border-radius: 10px;
      padding: 7px 15px;
      margin-bottom: 10px;
      transition: all 0.3s ease-in-out;

      &:focus {
        outline: none;
      }
    }

    button {
      width: 100%;
      border: none;
      font-size: 16px;
      border-radius: 10px;
      padding: 7px 0;
      margin-bottom: 10px;
      transition: all 0.3s ease-in-out;
      cursor: pointer;

      &:hover {
        opacity: 0.6;
      }
    }
  }
}
</style>
