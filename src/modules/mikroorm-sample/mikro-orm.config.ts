import type { Options } from '@mikro-orm/core'
import { TsMorphMetadataProvider } from '@mikro-orm/reflection'
import { SqlHighlighter } from '@mikro-orm/sql-highlighter'

export default {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1qaz2wsx',
  dbName: 'mikro-sample',
  // entities: [ArticleEntity, CommentEntity, UserEntity, TagEntity],
  // entitiesDirsTs: ['./'],
  entities: ['./**/*.entity.js'],
  entitiesTs: ['./**/*.entity.ts'],
  debug: true,
  highlighter: new SqlHighlighter(),
  metadataProvider: TsMorphMetadataProvider
} as Options
