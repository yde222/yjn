import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CodeEntityService } from './code-entity.service';
import { CreateCodeEntityDto } from './create-code-entity.dto';

@Controller('api/v1/project/:projectId/code-entity')
export class CodeEntityController {
  constructor(private readonly codeEntityService: CodeEntityService) {}

  @Get()
  async findAll(@Param('projectId') projectId: string) {
    return this.codeEntityService.readAllCodeEntities(projectId);
  }

  @Get(':codeEntityId')
  async findOne(@Param('codeEntityId') codeEntityId: string) {
    return this.codeEntityService.readCodeEntity(codeEntityId);
  }

  @Post()
  async create(
    @Param('projectId') projectId: string,
    @Body() dto: CreateCodeEntityDto,
  ) {
    return this.codeEntityService.createCodeEntity(projectId, dto);
  }

  @Patch(':codeEntityId')
  async update(
    @Param('codeEntityId') codeEntityId: string,
    @Body() dto: CreateCodeEntityDto,
  ) {
    return this.codeEntityService.updateCodeEntity(codeEntityId, dto);
  }

  @Delete(':codeEntityId')
  async delete(@Param('codeEntityId') codeEntityId: string) {
    return this.codeEntityService.deleteCodeEntity(codeEntityId);
  }
}
