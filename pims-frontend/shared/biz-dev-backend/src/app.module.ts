import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './authorization/authorization.module';
import { ProjectModule } from './project/project.module';
import { ResourceModule } from './resource/resource.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from 'nestjs-prisma';
import { CommonUserModule } from './common-user/common-user.module';
import { CommonProjectModule } from './common-project/common-project.module';
@Module({
  imports: [
    PrismaModule.forRoot(),
    ConfigModule.forRoot(),
    UserModule,
    ProjectModule,
    CommonProjectModule,
    ResourceModule,
    AuthorizationModule,
    CommonUserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
