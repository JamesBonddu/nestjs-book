import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { map } from 'rxjs'

export interface Response<T> {
  data: T
}

@Injectable()
export class TransformInterceptpr<T>
  implements NestInterceptor<T, Response<T>>
{
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    // return next.handle().pipe(map(data => ({ data })))
    return next.handle().pipe(map(value => (value === null ? '' : value)))
  }
}
