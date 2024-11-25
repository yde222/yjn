import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export class CreateCodeDto extends createZodDto(
  extendApi(
    z.object({
      codeEntityId: z.string(),
      entityName: z.string(),
      attributeName: z.string(),
      dataType: z.string(),
      value: z.string(),
    }),
    {},
  ),
) {}
