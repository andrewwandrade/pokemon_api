import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { NotFoundError } from '@domain/errors/not-found-error';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<void> {
    const pokemon = await this.pokemonRepository.findById(id);

    if (!pokemon) {
      throw new NotFoundError('Pokémon');
    }

    await this.pokemonRepository.delete(id);
  }
}
