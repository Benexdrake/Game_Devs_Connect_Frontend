import { deleteNotificationById, getNotificationById, getNotificationIds, getUnseenNotificationCount } from '../../services/notification_service';
import {describe, test, expect} from 'vitest';
import { createDummyLike, createDummyRequest, createDummyUser, deleteDummyRequest, deleteDummyUser } from '../lib/dummy';

describe.each([{test:'backend', frontend:false, id:'backend_test', user:'dummy111'}, {test:'frontend', frontend:true, id:'frontend_test', user:'dummy111'}])
("Notification User: $test", ({frontend, id, user}) =>
{
    test("get notification by id", async () =>
    {
        // create user1
        await createDummyUser(frontend);
        // create user2
        await createDummyUser(frontend, user);
        // create request
        await createDummyRequest(frontend)
        // user 2 likes request
        await createDummyLike(frontend)
        //delete user1
        await deleteDummyUser(frontend)
        // delete user2
        await deleteDummyUser(frontend, user)
        // delete request
        await deleteDummyRequest(frontend );

        const response = await getNotificationById(id, frontend)
        expect(response.status).toBe(true);
    })

    test("get notification ids", async () =>
    {
        await createDummyUser(frontend);
        const response = await getNotificationIds('dummy', frontend)
        expect(response.status).toBe(true);
        await deleteDummyUser(frontend);
    })
})

