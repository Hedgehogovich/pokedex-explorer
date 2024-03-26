<template>
  <v-container>
    <template v-if="result?.pokemon[0]">
      <v-row tag="section" justify-sm="center">
        <v-col cols="12" sm="3" class="pa-sm-3 pa-2">
          <v-breadcrumbs :items="breadcrumbs" class="pa-0"></v-breadcrumbs>
        </v-col>
      </v-row>
      <PokemonDetailsPageHead :pokemon="result.pokemon[0]"/>
      <PokemonDetailsPageDetails :pokemon="result.pokemon[0]"/>
      <v-row tag="section">
        <PokemonDetailsPageStatsTable :items="result.pokemon[0].stats">
          <template #title>Base stats</template>
          <template #default="{item}">
            {{ item.stat.names[0].name }}: {{ item.baseStat }}
          </template>
        </PokemonDetailsPageStatsTable>
        <PokemonDetailsPageStatsTable :items="physicalAttributes">
          <template #title>Physical Attributes</template>
          <template #default="{item}">
            {{ item.name }}: {{ item.value }}
          </template>
        </PokemonDetailsPageStatsTable>
      </v-row>
    </template>
    <ErrorBlock v-else-if="error" :show-home-button="true"/>
    <PokemonDetailsPageNotFound v-else-if="!loading"/>
    <v-overlay
      v-model="loading"
      opacity="0.1"
      class="d-flex justify-center align-center"
    >
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
  </v-container>
</template>

<script setup lang="ts">
  import { useRoute } from 'vue-router';
  import { computed, unref } from 'vue';

  import usePokemonDetailsQuery from '../../composables/usePokemonDetailsQuery';

  const route = useRoute();
  const {result, loading, error} = usePokemonDetailsQuery(Number(route.params.id));

  const breadcrumbs = computed(() => ([
    {
      title: 'Home',
      to: {name: 'PokedexExplorer'},
    },
    {
      title: unref(result)?.pokemon[0]?.specy.names[0].name || '',
      to: {name: 'PokemonDetails', params: {id: unref(result)?.pokemon[0]?.id}},
    },
  ]));
  const physicalAttributes = computed(() => [
    {id: 'weight', name: 'Weight', value: `${unref(result).pokemon[0].weight} kg`},
    {id: 'height', name: 'height', value: `${unref(result).pokemon[0].height} m`},
  ]);
</script>
