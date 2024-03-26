import { useQuery } from '@vue/apollo-composable';

import { graphql } from '../gql';

export default function usePokemonFilters() {
  const {result} = useQuery(
    graphql(`
      query getPokemonFilters {
        types: pokemon_v2_type {
          id
          names: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
            name
          }
        }
        generations: pokemon_v2_generation {
          id
          names: pokemon_v2_generationnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
            name
          }
        }
      }
    `),
  );

  return {result};
}
