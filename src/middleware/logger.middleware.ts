import type { NestMiddleware } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { NextFunction, Request, Response } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log(`Request...`)
    next()
  }
}

// 函数式写法
export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(`Request...`)
  next()
}
