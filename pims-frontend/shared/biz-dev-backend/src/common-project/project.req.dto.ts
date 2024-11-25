import { createZodDto } from '@anatine/zod-nestjs';
import { extendApi } from '@anatine/zod-openapi';
import { z } from 'zod';

export const ProjectReqDtoSchema = z.object({
  pjtNo: z.string(),
  pjtNm: z.string(),
  pjtMngRId: z.string(),
  rpnDepCd: z.string(),
  pgsStatCd: z.string(),
  staYmd: z.string(),
  endYmd: z.string(),
  tplEnabled: z.boolean(),
  subGrpEnabled: z.boolean(),
  deleted: z.boolean(),
});

export class ProjectReqDto extends createZodDto(
  extendApi(ProjectReqDtoSchema),
) {}
