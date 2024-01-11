import { updateLineSchema } from '@server/domain/lines/schemas/lines.schema';
import { outputProductBoosterSchema } from '@server/domain/productsBooster/schemas/productsBooster.schema';
import { MetaSchema } from '@server/shared/schemas/metadata.schema';
import { z } from 'zod';

export const createCategorySchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
});

export const updateCategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
});

export const outputCategorySchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  lines: z.array(updateLineSchema),
  products_booster: z.array(outputProductBoosterSchema),
});

export type createCategorySchema = z.TypeOf<typeof createCategorySchema>;
export type updateCategorySchema = z.TypeOf<typeof updateCategorySchema>;
export type outputCategorySchema = z.TypeOf<typeof outputCategorySchema>;
