<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <div class="flex flex-col h-screen">
    <SiteHeader />
    <main class="flex-grow w-full"><RouterView /></main>
    <SiteFooter />
  </div>
</template>

<style scoped></style>
