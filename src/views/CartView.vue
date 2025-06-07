<template>
  <section>
    <div class="container mx-auto px-3 mt-5 flex-col md:flex w-full">
      <h1 class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-4">Shopping Cart</h1>

      <div class="md:flex gap-4">
        <div class="w-full md:max-w-3/5">
          <div class="shadow shadow-slate-400 flex rounded-lg p-2 gap-3 mb-4">
            <img
              class="max-h-28 rounded-lg"
              src="http://127.0.0.1:3000/images/dice/20250601_172311-thumbnail.png" />
            <div class="w-full flex-col text-md">
              <div class="flex justify-between">
                <div class="font-bold">Obsidian Rose</div>
                <mdicon name="trash-can" size="20" class="text-slate-500" />
              </div>
              <div>Full Set + 33mm d20 + Resin Case</div>
              <div class="font-bold">$40.00</div>
              <div>Quantity: 1</div>
            </div>
          </div>
          <div class="shadow shadow-slate-400 flex rounded-lg p-2 gap-3">
            <img
              class="max-h-28 rounded-lg"
              src="http://127.0.0.1:3000/images/dice/20250601_172223-thumbnail.png" />
            <div class="flex-col text-md md:text-lg">
              <div class="font-bold">Ocean Sky</div>
              <div>Full Set + Resin Case</div>
              <div class="flex mt-1 justify-between">
                <div class="font-bold">$60.00</div>
              </div>
            </div>
          </div>
        </div>
        <div class="border w-full md:max-w-2/5">summary</div>
      </div>

      <!-- <div
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <a
        href="#"
        class="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow-sm md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img
          class="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
          src="http://127.0.0.1:3000/images/dice/20250601_172311-thumbnail.png"
          alt="" />
        <div class="flex flex-col justify-between p-4 leading-normal">
          <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
            Noteworthy technology acquisitions 2021
          </h5>
          <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">
            Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
            chronological order.
          </p>
        </div>
      </div> -->

      <!-- <v-card class="md:max-w-1/2 flex items-center">
        <v-card-text class="flex">
          <div>
            <img
              class="max-h-[75px] md:max-w-32"
              src="http://127.0.0.1:3000/images/dice/20250601_172311-thumbnail.png" />
            <div class="text-md md:text-lg">
              <div class="font-bold">Obsidian Rose</div>
              <div>Full Set + 33m d20 + Resin Case</div>
              <div class="flex mt-1 justify-between">
                <div class="font-bold">$40.00</div>
                <button><mdicon name="trash-can-outline" /></button>
              </div>
            </div>
          </div>
          <div>d</div>
        </v-card-text>
      </v-card> -->
    </div>
  </section>
</template>

<script setup></script>

<style scoped></style>
