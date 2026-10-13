import { Request, Response } from 'express';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeamUseCase';
import { listTrainersUseCase } from '@application/use-cases/listTrainers';

export class TrainerController {
  constructor(
    private readonly createTrainer: CreateTrainerUseCase,
    private readonly getTrainerTeam: GetTrainerTeamUseCase,
    private readonly listTrainers: listTrainersUseCase,
  ) {}

  create = async (_req: Request, res: Response) => {
    const { name, email } = res.locals.validated.body;
    const trainer = await this.createTrainer.execute({ name, email });
    return res.status(201).json(trainer);
  };

  team = async (_req: Request, res: Response) => {
    const rawType = res.locals.validated.params;
    const type = typeof rawType === 'string' ? rawType : undefined;

    if (!type) {
      res.status(400).json({ message: 'ID do treinador inválido.' });
      return;
    }
    
    const team = await this.getTrainerTeam.execute(type);
    return res.status(200).json(team);
  };

    list = async (req: Request, res: Response) => { 
      const trainers = await this.listTrainers.execute(); 
      return res.status(200).json(trainers); 
    };
}