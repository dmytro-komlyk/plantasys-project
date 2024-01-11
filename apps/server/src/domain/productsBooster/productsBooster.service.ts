import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createProductBoosterSchema,
  outputProductBoosterSchema,
  updateProductBoosterSchema,
} from './schemas/productsBooster.schema';

@Injectable()
export class ProductsBoosterService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputProductBoosterSchema[]> {
    return await this.prisma.productBooster.findMany({
      include: { image: true, gallery: true },
    });
  }

  public async findById(id: string): Promise<outputProductBoosterSchema> {
    const productBooster = await this.prisma.productBooster.findUnique({
      where: { id },
      include: { image: true, gallery: true },
    });

    if (!productBooster) {
      throw new TRPCError({
        message: `ProductBooster with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    return productBooster;
  }

  public async create(
    data: createProductBoosterSchema,
  ): Promise<outputProductBoosterSchema> {
    const foundProductBooster = await this.prisma.productBooster.findFirst({
      where: { title: data.title },
    });

    if (foundProductBooster) {
      throw new TRPCError({
        message: `ProductBooster with slug "${data.title}" already exists`,
        code: 'FORBIDDEN',
      });
    }
    const createdProductBooster = await this.prisma.productBooster.create({
      data,
    });
    const productBooster = await this.findById(createdProductBooster.id);

    return productBooster;
  }

  public async update(
    data: updateProductBoosterSchema,
  ): Promise<outputProductBoosterSchema> {
    const { id, ...newData } = data;
    const productBooster = await this.findById(id);

    if (!productBooster) {
      throw new TRPCError({
        message: `ProductBooster with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedProductBooster = await this.prisma.productBooster.update({
      where: { id },
      data: newData,
      include: { image: true, gallery: true },
    });

    return updatedProductBooster;
  }

  public async remove(id: string): Promise<string> {
    const productBooster = await this.prisma.productBooster
      .delete({ where: { id } })
      .catch(() => {
        throw new TRPCError({
          message: `ProductBooster with ID ${id} was not found`,
          code: 'NOT_FOUND',
        });
      });

    return productBooster.id;
  }
}
