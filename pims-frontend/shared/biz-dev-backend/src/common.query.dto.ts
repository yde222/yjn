import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

const QuerySchema = z.object({
  page: z.coerce.number().default(-1),
  limit: z.coerce.number().default(-1),
});

export class CommonQueryDto extends createZodDto(
  extendApi(QuerySchema, {
    description: 'Common query DTO',
  }),
) {}

export type SanitizedQuery = {
  page: number;
  limit: number;
};
