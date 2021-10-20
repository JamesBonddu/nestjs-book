import { Inject, Injectable, Optional, Scope } from '@nestjs/common'
import { REQUEST } from '@nestjs/core'
import type { Request } from 'express'

/**
 * 可选 Provider，即 Provider 初始化时需要传入可选参数
 * 下面的例子中表示实例化时可接受不同类型的 http client
 */
@Injectable()
export class HttpService<T> {
  constructor(
    @Optional() @Inject('HTTP_OPTIONS') private readonly httpClient: T
  ) {}
}

/**
 * 在请求范围内实例访问原始请求对象
 */
@Injectable({
  scope: Scope.REQUEST
})
export class CatsService {
  // RESTful API
  constructor(@Inject(REQUEST) private readonly request: Request) {}

  // Microservice 或 GraphQL 应用程序只能插入 context
  // constructor(@Inject(REQUEST) private context) {}
}
