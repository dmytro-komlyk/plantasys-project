import { z } from 'zod';

export const InfoCard = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});
