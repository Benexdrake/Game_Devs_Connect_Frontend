import {describe, test, expect} from 'vitest';
import {getUserById, getUsers} from '../services/backend/user_services'

describe("User Service", () =>
{
    test("get users status should be true", async () =>
    {
        const response = await getUsers();
        
        expect(response.status).toBe(true);
    })

    test("get user by id status should be true", async () =>
    {
        const response = await getUserById('1075712673804714035');

        expect(response.status).toBe(true);
        expect(response.data.username).toBe('benexdevtest');
    })
})


