import { CreateTrainerData, Trainer } from '@domain/entities/trainer';

export interface ITrainerRepository {
  create(data: CreateTrainerData): Promise<Trainer>;
  findById(id: string): Promise<Trainer | null>;
  findByEmail(email: string): Promise<Trainer | null>;
}