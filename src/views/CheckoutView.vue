<template>
  <div v-if="stripe && elements">
    <form @submit.prevent="handleSubmit">
      <div id="payment-element"></div>
      <button
        type="submit"
        class="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        :disabled="loading">
        {{ loading ? 'Processing...' : 'Pay now' }}
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('your-publishable-key-here');

const stripe = ref(null);
const elements = ref(null);
const clientSecret = ref(null);
const loading = ref(false);

onMounted(async () => {
  const res = await fetch('/create-payment-intent', { method: 'POST' });
  const data = await res.json();
  clientSecret.value = data.clientSecret;

  stripe.value = await stripePromise;
  elements.value = stripe.value.elements({ clientSecret: clientSecret.value });

  const paymentElement = elements.value.create('payment');
  paymentElement.mount('#payment-element');
});

async function handleSubmit() {
  loading.value = true;

  const result = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: 'https://yourdomain.com/success',
    },
  });

  if (result.error) {
    alert(result.error.message);
    loading.value = false;
  }
}
</script>
