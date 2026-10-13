import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { CreatePokemonDTO } from '@application/dtos/createPokemonDTO';
import { AppError } from '@domain/errors/app-error';
import { ConflictError } from '@domain/errors/conflict-error';

export class CreatePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(data: CreatePokemonDTO): Promise<Pokemon> {
    const pokemonAlreadyExists = await this.pokemonRepository.findByName(
      data.name,
    );

    if (
      !data.name ||
      !data.type ||
      data.height === undefined ||
      data.weight === undefined
    ) {
      throw new AppError('Campos obrigatórios ausentes.', 400);
    }

    if (pokemonAlreadyExists) {
      throw new ConflictError('Já existe um Pokémon com esse nome');
    }

    return this.pokemonRepository.create(data);
  }
}
