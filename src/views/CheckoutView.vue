<template>
  <div class="mt-5">
    <div class="m-6 mb-8 max-w-2xl mx-auto">
      <div class="font-[Cinzel] text-desert-dark text-3xl font-bold mb-1">Checkout</div>
      <div>
        <div class="mb-2">
          We use secure payment processing and never store your card details. Your email is only
          used to send order confirmations and shipping updates, and we never share your
          information.
        </div>
        <div>
          At this time, we only ship orders within the United States. If you're outside the U.S. and
          interested in placing an order, please reach out through our
          <router-link class="text-desert-dark">contact form.</router-link>
        </div>
      </div>
    </div>
    <form
      id="payment-form"
      class="flex flex-col gap-8 max-w-2xl mx-auto"
      @submit.prevent="onSubmit">
      <div class="border rounded-lg border-slate-300 px-6 py-4">
        <fieldset class="rounded border-0 w-full">
          <div class="font-bold text-2xl mb-3 font-[Cinzel] text-desert-dark">Shipping Address</div>
          <div class="flex flex-col md:gap-1 mb-3">
            <div class="flex justify-between">
              <label>Email Address</label>
              <div class="text-red-500 text-sm pt-0.5">{{ emailError }}</div>
            </div>
            <input
              v-model="email"
              type="email"
              placeholder="Email Address"
              class="form-input w-full" />
          </div>
          <div class="flex flex-col md:flex-row md:gap-4 mb-3">
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <label>First Name</label>
                <div class="text-red-500 text-sm">{{ firstNameError }}</div>
              </div>
              <input v-model="firstName" placeholder="First Name" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <label>Last Name</label>
                <div class="text-red-500 text-sm">{{ lastNameError }}</div>
              </div>
              <input v-model="lastName" placeholder="Last Name" class="form-input w-full" />
            </div>
          </div>
          <div class="flex flex-col md:gap-1 mb-3">
            <div class="flex justify-between">
              <label>Street Address</label>
              <div class="text-red-500 text-sm">{{ addressError }}</div>
            </div>
            <input v-model="address" placeholder="Street Address" class="form-input w-full" />
          </div>
          <div class="flex flex-col md:flex-row md:gap-4">
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <label>City</label>
                <div class="text-red-500 text-sm">{{ cityError }}</div>
              </div>
              <input v-model="city" placeholder="City" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <label>State</label>
                <div class="text-red-500 text-sm">{{ stateError }}</div>
              </div>
              <input v-model="state" placeholder="State" class="form-input w-full" />
            </div>
            <div class="flex flex-col w-full">
              <div class="flex justify-between">
                <label>Zip</label>
                <div class="text-red-500 text-sm">{{ zipError }}</div>
              </div>
              <input v-model="zip" placeholder="Zip" class="form-input w-full" />
            </div>
          </div>
        </fieldset>
      </div>
      <div class="border rounded-lg border-slate-300 px-6 pt-4">
        <legend class="font-bold text-2xl mb-4 font-[Cinzel] text-desert-dark">
          Payment Details
        </legend>
        <div id="payment-element"></div>
        <div v-if="errorMessage" class="text-red-600 my-4 text-sm text-center">
          {{ errorMessage }}
        </div>
      </div>
      <div class="flex justify-end">
        <button
          id="submit"
          type="submit"
          :disabled="loading || !stripe"
          class="w-full sm:w-1/2 px-4 py-2 bg-desert-dark text-desert-light font-bold rounded-md h-12 cursor-pointer">
          {{ loading ? 'Processing…' : 'Submit Order' }}
        </button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useForm, useField } from 'vee-validate';
import * as yup from 'yup';
import { loadStripe } from '@stripe/stripe-js';

const router = useRouter();

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUB_KEY);
const baseUrl = import.meta.env.VITE_API_BASE_URL;
const stripe = ref(null);
const elements = ref(null);
const stripeLoaded = ref(false);

const loading = ref(false);
const errorMessage = ref('');

const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  city: yup.string().required('City is required'),
  state: yup.string().required('State is required'),
  zip: yup.string().required('Zip is required'),
});

const { handleSubmit } = useForm({ validationSchema: schema });

const { value: email, errorMessage: emailError } = useField('email');
const { value: firstName, errorMessage: firstNameError } = useField('firstName');
const { value: lastName, errorMessage: lastNameError } = useField('lastName');
const { value: address, errorMessage: addressError } = useField('address');
const { value: city, errorMessage: cityError } = useField('city');
const { value: state, errorMessage: stateError } = useField('state');
const { value: zip, errorMessage: zipError } = useField('zip');

onMounted(async () => {
  stripe.value = await stripePromise;

  const res = await fetch(`${baseUrl}/create-payment-intent`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ amount: 2000 }),
  });

  const { clientSecret } = await res.json();

  // Lock country to 'US'
  elements.value = stripe.value.elements({
    clientSecret,
    defaultValues: {
      billingDetails: {
        address: {
          country: 'US',
        },
      },
    },
  });

  // Create the payment element and hide the country selector
  const paymentElement = elements.value.create('payment', {
    fields: {
      billingDetails: {
        address: {
          country: 'never', // hides the country dropdown
        },
      },
    },
  });

  paymentElement.mount('#payment-element');
  stripeLoaded.value = true;
});

const onSubmit = handleSubmit(async () => {
  loading.value = true;
  errorMessage.value = '';

  const result = await stripe.value.confirmPayment({
    elements: elements.value,
    confirmParams: {
      return_url: window.location.href,
    },
    redirect: 'if_required',
  });

  console.log('Stripe response:', result);

  if (result.error) {
    errorMessage.value = result.error.message;
    console.warn('Stripe error:', result.error);
  } else {
    console.log('Payment succeeded (if not redirected)');
    router.push('/checkoutsuccess');
    // Payment was successful OR redirected — you could optionally handle something here
  }

  loading.value = false;
});
</script>

<style scoped>
label {
  margin-left: 8px;
}
</style>
