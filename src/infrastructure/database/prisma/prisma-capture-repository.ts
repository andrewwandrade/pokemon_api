import { Prisma, PrismaClient, Capture as CaptureRow } from '@prisma/client';
import { ICaptureRepository } from '@domain/repositories/ICaptureRepository';
import { Capture, CreateCaptureData, PokemonStat } from '@domain/entities/capture';

export class PrismaCaptureRepository implements ICaptureRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async create(data: CreateCaptureData): Promise<Capture> {
    const row = await this.prisma.capture.create({
      data: {
        trainerId: data.trainerId,
        pokedexId: data.pokedexId,
        name: data.name,
        imageUrl: data.imageUrl,
        types: data.types,
        stats: data.stats as unknown as Prisma.InputJsonValue,
        isActive: data.isActive,
      },
    });
    return this.toDomain(row);
  }

  async countActiveByTrainer(trainerId: string): Promise<number> {
    return this.prisma.capture.count({
      where: { trainerId, isActive: true },
    });
  }

  async findActiveByTrainer(trainerId: string): Promise<Capture[]> {
    const rows = await this.prisma.capture.findMany({
      where: { trainerId, isActive: true },
      orderBy: { capturedAt: 'asc' },
    });
    return rows.map((row) => this.toDomain(row));
  }

  private toDomain(row: CaptureRow): Capture {
    return {
      id: row.id,
      trainerId: row.trainerId,
      pokedexId: row.pokedexId,
      name: row.name,
      imageUrl: row.imageUrl,
      types: row.types,
      stats: row.stats as unknown as PokemonStat[],
      isActive: row.isActive,
      capturedAt: row.capturedAt,
    };
  }
}