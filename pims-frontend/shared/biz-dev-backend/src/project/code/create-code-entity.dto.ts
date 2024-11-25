import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { CodeEntitySchema } from '@biz-dev-backend/prisma/generated/zod';

export class CreateCodeEntityDto extends createZodDto(
  extendApi(
    CodeEntitySchema.pick({
      name: true,
    }),
  ),
) {}
