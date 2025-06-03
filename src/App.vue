<script setup>
import { RouterView } from 'vue-router';
import SiteHeader from './components/SiteHeader.vue';
import SiteFooter from './components/SiteFooter.vue';
</script>

<template>
  <!-- <div class="flex flex-col h-screen"> -->
  <v-app>
    <SiteHeader />
    <main class="flex-grow w-full mt-16"><RouterView /></main>
    <SiteFooter />
  </v-app>
  <!-- </div> -->
</template>

<style scoped></style>
