import { Module } from '@nestjs/common'
import { JwtModule } from '@nestjs/jwt'
import { PassportModule } from '@nestjs/passport'

import { AuthService } from './auth.service'
import { AuthResolver } from './auth.resolver'
import { UserModule } from '../user/user.module'
import { JwtStrategy } from './jwt.strategy'
import { GqlAuthGuard } from './gql-auth.guard'


@Module({
  imports: [
    UserModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: Number(process.env.JWT_IXPIRESIN)
      },
    }),
  ],
  providers: [AuthService, AuthResolver, JwtStrategy, GqlAuthGuard],
  exports: [AuthService],
})
export class AuthModule {
}
