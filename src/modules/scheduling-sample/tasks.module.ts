import { Module } from '@nestjs/common'
import { SchedulingTasksService } from './tasks.service'

@Module({
  providers: [SchedulingTasksService]
})
export class SchedulingTasksModule {}
