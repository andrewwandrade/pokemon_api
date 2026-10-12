import { PrismaClient, Pokemon as PokemonRow } from '@prisma/client';
import { IPokemonRepository } from '@domain/repositories/IPokemonRepository';
import { Pokemon } from '@domain/entities/pokemon';

export class PrismaPokemonRepository implements IPokemonRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findAll(type?: string): Promise<Pokemon[]> {
    const rows = await this.prisma.pokemon.findMany({
      where: type ? { types: { has: type.trim().toLowerCase() } } : undefined,
    });
    return rows.map((row) => this.toDomain(row));
  }

  async findById(id: string): Promise<Pokemon | null> {
    const row = await this.prisma.pokemon.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByName(name: string): Promise<Pokemon | null> {
    const row = await this.prisma.pokemon.findFirst({
      where: { name: { equals: name.trim(), mode: 'insensitive' } },
    });
    return row ? this.toDomain(row) : null;
  }

  async create(data: Omit<Pokemon, 'id'>): Promise<Pokemon> {
    const row = await this.prisma.pokemon.create({
      data: {
        name: data.name,
        types: data.type, 
        height: data.height,
        weight: data.weight,
      },
    });
    return this.toDomain(row);
  }

  async update(id: string, data: Partial<Pokemon>): Promise<Pokemon | null> {
    try {
      const row = await this.prisma.pokemon.update({
        where: { id },
        data: {
          name: data.name,
          types: data.type,
          height: data.height,
          weight: data.weight,
        },
      });
      return this.toDomain(row);
    } catch {
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      await this.prisma.pokemon.delete({ where: { id } });
      return true;
    } catch {
      return false;
    }
  }

  private toDomain(row: PokemonRow): Pokemon {
    return {
      id: row.id,
      name: row.name,
      type: row.types,
      height: row.height,
      weight: row.weight,
    };
  }
}