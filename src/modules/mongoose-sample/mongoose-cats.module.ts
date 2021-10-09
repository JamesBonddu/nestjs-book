import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'
import { MongooseCatsController } from './mongoose-cats.controller'
import { MongooseCatsService } from './mongoose-cats.service'
import { Cat, CatSchema } from './schemas/cat.schema'

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Cat.name,
        schema: CatSchema
      }
    ])
  ],
  controllers: [MongooseCatsController],
  providers: [MongooseCatsService]
})
export class MongooseCatsModule {}
