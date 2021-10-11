import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class PaginationResponseDto<T> {
  @ApiPropertyOptional({
    description: '是否有前一页'
  })
  hasPrev?: boolean

  @ApiPropertyOptional({
    description: '是否有下一页'
  })
  hasNext?: boolean

  @ApiProperty()
  items: T[]

  @ApiProperty({
    description: '总数'
  })
  total: number
}
