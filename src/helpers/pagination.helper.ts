import type { PaginationResponseDto } from '@/common/dto/pagination-response.dto'
import type { PaginationRequest } from '@/interfaces'

export class Pagination {
  static of<T>(
    { limit }: PaginationRequest,
    /**
     * 总数
     */
    count: number,
    /**
     * 返回列表
     */
    items: T[]
  ): PaginationResponseDto<T> {
    const total = Math.floor(count / limit) + (count % limit) > 0 ? 1 : 0

    return {
      total,
      items
    }
  }
}
