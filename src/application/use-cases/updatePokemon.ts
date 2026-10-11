import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';
import { AppError } from '@domain/errors/app-error';

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string, data: UpdatePokemonDTO): Promise<Pokemon> {
    const updatedPokemon = await this.pokemonRepository.update(id, data);

    if (!updatedPokemon) {
      throw new AppError('Pokémon não encontrado.', 404);
    }

    return updatedPokemon;
  }
}
