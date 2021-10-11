import { createConnection } from 'net'
import { Controller, Get, Inject, Injectable, Module } from '@nestjs/common'
import type { ConfigService } from '@nestjs/config'
import type { AxiosInstance } from 'axios'
import Axios from 'axios'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Connection } from 'typeorm'

const CONSTANTS = {
  CONNECTION1: 'CONNECTION1',
  CONNECTION2: 'CONNECTION2',
  AXIOS_INSTANCE_TOKEN: 'AXIOS_INSTANCE_TOKEN'
}

/**
 * cats.service.ts
 */
type CatType = string

@Injectable() // 此装饰器将 CatsService 标记为提供者，即由 Nest IoC 管理
export class CatsService {
  private readonly cats: CatType[] = []

  findAll(): CatType[] {
    return this.cats
  }
}

/**
 * cats.controller.ts
 */
@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    @Inject(CONSTANTS.CONNECTION1) connection: Connection,
    @Inject(CONSTANTS.AXIOS_INSTANCE_TOKEN) axios: AxiosInstance = Axios
  ) {}

  @Get()
  async findAll(): Promise<CatType[]> {
    return this.catsService.findAll()
  }
}

const mockCatsService = {
  /**
   * mock implementation
   */
}

@Injectable()
export class LoggerService {
  /**
   * implementation details
   */
}

/**
 * 一个 provider 依赖其它 provider，可以把此 provider 导出供其它 module 使用
 */
const connectionFactory = {
  provide: CONSTANTS.CONNECTION2,
  // 可同步，可异步
  useFactory: async (
    configService: ConfigService /* otherProvider: OtherProvider */
  ) => {
    const options = configService.get('DATABASE_CONFIG')
    const connection = await createConnection(options)
    return connection
  },
  inject: [
    /* OtherProvider */
  ]
}

@Module({
  controllers: [CatsController],
  // 简写形式
  // providers: [CatsService]
  // 完整写法
  providers: [
    {
      provide: CatsService,
      useClass: CatsService
    },
    /* 自定义即模拟 catsService 实现，常用语测试
    {
      provide: CatsService,
      useValue: mockCatsService
    }
    */
    // 非类提供者，connection 为外部已存在的连接对象
    {
      provide: CONSTANTS.CONNECTION1,
      useValue: Connection
    },
    {
      provide: CONSTANTS.AXIOS_INSTANCE_TOKEN,
      useValue: Axios.create({
        /* options */
      })
    },
    {
      provide: 'CONFIG',
      useFactory: () => {
        // provider 可以返回常量
        return process.env.NODE_ENV
      }
    },
    connectionFactory,
    // 一个 provider 可以做 2 次用
    {
      provide: 'AliasedLoggerService',
      useExisting: LoggerService
    },
    LoggerService
  ],
  exports: [
    // CONSTANTS.CONNECTION2
    // 等效于
    connectionFactory
  ]
})
export class AppModule {}
