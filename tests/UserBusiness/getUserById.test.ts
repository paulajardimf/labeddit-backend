import { UserBusiness } from "../../src/business/UserBusiness"
import { User } from "../../src/models/User"
import { USER_ROLES } from "../../src/types"
import { HashManagerMock } from "../mocks/HashManagerMock"
import { IdGeneratorMock } from "../mocks/IdGeneratorMock"
import { TokenManagerMock } from "../mocks/TokenManagerMock"
import { UserDatabaseMock } from "../mocks/UserDatabaseMock"

describe("login", () => {
    const userBusiness = new UserBusiness(
        new UserDatabaseMock(),
        new IdGeneratorMock(),
        new TokenManagerMock(),
        new HashManagerMock()
    )

    test("deve retornar um usuário por ID", async () => {
        const id = "id-mock"
        const response = await userBusiness.getUserById(id)
        const user = new User(
            "id-mock",
            "Normal Mock",
            "normal@email.com",
            "hash-bananinha",
            USER_ROLES.NORMAL,
            expect.any(String)
        )
        expect(response).toEqual(user)

    })
})