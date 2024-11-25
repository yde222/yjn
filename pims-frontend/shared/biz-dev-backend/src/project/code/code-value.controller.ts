import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CodeValueService } from './code-value.service';
import { CreateCodeValueDto } from './create-code-value.dto';

@Controller(
  'api/v1/project/:projectId/code-entity/:codeEntityId/code-attribute/:codeAttributeId/code-value',
)
export class CodeValueController {
  constructor(private readonly codeValueService: CodeValueService) {}

  @Get()
  async findAll(@Param('codeEntityId') codeEntityId: string) {
    return this.codeValueService.readAllCodeValues(codeEntityId);
  }

  @Get(':codeValueId')
  async findOne(@Param('codeValueId') codeValueId: string) {
    return this.codeValueService.readCodeValue(codeValueId);
  }

  @Post()
  async create(
    @Param('codeEntityId') codeEntityId: string,
    @Param('codeAttributeId') codeAttributeId: string,
    @Body() dto: CreateCodeValueDto,
  ) {
    return this.codeValueService.createCodeValue(
      codeEntityId,
      codeAttributeId,
      dto,
    );
  }

  @Patch(':codeValueId')
  async update(
    @Param('codeValueId') codeValueId: string,
    @Body() dto: CreateCodeValueDto,
  ) {
    return this.codeValueService.updateCodeValue(codeValueId, dto);
  }

  @Delete(':codeValueId')
  async remove(@Param('codeValueId') codeValueId: string) {
    return this.codeValueService.deleteCodeValue(codeValueId);
  }
}
