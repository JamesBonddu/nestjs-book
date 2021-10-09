import { Injectable } from '@nestjs/common'
import type { ConfigService } from './modules/dynamic-modules/config.service'
import type { EnvConfig } from './modules/dynamic-modules/inerfaces/envconfig.interface'

@Injectable()
export class AppService {
  private readonly config: EnvConfig

  constructor(configService: ConfigService) {
    this.config = configService.getAll()
  }

  getHello(): string {
    return 'Hello World!'
  }

  getConfig() {
    return this.config
  }
}
