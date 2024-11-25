import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCodeEntityDto } from './create-code-entity.dto';

@Injectable()
export class CodeEntityService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCodeEntity(projectId: string, dto: CreateCodeEntityDto) {
    const result = await this.prismaService.codeEntity.create({
      data: {
        name: dto.name,
        projectId: projectId,
      },
    });

    return result;
  }

  async updateCodeEntity(codeEntityId: string, dto: CreateCodeEntityDto) {
    const result = await this.prismaService.codeEntity.update({
      where: { id: codeEntityId },
      data: {
        name: dto.name,
      },
    });

    return result;
  }

  async readCodeEntity(codeEntityId: string) {
    const result = await this.prismaService.codeEntity.findUnique({
      where: { id: codeEntityId },
    });

    return result;
  }

  async readAllCodeEntities(projectId: string) {
    const result = await this.prismaService.codeEntity.findMany({
      where: { projectId: projectId },
    });

    return result;
  }

  async deleteCodeEntity(codeEntityId: string) {
    const result = await this.prismaService.codeEntity.delete({
      where: { id: codeEntityId },
    });

    return result;
  }
}
