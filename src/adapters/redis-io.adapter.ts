import { IoAdapter } from '@nestjs/platform-socket.io'
import { RedisClient } from 'redis'
import type { ServerOptions } from 'socket.io'
import { createAdapter } from 'socket.io-redis'

const pubClient = new RedisClient({
  host: 'localhost',
  port: 6379
})
const subClient = pubClient.duplicate()
const redisAdapter = createAdapter({ pubClient, subClient })

export class RedisAdapter extends IoAdapter {
  createIOServer(port: number, options?: ServerOptions) {
    const server = super.createIOServer(port, options)
    server.adapter(redisAdapter)
    return server
  }
}
