import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { ProjectController } from './project.controller';
import { ProjectService } from './project.service';
import { RoleModule } from './role/role.module';
import { TaskModule } from './task/task.module';
import { CodeModule } from './code/code.module';

@Module({
  imports: [PrismaModule, RoleModule, TaskModule, CodeModule],
  controllers: [ProjectController],
  providers: [ProjectService],
})
export class ProjectModule {}
