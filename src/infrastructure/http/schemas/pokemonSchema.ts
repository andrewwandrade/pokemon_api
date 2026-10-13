import { z } from 'zod';

// GET /pokemons — filtros da listagem
export const listPokemonsSchema = z.object({
  type: z.string().trim().min(1).optional(),
});

// GET /pokemons/:id e demais rotas com ID
export const pokemonParamsSchema = z.object({
  id: z.uuid('ID do Pokémon inválido'),
});

// POST /pokemons — cadastro
export const createPokemonSchema = z.object({
  name: z.string().trim().min(1, 'O nome é obrigatório'),
  type: z.array(z.string().trim().min(1))
    .min(1, 'Informe pelo menos um tipo')
    .max(2, 'Um Pokémon pode ter no máximo dois tipos'),
  height: z.number().int().positive('A altura deve ser positiva'),
  weight: z.number().int().positive('O peso deve ser positivo'),
});

// PUT /pokemons/:id — atualização
export const updatePokemonSchema = createPokemonSchema
  .partial()
  .refine(
    (data) => Object.keys(data).length > 0,
    'Informe pelo menos um campo para atualizar'
  );
