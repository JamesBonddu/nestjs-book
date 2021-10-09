import crypto from 'crypto'
import { wrap } from '@mikro-orm/core'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { validate } from 'class-validator'
import jwt from 'jsonwebtoken'
import type { LoginUserDto, UpdateUserDto } from '../article/dto'
import type { CreateUserDto } from '../article/dto/create-user.dto'
import { UserEntity } from './user.entity'
import type { IUserRO } from './user.interface'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { UserRepository } from './user.repository'
import { JWT_SECRET } from '@/constants'

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll(): Promise<UserEntity[]> {
    return this.userRepository.findAll()
  }

  async findOne(loginUserDto: LoginUserDto): Promise<UserEntity> {
    const findOneOptions = {
      email: loginUserDto.email,
      password: crypto.createHmac('sha256', loginUserDto.password).digest('hex')
    }

    return this.userRepository.findOne(findOneOptions)
  }

  async create(dto: CreateUserDto): Promise<IUserRO> {
    const { username, email, password } = dto
    const exists = await this.userRepository.count({
      $or: [{ username }, { email }]
    })
    if (exists > 0) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Username and email must be unique.' }
        },
        HttpStatus.BAD_REQUEST
      )
    }
    const user = new UserEntity(username, email, password)
    const errors = await validate(user)

    if (errors.length) {
      throw new HttpException(
        {
          message: 'Input data validation failed',
          errors: { username: 'Userinput is not valid.' }
        },
        HttpStatus.BAD_REQUEST
      )
    } else {
      await this.userRepository.persistAndFlush(user)
      return this.buildUserRO(user)
    }
  }

  async update(id: number, dto: UpdateUserDto) {
    const user = await this.userRepository.findOne(id)
    wrap(user).assign(dto)
    await this.userRepository.flush()

    return this.buildUserRO(user)
  }

  async delete(email: string) {
    return this.userRepository.remove({ email })
  }

  async findById(id: number): Promise<IUserRO> {
    const user = await this.userRepository.findOne(id)

    if (!user) {
      const errors = { User: ' not found' }
      throw new HttpException({ errors }, 401)
    }

    return this.buildUserRO(user)
  }

  async findByEmail(email: string): Promise<IUserRO> {
    const user = await this.userRepository.findOneOrFail({ email })
    return this.buildUserRO(user)
  }

  generateJWT(user) {
    const today = new Date()
    const exp = new Date(today)
    exp.setDate(today.getDate() + 60)

    return jwt.sign(
      {
        email: user.email,
        exp: exp.getTime() / 1000,
        id: user.id,
        username: user.username
      },
      JWT_SECRET
    )
  }

  private buildUserRO(user: UserEntity) {
    const userRO = {
      bio: user.bio,
      email: user.email,
      image: user.image,
      token: this.generateJWT(user),
      username: user.username
    }

    return { user: userRO }
  }
}
