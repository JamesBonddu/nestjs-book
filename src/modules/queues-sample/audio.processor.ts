import { Process, Processor } from '@nestjs/bull'
import { Logger } from '@nestjs/common'
import type { Job } from 'bull'

@Processor('queues-audio')
export class QueuesAudioProcessor {
  private readonly logger = new Logger(QueuesAudioProcessor.name)

  @Process('transcode')
  handleTranscode(job: Job) {
    this.logger.debug('Start transcoding...')
    this.logger.debug(job)
    this.logger.debug('Transcoding completed')
  }
}
