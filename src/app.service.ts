import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ConfigService } from '@nestjs/config'
import type { EnvConfig } from './modules/dynamic-modules/inerfaces/envconfig.interface'

@Injectable()
export class AppService {
  private readonly config: EnvConfig

  constructor(configService: ConfigService) {
    const port = configService.get('PORT', { infer: true })
    console.log(port)
  }

  getHello(): string {
    return 'Hello World!'
  }

  getConfig() {
    return this.config
  }
}
