import { InjectQueue } from '@nestjs/bull'
import { Controller, Post } from '@nestjs/common'
import type { Queue } from 'bull'

@Controller('queues-audio')
export class QueuesAudioController {
  constructor(
    @InjectQueue('queues-audio')
    private readonly audioQueue: Queue
  ) {}

  @Post('transcode')
  async transcode() {
    await this.audioQueue.add('transcode', {
      file: 'audio.mp3'
    })
  }
}
