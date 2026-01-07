import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
@Injectable()
export class CharacterService {
  constructor(private Prisma: PrismaService) {}
  async GetAll() {
    await this.Prisma.$connect();
    const data = await this.Prisma.character.findMany();
    await this.Prisma.$disconnect();
    return data;
  }
}
