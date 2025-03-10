import { RequestType } from '../../types/request';
import { addRequest, deleteRequest, getFilesByRequestId, getFullRequestById, getRequestById, getRequestCheck, getRequests, getRequestsByUserId, likedRequest, updateRequest } from '../../services/backend/request_services';
import {describe, test, expect} from 'vitest';
import { RequestTagsType } from '../../types/request_tags';
import {createDummyUser, deleteDummyUser} from '../lib/dummy'

const REQUEST_ID = 99999

describe("Request Service", () =>
{
    test("get requests", async () => 
    {
        const response = await getRequests();
        expect(response.status).toBe(true);
    })

    test("add request", async () => 
    {
        const request:RequestType = {id:REQUEST_ID, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:'' }
        const requestTags:RequestTagsType = {request, tags:[]}

        const response = await addRequest(requestTags)
        expect(response.status).toBe(true);
    })

    test("get request by id", async () => 
    {
        const response = await getRequestById(REQUEST_ID+'')
        expect(response.status).toBe(true);
    })

    test("get requests by user id", async () => 
    {
        await createDummyUser('dummy');
        
        const response = await getRequestsByUserId('dummy')

        await deleteDummyUser();
        expect(response.status).toBe(true);
    })

    test("get full request by id", async () => 
    {
        await createDummyUser();
        
        const response = await getFullRequestById(REQUEST_ID+'','dummy')

        await deleteDummyUser();
        expect(response.status).toBe(true);
    })

    test("check if request exists", async () => 
    {
        const response = await getRequestCheck(REQUEST_ID+'')
        expect(response.status).toBe(true);
    })

    test("get files by request id", async () => 
    {
        const response = await getFilesByRequestId(REQUEST_ID+'')
        expect(response.status).toBe(true);
    })

    test("update request", async () => 
    {
        const request:RequestType = {id:REQUEST_ID, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:'' }
        const response = await updateRequest(request)
        expect(response.status).toBe(true);
    })

    test("liked requests", async () => 
    {
        const response = await likedRequest(REQUEST_ID,'dummy', true)
        expect(response.status).toBe(true);
    })

    test("delete request", async () => 
    {
       const response = await deleteRequest(REQUEST_ID+'');

       expect(response.status).toBe(true);
    })
})