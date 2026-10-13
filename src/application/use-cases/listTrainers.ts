import { Trainer } from "@domain/entities/trainer";
import { ITrainerRepository } from "@domain/repositories/ITrainerRepository";

export class listTrainersUseCase{
    constructor(private readonly trainerRepository: ITrainerRepository) {}
    
    async execute(type?: string): Promise<Trainer[]> {
    return this.trainerRepository.findAll();
    }
}