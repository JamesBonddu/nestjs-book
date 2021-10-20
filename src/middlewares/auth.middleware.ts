import type { NestMiddleware } from '@nestjs/common'
import { Injectable, UnauthorizedException } from '@nestjs/common'
import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import type { IUserData } from '@/modules/mikroorm-sample/user/user.interface'
import type { UserService } from '@/modules/mikroorm-sample/user/user.service'

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(
    req: Request & { user?: IUserData & { id?: number } },
    res: Response,
    next: NextFunction
  ) {
    const { authorization } = req.headers
    const token = authorization && authorization.split(' ')[1]
    if (token) {
      const decoded: any = jwt.verify(token, 'TOKEN_SECRET')
      // 查找用户是否存在
      const user = await this.userService.findById(decoded.id)

      if (!user) {
        // throw new HttpException('User not found.', HttpStatus.UNAUTHORIZED)
        throw new UnauthorizedException('User not found.')
      }
      req.user = user.user
      req.user.id = decoded.id
      next()
    } else {
      throw new UnauthorizedException('Not authorized')
    }
  }
}
