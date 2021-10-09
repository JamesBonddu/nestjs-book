// import type { IdEntity } from 'mikro-orm'
import { Entity, PrimaryKey, Property } from 'mikro-orm'

@Entity()
export class TagEntity /* implements IdEntity<TagEntity> */ {
  @PrimaryKey()
  id: number

  @Property()
  tag: string
}
