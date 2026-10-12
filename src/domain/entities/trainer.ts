export interface Trainer {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export type CreateTrainerData = Omit<Trainer, 'id' | 'createdAt'>;