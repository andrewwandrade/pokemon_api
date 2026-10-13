import axios, { AxiosInstance } from 'axios';
import {
  IPokeApiGateway,
  PokeApiPokemon,
} from '@domain/repositories/IPokeAPIGateway';
import { ExternalServiceError } from '@domain/errors/external-service-error';

interface PokeApiResponse {
  id: number;
  name: string;
  sprites: {
    front_default: string | null;
    other?: {
      'official-artwork'?: { front_default: string | null };
    };
  };
  types: { type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
}

export class AxiosPokeApiGateway implements IPokeApiGateway {
  private readonly http: AxiosInstance;

  constructor(
    baseURL: string = process.env.POKEAPI_BASE_URL ??
      'https://pokeapi.co/api/v2',
  ) {
    this.http = axios.create({ baseURL, timeout: 5000 });
  }

  async findByName(name: string): Promise<PokeApiPokemon | null> {
    try {
      const { data } = await this.http.get<PokeApiResponse>(
        `/pokemon/${encodeURIComponent(name.trim().toLowerCase())}`,
      );
      return this.toDomain(data);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.status === 404) {
        return null;
      }
      throw new ExternalServiceError('PokéAPI');
    }
  }

  private toDomain(data: PokeApiResponse): PokeApiPokemon {
    return {
      pokedexId: data.id,
      name: data.name,
      imageUrl:
        data.sprites.other?.['official-artwork']?.front_default ??
        data.sprites.front_default ??
        null,
      types: data.types.map((t) => t.type.name),
      stats: data.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
    };
  }
}
