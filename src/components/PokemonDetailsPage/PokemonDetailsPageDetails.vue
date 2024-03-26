<template>
  <v-row tag="section" justify="center">
    <v-col cols="6" sm="4" class="d-flex justify-center">
      <v-img
        aspect-ratio="1/1"
        min-height="96px"
        min-width="96px"
        :src="pokemon.images[0].sprites"
        :alt="pokemon.specy.names[0].name"
        rounded="lg"
        class="border border-gray-200"
      ></v-img>
    </v-col>
    <v-col cols="12" sm="6" class="pa-sm-3 pa-0">
      <h3 class="font-weight-bold ml-3 ml-sm-4">Abilities</h3>
      <v-list lines="one" tag="ol">
        <v-list-item
          v-for="item in pokemon.abilities"
          tag="li"
          :key="item.ability.id"
          class="px-sm-4 px-3 text-justify"
        >
          <v-list-item-title class="text-wrap" tag="p">
            <span class="font-weight-bold">{{ item.ability.names[0].name }}</span>
            - {{ item.ability.shortEffects[0].shortEffect }}
          </v-list-item-title>
        </v-list-item>
      </v-list>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { Pokemon } from '../../types/Pokemon';

  defineProps<{
    pokemon: Pokemon
  }>();
</script>
