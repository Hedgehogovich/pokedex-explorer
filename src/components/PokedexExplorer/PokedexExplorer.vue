<template>
  <v-container class="pa-2 pa-sm-4">
    <v-row tag="section" justify="center" class="hidden-xs">
      <v-col tag="p" cols="11" sm="8" class="text-justify">
        Welcome to Pokedex Explorer, your gateway to the enchanting world of Pokémon!
        Dive into our comprehensive database to uncover fascinating facts and captivating illustrations of every Pokémon imaginable.
      </v-col>
    </v-row>
    <v-row tag="section" justify="center">
      <v-col cols="11" sm="8">
        <PokedexExplorerSearch
          @change="updateSearchQuery"
          :debounce-time="300"
        />
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" class="py-0">
        <PokedexExplorerTabs v-model="currentTab"/>
      </v-col>
    </v-row>
    <PokedexExplorerFilters
      v-model:type="selectedType"
      v-model:generation="selectedGeneration"
      :types="filtersResult?.types || []"
      :generations="filtersResult?.generations || []"
    />
    <v-row tag="section" justify="center" v-if="selectedPokemonsList">
      <v-col cols="12">
        <v-infinite-scroll
          :onLoad="load"
          :empty-text="emptyText"
          class="overflow-y-hidden"
        >
          <v-container>
            <v-row>
              <PokedexExplorerItem
                v-for="pokemon in selectedPokemonsList"
                :key="pokemon.id"
                :pokemon="pokemon"
              />
            </v-row>
          </v-container>
        </v-infinite-scroll>
      </v-col>
    </v-row>
    <v-row v-else-if="loading">
      <v-container>
        <v-row>
          <v-col v-for="n in 18" cols="12" md="4" sm="6">
            <v-skeleton-loader :key="n" type="list-item-avatar-two-line"></v-skeleton-loader>
          </v-col>
        </v-row>
      </v-container>
    </v-row>
    <ErrorBlock v-else-if="error" :show-home-button="false"/>
  </v-container>
</template>

<script setup lang="ts">
  import { computed, ref, unref, watch } from 'vue';

  import useFavouritePokemons from '../../composables/useFavouritePokemons';
  import usePokemonsQuery from '../../composables/usePokemonsQuery';
  import usePokemonFilters from '../../composables/usePokemonFilters';

  import { TabTypes } from '../../enums/TabTypes';
  import type { PokemonFilterGeneration, PokemonFilterType } from '../../types/PokemonFilters';

  const searchQuery = ref<string>('');
  const currentTab = ref<TabTypes>(TabTypes.ALL_TAB);
  const selectedType = ref<PokemonFilterType>(null);
  const selectedGeneration = ref<PokemonFilterGeneration>(null);

  const {
    result,
    loading,
    error,
    loadMore,
    resetOffset,
  } = usePokemonsQuery(searchQuery, selectedType, selectedGeneration);
  const {result: filtersResult} = usePokemonFilters();

  const {
    favouritesList,
  } = useFavouritePokemons(searchQuery, selectedType, selectedGeneration);

  const selectedPokemonsList = computed(() =>
    unref(currentTab) === TabTypes.ALL_TAB
      ? unref(result)?.pokemons
      : unref(favouritesList),
  );
  const emptyText = computed(() =>
    unref(selectedPokemonsList).length ? '' : 'No pokemons found.',
  );

  function updateSearchQuery(val: string) {
    searchQuery.value = val;
  }

  function load({done}: { done: (status: 'ok' | 'empty') => void }) {
    if (unref(currentTab) === TabTypes.FAVOURITES_TAB) {
      done('empty');
      return;
    }

    return loadMore(done);
  }

  watch(currentTab, (val) => {
    if (val !== TabTypes.ALL_TAB) {
      resetOffset();
    }
    selectedGeneration.value = null;
    selectedType.value = null;
  });
</script>
