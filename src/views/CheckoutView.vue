<template>
  <div>
    <div class="font-bold text-2xl sm:mt-4 sm:ml-7 pl-9 pb-0 font-[Cinzel] text-desert-dark">
      Shipping Address
    </div>
    <form
      id="payment-form"
      class="mt-5 md:ml-7 flex flex-col md:flex-row md:space-x-8"
      @submit.prevent="handleSubmit">
      <!-- Shipping Form Section -->
      <div class="flex md:w-1/2 border mx-5 rounded-lg border-slate-300">
        <fieldset class="mb-6 p-4 rounded border-0 w-full">
          <div class="flex flex-col md:flex-row md:gap-1 md:justify-between mb-3">
            <div class="flex flex-col w-full md:w-1/2">
              <label>First Name</label>
              <input required placeholder="First Name" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full md:w-1/2">
              <label>Last Name</label>
              <input required placeholder="Last Name" class="form-input w-full" />
            </div>
          </div>
          <div class="flex flex-col md:gap-1">
            <label>Street Address</label>
            <input required placeholder="Street Address" class="form-input w-full" />
          </div>
          <div class="flex flex-col md:flex-row md:gap-1 md:justify-start">
            <div class="flex flex-col w-full md:w-full">
              <label>City</label>
              <input required placeholder="City" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full md:w-1/3">
              <label>State</label>
              <input required placeholder="State" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full md:w-1/3">
              <label>Zip</label>
              <input required placeholder="Zip" class="form-input w-full" />
            </div>
          </div>
        </fieldset>
      </div>
      <div v-if="errorMessage" class="text-red-600 mt-2">
        {{ errorMessage }}
      </div>
    </form>
    <form
      id="payment-form"
      class="w-full md:ml-7 md:w-2/3 px-5 mt-7"
      @submit.prevent="handleSubmit">
      <!-- <div v-if="stripeLoaded"> -->
      <legend class="font-bold text-2xl mb-2 font-[Cinzel] text-desert-dark">
        Payment Details
      </legend>
      <div id="payment-element"></div>
      <button
        id="submit"
        type="submit"
        :disabled="loading || !stripe"
        class="mt-4 px-4 py-2 bg-blue-600 text-white rounded">
        {{ loading ? 'Processing…' : 'Pay' }}
      </button>
      <div v-if="errorMessage" class="text-red-600 mt-2">
        {{ errorMessage }}
      </div>
      <!-- </div> -->
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY); // Your publishable key
const baseUrl = import.meta.env.VITE_API_BASE_URL;

const stripe = ref(null);
const elements = ref(null);
const stripeLoaded = ref(false);
const errorMessage = ref('');
const loading = ref(false);

onMounted(async () => {
  stripe.value = await stripePromise;
  const res = await fetch(`${baseUrl}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 2000 }), // $20.00
  });

  const { clientSecret } = await res.json();

  elements.value = stripe.value.elements({ clientSecret });
  const paymentElement = elements.value.create('payment');

  stripeLoaded.value = true;
  paymentElement.mount('#payment-element');
});

const handleSubmit = async () => {
  loading.value = true;
  errorMessage.value = '';

  const { error } = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: window.location.href, // you can customize if needed
    },
    redirect: 'if_required',
  });

  if (error) {
    errorMessage.value = error.message;
  } else {
    alert('Payment successful!');
  }

  loading.value = false;
};
</script>

<style scoped>
label {
  margin-left: 8px;
}
</style>
