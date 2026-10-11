import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '@application/dtos/createPokemonDTO';
import { AppError } from '@domain/errors/app-error';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonAlreadyExists = await this.pokemonRepository.findByName(data.name);

    if (!data.name || !data.type || data.height === undefined || data.weight === undefined) {
      throw new AppError('Campos obrigatórios ausentes.', 400);
    }

    if (pokemonAlreadyExists) {
      throw new AppError('Pokémon com este nome já está cadastrado.', 409);
    }

    return this.pokemonRepository.create(data);
  }
}
