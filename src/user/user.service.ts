import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'

import { UserEntity } from './user.entity'
import { AuthHelper } from '../auth/auth.helper'
import { UserUpdateInput } from './input/user-update.input'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const email = user.email.toLocaleLowerCase().trim()
    const candidate = await this.getByEmail(email)
    if (candidate) {
      throw new HttpException(`Пользователь с email: ${email} уже существует!`, HttpStatus.CONFLICT)
    }
    const password = await AuthHelper.hash(user.password)
    const newUser = await this.userEntityRepository.create({ ...user, email, password })
    return await this.userEntityRepository.save(newUser)
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({ id }) || null
  }

  async getAll(): Promise<UserEntity[]> {
    return await this.userEntityRepository.find()
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({ email: email.toLocaleLowerCase().trim() }) || null
  }

  async removeById(id: number): Promise<boolean> {
    const deletedResult = await this.userEntityRepository.delete({ id })
    console.log('DeleteResult', deletedResult)
    return true
  }

  async updateUser(user: UserUpdateInput): Promise<UserEntity> {
    const hashPass = user.password ? await AuthHelper.hash(user.password) : null
    const newEmail = user.email ? user.email.toLocaleLowerCase().trim() : null
    const dataToUpdate = { ...user }
    if (hashPass) {
      dataToUpdate['password'] = hashPass
    }
    if (newEmail) {
      dataToUpdate['email'] = newEmail
    }
    await this.userEntityRepository.update(
      {
        id: user.id,
      }, {
        ...dataToUpdate,
      },
    )
    return await this.getById(user.id)
  }

}
