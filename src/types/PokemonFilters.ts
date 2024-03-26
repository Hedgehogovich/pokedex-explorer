import type { ArrayElement } from './ArrayElement';
import type { GetPokemonFiltersQuery } from '../gql/graphql';

export type PokemonFilterType = ArrayElement<GetPokemonFiltersQuery['types']>;
export type PokemonFilterGeneration = ArrayElement<GetPokemonFiltersQuery['generations']>;
