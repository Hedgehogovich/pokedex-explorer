import { createApp, provide, h } from 'vue';
import { DefaultApolloClient } from '@vue/apollo-composable'

import { registerPlugins } from '@/plugins';

import App from './App.vue';

import { apolloClient } from './utils/ApolloClient';


const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
});

registerPlugins(app);

app.mount('#app');
