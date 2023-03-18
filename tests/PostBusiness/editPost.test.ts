import { PostBusiness } from "../../src/business/PostBusiness";
import { EditPostInput } from "../../src/dtos/postDTO";
import { IdGeneratorMock } from "../mocks/IdGeneratorMock";
import { PostDatabaseMock } from "../mocks/PostDatabaseMock";
import { TokenManagerMock } from "../mocks/TokenManagerMock";

describe("editPost", () => {
  const postBusiness = new PostBusiness(
    new PostDatabaseMock(),
    new IdGeneratorMock(),
    new TokenManagerMock()
  );

  test("Deve retornar erro caso o token não seja enviado", async () => {
    const input: EditPostInput = {
      token: undefined,
      idToEdit: "id-mock-p1",
      content: "content-mock-p1",
    };

    try {
      await postBusiness.editPost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Token ausente!");
    }
  });

  test("Deve retornar erro caso o token seja inválido", async () => {
    const input: EditPostInput = {
      token: "token-mock-invalido",
      idToEdit: "id-mock-p1",
      content: "content-mock-p1",
    };

    try {
      await postBusiness.editPost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("Usuário não logado!");
    }
  });

  test("Deve retornar erro caso não encontre um id válido", async () => {
    const input: EditPostInput = {
      token: "token-mock-normal",
      idToEdit: "123",
      content: "content-mock-p1",
    };

    try {
      await postBusiness.editPost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(404);
      expect(error.message).toBe("'id' não encontrado");
    }
  });

  test("Deve retornar erro caso o usuário não seja o criador do post", async () => {
    const input: EditPostInput = {
      token: "token-mock-normal",
      idToEdit: "id-mock-p2",
      content: "content-mock-p1",
    };

    try {
      await postBusiness.editPost(input);
    } catch (error: any) {
      expect(error.statusCode).toBe(401);
      expect(error.message).toBe("Somente o criador do post pode editar.");
    }
  });

  test("Deve retornar erro caso o post não tenha conteúdo", async () => {
    const input: EditPostInput = {
      token: "token-mock-normal",
      idToEdit: "id-mock-p1",
      content: "",
    };

    try {
      await postBusiness.editPost(input);
    }
    catch (error: any) {
      expect(error.statusCode).toBe(400);
      expect(error.message).toBe("O post deve conter conteúdo.");
    }
  })
});
