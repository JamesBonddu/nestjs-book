import { MikroOrmModule } from '@mikro-orm/nestjs'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module, RequestMethod } from '@nestjs/common'
import { UserController } from './user.controller'
import { UserEntity } from './user.entity'
import { UserService } from './user.service'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] })],
  controllers: [UserController],
  exports: [UserService],
  providers: [UserService]
})
export class UserModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'user', method: RequestMethod.GET },
        { path: 'user', method: RequestMethod.PUT }
      )
  }
}
