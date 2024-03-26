import type { ArrayElement } from './ArrayElement';
import type { GetPokemonByIdQuery } from '../gql/graphql';

export type Pokemon = ArrayElement<GetPokemonByIdQuery['pokemon']>;
