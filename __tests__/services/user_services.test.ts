import {describe, test, expect} from 'vitest';
import {getUsers, addUser, deleteUser, getUserById,  updateUser} from '../../services/user_services'
import { UserType } from '../../types/user';

describe.each([{test:'backend', frontend:false, id:'backend_test'}, {test:'frontend', frontend:true, id:'frontend_test'}])
(`User Service: $test`, ({frontend, id}) =>
{
    test("add user", async () =>
    {
        const user:UserType = {id, avatar:'', accountType:'test', username:'test'}
        const response = await addUser(user, frontend);
        expect(response.status).toBe(true);
    })

    test("get users", async () =>
    {
        const response = await getUsers(frontend);
        expect(response.status).toBe(true);
    })
    
    test("get user by id", async () =>
    {
        const response = await getUserById(id, frontend);
        expect(response.status).toBe(true);
    })

    test("update user", async () =>
    {
        const user:UserType = {id, avatar:'', accountType:'test', username:'test123'}
        const response = await updateUser(user, frontend);
        expect(response.status).toBe(true);
    })

    test("delete user", async () =>
    {
        const response = await deleteUser(id, frontend);
        expect(response.status).toBe(true);
    })
})


