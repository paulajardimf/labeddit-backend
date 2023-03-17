import { PostBusiness } from "../../src/business/PostBusiness";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";
import { GetPostsInput } from "../../src/dtos/postDTO";

describe("getPosts", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar todos os posts", async () => {
    const input : GetPostsInput = {
      q: undefined,
      token: "token-mock-normal"
    }

    const result = await postBusiness.getPosts(input);
  });
});
