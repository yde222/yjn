import { z } from 'zod';

export const CodeEntitySchema = z.object({
  id: z.string(),
  name: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  projectId: z.string(),
});

export type CodeEntity = z.infer<typeof CodeEntitySchema>;
