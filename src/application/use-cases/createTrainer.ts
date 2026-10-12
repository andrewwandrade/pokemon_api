import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { CreateTrainerData, Trainer } from '@domain/entities/trainer';
import { ConflictError } from '@domain/errors/conflict-error';

export class CreateTrainerUseCase {
  constructor(private readonly trainers: ITrainerRepository) {}

  async execute(data: CreateTrainerData): Promise<Trainer> {
    const exists = await this.trainers.findByEmail(data.email);
    if (exists) throw new ConflictError('Já existe um treinador com esse e-mail');
    return this.trainers.create(data);
  }
}