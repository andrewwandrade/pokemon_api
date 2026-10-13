import { prisma } from '@infrastructure/database/prisma/client';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prisma-trainer-repository';
import { PrismaCaptureRepository } from '@infrastructure/database/prisma/prisma-capture-repository';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeamUseCase';
import { TrainerController } from '@infrastructure/http/controllers/trainerController';
import { listTrainersUseCase } from '@application/use-cases/listTrainers';

export function makeTrainerController(): TrainerController {
  const trainerRepository = new PrismaTrainerRepository(prisma);
  const captureRepository = new PrismaCaptureRepository(prisma);

  const createTrainer = new CreateTrainerUseCase(trainerRepository);
  const listTrainer = new listTrainersUseCase(trainerRepository);
  const getTrainerTeam = new GetTrainerTeamUseCase(trainerRepository, captureRepository);

  return new TrainerController(
    createTrainer, 
    getTrainerTeam,
    listTrainer,
  );
}