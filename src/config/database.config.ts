import { registerAs } from '@nestjs/config'

/**
 * @nestjs/config 可以加载多个配置文件，包括嵌套结构
 */
export default registerAs('database', () => {
  return {
    host: process.env.DATABASE_HOST,
    port: process.env.DATABASE_PORT || 5432
  }
})
