import { Module } from '@nestjs/common'
import { ConfigUseService } from './config-use.service'

@Module({
  providers: [ConfigUseService]
})
export class ConfigUseModule {}
