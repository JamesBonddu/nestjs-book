import type { WsResponse } from '@nestjs/websockets'
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets'
import type { Observable } from 'rxjs'
import { from, map } from 'rxjs'
import type { Server } from 'socket.io'

@WebSocketGateway()
export class EventsGateway {
  @WebSocketServer()
  server: Server

  @SubscribeMessage('events')
  findAll(@MessageBody() data: any): Observable<WsResponse<number>> {
    return from([1, 2, 3]).pipe(
      map(item => ({
        event: 'events',
        data: item
      }))
    )
  }

  @SubscribeMessage('identity')
  async identity(@MessageBody() data: number): Promise<number> {
    return data
  }
}
