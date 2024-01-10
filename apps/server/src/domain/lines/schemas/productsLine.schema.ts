import { imageSchema } from '@server/domain/images/schemas/image.schema';
import { updateProductLineSchema } from '@server/domain/productsLine/schemas/productsLine.schema';
import { MetaSchema } from '@server/shared/schemas/metadata.schema';
import { z } from 'zod';

export const createLineSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner_id: z.string().min(1),
  category_id: z.string().min(1),
});

export const updateLineSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner_id: z.string().min(1),
  category_id: z.string().min(1),
});

export const outputLineSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner: imageSchema,
  banner_id: z.string().min(1),
  products: z.array(updateProductLineSchema),
  category_id: z.string().min(1),
});

export type createLineSchema = z.TypeOf<typeof createLineSchema>;
export type updateLineSchema = z.TypeOf<typeof updateLineSchema>;
export type outputLineSchema = z.TypeOf<typeof outputLineSchema>;
