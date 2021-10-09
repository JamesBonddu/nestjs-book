import { Module } from '@nestjs/common'
import type { OnModuleInit } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { ElasticsearchModule } from '@nestjs/elasticsearch'
import { SearchService } from './search.service'

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          node: configService.get('ELASTICSEARCH_NODE'),
          maxRetries: 10,
          requestTimeout: 60000,
          pingTimeout: 60000,
          sniffOnStart: true
        }
      }
    })
  ],
  providers: [SearchService],
  exports: [SearchService]
})
export class SearchModule implements OnModuleInit {
  constructor(private searchService: SearchService) {}

  async onModuleInit() {
    await this.searchService.createIndex()
  }
}
