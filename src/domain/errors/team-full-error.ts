import { AppError } from './app-error';

export class TeamFullError extends AppError {
  constructor() {
    super('O time ativo do treinador já possui 6 Pokémons', 422);
  }
}