<template>
  <v-col tag="article" cols="12" md="4" sm="6">
    <v-card
      :to="{name: 'PokemonDetails', params: {id: pokemon.id}}"
      class="mx-auto"
      max-width="300px"
      hover
    >
      <div class="d-flex flex-column flex-md-row justify-space-between">
        <v-img
          aspect-ratio="1/1"
          min-width="96px"
          height="144px"
          :src="pokemon.images[0].sprites"
          :alt="pokemon.specy.names[0].name"
          class="flex-0-1"
        ></v-img>
        <v-divider class="hidden-md"></v-divider>
        <div class="d-flex flex-column justify-space-between flex-1-0 pb-2">
          <v-card-title tag="h2">
            {{ pokemon.specy.names[0].name }}
          </v-card-title>
          <div class="d-flex justify-space-between">
            <v-card-subtitle tag="p" class="d-flex align-center">
              #{{ pokemon.id }}
            </v-card-subtitle>
            <FavouriteButton :pokemon="pokemon" size="x-small" class="mr-2"/>
          </div>
        </div>
      </div>
    </v-card>
  </v-col>
</template>

<script setup lang="ts">
  import type { PokemonListItem } from '../../types/PokemonListItem';

  defineProps<{
    pokemon: PokemonListItem
  }>();
</script>
