import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import type { Request } from 'express'
import jwt from 'jsonwebtoken'
import { JWT_SECRET } from '@/constants'

export const User = createParamDecorator((key: any, ctx: ExecutionContext) => {
  const req = ctx.switchToHttp().getRequest<Request>()

  // req.user 通过 <root>/typings/global.d.ts 扩展，需在 tsconfig.json 中指定
  if (req.user) {
    return key ? req.user[key] : req.user
  }

  const token = req.headers?.authorization
    ? (req.headers.authorization as string).split(' ')
    : null
  if (token?.[1]) {
    const decoded: any = jwt.verify(token[1], JWT_SECRET)
    return key ? decoded[key] : decoded.user
  }
})
