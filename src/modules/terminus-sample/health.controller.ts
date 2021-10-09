import { Controller, Get } from '@nestjs/common'
import type { HealthCheckService, HttpHealthIndicator } from '@nestjs/terminus'
import { HealthCheck } from '@nestjs/terminus'

@Controller('health')
export class HealthController {
  constructor(
    private health: HealthCheckService,
    private http: HttpHealthIndicator
  ) {}

  /**
   * {
   *   "status": "ok",
   *   "info": {
   *     "nestjs-docs": {
   *       "status": "up"
   *     }
   *   },
   *   "error": {},
   *   "details": {
   *     "nestjs-docs": {
   *       "status": "up"
   *     }
   *   }
   * }
   */
  @Get()
  @HealthCheck()
  check() {
    return this.health.check([
      () => this.http.pingCheck('nestjs-docs', 'https://docs.nestjs.com')
    ])
  }
}
