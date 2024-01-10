import { z } from 'zod';

export const MetaSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  keywords: z.string().min(1),
});
