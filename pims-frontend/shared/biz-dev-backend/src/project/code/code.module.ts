import { Module } from '@nestjs/common';
import { CodeEntityService } from './code-entity.service';
import { PrismaModule } from 'nestjs-prisma';
import { CodeEntityController } from './code-entity.controller';
import { CodeAttributeService } from './code-attribute.service';
import { CodeValueService } from './code-value.service';
import { CodeController } from './code.controller';
import { CodeService } from './code.service';
import { CodeAttributeController } from './code-attribute.controller';
import { CodeValueController } from './code-value.controller';

@Module({
  imports: [PrismaModule],
  controllers: [
    CodeEntityController,
    CodeAttributeController,
    CodeValueController,
    CodeController,
  ],
  providers: [
    CodeEntityService,
    CodeAttributeService,
    CodeValueService,
    CodeService,
  ],
})
export class CodeModule {}
