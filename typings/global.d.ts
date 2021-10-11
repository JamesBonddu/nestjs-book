declare namespace Express {
  // 扩展 express Request 类型
  export interface Request {
    user: Record<string, any>
  }
}
