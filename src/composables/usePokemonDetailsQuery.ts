import { useQuery } from '@vue/apollo-composable';

import { graphql } from '../gql';

export default function usePokemonDetailsQuery(id: number) {
  const {
    result,
    loading,
    error,
  } = useQuery(graphql(`
    query getPokemonById($id: Int) {
      pokemon: pokemon_v2_pokemon(where: {id: {_eq: $id}}) {
        id
        name
        weight
        height
        specy: pokemon_v2_pokemonspecy {
          names: pokemon_v2_pokemonspeciesnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
            name
          }
        }
        images: pokemon_v2_pokemonsprites {
          sprites(path: "front_default")
        }
        abilities: pokemon_v2_pokemonabilities {
          ability: pokemon_v2_ability {
            id
            names: pokemon_v2_abilitynames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
              name
            }
            shortEffects: pokemon_v2_abilityeffecttexts(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
              shortEffect: short_effect
            }
          }
        }
        types: pokemon_v2_pokemontypes {
          type: pokemon_v2_type {
            id
            names: pokemon_v2_typenames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
              name
            }
          }
        }
        stats: pokemon_v2_pokemonstats {
          id
          stat: pokemon_v2_stat {
            names: pokemon_v2_statnames(where: {pokemon_v2_language: {name: {_eq: "en"}}}) {
              name
            }
          }
          baseStat: base_stat
        }
      }
    }
  `), {id});

  return {
    result,
    loading,
    error,
  };
}
