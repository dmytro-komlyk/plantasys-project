import { Injectable } from '@nestjs/common';
import { TrpcService } from '../trpc/trpc.service';
import { UserService } from '../users/users.service';
import { AuthService } from './auth.service';
import {
  loginSchema,
  outputAuthSchema,
  signUpSchema,
} from './schemas/auth.schema';

@Injectable()
export class AuthRouter {
  constructor(
    private readonly trpc: TrpcService,
    private readonly usersService: UserService,
    private readonly authService: AuthService,
  ) {}

  authRouter = this.trpc.router({
    register: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/register',
          tags: ['auth'],
          summary: 'Register new user',
        },
      })
      .input(signUpSchema)
      .output(outputAuthSchema)
      .mutation(async ({ input }) => {
        const { email } = await this.usersService.create({ ...input });
        return await this.authService.login({
          email,
          password: input.password,
        });
      }),
    login: this.trpc.procedure
      .meta({
        openapi: {
          method: 'POST',
          path: '/login',
          tags: ['auth'],
          summary: 'Login user',
        },
      })
      .input(loginSchema)
      .output(outputAuthSchema)
      .mutation(async ({ input }) => {
        return await this.authService.login({ ...input });
      }),
    // refreshToken: this.trpc.procedure
  });
}
