import type { ArticleEntity } from './article.entity'
import type { CommentEntity } from './comment.entity'

interface IComment {
  body: string
}

export interface ICommentsRO {
  comments: CommentEntity[] // IComment
}

export interface IArticleRO {
  article: ArticleEntity
}

export interface IArticlesRO {
  articles: ArticleEntity[]
  articlesCount: number
}
