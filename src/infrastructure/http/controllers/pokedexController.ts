import { Request, Response } from 'express';
import { SearchPokedexUseCase } from '@application/use-cases/searchPokedex';

export class PokedexController {
  constructor(private readonly searchPokedex: SearchPokedexUseCase) {}

  search = async (req: Request, res: Response) => {
    const name = String(req.query.name ?? '');
    const pokemon = await this.searchPokedex.execute(name);
    return res.status(200).json(pokemon);
  };
}
