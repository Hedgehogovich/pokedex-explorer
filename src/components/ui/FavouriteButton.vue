<template>
  <v-btn
    @click.prevent="toggleFavouritePokemon(pokemon)"
    :icon="icon"
    :title="buttonTitle"
    flat
    variant="outlined"
    color="secondary"
    v-bind="$attrs"
  ></v-btn>
</template>

<script setup lang="ts">
  import { computed } from 'vue';

  import useFavouritePokemons from '../../composables/useFavouritePokemons';

  import type { Pokemon } from '../../types/Pokemon';

  const props = defineProps<{
    pokemon: Pokemon;
  }>();

  defineOptions({
    inheritAttrs: false
  });

  const {
    toggleFavouritePokemon,
    isFavouritePokemon,
  } = useFavouritePokemons();

  const icon = computed(() => isFavouritePokemon(props.pokemon) ? 'mdi-star' : 'mdi-star-outline');
  const buttonTitle = computed(() => isFavouritePokemon(props.pokemon) ? 'Remove from Favourites' : 'Add to Favourites');
</script>
