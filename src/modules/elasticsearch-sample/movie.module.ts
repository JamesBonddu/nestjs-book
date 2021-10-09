import { Module } from '@nestjs/common'
import { MovieController } from './movie.controller'
import { MovieService } from './movie.service'
import { SearchModule } from './search.module'

@Module({
  imports: [SearchModule],
  providers: [MovieService],
  controllers: [MovieController]
})
export class MovieModule {}
