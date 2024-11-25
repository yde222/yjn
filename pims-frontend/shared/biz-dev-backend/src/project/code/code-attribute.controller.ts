import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CodeAttributeService } from './code-attribute.service';
import { CreateCodeAttributeDto } from './create-code-attribute.dto';

@Controller(
  'api/v1/project/:projectId/code-entity/:codeEntityId/code-attribute',
)
export class CodeAttributeController {
  constructor(private readonly codeAttributeService: CodeAttributeService) {}

  @Get()
  async findAll(@Param('codeEntityId') codeEntityId: string) {
    return this.codeAttributeService.readAllCodeAttributes(codeEntityId);
  }

  @Get(':codeAttributeId')
  async findOne(@Param('codeAttributeId') codeAttributeId: string) {
    return this.codeAttributeService.readCodeAttribute(codeAttributeId);
  }

  @Post()
  async create(@Body() dto: CreateCodeAttributeDto) {
    return this.codeAttributeService.createCodeAttribute(dto);
  }

  @Patch(':codeAttributeId')
  async update(
    @Param('codeAttributeId') codeAttributeId: string,
    @Body() dto: CreateCodeAttributeDto,
  ) {
    return this.codeAttributeService.updateCodeAttribute(codeAttributeId, dto);
  }

  @Delete(':codeAttributeId')
  async remove(@Param('codeAttributeId') codeAttributeId: string) {
    return this.codeAttributeService.deleteCodeAttribute(codeAttributeId);
  }
}
