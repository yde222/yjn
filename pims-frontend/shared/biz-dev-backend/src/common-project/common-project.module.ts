import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { CommonProjectController } from './common-project.controller';
import { CommonProjectService } from './common-project.service';

@Module({
  imports: [PrismaModule],
  providers: [CommonProjectService],
  controllers: [CommonProjectController],
})
export class CommonProjectModule {}
