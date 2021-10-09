import type { Options } from 'mikro-orm'
import { ArticleEntity } from './article/article.entity'
import { CommentEntity } from './article/comment.entity'
import { TagEntity } from './tag/tag.entity'
import { UserEntity } from './user/user.entity'

const config = {
  type: 'mysql',
  host: 'localhost',
  port: 3307,
  username: 'root',
  password: '',
  dbName: 'nestjs-book',
  entities: [ArticleEntity, CommentEntity, UserEntity, TagEntity],
  entitiesDirsTs: ['./']
} as Options

export default config
