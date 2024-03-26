<template>
  <v-row justify="center" class="mt-8">
    <v-col cols="10" sm="5" class="py-0">
      <v-select
        v-model="selectedType"
        label="Type"
        variant="outlined"
        color="primary"
        :item-props="itemProps"
        :items="types"
        clearable
      ></v-select>
    </v-col>
    <v-col cols="10" sm="5" class="py-0">
      <v-select
        v-model="selectedGeneration"
        label="Generation"
        variant="outlined"
        color="primary"
        :item-props="itemProps"
        :items="generations"
        clearable
      ></v-select>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
  import type { PokemonFilterGeneration, PokemonFilterType } from '../../types/PokemonFilters';

  defineProps<{
    types: PokemonFilterType[]
    generations: PokemonFilterGeneration[]
  }>();

  const selectedType = defineModel<PokemonFilterType>('type');
  const selectedGeneration = defineModel<PokemonFilterGeneration>('generation');

  function itemProps(item: PokemonFilterType) {
    return {title: item.names[0].name};
  }
</script>
