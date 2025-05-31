<template>
  <footer class="mt-8">
    <div class="flex justify-center">
      <div class="py-3 border-t border-slate-400 w-2/3"></div>
    </div>
    <div class="flex flex-col md:flex-row gap-8 mx-8 mb-8 justify-center">
      <RouterLink to="/contact">
        <div class="flex items-center">
          <img src="@/assets/logos/email.svg" class="w-8 mr-2" />
          <div class="font-bold">Contact</div>
        </div>
      </RouterLink>
      <RouterLink to="/#">
        <div class="flex items-center">
          <img src="@/assets/logos/instagram.svg" class="w-8 mr-2" />
          <div class="font-bold">Instagram</div>
        </div>
      </RouterLink>
      <RouterLink to="/#">
        <div class="flex items-center">
          <img src="@/assets/logos/facebook.svg" class="w-8 mr-2" />
          <div class="font-bold">Facebook</div>
        </div>
      </RouterLink>
      <RouterLink to="/#">
        <div class="flex items-center">
          <img src="@/assets/logos/bluesky.svg" class="w-8 mr-2" />
          <div class="font-bold">Bluesky</div>
        </div>
      </RouterLink>
      <RouterLink to="/#">
        <div class="flex items-center">
          <img src="@/assets/logos/x.svg" class="w-8 mr-2" />
          <div class="font-bold">X</div>
        </div>
      </RouterLink>
      <RouterLink to="/#">
        <div class="flex items-center">
          <img src="@/assets/logos/youtube.svg" class="w-8 mr-2" />
          <div class="font-bold">YouTube</div>
        </div>
      </RouterLink>
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped></style>
