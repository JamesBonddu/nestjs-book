import path from 'path'
import dotenv from 'dotenv'
import fs from 'fs-extra'

export class ConfigCustomService {
  private readonly envConfig: Record<string, string>

  // filePath 可由对应 Module 的 providers 的 userValue 注入
  constructor(filePath = '.env') {
    this.envConfig = dotenv.parse(
      fs.readFileSync(path.resolve(process.cwd(), filePath))
    )
  }

  get(key: string): string {
    return this.envConfig[key]
  }
}
