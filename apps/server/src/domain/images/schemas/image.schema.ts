import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string(),
  file: z.object({
    destination: z.string(),
    encoding: z.string(),
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string(),
    originalname: z.string(),
    path: z.string(),
    size: z.number(),
  }),
  alt: z.string(),
  type: z.string(),
});

export const uploadImageSchema = z.object({
  file: z.object({
    destination: z.string(),
    encoding: z.string(),
    fieldname: z.string(),
    filename: z.string(),
    mimetype: z.string(),
    originalname: z.string(),
    path: z.string(),
    size: z.number(),
  }),
  alt: z.string().min(1),
  type: z.string().min(1),
});

export type imageSchema = z.TypeOf<typeof imageSchema>;
export type uploadImageSchema = z.TypeOf<typeof uploadImageSchema>;
