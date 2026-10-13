import { AppError } from './app-error';

export class ExternalServiceError extends AppError {
  constructor(service: string) {
    super(`Serviço externo indisponível: ${service}`, 502);
  }
}
