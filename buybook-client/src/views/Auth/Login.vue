<template>
  <div class="form__container">
    <LoginForm />
  </div>
</template>

<script setup lang="ts">
import LoginForm from '@/components/Forms/LoginForm.vue'
</script>

<style lang="scss" scoped>
.form__container {
  height: 100%;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
