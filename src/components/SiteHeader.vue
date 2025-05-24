<template>
  <nav class="bg-desert-dark">
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
        <ul
          class="font-bold text-lg flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0">
          <li class="hover:text-desert-meduim">
            <a href="#" class="menu-item">DICE</a>
          </li>
          <li class="hover:text-desert-meduim">
            <a href="#" class="menu-item">DICE BOXES</a>
          </li>
          <li class="hover:text-desert-meduim">
            <a href="#" class="menu-item">JEWELRY</a>
          </li>
          <li class="hover:text-desert-meduim">
            <a href="#" class="menu-item">CUSTOM SETS</a>
          </li>
          <li class="hover:text-desert-meduim">
            <a href="#" class="menu-item"><mdicon name="cart" size="25" /></a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup></script>

<style scoped>
@reference "tailwindcss"
.menu-item {
  @apply block py-2 px-3 rounded-sm md:p-0;
}
</style>
