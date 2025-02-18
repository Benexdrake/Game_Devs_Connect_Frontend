import "@testing-library/jest-dom"
import * as user_service from '@/services/backend/user_services'

describe("User Service", () =>
{
    it("get users", async () =>
    {
        const users = await user_service.getUsers();

        expect(users).toBe(users)
    })
})


