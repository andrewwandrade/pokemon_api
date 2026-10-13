import { AppError } from './app-error';

export class ValidationError extends AppError {
  constructor() {
    super('Dados de entrada inválidos', 400, 'VALIDATION_ERROR');
  }
}
