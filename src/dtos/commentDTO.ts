export interface CreateCommentInput {
  postId: string,
  content: string,
  token: string | undefined
}

export interface CreateCommentOutput {
  message: string
}