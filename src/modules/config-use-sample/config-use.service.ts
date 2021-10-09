import { Inject, Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService, ConfigType } from '@nestjs/config'
import databaseConfig from '@/config/database.config'

@Injectable()
export class ConfigUseService {
  constructor(
    // AppModule 中 ConfigModule 的 isGlobal: true，则 ConfigModule 不用再 ConfigUseModule 中 imports，此处直接用
    private readonly configService: ConfigService,
    // 相比上面更优化的方案，获得更好的类型推断
    @Inject(databaseConfig.KEY)
    private dbConfig: ConfigType<typeof databaseConfig>
  ) {}

  example() {
    // Good
    // const host = this.configService.get<string>('database.host')
    // Very Good
    // this.dbConfig.host
  }
}
