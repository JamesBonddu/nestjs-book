import type { EntityRepository } from '@mikro-orm/core'
import { InjectRepository } from '@mikro-orm/nestjs'
import { Injectable } from '@nestjs/common'
import { TagEntity } from './tag.entity'
import type { ITagsRO } from './tag.interface'

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(TagEntity)
    private readonly tagRepository: EntityRepository<TagEntity>
  ) {}

  async findAll(): Promise<ITagsRO> {
    const tags = await this.tagRepository.findAll()
    return { tags }
  }
}
