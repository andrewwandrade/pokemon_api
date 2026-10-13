import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';
import { NotFoundError } from '@domain/errors/not-found-error';
import { ConflictError } from '@domain/errors/conflict-error';

export class UpdatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string, data: UpdatePokemonDTO): Promise<Pokemon> {
    const current = await this.pokemonRepository.findById(id);

    if (!current) {
      throw new NotFoundError('Pokémon');
    }

    if (data.name && data.name.toLowerCase() !== current.name.toLowerCase()) {
      const sameName = await this.pokemonRepository.findByName(data.name);

      if (sameName) {
        throw new ConflictError('Já existe um Pokémon com esse nome');
      }
    }

    const updatedPokemon = await this.pokemonRepository.update(id, data);

    if (!updatedPokemon) {
      throw new NotFoundError('Pokémon');
    }

    return updatedPokemon;
  }
}
