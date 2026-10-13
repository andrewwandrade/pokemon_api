import {
  IPokeApiGateway,
  PokeApiPokemon,
} from '@domain/repositories/IPokeAPIGateway';
import { NotFoundError } from '@domain/errors/not-found-error';

export class SearchPokedexUseCase {
  constructor(private readonly pokeApi: IPokeApiGateway) {}

  async execute(name: string): Promise<PokeApiPokemon> {
    const pokemon = await this.pokeApi.findByName(name);
    if (!pokemon) throw new NotFoundError('Pokémon');
    return pokemon;
  }
}
