import {
  ArrayType,
  Collection,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryKey,
  Property,
  wrap
} from '@mikro-orm/core'
import slug from 'slug'
import type { UserEntity } from '../user/user.entity'
import { CommentEntity } from './comment.entity'

@Entity()
export class ArticleEntity {
  @PrimaryKey()
  id: number

  @Property()
  slug: string

  @Property()
  title: string

  @Property()
  description = ''

  @Property()
  body = ''

  @Property()
  createdAt = new Date()

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date()

  @Property({ type: ArrayType })
  tagList: string[] = []

  @ManyToOne()
  author: UserEntity

  @OneToMany(() => CommentEntity, comment => comment.article, {
    eager: true,
    orphanRemoval: true
  })
  comments = new Collection<CommentEntity>(this)

  @Property()
  favoritesCount = 0

  constructor(
    author: UserEntity,
    title: string,
    description: string,
    body: string
  ) {
    this.author = author
    this.title = title
    this.body = body
    this.description = description
    this.slug =
      slug(title, {
        lower: true
      }) +
      '-' +
      ((Math.random() * Math.pow(36, 6)) | 0).toString(36)
  }

  toJSON(user?: UserEntity): ArticleEntity {
    const o = wrap(this).toObject()
    o.favorited =
      user && user.favorites.isInitialized()
        ? user.favorites.contains(this)
        : false
    o.author = this.author.toJSON(user)

    return o as ArticleEntity
  }
}
