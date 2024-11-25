import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CreateCodeValueDto } from './create-code-value.dto';

@Injectable()
export class CodeValueService {
  constructor(private readonly prismaService: PrismaService) {}

  async createCodeValue(
    codeEntityId: string,
    codeAttributeId: string,
    dto: CreateCodeValueDto,
  ) {
    const result = await this.prismaService.codeValue.create({
      data: {
        codeEntityId: codeEntityId,
        codeAttributeId: codeAttributeId,
        value: dto.value,
      },
    });

    return result;
  }

  async readCodeValue(codeValueId: string) {
    const result = await this.prismaService.codeValue.findUnique({
      where: { id: codeValueId },
    });

    return result;
  }

  async readAllCodeValues(codeEntityId: string) {
    const result = await this.prismaService.codeValue.findMany({
      where: {
        codeEntityId: codeEntityId,
      },
    });

    return result;
  }

  async updateCodeValue(codeValueId: string, dto: CreateCodeValueDto) {
    const result = await this.prismaService.codeValue.update({
      where: { id: codeValueId },
      data: {
        value: dto.value,
      },
    });

    return result;
  }

  async deleteCodeValue(codeValueId: string) {
    const result = await this.prismaService.codeValue.delete({
      where: { id: codeValueId },
    });

    return result;
  }
}
