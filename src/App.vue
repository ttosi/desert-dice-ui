<script setup>
import { RouterView, RouterLink } from 'vue-router'
import SiteHeader from './components/SiteHeader.vue'
import SiteFooter from './components/SiteFooter.vue'
</script>

<template>
  <div class="flex flex-col h-screen">
    <SiteHeader class="sticky top-0" />
    <RouterLink to="/">Home</RouterLink>
    <RouterView class="flex-grow w-full" />
    <SiteFooter />
  </div>
</template>

<style scoped></style>
