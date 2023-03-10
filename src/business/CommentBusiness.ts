import { CommentDatabase } from "../database/CommentDatabase"
import { UserDatabase } from "../database/UserDatabase"
import { CreateCommentInput, CreateCommentOutput, GetCommentsByPostIdInput } from "../dtos/commentDTO"
import { BadRequestError } from "../errors/BadRequestError"
import { Comment } from "../models/Comment"
import { HashManager } from "../services/HashManager"
import { IdGenerator } from "../services/IdGenerator"
import { TokenManager } from "../services/TokenManager"
import { CommentWithCreatorDB } from "../types"

export class CommentBusiness {
  constructor (
    private commentDatabase: CommentDatabase,
    private userDatabase: UserDatabase,
    private idGenerator: IdGenerator,
    private tokenManager: TokenManager,
    private hashManager: HashManager
  ) {}
  
  public createComment = async (input: CreateCommentInput): Promise<CreateCommentOutput> => {
    const { postId, content, token } = input

    if(!token) {
      throw new BadRequestError("Token não enviado!")
    }

    const payload = this.tokenManager.getPayload(token as string)

    if(payload === null) {
      throw new BadRequestError("Token inválido!")
    }

    if (typeof postId !== "string") {
      throw new BadRequestError("'postId' deve ser string")
    }

    if (typeof content !== "string") {
      throw new BadRequestError("'content' deve ser string")
    }

    const id = this.idGenerator.generate()

    const comment = new Comment(
      id,
      postId,
      content,
      0,
      0,
      new Date().toISOString(),
      new Date().toISOString(),
      payload.id,
      payload.name
    )

    const commentDB = comment.toDBModel()

    await this.commentDatabase.createComment(commentDB)

    const output: CreateCommentOutput = {
      message: "Comentário criado com sucesso!"
    }

    return output
  }

  public getComments = async (input: GetCommentsByPostIdInput) => {
    const { postId, token } = input

    if(!token) {
      throw new BadRequestError("Token não enviado!")
    }

    const payload = this.tokenManager.getPayload(token as string)

    if(payload === null) {
      throw new BadRequestError("Token inválido!")
    }

    if (typeof postId !== "string") {
      throw new BadRequestError("'postId' deve ser string")
    }

    const commentsWithCreatorDB: CommentWithCreatorDB[] = await this.commentDatabase.getCommentWithCreatorByPostId(postId)    

    const comments = commentsWithCreatorDB.map((commentDB) => {
      const comment = new Comment(
        commentDB.id,
        commentDB.post_id,
        commentDB.content,
        commentDB.likes,
        commentDB.dislikes,
        commentDB.created_at,
        commentDB.updated_at,
        commentDB.creator_id,
        commentDB.creator_name
      )
      return comment.toBusinessModel()
    })

    return comments
  }
}