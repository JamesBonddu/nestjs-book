import type { CanActivate, ExecutionContext } from '@nestjs/common'
import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { Reflector } from '@nestjs/core'
import type { Observable } from 'rxjs'

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    // 获取 controller class 上注入的元数据
    // const roles = this.reflector.get<string[]>('roles', context.getClass())
    // 获取 method 上注入的元数据
    // const roles = this.reflector.get<string[]>('roles', context.getHandler())
    // 获取所有注入的元数据
    // const roles = this.reflector.getAll<string[]>('roles', [
    //   context.getClass(),
    //   context.getHandler()
    // ])
    // 获取所有注入的元数据，method 合并 controller class 上同名的
    // const roles = this.reflector.getAllAndMerge<string[]>('roles', [
    //   context.getClass(),
    //   context.getHandler()
    // ])
    // 获取所有注入的元数据，method 覆盖 controller class 上同名的
    const roles = this.reflector.getAllAndOverride<string[]>('roles', [
      context.getClass(),
      context.getHandler()
    ])

    if (!roles) {
      return false
    }
    return true
    // return Promise.resolve(true)
  }
}
