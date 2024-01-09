import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Types } from 'mongoose';

import { PrismaService } from '../prisma/prisma.service';

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
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const cardProduct = await this.prisma.cardProduct.findUnique({
      where: { id },
      include: { image: true, gallery: true },
    });

    if (!cardProduct) {
      throw new NotFoundException(`CardProduct with ID "${id}" was not found`);
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
      throw new BadRequestException(
        `CardProduct with slug "${data.title}" already exists`,
      );
    }
    const createdCardProduct = await this.prisma.cardProduct.create({ data });
    const cardProduct = await this.findById(createdCardProduct.id);

    return cardProduct;
  }

  public async update(
    data: updateCardProductSchema,
  ): Promise<outputCardProductSchema> {
    const { id, ...newData } = data;
    const benefit = await this.findById(id);

    if (!benefit) {
      throw new NotFoundException(`Benefit with ID ${id} was not found`);
    }

    const updatedBenefit = await this.prisma.cardProduct.update({
      where: { id },
      data: newData,
      include: { image: true, gallery: true },
    });

    return updatedBenefit;
  }

  public async remove(id: string): Promise<string> {
    if (!Types.ObjectId.isValid(id)) {
      throw new NotFoundException(`Incorrect ID - ${id}`);
    }

    const benefit = await this.prisma.cardProduct.delete({ where: { id } });

    if (!benefit) {
      throw new NotFoundException(`CardProduct with ID ${id} was not found`);
    }

    return id;
  }
}
