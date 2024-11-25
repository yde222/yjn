import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { CodeAttributeSchema } from '@biz-dev-backend/prisma/generated/zod';

export class UpdateCodeAttributeDto extends createZodDto(
  extendApi(
    CodeAttributeSchema.pick({
      name: true,
      dataType: true,
      codeEntityId: true,
    }).partial({
      name: true,
      dataType: true,
    }),
  ),
) {}
