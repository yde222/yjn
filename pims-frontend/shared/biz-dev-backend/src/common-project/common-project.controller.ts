import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CommonProjectService } from './common-project.service';
import { ProjectReqDto } from './project.req.dto';
import { ProjectResDto } from './project.res.dto';

@Controller('api/projects')
export class CommonProjectController {
  constructor(private readonly commonProjectService: CommonProjectService) {}

  // dev BE only
  @Post('/seeding')
  async seeding() {
    return this.commonProjectService.seedingProject();
  }

  @Post('/project')
  async createProject(@Body() dto: ProjectReqDto): Promise<ProjectResDto> {
    return this.commonProjectService.createProject(dto);
  }

  @Get('/list')
  async getProjects(
    @Query('keyword') keyword?: string,
  ): Promise<ProjectResDto[]> {
    return this.commonProjectService.getProjectList(keyword);
  }

  @Get('/:pjtUid')
  async getProject(
    @Param('pjtUid', ParseIntPipe) pjtUid: number,
  ): Promise<ProjectResDto> {
    return this.commonProjectService.getProject(pjtUid);
  }

  @Put('/:pjtUid')
  async updateProject(
    @Param('pjtUid', ParseIntPipe) pjtUid: number,
    @Body() dto: ProjectReqDto,
  ): Promise<ProjectResDto> {
    return this.commonProjectService.updateProject(pjtUid, dto);
  }

  @Put('/:pjtUid/stat')
  async updateProjectStat(
    @Param('pjtUid', ParseIntPipe) pjtUid: number,
    @Query('pgsStatCd') pgsStatCd: string,
  ): Promise<ProjectResDto> {
    return this.commonProjectService.updateProjectStat(pjtUid, pgsStatCd);
  }
}
