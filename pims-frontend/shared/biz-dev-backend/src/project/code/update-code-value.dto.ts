import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { CodeValueSchema } from '@biz-dev-backend/prisma/generated/zod';

export class UpdateCodeValueDto extends createZodDto(
  extendApi(
    CodeValueSchema.pick({
      value: true,
    }).partial(),
  ),
) {}
