import { PostBusiness } from "../../src/business/PostBusiness";
import { CreatePostInput, CreatePostOutput } from "../../src/dtos/postDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("createPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar sucesso ao enviar um post", async () => {
    const input: CreatePostInput = {
      content: "Post mockado 1",
      token: "token-mock-normal",
    };

    const result: CreatePostOutput = await postBusiness.createPost(input);

    expect(result.message).toBe("Post enviado com sucesso!");
  });

  test("Deve retornar erro caso o token não seja enviado", async () => {
    expect.assertions(2);

    try {
      const input: CreatePostInput = {
        content: "Post mockado 1",
        token: undefined,
      };

      await postBusiness.createPost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Token ausente!");
    }
  });
});
