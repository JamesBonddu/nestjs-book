import { Directive, Field, ID, ObjectType } from '@nestjs/graphql'
import { Post } from './post.model'

@ObjectType()
@Directive('@extends')
@Directive('@key(fileds: "id")')
export class User {
  @Field(type => ID)
  id: number

  @Field(type => [Post])
  posts?: Post[]
}
