import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createProductLineSchema,
  outputProductLineSchema,
  updateProductLineSchema,
} from './schemas/productsLine.schema';

@Injectable()
export class ProductsLineService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputProductLineSchema[]> {
    return await this.prisma.productLine.findMany({
      include: {
        banner: true,
        line: true,
        cards: {
          include: {
            image: true,
            gallery: true,
          },
        },
      },
    });
  }

  public async findById(id: string): Promise<outputProductLineSchema> {
    const productLine = await this.prisma.productLine.findUnique({
      where: { id },
      include: {
        banner: true,
        line: true,
        cards: {
          include: {
            image: true,
            gallery: true,
          },
        },
      },
    });

    if (!productLine) {
      throw new TRPCError({
        message: `ProductLine with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    return productLine;
  }

  public async create(
    data: createProductLineSchema,
  ): Promise<outputProductLineSchema> {
    const foundProductLine = await this.prisma.productLine.findFirst({
      where: { title: data.title },
    });

    if (foundProductLine) {
      throw new TRPCError({
        message: `ProductLine with slug "${data.title}" already exists`,
        code: 'FORBIDDEN',
      });
    }
    const createdProductLine = await this.prisma.productLine.create({ data });
    const productLine = await this.findById(createdProductLine.id);

    return productLine;
  }

  public async update(
    data: updateProductLineSchema,
  ): Promise<outputProductLineSchema> {
    const { id, ...newData } = data;
    const productLine = await this.findById(id);

    if (!productLine) {
      throw new TRPCError({
        message: `ProductLine with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedProductLine = await this.prisma.productLine.update({
      where: { id },
      data: newData,
      include: {
        banner: true,
        line: true,
        cards: {
          include: {
            image: true,
            gallery: true,
          },
        },
      },
    });

    return updatedProductLine;
  }

  public async remove(id: string): Promise<string> {
    const productLine = await this.prisma.productLine
      .delete({ where: { id } })
      .catch(() => {
        throw new TRPCError({
          message: `ProductLine with ID ${id} was not found`,
          code: 'NOT_FOUND',
        });
      });

    return productLine.id;
  }
}
