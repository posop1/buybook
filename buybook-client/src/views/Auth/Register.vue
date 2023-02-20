<template>
  <div class="form__container">
    <RegisterForm />
  </div>
</template>

<script setup lang="ts">
import RegisterForm from '@/components/Forms/RegisterForm.vue'
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
