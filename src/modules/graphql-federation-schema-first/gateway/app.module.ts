import { Module } from '@nestjs/common'
import { GraphQLGatewayModule } from '@nestjs/graphql'

@Module({
  imports: [
    GraphQLGatewayModule.forRoot({
      server: {
        cors: true
      },
      gateway: {
        serviceList: [
          {
            name: 'users',
            url: 'http://localhost:3001/graphql'
          },
          {
            name: 'posts',
            url: 'http://localhost:3002/graphql'
          }
        ]
      }
    })
  ]
})
export class AppModule {}
