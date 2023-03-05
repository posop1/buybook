<template>
  <div class="sidebar">
    <div class="header">
      <RouterLink
        to="/"
        class="logo"
      >
        <h1>BuyBook</h1>
      </RouterLink>
      <hr />
      <div v-if="store.getters.checkAuth === true">
        <button
          class="sub__link"
          @click="() => store.dispatch('logout')"
        >
          <Logout />
        </button>
        <RouterLink
          to="/favorite"
          class="sub__link"
        >
          <FavoriteBookIcon />
        </RouterLink>
        <RouterLink
          to="/cart"
          class="sub__link"
        >
          <CartIcon />
        </RouterLink>
      </div>
      <div v-else>
        <RouterLink
          to="/login"
          class="sub__link"
        >
          <LogInIcon />
        </RouterLink>
      </div>
    </div>
    <hr />
    <RouterLink
      to="/"
      class="link"
      active-class="active__link"
    >
      <span><HomeIcon /></span>
      Главная
    </RouterLink>
    <RouterLink
      to="/favorite"
      class="link"
      active-class="active__link"
      v-if="store.getters.checkAuth"
    >
      <span><MyBookIcon /></span>
      Мои книги
    </RouterLink>
    <RouterLink
      to="/popular"
      class="link"
      active-class="active__link"
    >
      <span><PopularIcon /></span>
      Популярное
    </RouterLink>
    <RouterLink
      to="/new"
      class="link"
      active-class="active__link"
    >
      <span><EyeIcon /></span>
      Новое
    </RouterLink>
    <RouterLink
      to="/genres"
      class="link"
      active-class="active__link"
    >
      <span><GenresIcon /></span>
      Жанры
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import LogInIcon from '@/components/icons/LogInIcon.vue'
import FavoriteBookIcon from '@/components/icons/FavoriteBookIcon.vue'
import CartIcon from '@/components/icons/CartIcon.vue'
import HomeIcon from '@/components/icons/HomeIcon.vue'
import MyBookIcon from '@/components/icons/MyBookIcon.vue'
import PopularIcon from '@/components/icons/PopularIcon.vue'
import GenresIcon from '@/components/icons/GenresIcon.vue'
import EyeIcon from '@/components/icons/EyeIcon.vue'
import Logout from '@/components/icons/Logout.vue'
import { useStore } from 'vuex'
import { key } from '@/store/store'

const store = useStore(key)
</script>

<style lang="scss" scoped>
.sidebar {
  position: fixed;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
  background: #080808;
  padding: 15px 25px;
  max-width: 280px;
  width: 100%;
}

.header {
  width: 100%;
  justify-content: space-between;
  background: #080808;

  .logo {
    h1 {
      font-size: 32px;
      color: #f33f3f;
      font-weight: bold;
      margin-bottom: 20px;
    }
  }
  div {
    padding-top: 20px;
    display: flex;
    align-items: center;
    gap: 35px;
  }

  .sub__link {
    transition: 0.2s ease-in-out;
    background: none;
    border: none;
    color: white;
    cursor: pointer;
    &:hover {
      opacity: 0.6;
    }
  }
}
hr {
  opacity: 0.6;
}
.link {
  padding: 10px 15px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  margin-bottom: 5px;
  gap: 10px;
  cursor: pointer;

  transition: 0.2s ease-in-out;

  span {
    font-size: 0px;
  }

  &:hover {
    background: #1f1f1f;
  }
}
.active__link {
  background: #1f1f1f;
}
</style>
