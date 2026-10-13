import { prisma } from '@infrastructure/database/prisma/client';
import { PrismaTrainerRepository } from '@infrastructure/database/prisma/prisma-trainer-repository';
import { PrismaCaptureRepository } from '@infrastructure/database/prisma/prisma-capture-repository';
import { AxiosPokeApiGateway } from '@infrastructure/providers/axiosPokeApiGateway';
import { CapturePokemonUseCase } from '@application/use-cases/capturePokemon';
import { CaptureController } from '@infrastructure/http/controllers/captureController';

export function makeCaptureController(): CaptureController {
  const trainerRepository = new PrismaTrainerRepository(prisma);
  const captureRepository = new PrismaCaptureRepository(prisma);
  const gateway = new AxiosPokeApiGateway();

  const capturePokemon = new CapturePokemonUseCase(
    trainerRepository,
    captureRepository,
    gateway,
  );

  return new CaptureController(capturePokemon);
}
