import { BaseDatabase } from "../../src/database/BaseDatabase";
import {
  LikeDislikeDB,
  PostDB,
  POST_LIKE,
  UserDB,
  USER_ROLES,
} from "../../src/types";

export class PostDatabaseMock extends BaseDatabase {
  public static TABLE_POST = "posts";

  public getAllPosts = async (): Promise<PostDB[]> => {
    return [
      {
        id: "id-mock-p1",
        creator_id: "id-mock",
        content: "Post mockado 1",
        likes: 0,
        dislikes: 0,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
      {
        id: "id-mock-p2",
        creator_id: "id-mock",
        content: "Post mockado 2",
        likes: 1,
        dislikes: 0,
        created_at: expect.any(String),
        updated_at: expect.any(String),
      },
    ];
  };

  public getAllUsers = async (): Promise<UserDB[]> => {
    return [
      {
        id: "id-mock",
        name: "Normal Mock",
        email: "normal@email.com",
        password: "hash-bananinha",
        created_at: expect.any(String),
        role: USER_ROLES.NORMAL,
      },
      {
        id: "id-mock",
        name: "Admin Mock",
        email: "admin@email.com",
        password: "hash-bananinha",
        created_at: expect.any(String),
        role: USER_ROLES.ADMIN,
      },
    ];
  };

  public getPostsAndUsers = async () => {
    const postsDB: PostDB[] = await this.getAllPosts();
    const usersDB: UserDB[] = await this.getAllUsers();
    return {
      postsDB,
      usersDB,
    };
  };

  public createPost = async (
    post: PostDB
  ): Promise<void> => {};

  public findById = async (id: string): Promise<PostDB | undefined> => {
    switch (id) {
      case "id-mock-p1":
        return {
          id: "id-mock-p1",
          creator_id: "id-mock",
          content: "Post mockado 1",
          likes: 0,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        };
      case "id-mock-p2":
        return {
          id: "id-mock-p2",
          creator_id: "id-mock",
          content: "Post mockado 2",
          likes: 1,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        };
      default:
        return undefined;
    }
  };

  public update = async (id: string, postDB: PostDB): Promise<void> => {};

  public deleteById = async (id: string): Promise<void> => {};

  public findPostWithCreatorById = async (
    id: string
  ): Promise<PostDB | undefined> => {
    switch (id) {
      case "id-mock-p1":
        return {
          id: "id-mock-p1",
          creator_id: "id-mock",
          content: "Post mockado 1",
          likes: 0,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        };
      case "id-mock-p2":
        return {
          id: "id-mock-p2",
          creator_id: "id-mock",
          content: "Post mockado 2",
          likes: 1,
          dislikes: 0,
          created_at: expect.any(String),
          updated_at: expect.any(String),
        };
      default:
        return undefined;
    }
  };

  public likeOrDislikePost = async (
    likeDislike: LikeDislikeDB
  ): Promise<void> => {};

  public findLikeDislike = async (
    likeDislikeDBToFind: LikeDislikeDB
  ): Promise<POST_LIKE | null> => {
    return null;
  };

  public removeLikeDislike = async (
    likeDislikeDBToRemove: LikeDislikeDB
  ): Promise<void> => {};

  public updateLikeDislike = async (
    likeDislikeDB: LikeDislikeDB): Promise<void> => {};
}
