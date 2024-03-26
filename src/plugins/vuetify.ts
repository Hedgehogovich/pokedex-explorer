import '@mdi/font/css/materialdesignicons.css';
import 'vuetify/styles';
import colors from 'vuetify/util/colors';
import { createVuetify } from 'vuetify';

export default createVuetify({
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: colors.blue.darken1,
          secondary: colors.blue.lighten1,
          background: colors.grey.lighten5,
          surface: colors.grey.lighten5,
        },
      },
    },
  },
});
