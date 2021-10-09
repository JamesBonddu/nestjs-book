import type {
  NestInterceptor,
  ExecutionContext,
  CallHandler
} from '@nestjs/common'
import { Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { of } from 'rxjs'

@Injectable()
export class CacheInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const isCached = true
    if (isCached) {
      return of([])
    }
    return next.handle()
  }
}
