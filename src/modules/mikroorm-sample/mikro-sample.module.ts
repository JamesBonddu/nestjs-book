import { MikroOrmModule } from '@mikro-orm/nestjs'
import { Module } from '@nestjs/common'
import { ArticleController } from './article/article.controller'
import { ArticleModule } from './article/article.module'
import { ArticleService } from './article/article.service'
import config from './config'
import { ProfileController } from './profile/profile.controller'
import { ProfileModule } from './profile/profile.module'
import { ProfileService } from './profile/profile.service'
import { TagController } from './tag/tag.controller'
import { TagModule } from './tag/tag.module'
import { TagService } from './tag/tag.service'
import { UserController } from './user/user.controller'
import { UserModule } from './user/user.module'
import { UserService } from './user/user.service'

@Module({
  imports: [
    MikroOrmModule.forRoot(config),
    ArticleModule,
    ProfileModule,
    TagModule,
    UserModule
  ],
  controllers: [
    ArticleController,
    ProfileController,
    TagController,
    UserController
  ],
  providers: [ArticleService, ProfileService, TagService, UserService]
})
export class MikroOrmSampleModule {}
