import { Request, Response } from 'express';
import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonsUseCase } from '@application/use-cases/listPokemons';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';

export class PokemonController {
  constructor(
    private readonly createPokemonUseCase: CreatePokemonUseCase,
    private readonly deletePokemonUseCase: DeletePokemonUseCase,
    private readonly getPokemonByIdUseCase: GetPokemonByIdUseCase,
    private readonly listPokemonsUseCase: ListPokemonsUseCase,
    private readonly updatePokemonUseCase: UpdatePokemonUseCase,
  ) {}

  async list(req: Request, res: Response): Promise<void> {
    const rawType = req.query.type;

    //Garante que é uma string. Caso contrário, define como undefined.
    const type = typeof rawType === 'string' ? rawType : undefined;
    const pokemons = await this.listPokemonsUseCase.execute(type);

    res.status(200).json(pokemons);
  }

  async getById(req: Request, res: Response): Promise<void> {
    const rawId = req.params.id;
    const id = typeof rawId === 'string' ? rawId : undefined;

    if (!id) {
      res.status(400).json({ message: 'ID inválido.' });
      return;
    }

    const pokemon = await this.getPokemonByIdUseCase.execute(id);

    res.status(200).json(pokemon);
  }

  async create(req: Request, res: Response): Promise<void> {
    const { name, type, height, weight } = req.body;

    const pokemon = await this.createPokemonUseCase.execute({
      name,
      type,
      height,
      weight,
    });

    res.status(201).json(pokemon);
  }

  async update(req: Request, res: Response): Promise<void> {
    const rawId = req.params.id;
    const id = typeof rawId === 'string' ? rawId : undefined;

    if (!id) {
      res.status(400).json({ message: 'ID inválido.' });
      return;
    }

    const updatedPokemon = await this.updatePokemonUseCase.execute(
      id,
      req.body,
    );

    res.status(200).json(updatedPokemon);
  }

  async delete(req: Request, res: Response): Promise<void> {
    const rawId = req.params.id;
    const id = typeof rawId === 'string' ? rawId : undefined;

    if (!id) {
      res.status(400).json({ message: 'ID inválido.' });
      return;
    }

    await this.deletePokemonUseCase.execute(id);

    res.status(204).send();
  }
}
