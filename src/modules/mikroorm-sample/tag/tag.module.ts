import { MikroOrmModule } from '@mikro-orm/nestjs'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { TagController } from './tag.controller'
import { TagEntity } from './tag.entity'
import { TagService } from './tag.service'

@Module({
  imports: [MikroOrmModule.forFeature({ entities: [TagEntity] }), UserModule],
  controllers: [TagController],
  exports: [],
  providers: [TagService]
})
export class TagModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {}
}
