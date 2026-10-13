import { z } from 'zod';

export const searchPokemonSchema = z.object({
  name: z.string().trim().min(1, 'O nome do Pokémon é obrigatório'),
});
