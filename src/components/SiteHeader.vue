<template>
  <header class="bg-desert-dark">
    <div
      class="font-[Cinzel] text-desert-light max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-3">
      <div class="flex items-center">
        <div><img src="@/assets/logos/small_saguaro.svg" /></div>
        <div class="text-desert-meduim-dark font-bold text-2xl -ml-2.5">Desert Dice Company</div>
      </div>
      <button
        data-collapse-toggle="navbar-default"
        type="button"
        class="inline-flex items-center p-2 justify-center md:hidden focus:outline-none">
        <mdicon name="menu" size="30" />
      </button>
      <div class="hidden w-full md:block md:w-auto" id="navbar-default">
        <ul class="menu">
          <li class="menu-item" v-for="item in menuItems" :key="item.id">
            <a :href="item.route">{{ item.name }}</a>
          </li>
          <li class="menu-item">
            <a href="#">CUSTOM SETS</a>
          </li>
          <li class="menu-item">
            <a href="#"><mdicon name="cart" size="25" /></a>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script setup>
const menuItems = [
  { id: 1, name: 'Dice', route: '' },
  { id: 2, name: 'Dice Cases', route: '' },
  { id: 3, name: 'Jewelry', route: '' },
];
</script>

<style scoped></style>
