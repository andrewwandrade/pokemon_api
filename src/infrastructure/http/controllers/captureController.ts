import { Request, Response } from 'express';
import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';

export class CaptureController {
  constructor(private readonly capturePokemon: CapturePokemonUseCase) {}

  create = async (_req: Request, res: Response) => {
    const { trainerId } = res.locals.validated.params;
    const { pokemonName } = res.locals.validated.body;

    if (typeof trainerId !== 'string') {
      return res.status(400).json({
        error: 'ID do treinador inválido.',
      });
    }

    const capture = await this.capturePokemon.execute({
      trainerId,
      pokemonName: pokemonName,
    });
    return res.status(201).json(capture);
  };
}
