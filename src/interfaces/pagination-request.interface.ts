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
   * 其余参数
   */
  params?: any

  /**
   * 排序
   */
  order?: Record<string, 'ASC' | 'DESC'>
}
