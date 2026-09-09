import { Pokemon } from '@domain/entities/pokemon';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';

export class InMemoryPokemonRepository implements IPokemonRepository {
  private pokemons: Pokemon[] = [];

  async findAll(type?: string): Promise<Pokemon[]> {
    if (type) {
      const searchType = type.toLowerCase();
      const filteredPokemons: Pokemon[] = [];

      for (const pokemon of this.pokemons) {
        for (const pokemonType of pokemon.type) {
          if (pokemonType.toLowerCase() === searchType) {
            filteredPokemons.push(pokemon);
            break; //Interrompe loop interno e pula para o próximo Pokémon
          }
        }
      }

      return filteredPokemons;
    }

    return this.pokemons;
  }

  async findById(id: string): Promise<Pokemon | null> {
    for (const pokemon of this.pokemons) {
      if (pokemon.id === id) {
        return pokemon;
      }
    }

    return null;
  }

  async create(data: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    const newPokemon: Pokemon = {
      id: String(Date.now()),
      name: data.name,
      type: data.type,
      height: data.height,
      weight: data.weight,
    };

    this.pokemons.push(newPokemon);
    return newPokemon;
  }

  async update(id: string, data: Partial<Pokemon>): Promise<Pokemon | null> {
    for (const pokemon of this.pokemons) {
      if (pokemon.id === id) {
        if (data.name !== undefined) {
          pokemon.name = data.name;
        }

        if (data.type !== undefined) {
          pokemon.type = data.type;
        }

        if (data.height !== undefined) {
          pokemon.height = data.height;
        }

        if (data.weight !== undefined) {
          pokemon.weight = data.weight;
        }

        return pokemon;
      }
    }

    return null;
  }

  async delete(id: string): Promise<boolean> {
    for (let i = 0; i < this.pokemons.length; i++) {
      if (this.pokemons[i].id === id) {
        this.pokemons.splice(i, 1); //Remove 1 elemento na posição i
        return true; //Sucesso na remoção
      }
    }

    return false; //ID não encontrado
  }
}
