import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class DeletePokemonUseCase {
  constructor(private readonly pokemonRepository: IPokemonRepository) {}

  async execute(id: string): Promise<boolean> {
    return this.pokemonRepository.delete(id);
  }
}
