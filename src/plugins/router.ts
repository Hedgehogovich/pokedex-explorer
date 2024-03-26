import { createRouter, createWebHistory } from 'vue-router';

import PokedexExplorer from '../components/PokedexExplorer/PokedexExplorer.vue';
import PokemonDetailsPage from '../components/PokemonDetailsPage/PokemonDetailsPage.vue';

const routes = [
  {
    path: '/',
    name: 'PokedexExplorer',
    component: PokedexExplorer,
  },
  {
    path: '/pokemon/:id',
    name: 'PokemonDetails',
    component: PokemonDetailsPage,
  },
];

export const router = createRouter({
  history: createWebHistory('pokedex-explorer'),
  routes,
});
