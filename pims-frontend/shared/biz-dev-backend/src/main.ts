import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ZodValidationPipe } from '@anatine/zod-nestjs';
import { TransformInterceptor } from './common.interceptor';

async function bootstrap() {
  const origins = [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://localhost:3002',
    'http://localhost:6006',
  ];
  const adminApp = await NestFactory.create(AppModule, {
    cors: {
      origin: origins,
    },
  });
  const configService = adminApp.get(ConfigService);
  const adminPort = configService.get<number | undefined>('ADMIN_PORT') || 8091;
  const bizApp = await NestFactory.create(AppModule, {
    cors: {
      origin: origins,
    },
  });
  const bizConfigService = bizApp.get(ConfigService);
  const bizPort = bizConfigService.get<number | undefined>('BIZ_PORT') || 8090;

  adminApp.useGlobalPipes(new ZodValidationPipe());
  adminApp.useGlobalInterceptors(new TransformInterceptor());
  bizApp.useGlobalPipes(new ZodValidationPipe());
  bizApp.useGlobalInterceptors(new TransformInterceptor());

  console.log(`Running admin on port ${adminPort}`);
  console.log(`Running biz on port ${bizPort}`);

  await adminApp.listen(adminPort);
  await bizApp.listen(bizPort);
}
bootstrap();
