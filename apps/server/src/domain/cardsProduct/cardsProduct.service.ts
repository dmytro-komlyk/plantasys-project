import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createCardProductSchema,
  outputCardProductSchema,
  updateCardProductSchema,
} from './schemas/cardsProduct.schema';

@Injectable()
export class CardsProductService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputCardProductSchema[]> {
    return await this.prisma.cardProduct.findMany({
      include: { image: true, gallery: true },
    });
  }

  public async findById(id: string): Promise<outputCardProductSchema> {
    const cardProduct = await this.prisma.cardProduct.findUnique({
      where: { id },
      include: { image: true, gallery: true },
    });

    if (!cardProduct) {
      throw new TRPCError({
        message: `CardProduct with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    return cardProduct;
  }

  public async create(
    data: createCardProductSchema,
  ): Promise<outputCardProductSchema> {
    const foundCardProduct = await this.prisma.cardProduct.findFirst({
      where: { title: data.title },
    });

    if (foundCardProduct) {
      throw new TRPCError({
        message: `CardProduct with slug "${data.title}" already exists`,
        code: 'FORBIDDEN',
      });
    }
    const createdCardProduct = await this.prisma.cardProduct.create({ data });
    const cardProduct = await this.findById(createdCardProduct.id);

    return cardProduct;
  }

  public async update(
    data: updateCardProductSchema,
  ): Promise<outputCardProductSchema> {
    const { id, ...newData } = data;
    const cardProduct = await this.findById(id);

    if (!cardProduct) {
      throw new TRPCError({
        message: `CardProduct with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedBenefit = await this.prisma.cardProduct.update({
      where: { id },
      data: newData,
      include: { image: true, gallery: true },
    });

    return updatedBenefit;
  }

  public async remove(id: string): Promise<string> {
    const cardProduct = await this.prisma.cardProduct
      .delete({ where: { id } })
      .catch(() => {
        throw new TRPCError({
          message: `CardProduct with ID ${id} was not found`,
          code: 'NOT_FOUND',
        });
      });

    return cardProduct.id;
  }
}
