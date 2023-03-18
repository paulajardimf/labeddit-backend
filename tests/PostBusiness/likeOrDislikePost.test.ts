import { PostBusiness } from "../../src/business/PostBusiness";
import { LikeOrDislikePostInput } from "../../src/dtos/postDTO";
import { BadRequestError } from "../../src/errors/BadRequestError";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("likeOrDislikePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar erro quando o criador do post tenta curti-lo", async () => {
    expect.assertions(2);

    const input: LikeOrDislikePostInput = {
      idToLikeOrDislike: "id_do_post",
      token: "token_do_criador",
      like: 1,
    };

    jest
      .spyOn(postBusiness, "likeOrDislikePost")
      .mockImplementation(async () => {
        throw new BadRequestError(
          "O criador não pode curtir seu próprio post."
        );
      });

    try {
      await postBusiness.likeOrDislikePost(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe("O criador não pode curtir seu próprio post.");
    }
  });

  test("Deve retornar erro quando o usuário tenta curtir um post que não existe", async () => {
    const input = {
      idToLikeOrDislike: "id_do_post",
      token: "token_do_usuario",
      like: 1,
    };

    jest
      .spyOn(postBusiness, "likeOrDislikePost")
      .mockImplementation(async () => {
        throw new BadRequestError("Post não encontrado.");
      });

    try {
      await postBusiness.likeOrDislikePost(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe("Post não encontrado.");
    }
  });

  test("Deve retornar erro quando o usuário tenta curtir um post que já curtiu", async () => {
    const input = {
      idToLikeOrDislike: "id_do_post",
      token: "token_do_usuario",
      like: 1,
    };

    jest

      .spyOn(postBusiness, "likeOrDislikePost")
      .mockImplementation(async () => {
        throw new BadRequestError("Você já curtiu esse post.");
      });

    try {
      await postBusiness.likeOrDislikePost(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe("Você já curtiu esse post.");
    }
  });

  test("Deve retornar erro quando o usuário tenta descurtir um post que não curtiu", async () => {
    const input = {
      idToLikeOrDislike: "id_do_post",
      token: "token_do_usuario",
      like: 0,
    };

    jest
      .spyOn(postBusiness, "likeOrDislikePost")
      .mockImplementation(async () => {
        throw new BadRequestError("Você não curtiu esse post.");
      });

    try {
      await postBusiness.likeOrDislikePost(input);
    } catch (error: any) {
      expect(error).toBeInstanceOf(BadRequestError);
      expect(error.message).toBe("Você não curtiu esse post.");
    }
  });
});
