import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export class UpdateCodeDto extends createZodDto(
  extendApi(
    z
      .object({
        entityName: z.string(),
        attributeName: z.string(),
        dataType: z.string(),
        value: z.string(),
      })
      .partial(),
    {},
  ),
) {}
