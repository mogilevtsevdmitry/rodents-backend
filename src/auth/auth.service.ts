import { Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import { UserService } from '../user/user.service'
import { UserEntity } from '../user/user.entity'
import { AuthHelper } from './auth.helper'
import { TokenDto } from './token-dto'
import { IAuthPayload } from './auth.interfaces'


@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {
  }

  async login(user: Partial<UserEntity>): Promise<TokenDto> {
    const candidate = await this.userService.getByEmail(user.email)
    if (!candidate) {
      throw new NotFoundException(`Пользователь с email ${candidate.email} не найден!`)
    }
    const isMath = await this.validateUser(user, candidate)
    if (!isMath) {
      throw new Error('Пароли не совпадают!')
    }
    const payload: IAuthPayload = { email: candidate.email, userId: candidate.id }
    const token = `Bearer ${this.jwtService.sign(payload)}`
    return {
      id: candidate.id,
      access_token: token,
      expiresIn: Number(process.env.JWT_IXPIRESIN),
    }
  }

  async validateUser(user: Partial<UserEntity>, candidate: UserEntity): Promise<boolean> {
    return AuthHelper.validate(user.password, candidate.password)
  }

  async register(user: Partial<UserEntity>): Promise<UserEntity> {
    return this.userService.create(user)
  }

}
