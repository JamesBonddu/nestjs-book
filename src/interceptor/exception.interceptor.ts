import type {
  CallHandler,
  ExecutionContext,
  NestInterceptor
} from '@nestjs/common'
import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import type { Observable } from 'rxjs'
import { catchError, throwError } from 'rxjs'

@Injectable()
export class ExceptionInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next
      .handle()
      .pipe(
        catchError(err =>
          throwError(() => new HttpException(err.name, HttpStatus.BAD_GATEWAY))
        )
      )
  }
}
