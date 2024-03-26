import { computed, Ref, unref } from 'vue';
import { useQuery } from '@vue/apollo-composable';

import { graphql } from '../gql';
import { PokemonFilterGeneration, PokemonFilterType } from '../types/PokemonFilters';

const POKEMONS_LIMIT = 30;

export default function usePokemonsQuery(
  searchQuery: Ref<string>,
  selectedType: Ref<PokemonFilterType>,
  selectedGeneration: Ref<PokemonFilterGeneration>
) {
  const typesFilter = computed(() => {
    return unref(selectedType)
      ? {type_id: {_eq: unref(selectedType).id}}
      : {}
  });
  const generationsFilter = computed(() => {
    return unref(selectedGeneration)
      ? {generation_id: {_eq: unref(selectedGeneration).id}}
      : {}
  });

  const {
    result,
    loading,
    error,
    variables,
    refetch,
    fetchMore,
  } = useQuery(
    graphql(`
      query getPokemons(
        $limit: Int,
        $offset: Int,
        $regex: String,
        $typesFilter: pokemon_v2_pokemontype_bool_exp,
        $generationsFilter: pokemon_v2_pokemonspecies_bool_exp
      ) {
        pokemons: pokemon_v2_pokemon(
          where: {
            pokemon_v2_pokemontypes: $typesFilter,
            name: {_iregex: $regex},
            pokemon_v2_pokemonspecy: $generationsFilter
          },
          limit: $limit,
          offset: $offset
        ) {
          id
          name
          types: pokemon_v2_pokemontypes {
            type: pokemon_v2_type {
              id
            }
          }
          specy: pokemon_v2_pokemonspecy {
            names: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
              name
            }
            generation_id
          }
          images: pokemon_v2_pokemonsprites {
            sprites(path: "front_default")
          }
        }
      }
    `),
    {
      offset: 0,
      limit: POKEMONS_LIMIT,
      regex: searchQuery,
      typesFilter,
      generationsFilter,
    });

  function loadMore(done: (status: 'ok' | 'empty') => void) {
    if (unref(result)?.pokemons.length < POKEMONS_LIMIT) {
      done('empty');
      return;
    }

    return fetchMore({
      variables: {
        offset: unref(result)?.pokemons.length || 0,
      },
      updateQuery: (previousResult, {fetchMoreResult}) => {
        if (
          !fetchMoreResult?.pokemons.length
          || fetchMoreResult.pokemons.length < POKEMONS_LIMIT
        ) {
          done('empty');
          return previousResult;
        }

        done('ok');
        return {
          pokemons: [
            ...previousResult.pokemons,
            ...fetchMoreResult.pokemons,
          ],
        };
      },
    });
  }

  function resetOffset() {
    variables.value.offset = 0;
    refetch();
  }

  return {
    result,
    loading,
    error,
    loadMore,
    resetOffset,
  };
}
