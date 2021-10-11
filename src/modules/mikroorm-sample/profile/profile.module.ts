import { MikroOrmModule } from '@mikro-orm/nestjs'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module, RequestMethod } from '@nestjs/common'
import { UserEntity } from '../user/user.entity'
import { UserModule } from '../user/user.module'
import { ProfileController } from './profile.controller'
import { ProfileService } from './profile.service'
import { AuthMiddleware } from '@/middlewares/auth.middleware'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [UserEntity] }), UserModule],
  controllers: [ProfileController],
  exports: [],
  providers: [ProfileService]
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'profiles/:username/follow',
      method: RequestMethod.ALL
    })
  }
}
