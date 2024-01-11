import { imageSchema } from '@server/domain/images/schemas/image.schema';
import { InfoCard } from '@server/shared/schemas/infocard.schema';
import { MetaSchema } from '@server/shared/schemas/metadata.schema';
import { z } from 'zod';

export const createProductBoosterSchema = z.object({
  slug: z.string().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  metadata: MetaSchema,
  category_id: z.string().min(1),
});

export const updateProductBoosterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  metadata: MetaSchema,
  category_id: z.string().min(1),
});

export const outputProductBoosterSchema = z.object({
  id: z.string().min(1),
  slug: z.string().min(1),
  title: z.string().min(1),
  preview: z.string().min(1),
  image: imageSchema,
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery: z.array(imageSchema),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  metadata: MetaSchema,
  category_id: z.string().min(1),
});

export type createProductBoosterSchema = z.TypeOf<
  typeof createProductBoosterSchema
>;
export type updateProductBoosterSchema = z.TypeOf<
  typeof updateProductBoosterSchema
>;
export type outputProductBoosterSchema = z.TypeOf<
  typeof outputProductBoosterSchema
>;
