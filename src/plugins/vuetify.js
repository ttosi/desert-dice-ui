// src/plugins/vuetify.js
import 'vuetify/styles';
import { createVuetify } from 'vuetify';

import {
  VApp,
  VAppBar,
  VAppBarNavIcon,
  VAppBarTitle,
  VBtn,
  VCard,
  VCardItem,
  VCardText,
  VCardTitle,
  VList,
  VListItem,
  VListItemTitle,
  VNavigationDrawer,
  VSnackbar,
  VSpacer,
  VToolbarTitle,
} from 'vuetify/components';

export const vuetify = createVuetify({
  theme: {
    // defaultTheme: 'light',
    themes: {
      light: {
        colors: {
          primary: '#795548',
          secondary: '#ffcc80',
          'desert-light': '#fbdb93',
          'desert-meduim': '#be5b50',
          'desert-medium-dark': '#8a2d3b',
          'desert-dark': '#641b2e',
          'cactus-medium': '#9ebc8a',
        },
      },
    },
  },
  components: {
    VApp,
    VBtn,
    VAppBar,
    VAppBarNavIcon,
    VAppBarTitle,
    VNavigationDrawer,
    VToolbarTitle,
    VList,
    VListItem,
    VListItemTitle,
    VSpacer,
    VSnackbar,
    VCard,
    VCardTitle,
    VCardText,
    VCardItem,
  },
});
