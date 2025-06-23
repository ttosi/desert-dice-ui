# Desert Dice UI

Frontend for [Desert Dice Company](https://desertdiceco.com)

Built using Vue 3, Tailwind CSS, and Vite. Optimized for desktop and mobile shopping with Stripe integration and a smooth checkout flow.

---

## 🧰 Tech Stack

- **Vue 3** + **Pinia** for state management
- **TailwindCSS** for styling
- **Vite** for blazing-fast dev and builds
- **Vue Router** for navigation
- **Stripe.js** for secure payments
- **Vue 3 Carousel** for featured products

---

## 🏗️ Project Structure

```
desert-dice-ui/
├── public/                   # Static files (favicon, etc.)
├── src/
│   ├── assets/               # Images and CSS
│   ├── components/           # Shared UI components
│   ├── pages/                # Page views (Home, Checkout, etc.)
│   ├── router/               # Vue Router setup
│   ├── services/             # API wrappers
│   ├── stores/               # Pinia stores
│   ├── App.vue               # Root component
│   └── main.js               # App bootstrapping
├── vite.config.js
└── index.html
```

---

## 📦 Scripts

```bash
npm run dev           # Start dev server
npm run build:dev     # Build using development config
npm run build:staging # Build for staging
npm run build:prod    # Build for production
```

---

## 🔐 Stripe Integration

Uses `@stripe/stripe-js` and `vue-stripe-js` to securely collect payment details during checkout.

- No card data touches your backend
- Stripe keys are injected via `.env` on the backend

---

## 🧪 Dev Notes

- `vue3-carousel` used for banner/featured sections
- Custom Cinzel fonts and icon packs via `@iconify/vue`
- Tailwind + responsive layout utilities used throughout
- Cart stored in local storage — no login system

---

## 📝 License

MIT © Desert Dice Company
