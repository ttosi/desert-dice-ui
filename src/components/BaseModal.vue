<template>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center bg-black opacity-50"></div>
  <div
    v-if="show"
    class="fixed inset-0 z-50 flex items-center justify-center"
    @click.self="emitClose">
    <div class="relative w-full p-3 max-w-md rounded-lg bg-desert-light text-desert-dark">
      <div class="flex items-start justify-center pb-3">
        <h3 class="text-xl font-bold font-[Cinzel] flex justify-center">
          <div>{{ title }}</div>
        </h3>
      </div>
      <div class="flex justify-center">
        <slot class=""></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: Boolean,
  title: String,
});
const emit = defineEmits(['close', 'confirm']);
const emitClose = () => emit('close');
</script>
