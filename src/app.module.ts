import { join } from 'path'
import { BullModule } from '@nestjs/bull'
import { CacheModule, Module, RequestMethod } from '@nestjs/common'
import type { MiddlewareConsumer, NestModule } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { ScheduleModule } from '@nestjs/schedule'
import { ServeStaticModule } from '@nestjs/serve-static'
import { TerminusModule } from '@nestjs/terminus'
import { AppController } from './app.controller'
import { AppService } from './app.service'
// import { ConfigCustomModule } from './modules/dynamic-modules/config-custom.module'
import { EventEmitterOrdersModule } from './modules/event-emitter-sample/orders.module'
import { MikroOrmSampleModule } from './modules/mikroorm-sample/mikro-sample.module'
import { QueuesAudioModule } from './modules/queues-sample/audio.module'
import { SchedulingTasksModule } from './modules/scheduling-sample/tasks.module'
import { EventsModule } from './modules/socket-sample/events.module'
import configuration from '@/config/configuration'
import databaseConfig from '@/config/database.config'
import { LoggerMiddleware } from '@/middleware/logger.middleware'

/**
 * @see 通配符 path-to-regexp
 */
@Module({
  imports: [
    /* NestJS 自带配置注入，默认加载解析项目根目录的 .env 文件 */
    // https://docs.nestjs.com/techniques/configuration#configuration
    ConfigModule.forRoot({
      // 设置为全局模块后，子模块使用 ConfigService 则不用显式 imports
      isGlobal: true,
      // 是否缓存
      cache: true,
      // 自定义配置文件配置
      // envFilePath: '.development.env' // ['.env.development.local', '.env.development']
      // 只从运行时环境变量中导入，如 shell 中 export 配置的
      // ignoreEnvFile: true,
      // 自定义导入，在 config-use.service.ts 中演示如何使用
      load: [configuration, databaseConfig]
    }),
    // 自定义环境配置注入
    // ConfigCustomModule.register({ folder: '.' }),
    /* 缓存服务 */
    CacheModule.register(),
    EventsModule,
    /* 静态文件服务 */
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'client'),
      exclude: ['/api*']
    }),
    /* 健康检查服务 */
    TerminusModule,
    /* Event Emiiter */
    EventEmitterModule.forRoot(),
    EventEmitterOrdersModule,
    /* 定时任务 */
    ScheduleModule.forRoot(),
    SchedulingTasksModule,
    /* 消息队列 */
    BullModule.forRoot({
      redis: {
        host: 'localhost',
        port: 6379
      }
    }),
    QueuesAudioModule,

    /* mikro-orm 案例*/
    MikroOrmSampleModule
  ],
  controllers: [AppController],
  providers: [
    // 等效于 main.ts 中 app.useGlobalPipes(new ValidationPipe())
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe
    // }
    // 等效于 main.ts 中 app.useGlobalInterceptors(new LoggingInterceptor())
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor
    // },
    AppService
  ],
  exports: [AppService]
})
export class AppModule implements NestModule {
  async configure(consumer: MiddlewareConsumer) {
    consumer
      // .apply(logger) // 与下面等效
      .apply(LoggerMiddleware)
      .exclude(
        {
          path: 'cats',
          method: RequestMethod.GET
        },
        {
          path: 'cats',
          method: RequestMethod.POST
        },
        'cats/(.*)'
      )
      // .forRoutes('*')
      // .forRoutes(CatsController)
      .forRoutes({ path: 'cats', method: RequestMethod.ALL })
  }
}
