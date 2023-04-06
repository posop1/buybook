<template>
  <div class="container">
    <div class="inner">
      <CartList :books="books" />
      <div class="info">
        <h3>Корзина</h3>
        <button>Оплатить</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
//TODO: complete cart

import { useStore } from 'vuex'
import { key } from '@/store/store'
import { ref } from 'vue'
import { IBook } from '@/types/book'
import CartList from '@/components/Books/Cart/CartList.vue'

const store = useStore(key)

const books = ref<IBook[]>(store.getters.getBooksInCart)
</script>

<style lang="scss" scoped>
.inner {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
}

.info {
  background: #080808;
  max-width: 300px;
  width: 100%;
  padding: 20px;
  display: flex;
  align-items: center;
  gap: 20px;
  flex-direction: column;
  border-radius: 10px;

  button {
    border: none;
    background: #fff;
    color: #080808;
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
