import { Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import type { IProfileRO } from './profile.interface'
// eslint-disable-next-line @typescript-eslint/consistent-type-imports
import { ProfileService } from './profile.service'
import { User } from '@/decorator/user.decorator'

@ApiBearerAuth()
@ApiTags('profiles')
@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Get(':username')
  async getProfile(
    @User('id') userId: number,
    @Param('username') username: string
  ): Promise<IProfileRO> {
    return this.profileService.findProfile(userId, username)
  }

  @Post(':username/follow')
  @HttpCode(200)
  async follow(
    @User('email') email: string,
    @Param('username') username: string
  ): Promise<IProfileRO> {
    return this.profileService.follow(email, username)
  }

  @Delete(':username/follow')
  async unFollow(
    @User('id') userId: number,
    @Param('username') username: string
  ): Promise<IProfileRO> {
    return this.profileService.unFollow(userId, username)
  }
}