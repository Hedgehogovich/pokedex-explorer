import { computed, ref, unref, Ref } from 'vue';
import { openDB } from 'idb';

import { createSharedComposable } from '../utils/createSharedComposable';

import type { PokemonFilterGeneration, PokemonFilterType } from '../types/PokemonFilters';
import type { PokemonListItem } from '../types/PokemonListItem';
import type { Pokemon } from '../types/Pokemon';

const dbName = 'pokedex_explorer_idb';
const storeName = 'favouritesList';
const version = 1;

const useFavouritePokemons = createSharedComposable((
  searchQuery?: Ref<string>,
  selectedType?: Ref<PokemonFilterType | null>,
  selectedGeneration?: Ref<PokemonFilterGeneration | null>
) => {
  const favouritesList = ref<PokemonListItem[]>([]);

  const favouritesListIds = computed(() =>
    unref(favouritesList).reduce((acc, item) => {
      acc[item.id] = true;

      return acc;
    }, {}),
  );
  const filteredFavourites = computed(
    () => {
      const searchQueryValue = unref(searchQuery)
        ?.trim()
        .toLowerCase()
        .replace(/ /g, '-');
      const selectedTypeValue = unref(selectedType);
      const selectedGenerationValue = unref(selectedGeneration);

      return unref(favouritesList).filter(item => {
        return (!searchQueryValue || item.name.includes(searchQueryValue))
          && (!selectedTypeValue || item.types.find(({type}) => type.id === selectedTypeValue.id))
          && (!selectedGenerationValue || item.specy.generation_id === selectedGenerationValue.id);
      });
    }
  )


  function openDatabase() {
    return openDB(dbName, version, {
      upgrade(db) {
        const store = db.createObjectStore(storeName);

        store.createIndex('id', 'id', {unique: true});
      },
    });
  }

  async function initialiseList() {
    const db = await openDatabase();
    const storeItems = await db.transaction(storeName).objectStore(storeName).getAll();

    favouritesList.value = storeItems || [];
  }

  async function getWriteTransactionStore() {
    const db = await openDatabase();
    const tx = db.transaction(storeName, 'readwrite');

    return tx.objectStore(storeName);
  }

  function addToFavouritesList(pokemon: Pokemon) {
    const list = [...unref(favouritesList)];

    list.push(pokemon);
    favouritesList.value = list;
  }

  function removeFromFavouritesList(pokemon: Pokemon) {
    favouritesList.value = unref(favouritesList).filter(item => item.id !== pokemon.id);
  }

  async function addFavouritePokemon(pokemon: Pokemon) {
    addToFavouritesList(pokemon);

    try {
      (await getWriteTransactionStore()).put(pokemon, pokemon.id)
    } catch (e) {
      console.error('useFavouritePokemons error', e);
      removeFromFavouritesList(pokemon);
    }
  }

  async function removeFavouritePokemon(pokemon: Pokemon) {
    removeFromFavouritesList(pokemon);

    try {
      (await getWriteTransactionStore()).delete(pokemon.id)
    } catch (e) {
      console.error('useFavouritePokemons error', e);
      addToFavouritesList(pokemon);
    }
  }

  function isFavouritePokemon(pokemon: Pokemon) {
    return !!unref(favouritesListIds)[pokemon.id];
  }

  function toggleFavouritePokemon(pokemon: Pokemon) {
    return isFavouritePokemon(pokemon)
      ? removeFavouritePokemon(pokemon)
      : addFavouritePokemon(pokemon);
  }

  initialiseList();

  return {
    favouritesList: filteredFavourites,
    toggleFavouritePokemon,
    isFavouritePokemon,
  };
});
export default useFavouritePokemons;
