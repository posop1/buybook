<template>
  <div class="app">
    <div class="main__container">
      <Sidebar />
      <div class="ref__container">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Sidebar from './Sidebar/Sidebar.vue'
import Footer from './Footer/Footer.vue'
</script>

<style lang="scss" scoped>
.app {
  width: 100%;
  height: 100%;
}

.main__container {
  width: 100%;
  display: flex;
  flex-direction: row;
  min-height: 100vh;
}
.ref__container {
  width: 100%;
  margin-left: 280px;
}
</style>
