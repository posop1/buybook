<template>
  <form
    class="form"
    @submit.prevent
  >
    <h3>Регистрация</h3>
    <div class="inp__container">
      <input
        type="text"
        placeholder="Логин..."
        class="login__inp"
        v-model="login"
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
    <div class="inp__container">
      <input
        type="password"
        placeholder="Повторите пароль..."
        class="login__inp"
        v-model="repeatPassword"
      />
    </div>
    <div class="que">
      <RouterLink
        to="/login"
        class="link"
        >Уже есть аккаунт?
      </RouterLink>
    </div>
    <ValidateError v-if="isValidateError" />
    <button
      class="submit"
      @click="submitHandler"
    >
      Войти
    </button>
  </form>
</template>

<script setup lang="ts">
import EyeIcon from '@/components/icons/EyeIcon.vue'
import CloseEyeIcon from '@/components/icons/CloseEyeIcon.vue'
import ValidateError from './ValidateError.vue'
import { ref } from 'vue'

const isVisiblePassword = ref(false)
const isValidateError = ref(false)

const login = ref('')
const password = ref('')
const repeatPassword = ref('')

const visibleHandler = () => {
  isVisiblePassword.value = !isVisiblePassword.value
}

const submitHandler = () => {
  if (!login.value || !password.value) {
    isValidateError.value = true
    return
  } else if (password.value !== repeatPassword.value) {
    isValidateError.value = true
    return
  } else {
    isValidateError.value = false
  }

  //TODO: Доделать логин и регистарцию (vuex)

  password.value = ''
  login.value = ''
  repeatPassword.value = ''
}
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
}
</style>
