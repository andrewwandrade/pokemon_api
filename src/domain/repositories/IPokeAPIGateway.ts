import { PokemonStat } from '@domain/entities/capture';

export interface PokeApiPokemon {
  pokedexId: number;
  name: string;
  imageUrl: string | null;
  types: string[];
  stats: PokemonStat[];
}

export interface IPokeApiGateway {
  findByName(name: string): Promise<PokeApiPokemon | null>;
}
