import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  UsePipes
} from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type { CreateUserDto, LoginUserDto, UpdateUserDto } from '../article/dto'
import type { IUserRO } from './user.interface'
import type { UserService } from './user.service'
import { User } from '@/decorators/user.decorator'
import { ValidationPipe } from '@/pipe/validation.pipe'

@ApiBearerAuth()
@ApiTags('user')
@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('user')
  async findMe(@User('email') email: string): Promise<IUserRO> {
    return this.userService.findByEmail(email)
  }

  @Put('user')
  async update(
    @User('id') userId: number,
    @Body('user') userData: UpdateUserDto
  ) {
    return this.userService.update(userId, userData)
  }

  @UsePipes(new ValidationPipe())
  @Post('users')
  async create(@Body('user') userData: CreateUserDto) {
    return this.userService.create(userData)
  }

  @Delete('users/:slug')
  async delete(@Param() params) {
    return this.userService.delete(params.slug)
  }

  @UsePipes(new ValidationPipe())
  @Post('users/login')
  async login(@Body('user') loginUserDto: LoginUserDto): Promise<IUserRO> {
    const foundUser = await this.userService.findOne(loginUserDto)

    const errors = { User: ' not found' }
    if (!foundUser) {
      throw new HttpException({ errors }, 401)
    }
    const token = await this.userService.generateJWT(foundUser)
    const { email, username, bio, image } = foundUser
    const user = { email, token, username, bio, image }
    return { user }
  }
}
