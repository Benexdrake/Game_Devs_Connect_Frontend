import { deleteNotificationById, getNotificationById, getNotificationIds, getUnseenNotificationCount } from '../../services/frontend/notification_service';
import {describe, test, expect} from 'vitest';
import { createDummyLike, createDummyRequest, createDummyUser, deleteDummyRequest, deleteDummyUser } from '../lib/dummy';

describe("Notification User", () =>
{
    test("get notification by id", async () =>
    {
        // create user1
        await createDummyUser();
        // create user2
        await createDummyUser('dummy2');
        // create request
        await createDummyRequest()
        // user 2 likes request
        await createDummyLike()
        //delete user1
        await deleteDummyUser()
        // delete user2
        await deleteDummyUser('dummy2')
        // delete request
        await deleteDummyRequest();

        const response = await getNotificationById('dummy-9999')
        expect(response.status).toBe(true);
    })

    test("get notification ids", async () =>
    {
        await createDummyUser();
        const response = await getNotificationIds('dummy')
        expect(response.status).toBe(true);
        await deleteDummyUser();
    })

    test("get unseen notification count", async () =>
    {
        await createDummyUser();
        const response = await getUnseenNotificationCount('dummy')
        expect(response.status).toBe(true);
        await deleteDummyUser();
    })

    test("delete notification", async () =>
    {
        const response = await deleteNotificationById('dummy-9999')
        expect(response.status).toBe(true);
    })
})

