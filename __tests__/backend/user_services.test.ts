import {describe, test, expect} from 'vitest';
import {addUser, deleteUser, getUserById, getUsers, updateUser} from '../../services/backend/user_services'
import { UserType } from '../../types/user';

describe("User Service", () =>
{
    test("add user", async () =>
    {
        const user:UserType = {id:'test', avatar:'', accountType:'test', username:'test'}
        const response = await addUser(user);
        expect(response.status).toBe(true);
    })

    test("get users", async () =>
    {
        const response = await getUsers();
        expect(response.status).toBe(true);
    })

    test("get user by id", async () =>
    {
        const userId = 'test';
        const response = await getUserById(userId);
        expect(response.status).toBe(true);
    })

    test("update user", async () =>
    {
        const user:UserType = {id:'test', avatar:'', accountType:'test', username:'test123'}
        const response = await updateUser(user);
        expect(response.status).toBe(true);
    })

    test("delete user", async () =>
    {
        const userId = 'test';
        const response = await deleteUser(userId);
        expect(response.status).toBe(true);
    })
})


