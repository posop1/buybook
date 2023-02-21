<template>
  <form
    class="form"
    @submit.prevent
  >
    <h3>Вход</h3>
    <div class="inp__container">
      <input
        type="text"
        placeholder="Логин..."
        class="login__inp"
        v-model="username"
      />
    </div>
    <div class="inp__container">
      <input
        :type="isVisiblePassword ? 'text' : 'password'"
        placeholder="Пароль..."
        class="pass__inp"
        v-model="password"
      />
      <button @click="visibleHandler">
        <EyeIcon v-if="!isVisiblePassword" />
        <CloseEyeIcon v-else />
      </button>
    </div>
    <div class="que">
      <RouterLink
        to="/register"
        class="link"
        >Нет аккаунта?
      </RouterLink>
    </div>
    <ValidateError v-if="isValidateError" />
    <span
      v-if="status"
      class="status"
      >{{ status }}</span
    >
    <button
      class="submit"
      @click="submitHandler"
      v-if="!isLoading"
    >
      Войти
    </button>
    <button
      class="submit"
      @click="submitHandler"
      v-else
    >
      <HollowDotsSpinner
        :animation-duration="500"
        :dot-size="15"
        :dots-num="3"
        color="#000"
      />
    </button>
  </form>
</template>

<script setup lang="ts">
import { HollowDotsSpinner } from 'epic-spinners'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import CloseEyeIcon from '@/components/icons/CloseEyeIcon.vue'
import ValidateError from './ValidateError.vue'
import { ref, watch } from 'vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'
import { useRouter } from 'vue-router'

const store = useStore(key)
const router = useRouter()

const isVisiblePassword = ref(false)
const isValidateError = ref(false)
const isLoading = ref(false)

const username = ref('')
const password = ref('')
const status = ref('')

const visibleHandler = () => {
  isVisiblePassword.value = !isVisiblePassword.value
}

const submitHandler = async () => {
  if (!username.value || !password.value) {
    isValidateError.value = true
    return
  } else {
    isValidateError.value = false
    isLoading.value = true

    await store.dispatch('loginUser', { username: username.value, password: password.value })

    isLoading.value = false
  }

  password.value = ''
  username.value = ''
  status.value = store.getters.getUserStatus
}

watch(
  () => localStorage.getItem('token'),
  () => router.push('/'),
  { deep: true }
)
</script>

<style lang="scss" scoped>
.form {
  background: #080808;
  padding: 15px;
  border-radius: 10px;

  max-width: 400px;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    text-align: center;
    font-size: 25px;
  }

  input {
    background: none;
    border: none;
    outline: none;
    font-size: 14px;
    font-family: 'Roboto', sans-serif;

    width: 100%;
  }

  .inp__container {
    background: white;
    padding: 5px 15px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    outline: auto;

    button {
      background: none;
      border: none;
      font-size: 0;
      cursor: pointer;

      transition: 0.2s ease-in-out;

      &:hover {
        opacity: 0.6;
      }
    }
  }

  .login__inp {
    padding: 3px 0px;
  }

  .submit {
    display: flex;
    justify-content: center;
    background: white;
    border: none;
    font-size: 14px;
    max-width: 120px;
    width: 100%;
    align-self: center;

    padding: 8px 15px;

    border-radius: 10px;
    cursor: pointer;

    transition: 0.2s ease-in-out;

    &:hover {
      background: #080808;
      color: white;
    }
  }

  .que {
    .link {
      font-size: 14px;

      &:hover {
        text-decoration: underline;
      }
    }
  }
  .status {
    font-size: 14px;
    color: #f33f3f;
    text-align: center;
  }
}
</style>
