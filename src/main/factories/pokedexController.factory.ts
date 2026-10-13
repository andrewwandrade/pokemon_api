import { AxiosPokeApiGateway } from '@infrastructure/providers/axiosPokeApiGateway';
import { SearchPokedexUseCase } from '@application/use-cases/searchPokedex';
import { PokedexController } from '@infrastructure/http/controllers/pokedexController';

export function makePokedexController(): PokedexController {
  const gateway = new AxiosPokeApiGateway();
  const searchPokedex = new SearchPokedexUseCase(gateway);
  return new PokedexController(searchPokedex);
}