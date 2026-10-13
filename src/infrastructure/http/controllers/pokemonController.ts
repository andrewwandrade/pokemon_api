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

  async list(_req: Request, res: Response): Promise<void> {
    const { type } = res.locals.validated.query;
    const pokemons = await this.listPokemonsUseCase.execute(type);

    res.status(200).json(pokemons);
  }

  async getById(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.validated.params;
    const pokemon = await this.getPokemonByIdUseCase.execute(id);

    res.status(200).json(pokemon);
  }

  async create(_req: Request, res: Response): Promise<void> {
    const { name, type, height, weight } = res.locals.validated.body;
    const pokemon = await this.createPokemonUseCase.execute({
      name,
      type,
      height,
      weight,
    });

    res.status(201).json(pokemon);
  }

  async update(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.validated.params;
    const pokemonData = res.locals.validated.body;
    const updatedPokemon = await this.updatePokemonUseCase.execute(
      id,
      pokemonData,
    );

    res.status(200).json(updatedPokemon);
  }

  async delete(_req: Request, res: Response): Promise<void> {
    const { id } = res.locals.validated.params;
    await this.deletePokemonUseCase.execute(id);

    res.status(204).send();
  }
}
