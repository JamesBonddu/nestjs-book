import { Module } from '@nestjs/common'
import { GraphQLFederationModule } from '@nestjs/graphql'
import { UsersResolver } from './users.resolver'
import { UsersService } from './users.service'

@Module({
  imports: [
    GraphQLFederationModule.forRoot({
      autoSchemaFile: true
    })
  ],
  providers: [UsersResolver, UsersService]
})
export class UsersModule {}
