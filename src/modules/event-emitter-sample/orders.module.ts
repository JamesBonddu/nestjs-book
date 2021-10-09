import { Module } from '@nestjs/common'
import { EventEmitterOrderCreatedListener } from './listeners/order-created.listener'
import { EventEmitterOrdersController } from './orders.controller'
import { EventEmitterOrdersService } from './orders.service'

@Module({
  imports: [],
  controllers: [EventEmitterOrdersController],
  providers: [EventEmitterOrdersService, EventEmitterOrderCreatedListener],
  exports: [EventEmitterOrdersService]
})
export class EventEmitterOrdersModule {}
