import { NestFactory } from '@nestjs/core'
import type { NestExpressApplication } from '@nestjs/platform-express'
// import { NestFastifyApplication } from '@nestjs/platform-fastify'
import { AppModule } from './app.module'
import { AppService } from './app.service'
import { LoggingInterceptor } from './interceptor/logging.inerceptor'
import { ValidationPipe } from './pipe/validation.pipe'

async function bootstrap() {
  // 使用 fastify 底座
  // const app = await NestFactory.create<NestFastifyApplication>(AppModule)
  // 使用 express 底座
  const app = await NestFactory.create<NestExpressApplication>(AppModule)
  // const app = await NestFactory.createApplicationContext(AppModule)
  app.setGlobalPrefix('api')

  app.useGlobalInterceptors(new LoggingInterceptor())
  app.useGlobalPipes(new ValidationPipe())

  const appService = app.get(AppService)
  await app.listen(3000)

  console.log(`⚡️ Application is running on ${await app.getUrl()}`)
}

bootstrap()
