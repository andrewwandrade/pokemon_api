import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { Trainer } from '@domain/entities/trainer';
import { CreateTrainerDTO } from '@application/dtos/createTrainerDTO';
import { ConflictError } from '@domain/errors/conflict-error';

export class CreateTrainerUseCase {
  constructor(private readonly trainers: ITrainerRepository) {}

  async execute(data: CreateTrainerDTO): Promise<Trainer> {
    const exists = await this.trainers.findByEmail(data.email);
    if (exists) throw new ConflictError('Já existe um treinador com esse e-mail');
    return this.trainers.create(data);
  }
}