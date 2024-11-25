import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCodeDto } from './create-code.dto';

@Injectable()
export class CodeService {
  constructor(private readonly prismaService: PrismaService) {}

  async readCodeEntity(projectId: string, codeEntityName: string) {
    const result = await this.prismaService.codeEntity.findFirst({
      where: {
        projectId: projectId,
        name: codeEntityName,
      },
    });

    return result;
  }

  async createCode(projectId: string, dto: CreateCodeDto) {
    const result = await this.prismaService.codeEntity.upsert({
      include: {
        CodeValue: {
          include: {
            CodeAttribute: true,
            CodeEntity: true,
          },
        },
      },
      where: {
        id: dto.codeEntityId,
        projectId: projectId,
        CodeValue: {
          every: {
            CodeAttribute: {
              name: dto.attributeName,
            },
          },
        },
      },
      update: {},
      create: {
        name: dto.entityName,
        CodeValue: {
          create: {
            CodeAttribute: {
              create: {
                name: dto.attributeName,
                dataType: dto.dataType,
              },
            },
            value: dto.value,
          },
        },
      },
    });

    return result;
  }
}
