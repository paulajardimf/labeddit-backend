import { PostBusiness } from "../../src/business/PostBusiness";
import { DeletePostInput } from "../../src/dtos/postDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("deletePost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar erro caso o token não seja enviado", async () => {
    const input: DeletePostInput = {
      token: undefined,
      idToDelete: "id-mock-p1",
    };

    try {
      await postBusiness.deletePost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Token ausente!");
    }
  });

  test("Deve retornar erro caso não encontre um id válido", async () => {
    const input: DeletePostInput = {
      token: "token-mock-normal",
      idToDelete: "123",
    };

    try {
      await postBusiness.deletePost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("'id' não encontrado");
    }
  });

});
