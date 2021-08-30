import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { DeleteResult, Repository, UpdateResult } from 'typeorm'

import { UserEntity } from './user.entity'
import { AuthHelper } from '../auth/auth.helper'


@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntityRepository: Repository<UserEntity>,
  ) {
  }

  async create(user: Partial<UserEntity>): Promise<UserEntity> {
    const email = user.email.toLocaleLowerCase().trim()
    const password = await AuthHelper.hash(user.password)
    const newUser = await this.userEntityRepository.create({ ...user, email, password })
    return await this.userEntityRepository.save(newUser)
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({ id }) || null
  }

  async getByEmail(email: string): Promise<UserEntity> {
    return await this.userEntityRepository.findOne({ email: email.toLocaleLowerCase().trim() }) || null
  }

  async delete(id: number): Promise<boolean> {
    const deletedResult = await this.userEntityRepository.delete({ id })
    console.log('DeleteResult', deletedResult)
    return true
  }

  async update(user: Partial<UserEntity>): Promise<boolean> {
    const updatedUser = await this.userEntityRepository.update(
      {
        ...user,
        email: user.email.toLocaleLowerCase().trim(),
      }, user,
    )
    console.log('updatedUser', updatedUser)
    return true
  }

}
