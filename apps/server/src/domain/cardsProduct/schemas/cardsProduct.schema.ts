import { imageSchema } from '@server/domain/images/schemas/image.schema';
import { z } from 'zod';

const InfoCard = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
});

export const createCardProductSchema = z.object({
  title: z.string().min(1),
  preview: z.string().min(1),
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  product_line_id: z.string(),
});

export const updateCardProductSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  preview: z.string().min(1),
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  product_line_id: z.string(),
});

export const outputCardProductSchema = z.object({
  id: z.string(),
  title: z.string().min(1),
  preview: z.string().min(1),
  image: imageSchema,
  image_id: z.string(),
  tags: z.array(z.string()),
  gallery: z.array(imageSchema),
  gallery_ids: z.array(z.string()),
  info: z.array(InfoCard),
  product_line_id: z.string(),
});

export type createCardProductSchema = z.TypeOf<typeof createCardProductSchema>;
export type updateCardProductSchema = z.TypeOf<typeof updateCardProductSchema>;
export type outputCardProductSchema = z.TypeOf<typeof outputCardProductSchema>;
