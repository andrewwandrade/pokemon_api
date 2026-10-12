import { Capture, CreateCaptureData } from '@domain/entities/capture';

export interface ICaptureRepository {
  create(data: CreateCaptureData): Promise<Capture>;
  countActiveByTrainer(trainerId: string): Promise<number>;
  findActiveByTrainer(trainerId: string): Promise<Capture[]>;
}