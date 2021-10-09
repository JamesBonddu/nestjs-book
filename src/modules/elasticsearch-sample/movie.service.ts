import { Injectable } from '@nestjs/common'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { SearchService } from './search.service'

@Injectable()
export class MovieService {
  constructor(readonly esService: SearchService) {}

  async findMovies(search = '') {
    return await this.esService.search(search)
  }
}
