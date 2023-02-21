<template>
  <Layout />
</template>

<script setup lang="ts">
import Layout from './components/Layout/Layout.vue'
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import { key } from './store/store'

const store = useStore(key)

onMounted(() => {
  store.dispatch('getMe')
})
</script>
