import { z } from 'zod';

export const createTrainerSchema = z.object({
  name: z.string().trim().min(2, 'O nome deve ter pelo menos 2 caracteres').max(100),
  email: z.email('E-mail inválido'),
});

export const trainerParamsSchema = z.object({
  trainerId: z.uuid('ID do treinador inválido'),
});