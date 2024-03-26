<template>
  <v-row tag="section" justify="space-between">
    <v-col cols="6" class="d-flex justify-sm-center align-center">
      <h2 class="font-weight-bold text-center mr-sm-3 mr-2">
        {{ pokemon.specy.names[0].name }}
      </h2>
      <FavouriteButton size="x-small" :pokemon="pokemon"/>
    </v-col>
    <v-col cols="6" class="d-flex justify-sm-center justify-end align-center ga-sm-2 ga-1 px-sm-4 px-1">
      <v-chip
        v-for="item in pokemon.types"
        :key="item.type.id"
        color="primary"
        class="font-weight-medium"
      >
        {{ item.type.names[0].name }}
      </v-chip>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { Pokemon } from '../../types/Pokemon';

  defineProps<{
    pokemon: Pokemon
  }>();
</script>
