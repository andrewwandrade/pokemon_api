import { z } from 'zod';

export const capturePokemonSchema = z.object({
  pokemonName: z.string().trim().min(1, 'O nome do Pokémon é obrigatório'),
});
