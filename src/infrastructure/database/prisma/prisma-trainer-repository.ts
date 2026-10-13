import { PrismaClient, Trainer as TrainerRow } from '@prisma/client';
import { ITrainerRepository } from '@domain/repositories/ITrainerRepository';
import { CreateTrainerData, Trainer } from '@domain/entities/trainer';

export class PrismaTrainerRepository implements ITrainerRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateTrainerData): Promise<Trainer> {
    const row = await this.prisma.trainer.create({
      data: {
        name: data.name,
        email: data.email.trim().toLowerCase(),
      },
    });
    return this.toDomain(row);
  }

  async findById(id: string): Promise<Trainer | null> {
    const row = await this.prisma.trainer.findUnique({ where: { id } });
    return row ? this.toDomain(row) : null;
  }

  async findByEmail(email: string): Promise<Trainer | null> {
    const row = await this.prisma.trainer.findUnique({
      where: { email: email.trim().toLowerCase() },
    });
    return row ? this.toDomain(row) : null;
  }

  async findAll(): Promise<Trainer[]> {
    const rows = await this.prisma.trainer.findMany();

    return rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: TrainerRow): Trainer {
    return {
      id: row.id,
      name: row.name,
      email: row.email,
      createdAt: row.createdAt,
    };
  }
}