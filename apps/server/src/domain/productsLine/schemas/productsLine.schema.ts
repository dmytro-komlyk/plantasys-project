import { outputCardProductSchema } from '@server/domain/cardsProduct/schemas/cardsProduct.schema';
import { imageSchema } from '@server/domain/images/schemas/image.schema';
import { MetaSchema } from '@server/shared/schemas/metadata.schema';
import { z } from 'zod';

export const createProductLineSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner_id: z.string().min(1),
  line_id: z.string().min(1),
});

export const updateProductLineSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner_id: z.string().min(1),
  line_id: z.string().min(1),
});

export const outputProductLineSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  tagline: z.string().min(1),
  description: z.string().min(1),
  metadata: MetaSchema,
  banner: imageSchema,
  banner_id: z.string().min(1),
  cards: z.array(outputCardProductSchema),
  line_id: z.string().min(1),
});

export type createProductLineSchema = z.TypeOf<typeof createProductLineSchema>;
export type updateProductLineSchema = z.TypeOf<typeof updateProductLineSchema>;
export type outputProductLineSchema = z.TypeOf<typeof outputProductLineSchema>;
