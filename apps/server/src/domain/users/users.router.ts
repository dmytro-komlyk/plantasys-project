import { Injectable } from '@nestjs/common';
import z from 'zod';
import { TrpcService } from '../trpc/trpc.service';
import { createUserSchema, outputUserSchema } from './schemas/user.schema';
import { UserService } from './users.service';

@Injectable()
export class UserRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UserService,
  ) {}

  usersRouter = this.trpc.router({
    getByIdUser: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByIdUser',
          tags: ['users'],
          summary: 'Read a user by id',
        },
      })
      .input(z.object({ id: z.string() }))
      .output(outputUserSchema)
      .query(async ({ input }) => {
        return await this.usersService.findById(input.id);
      }),

    getByEmailUser: this.trpc.procedure
      .meta({
        openapi: {
          method: 'GET',
          path: '/getByEmailUser',
          tags: ['users'],
          summary: 'Read a user by email',
        },
      })
      .input(z.object({ email: z.string().email() }))
      .output(outputUserSchema)
      .query(async ({ input }) => {
        return await this.usersService.findByEmail(input.email);
      }),

    createUser: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/createUser',
          tags: ['users'],
          summary: 'Create a new user',
        },
      })
      .input(createUserSchema)
      .output(outputUserSchema)
      .mutation(async ({ input }) => {
        return await this.usersService.create({ ...input });
      }),
  });
}
