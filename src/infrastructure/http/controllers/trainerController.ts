import { Request, Response } from 'express';
import { CreateTrainerUseCase } from '@application/use-cases/createTrainer';
import { GetTrainerTeamUseCase } from '@application/use-cases/getTrainerTeamUseCase';

export class TrainerController {
  constructor(
    private readonly createTrainer: CreateTrainerUseCase,
    private readonly getTrainerTeam: GetTrainerTeamUseCase,
  ) {}

  create = async (req: Request, res: Response) => {
    const { name, email } = req.body;
    const trainer = await this.createTrainer.execute({ name, email });
    return res.status(201).json(trainer);
  };

  team = async (req: Request, res: Response) => {
    const rawType = req.params.trainerId;
    const type = typeof rawType === 'string' ? rawType : undefined;

    if (!type) {
      res.status(400).json({ message: 'ID do treinador inválido.' });
      return;
    }
    
    const team = await this.getTrainerTeam.execute(type);
    return res.status(200).json(team);
  };
}