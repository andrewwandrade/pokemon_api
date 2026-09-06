import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { UpdatePokemonDTO } from '@application/dtos/updatePokemonDTO';

export class UpdatePokemonUseCase{
    constructor(
        private readonly pokemonRepository: IPokemonRepository
    ){}

    async execute(id: string, data: UpdatePokemonDTO): Promise<Pokemon | null>{
        return this.pokemonRepository.update(id, data);
    }
}