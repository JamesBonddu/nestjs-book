import { Body, Controller, Post } from '@nestjs/common'
import type { CreateOrderDto } from './dto/create-order.dto'
import type { EventEmitterOrdersService } from './orders.service'

@Controller('event-emitter_orders')
export class EventEmitterOrdersController {
  constructor(private readonly orderService: EventEmitterOrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto)
  }
}
