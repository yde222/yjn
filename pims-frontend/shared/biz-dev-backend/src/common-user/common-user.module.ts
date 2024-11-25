import { Module } from '@nestjs/common';
import { PrismaModule } from 'nestjs-prisma';
import { CommonUserService } from './common-user.service';
import { CommonUserController } from './common-user.controller';

@Module({
  imports: [PrismaModule],
  providers: [CommonUserService],
  exports: [CommonUserService],
  controllers: [CommonUserController],
})
export class CommonUserModule {}
