import crypto from 'crypto'
import {
  Collection,
  Entity,
  EntityRepositoryType,
  ManyToMany,
  OneToMany,
  PrimaryKey,
  Property,
  wrap
} from '@mikro-orm/core'
import { IsEmail } from 'class-validator'
import { Article } from '../article/article.entity'
import type { UserRepository } from './user.repository'

@Entity()
export class UserEntity {
  [EntityRepositoryType]?: UserRepository

  @PrimaryKey()
  id: number

  @Property()
  username: string

  @Property({ hidden: true })
  @IsEmail()
  email: string

  @Property()
  bio = ''

  @Property()
  image = ''

  @Property({ hidden: true })
  password: string

  @ManyToMany({ hidden: true })
  favorites = new Collection<Article>(this)

  @ManyToMany({
    entity: () => UserEntity,
    inversedBy: u => u.followed,
    owner: true,
    hidden: true,
    pivotTable: 'user_to_follower',
    joinColumn: 'follower',
    inverseJoinColumn: 'following'
  })
  followers = new Collection<UserEntity>(this)

  @ManyToMany(() => UserEntity, u => u.followers, {
    hidden: true
  })
  followed = new Collection<UserEntity>(this)

  @OneToMany(() => Article, article => article.author, {
    hidden: true
  })
  articles = new Collection<Article>(this)

  constructor(username: string, email: string, password: string) {
    this.username = username
    this.email = email
    this.password = crypto.createHmac('sha256', password).digest('hex')
  }

  toJSON(user?: UserEntity) {
    const o = wrap(this).toObject()
    o.image =
      this.image || 'https://static.productionready.io/images/smiley-cyrus.jpg'
    o.following =
      user && user.followers.isInitialized()
        ? user.followers.contains(this)
        : false

    return o
  }
}
