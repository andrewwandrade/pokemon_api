import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '@application/dtos/createPokemonDTO';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    return this.pokemonRepository.create(data);
  }
}
