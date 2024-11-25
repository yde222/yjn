import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCodeAttributeDto } from './create-code-attribute.dto';
import { UpdateCodeAttributeDto } from './update-code-attribute.dto';

@Injectable()
export class CodeAttributeService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCodeAttribute(dto: CreateCodeAttributeDto) {
    const result = await this.prismaService.codeAttribute.create({
      data: {
        name: dto.name,
        dataType: dto.dataType,
      },
    });

    return result;
  }

  async updateCodeAttribute(
    codeAttributeId: string,
    dto: UpdateCodeAttributeDto,
  ) {
    const result = await this.prismaService.codeAttribute.update({
      where: { id: codeAttributeId },
      data: {
        name: dto.name,
        dataType: dto.dataType,
      },
    });

    return result;
  }

  async readCodeAttribute(codeAttributeId: string) {
    const result = await this.prismaService.codeAttribute.findUnique({
      where: { id: codeAttributeId },
    });

    return result;
  }

  async readAllCodeAttributes(codeEntityId: string) {
    const result = await this.prismaService.codeAttribute.findMany({
      include: {
        CodeValue: {
          include: {
            CodeEntity: true,
          },
          where: {
            codeEntityId: codeEntityId,
          },
        },
      },
    });

    return result;
  }

  async deleteCodeAttribute(codeAttributeId: string) {
    const result = await this.prismaService.codeAttribute.delete({
      where: { id: codeAttributeId },
    });

    return result;
  }
}
