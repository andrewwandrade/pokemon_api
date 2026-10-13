import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor(details?: unknown) {
    super('Dados de entrada inválidos', 400, 'VALIDATION_ERROR');
  }
}