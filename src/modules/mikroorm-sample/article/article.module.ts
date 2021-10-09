import { MikroOrmModule } from '@mikro-orm/nestjs'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { Module, RequestMethod } from '@nestjs/common'
import { UserEntity } from '../user/user.entity'
import { UserModule } from '../user/user.module'
import { ArticleController } from './article.controller'
import { ArticleEntity } from './article.entity'
import { ArticleService } from './article.service'
import { CommentEntity } from './comment.entity'

@Module({
  controllers: [ArticleController],
  imports: [
    MikroOrmModule.forFeature({
      entities: [ArticleEntity, CommentEntity, UserEntity]
    }),
    UserModule
  ],
  providers: [ArticleService]
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply().forRoutes(
      {
        path: 'articles/feed',
        method: RequestMethod.GET
      },
      { path: 'articles', method: RequestMethod.POST },
      { path: 'articles/:slug', method: RequestMethod.DELETE },
      { path: 'articles/:slug', method: RequestMethod.PUT },
      { path: 'articles/:slug/comments', method: RequestMethod.POST },
      { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
      { path: 'articles/:slug/favorite', method: RequestMethod.POST },
      { path: 'articles/:slug/favorite', method: RequestMethod.DELETE }
    )
  }
}
