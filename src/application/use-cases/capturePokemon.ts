import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { ICaptureRepository } from '@domain/repositories/ICaptureRepository';
import { IPokeApiGateway } from '@domain/repositories/IPokeAPIGateway';
import { Capture, maxActive } from '@domain/entities/capture';
import { NotFoundError } from '@domain/errors/not-found-error';
import { TeamFullError } from '@domain/errors/team-full-error';
import { CapturePokemonDTO } from '@application/dtos/capturePokemonDTO';

export class CapturePokemonUseCase {
  constructor(
    private readonly trainers: ITrainerRepository,
    private readonly captures: ICaptureRepository,
    private readonly pokeApi: IPokeApiGateway,
  ) {}

  async execute({ trainerId, pokemonName }: CapturePokemonDTO): Promise<Capture> {
    //Treinador existe?
    const trainer = await this.trainers.findById(trainerId);
    if (!trainer) throw new NotFoundError('Treinador');

    //Regra de negócio: máximo de 6 no time ativo
    const activeCount = await this.captures.countActiveByTrainer(trainerId);
    if (activeCount >= maxActive) throw new TeamFullError();

    //Busca os dados oficiais na PokéAPI
    const pokemon = await this.pokeApi.findByName(pokemonName);
    if (!pokemon) throw new NotFoundError('Pokémon');

    //Salva a captura associada ao treinador
    return this.captures.create({ trainerId, ...pokemon, isActive: true });
  }
}