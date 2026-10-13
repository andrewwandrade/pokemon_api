import { AppError } from './app-error';

export class InternalServerError extends AppError {
  constructor(message = 'Erro interno do servidor') {
    super(message, 500, 'INTERNAL_SERVER_ERROR');
  }
}