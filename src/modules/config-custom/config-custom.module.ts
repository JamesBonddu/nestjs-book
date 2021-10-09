import { Module } from '@nestjs/common'
// import { ConfigModule } from '@nestjs/config'
import { ConfigCustomService } from './config-custom.service'
// import partialConfig from '@/config/partial.config'

/**
 * 自定义配置模块
 */
@Module({
  // 只在子模块中加载部分配置的用法
  // imports: [ConfigModule.forFeature(partialConfig)],
  // providers: [ConfigService],
  // 等效于
  providers: [
    {
      provide: ConfigCustomService,
      // 默认使用根目录下 .env
      useValue: new ConfigCustomService('.env')
    }
  ],
  exports: [ConfigCustomService]
})
export class ConfigCustomModule {}
