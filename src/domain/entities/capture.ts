export interface PokemonStat {
  name: string;
  value: number;
}

export interface Capture {
  id: string;
  trainerId: string;
  pokedexId: number;
  name: string;
  imageUrl: string | null;
  types: string[];
  stats: PokemonStat[];
  isActive: boolean;
  capturedAt: Date;
}

export type CreateCaptureData = Omit<Capture, 'id' | 'capturedAt'>;

//Regra de negócio: tamanho máximo do time ativo
export const maxActive = 6;
