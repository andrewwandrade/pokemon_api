import { PokemonController } from '@infrastructure/http/controllers/pokemonController';
import { InMemoryPokemonRepository } from '@infrastructure/database/in-memory/InMemoryPokemonRepository';
import { CreatePokemonUseCase } from '@application/use-cases/createPokemon';
import { DeletePokemonUseCase } from '@application/use-cases/deletePokemon';
import { GetPokemonByIdUseCase } from '@application/use-cases/getPokemonById';
import { ListPokemonsUseCase } from '@application/use-cases/listPokemons';
import { UpdatePokemonUseCase } from '@application/use-cases/updatePokemon';

export function makePokemonController(): PokemonController {
  //Instância do repositório em memória
  const pokemonRepository = new InMemoryPokemonRepository();

  //Instâncias de caso de uso
  const createPokemonUseCase = new CreatePokemonUseCase(pokemonRepository);
  const deletePokemonUseCase = new DeletePokemonUseCase(pokemonRepository);
  const getPokemonByIdUseCase = new GetPokemonByIdUseCase(pokemonRepository);
  const listPokemonsUseCase = new ListPokemonsUseCase(pokemonRepository);
  const updatePokemonUseCase = new UpdatePokemonUseCase(pokemonRepository);

  //Instância final do Controller
  return new PokemonController(
    createPokemonUseCase,
    deletePokemonUseCase,
    getPokemonByIdUseCase,
    listPokemonsUseCase,
    updatePokemonUseCase,
  );
}
