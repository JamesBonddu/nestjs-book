// import { join } from 'path'
// import { readFileSync } from 'fs-extra'
// import * as yaml from 'js-yaml'

const YAML_CONFIG_FILENAME = 'config.yaml'

/**
 * 载入嵌套对象型环境变量
 */
export default () => {
  return {
    port: parseInt(process.env.PORT, 10) || 5000,
    database: {
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT, 10) || 5432
    }
  }
}

/**
 * 从 yaml 文件载入
 */
// export default () => {
//   return yaml.load(
//     readFileSync(join(__dirname, ../../YAML_CONFIG_FILENAME), 'utf8')
//   ) as Record<string, any>
// }
