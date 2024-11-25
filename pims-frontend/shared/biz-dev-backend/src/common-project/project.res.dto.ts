import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const ProjectResDtoSchema = z.object({
  pjtNo: z.string(),
  pjtNm: z.string(),
  pjtMngRId: z.string(),
  rpnDepCd: z.string(),
  pgsStatCd: z.string(),
  staYmd: z.string().date(),
  endYmd: z.string(),
  subGrpEnabled: z.boolean(),
  tplEnabled: z.boolean(),
  deleted: z.boolean(),
});

export class ProjectResDto extends createZodDto(
  extendApi(ProjectResDtoSchema),
) {}
