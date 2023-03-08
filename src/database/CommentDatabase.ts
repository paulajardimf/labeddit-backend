import { CommentDB, LikeDislikeCommentDB, LikeDislikeDB, POST_LIKE } from "../types";
import { BaseDatabase } from "./BaseDatabase";

export class CommentDatabase extends BaseDatabase {
  public static TABLE_COMMENTS = "comments"
  public static TABLE_LIKES_DISLIKES_COMMENTS = "likes_dislikes_comments"

  public getCommentsByPostId = async (postId: string): Promise<CommentDB[]> => {
    const commentsDB = await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .select()
      .where({ postId })
    return commentsDB
  }

  public createComment = async (comment: CommentDB): Promise<void> => {
    await BaseDatabase
      .connection(CommentDatabase.TABLE_COMMENTS)
      .insert(comment)
  }

  public editComment = async (id: string, commentDB: CommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .update(commentDB)
      .where({ id })
  }

  public deleteCommentById = async (id: string): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_COMMENTS)
      .delete()
      .where({ id })
  }

  public likeOrDislikeComment = async (likeDislike: string): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .insert(likeDislike)
  }

  public findLikeDislikeComment = async (likeDislikeDBToFind: LikeDislikeCommentDB): Promise<any> => {
    const [ likeDislikeDB ]: LikeDislikeDB[] = await BaseDatabase
      .connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .select()
      .where({
        user_id: likeDislikeDBToFind.user_id,
        comment_id: likeDislikeDBToFind.comment_id,
        post_id: likeDislikeDBToFind.post_id
      })

    if (likeDislikeDB) {
      return likeDislikeDB.like === 1
        ? POST_LIKE.ALREADY_LIKED
        : POST_LIKE.ALREADY_DISLIKED
    } else {
      return null
    }
  }

  public removeLikeDislikeComment = async (likeDislikeDBToFind: LikeDislikeCommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .delete()
      .where({
        user_id: likeDislikeDBToFind.user_id,
        comment_id: likeDislikeDBToFind.comment_id,
        post_id: likeDislikeDBToFind.post_id
      })
  }

  public updateLikeDislikeComment = async (likeDislikeDBToFind: LikeDislikeCommentDB): Promise<void> => {
    await BaseDatabase.connection(CommentDatabase.TABLE_LIKES_DISLIKES_COMMENTS)
      .update({ like: likeDislikeDBToFind.like })
      .where({
        user_id: likeDislikeDBToFind.user_id,
        comment_id: likeDislikeDBToFind.comment_id,
        post_id: likeDislikeDBToFind.post_id
      })
  }
}