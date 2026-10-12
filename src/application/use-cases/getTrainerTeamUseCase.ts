import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { ICaptureRepository } from '@domain/repositories/ICaptureRepository';
import { Capture } from '@domain/entities/capture';
import { NotFoundError } from '@domain/errors/not-found-error';

export class GetTrainerTeamUseCase {
  constructor(
    private readonly trainers: ITrainerRepository,
    private readonly captures: ICaptureRepository,
  ) {}

  async execute(trainerId: string): Promise<Capture[]> {
    const trainer = await this.trainers.findById(trainerId);
    if (!trainer) throw new NotFoundError('Treinador');
    return this.captures.findActiveByTrainer(trainerId);
  }
}