import { join } from 'path'
import type { MessageEvent } from '@nestjs/common'
import { Controller, Get, Res, Sse } from '@nestjs/common'
import type { Response } from 'express'
import { readFileSync } from 'fs-extra'
import type { Observable } from 'rxjs'
import { interval } from 'rxjs'
import { map } from 'rxjs/operators'

@Controller()
export class SSEController {
  @Get('sse-html')
  index(@Res() res: Response) {
    res
      .type('text/html')
      .send(readFileSync(join(__dirname, 'index.html')).toString())
  }

  @Sse('sse')
  sse(): Observable<MessageEvent> {
    return interval(1000).pipe(
      map(
        _ =>
          ({
            data: { hello: 'World', timeStamp: new Date().toISOString() }
          } as MessageEvent)
      )
    )
  }
}
