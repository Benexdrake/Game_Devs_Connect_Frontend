import { getNotificationById, getNotificationIds } from '../../services/notification_service';
import {describe, test, expect} from 'vitest';
import { createDummyLike, createDummyRequest, createDummyUser, deleteDummyRequest, deleteDummyUser } from '../lib/dummy';

describe.each([{test:'backend', frontend:false, id:'backend_test', requestId:9999, user1:'dummy111', user2:'dummy222'}, {test:'frontend', frontend:true, id:'frontend_test', requestId:8888, user1:'dummy111', user2:'dummy222'}])
("Notification User: $test", ({frontend, id, requestId, user1, user2}) =>
{
    test("get notification by id", async () =>
    {
        // create user1
        await createDummyUser(frontend, user1);
        // create user2
        await createDummyUser(frontend, user2);
        // create request
        await createDummyRequest(frontend, requestId)
        // user 2 likes request
        await createDummyLike(frontend, requestId, user2)
        //delete user1
        await deleteDummyUser(frontend, user1)
        // delete user2
        await deleteDummyUser(frontend, user2)
        // delete request
        await deleteDummyRequest(frontend, requestId);

        const response = await getNotificationById(`${user2}-${requestId}`, frontend)

        expect(response.status).toBe(true);
    })

    test("get notification ids", async () =>
    {
        await createDummyUser(frontend, user1);
        const response = await getNotificationIds('dummy', frontend)
        expect(response.status).toBe(true);
        await deleteDummyUser(frontend, user1);
    })
})

