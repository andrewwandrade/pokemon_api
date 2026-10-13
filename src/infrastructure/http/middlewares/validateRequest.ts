import { Request, Response, NextFunction } from 'express';
import { z , ZodError } from 'zod';
import { AppError } from '@domain/errors/app-error';

interface RequestValidationSchemas {
  body?: z.ZodType;
  query?: z.ZodType;
  params?: z.ZodType;
}

export const validateRequest = (schemas: RequestValidationSchemas) => {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const validated: Record<string, unknown> = {};

      if (schemas.body) {
        validated.body = await schemas.body.parseAsync(req.body);
      }

      if (schemas.query) {
        validated.query = await schemas.query.parseAsync(req.query);
      }

      if (schemas.params) {
        validated.params = await schemas.params.parseAsync(req.params);
      }

      res.locals.validated = validated;
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        const issueDetails = error.issues.map((issue) => ({
          field: issue.path.join('.'),
          message: issue.message,
        }));

        return next(new AppError('Dados de entrada inválidos', 400, issueDetails));
      }

      next(error);
    }
  };
};
