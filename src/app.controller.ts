import {
  Body,
  CacheInterceptor,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseInterceptors,
  UsePipes
} from '@nestjs/common'
import { Exclude, Expose, Transform } from 'class-transformer'
import { assign } from 'lodash'
import { Random } from 'mockjs'
import type { AppService } from './app.service'
import type { CreateCatDto } from './common/dto/create-cat.dto'
import { LoggingInterceptor } from './interceptors/logging.inerceptor'
import { JoiValidationPipe } from './pipe/joi-validation.pipe'
import { ValidationPipe } from './pipe/validation.pipe'
import { createCatSchema } from './schema/create-cat.schema'

class RoleEntity {
  id: number

  name: string

  constructor(partial: Partial<RoleEntity>) {
    assign(this, partial)
  }
}
class UserEntity {
  id: number

  firstName: string

  lastName: string

  @Exclude()
  password: string

  @Expose()
  get fullName(): string {
    return `${this.firstName} ${this.lastName}`
  }

  @Transform(({ value }) => value.name)
  role: RoleEntity

  constructor(partial: Partial<UserEntity>) {
    assign(this, partial)
  }
}

@Controller()
@UseInterceptors(LoggingInterceptor) // 等于 @UseInterceptors(new LoggingInterceptor())
@UseInterceptors(CacheInterceptor)
// @UsePipes(new ValidationPipe())
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello() {
    return this.appService.getHello()
  }

  @Post('cat1')
  @UsePipes(new JoiValidationPipe(createCatSchema))
  async create1(@Body() createCatDto: CreateCatDto) {
    return null
  }

  // 校验上等效于

  @Post('cat2')
  async create2(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
    return null
  }

  @Post('cat3')
  @UsePipes(new ValidationPipe()) // 等于 @UsePipes(ValidationPipe)
  async create3(@Body() createCatDto: CreateCatDto) {
    return null
  }

  /**
   * 演示序列化
   */
  @Get('serializer')
  @UseInterceptors(ClassSerializerInterceptor) // 也可作用与 controller class 上
  serializer(): UserEntity {
    return new UserEntity({
      id: 1,
      firstName: Random.first(),
      lastName: Random.last(),
      password: Random.string(),
      role: new RoleEntity({ id: 1, name: Random.name() })
    })
  }
}
