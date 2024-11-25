import { CommonQueryDto } from '@biz-dev-backend/common.query.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CommonUserService } from './common-user.service';

@Controller('/api/common/users')
export class CommonUserController {
  constructor(private readonly commonUserService: CommonUserService) {}

  @Get('/all')
  async getAll(@Query() query: CommonQueryDto) {
    const result = await this.commonUserService.getAll(query);
    return result.map((user) => ({
      ...user,
      authority: user.authority.split('||'),
      projects: user.projects.split('||'),
    }));
  }

  @Get('/:userId')
  async getOne(userId: string) {
    return this.commonUserService.getOne(userId);
  }

  @Post('/seeding')
  async seeding() {
    return this.commonUserService.seeding();
  }

  @Post('/')
  async create(@Body() body: any) {
    delete body.role;
    delete body.roleDescription;

    const sanitizedBody = {
      ...body,
      authority: body.authority.join('||'),
      projects: body.projects.join('||'),
    };

    return this.commonUserService.create(sanitizedBody);
  }

  @Patch('/:userId')
  async update(@Param('userId') userId: string, @Body() body: any) {
    delete body.role;
    delete body.roleDescription;

    const sanitizedBody = {
      ...body,
      authority: body.authority.join('||'),
      projects: body.projects.join('||'),
    };

    return this.commonUserService.update(userId, sanitizedBody);
  }

  @Delete('/:userId')
  async delete(@Param('userId') userId: string) {
    return this.commonUserService.delete(userId);
  }

  @Delete('/danger/all')
  async deleteAll() {
    return this.commonUserService.deleteAll();
  }

  @Get('/mock/history')
  async getMockHistory() {
    return this.commonUserService.getMockHistory();
  }
}
