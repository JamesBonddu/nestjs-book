import { Injectable } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import type { OrderCreatedEvent } from '../events/order-created.event'

@Injectable()
export class EventEmitterOrderCreatedListener {
  @OnEvent('order.created')
  handleOrderCreatedEvent(event: OrderCreatedEvent) {
    // handle and process "OrderCreatedEvent"
    console.log(event)
  }
}
