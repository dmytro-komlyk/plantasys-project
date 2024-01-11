import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createCategorySchema,
  outputCategorySchema,
  updateCategorySchema,
} from './schemas/categories.schema';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputCategorySchema[]> {
    return await this.prisma.category.findMany({
      include: {
        lines: {
          include: {
            banner: true,
            category: true,
          },
        },
      },
    });
  }

  public async findById(id: string): Promise<outputCategorySchema> {
    const category = await this.prisma.category.findUnique({
      where: { id },
    });

    if (!category) {
      throw new TRPCError({
        message: `Category with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    return category;
  }

  public async create(
    data: createCategorySchema,
  ): Promise<outputCategorySchema> {
    const foundCategory = await this.prisma.category.findFirst({
      where: { title: data.title },
    });

    if (foundCategory) {
      throw new TRPCError({
        message: `Category with slug "${data.title}" already exists`,
        code: 'FORBIDDEN',
      });
    }
    const createdCategory = await this.prisma.category.create({ data });
    const category = await this.findById(createdCategory.id);

    return category;
  }

  public async update(
    data: updateCategorySchema,
  ): Promise<outputCategorySchema> {
    const { id, ...newData } = data;
    const category = await this.findById(id);

    if (!category) {
      throw new TRPCError({
        message: `Category with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedCategory = await this.prisma.category.update({
      where: { id },
      data: newData,
    });

    return updatedCategory;
  }

  public async remove(id: string): Promise<string> {
    const category = await this.prisma.category
      .delete({ where: { id } })
      .catch(() => {
        throw new TRPCError({
          message: `Category with ID ${id} was not found`,
          code: 'NOT_FOUND',
        });
      });

    return category.id;
  }
}
