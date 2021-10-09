import path from 'path'
import { Inject, Injectable } from '@nestjs/common'
import dotenv from 'dotenv'
import fs from 'fs-extra'
import type { ValuesType } from 'utility-types'
import { CONFIG_OPTIONS } from './constants'
import type { ConfigOptions } from './inerfaces/config-options.interface'
import type { EnvConfig } from './inerfaces/envconfig.interface'

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig

  constructor(
    @Inject(CONFIG_OPTIONS)
    private readonly options: ConfigOptions
  ) {
    const filePath = `${process.env.NODE_ENV || 'development'}.env`
    const envFile = path.resolve(__dirname, '../../', options.folder, filePath)
    this.envConfig = dotenv.parse(fs.readFileSync(envFile))
  }

  get(key: string): ValuesType<EnvConfig> {
    return this.envConfig[key]
  }

  getAll(): EnvConfig {
    return this.envConfig
  }
}
