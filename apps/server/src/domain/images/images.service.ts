import { Injectable, NotFoundException } from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';
import { imageSchema, uploadImageSchema } from './schemas/image.schema';

@Injectable()
export class ImagesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<imageSchema[]> {
    return await this.prisma.image.findMany();
  }

  public async findById(id: string): Promise<imageSchema> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const image = await this.prisma.image.findUnique({
      where: {
        id,
      },
    });

    if (!image) {
      throw new NotFoundException(`Image with ID "${id}" was not found`);
    }

    return image;
  }

  public async upload(data: uploadImageSchema): Promise<imageSchema> {
    const createdImage = await this.prisma.image.create({ data });
    const image = await this.findById(createdImage.id);

    return image;
  }

  public async update(data: imageSchema): Promise<imageSchema> {
    const { id, ...newData } = data;
    await this.findById(id);

    const image = await this.prisma.image.update({
      where: { id },
      data: newData,
    });

    return image;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const image = await this.prisma.image.delete({ where: { id } });

    if (!image) {
      throw new NotFoundException(`Image with ID ${id} was not found`);
    }

    return id;
  }
}
