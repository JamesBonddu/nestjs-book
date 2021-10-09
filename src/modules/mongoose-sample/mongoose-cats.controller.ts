import { CreateCatDto } from './dto/create-cat.dto'
import { Body, Controller, Get, Post } from '@nestjs/common'
import { MongooseCatsService } from './mongoose-cats.service'
import { Cat } from './schemas/cat.schema'

@Controller('mongoose-cats')
export class MongooseCatsController {
  constructor(private readonly catService: MongooseCatsService) {}

  @Post()
  async create(@Body() createCatDto: CreateCatDto) {
    return await this.catService.create(createCatDto)
  }

  @Get()
  async findAll(): Promise<Cat[]> {
    return this.catService.findAll()
  }
}
