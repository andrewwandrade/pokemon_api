import { Prisma } from '@prisma/client';
import { AppError } from '@domain/errors/app-error';
import { ConflictError } from '@domain/errors/conflict-error';
import { NotFoundError } from '@domain/errors/not-found-error';

export function mapPrismaError(error: unknown): AppError | null {
  if (error instanceof Prisma.PrismaClientKnownRequestError) {
    switch (error.code) {
      case 'P2002':
        return new ConflictError('Registro duplicado: valor já existe');
      case 'P2025':
        return new NotFoundError('Registro');
      case 'P2003':
        return new AppError(
          'Referência inválida (chave estrangeira)',
          400,
          'FK_VIOLATION',
        );
    }
  }
  if (
    error instanceof Prisma.PrismaClientInitializationError ||
    error instanceof Prisma.PrismaClientRustPanicError
  ) {
    return new AppError('Banco de dados indisponível', 503, 'DB_UNAVAILABLE');
  }
  return null;
}
