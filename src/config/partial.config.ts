import { registerAs } from '@nestjs/config'

/**
 * @nestjs/config 可以加载多个配置文件，包括嵌套结构
 * 演示 ConfigModule.forFeature 的使用
 */
export default registerAs('partial', () => {
  return {
    example: process.env.EXAMPLE
  }
})
