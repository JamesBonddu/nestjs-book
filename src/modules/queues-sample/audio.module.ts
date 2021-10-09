import { BullModule } from '@nestjs/bull'
import { Module } from '@nestjs/common'
import { QueuesAudioController } from './audio.controller'
import { QueuesAudioProcessor } from './audio.processor'

@Module({
  imports: [
    BullModule.registerQueue({
      name: 'audio'
    })
  ],
  controllers: [QueuesAudioController],
  providers: [QueuesAudioProcessor]
})
export class QueuesAudioModule {}
