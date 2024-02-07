import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { TRPCError } from '@trpc/server';
import {
  createLineSchema,
  outputLineSchema,
  updateLineSchema,
} from './schemas/lines.schema';

@Injectable()
export class LinesService {
  constructor(private prisma: PrismaService) {}

  public async findAll(): Promise<outputLineSchema[]> {
    return await this.prisma.line.findMany({
      include: {
        banner: true,
        category: true,
        products: {
          include: {
            banner: false,
            line: false,
          },
        },
      },
    });
  }

  public async findById(id: string): Promise<outputLineSchema> {
    const line = await this.prisma.line.findUnique({
      where: { id },
      include: {
        banner: true,
        category: true,
        products: {
          include: {
            banner: true,
            line: true,
          },
        },
      },
    });

    if (!line) {
      throw new TRPCError({
        message: `Line with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    return line;
  }

  public async create(data: createLineSchema): Promise<outputLineSchema> {
    const foundLine = await this.prisma.line.findFirst({
      where: { title: data.title },
    });

    if (foundLine) {
      throw new TRPCError({
        message: `Line with slug "${data.title}" already exists`,
        code: 'FORBIDDEN',
      });
    }
    const createdLine = await this.prisma.line.create({ data });
    const line = await this.findById(createdLine.id);

    return line;
  }

  public async update(data: updateLineSchema): Promise<outputLineSchema> {
    const { id, ...newData } = data;
    const line = await this.findById(id);

    if (!line) {
      throw new TRPCError({
        message: `Line with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    }

    const updatedLine = await this.prisma.line.update({
      where: { id },
      data: newData,
      include: {
        banner: true,
        category: true,
        products: {
          include: {
            banner: true,
            line: true,
          },
        },
      },
    });

    return updatedLine;
  }

  public async remove(id: string): Promise<string> {
    const line = await this.prisma.line.delete({ where: { id } }).catch(() => {
      throw new TRPCError({
        message: `Line with ID ${id} was not found`,
        code: 'NOT_FOUND',
      });
    });

    return line.id;
  }
}
