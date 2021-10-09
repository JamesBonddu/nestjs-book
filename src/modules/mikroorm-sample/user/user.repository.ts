import { EntityRepository, Repository } from '@mikro-orm/core'
import { UserEntity } from './user.entity'

@Repository(UserEntity)
export class UserRepository extends EntityRepository<UserEntity> {}
