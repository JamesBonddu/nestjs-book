export interface PaginationRequest {
  /**
   * 起始位置
   */
  offset?: number
  /**
   * 请求数量
   */
  limit?: number

  /**
   * 当前页
   */
  current?: number

  /**
   * 当前页
   */
  params?: any

  /**
   * 当前页
   */
  order?: Record<string, 'ASC' | 'DESC'>
}
