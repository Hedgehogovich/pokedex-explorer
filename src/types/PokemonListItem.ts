import type { ArrayElement } from './ArrayElement';
import type { GetPokemonsQuery } from '../gql/graphql';

export type PokemonListItem = ArrayElement<GetPokemonsQuery['pokemons']>;
