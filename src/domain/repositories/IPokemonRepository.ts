import { Pokemon } from "@domain/entities/pokemon";

export interface IPokemonRepository{
    findAll(type?: string): Promise<Pokemon[]>;
    findById(id: string): Promise<Pokemon | null>;
    create(pokemon: Omit<Pokemon, 'id'>): Promise<Pokemon>;
    update(id: string, pokemon: Partial<Pokemon>): Promise<Pokemon | null>;
    delete(id: string): Promise<boolean>;
}