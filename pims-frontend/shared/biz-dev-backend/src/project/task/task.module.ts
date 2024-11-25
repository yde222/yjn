import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { StatusModule } from './status/status.module';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';
import { TransitionModule } from './transition/transition.module';

@Module({
  imports: [PrismaModule, StatusModule, TransitionModule],
  controllers: [TaskController],
  providers: [TaskService],
})
export class TaskModule {}
