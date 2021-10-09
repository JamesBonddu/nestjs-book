import { Entity, ManyToOne, PrimaryKey, Property } from '@mikro-orm/core'
import type { UserEntity } from '../user/user.entity'
import type { ArticleEntity } from './article.entity'

@Entity()
export class CommentEntity {
  @PrimaryKey()
  id: number

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property()
  body: string

  @ManyToOne()
  article: ArticleEntity

  @ManyToOne()
  author: UserEntity

  constructor(author: UserEntity, article: ArticleEntity, body: string) {
    this.author = author
    this.article = article
    this.body = body
  }
}
