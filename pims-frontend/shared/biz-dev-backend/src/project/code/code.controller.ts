import { Body, Controller, Param, Post } from '@nestjs/common';
import { CodeService } from './code.service';
import { CreateCodeDto } from './create-code.dto';

@Controller('api/v1/project/:projectId/code')
export class CodeController {
  constructor(private readonly codeService: CodeService) {}

  @Post()
  async createCode(
    @Param('projectId') projectId: string,
    @Body() dto: CreateCodeDto,
  ) {
    return this.codeService.createCode(projectId, dto);
  }
}
