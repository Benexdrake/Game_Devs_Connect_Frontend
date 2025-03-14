import { RequestType } from '../../types/request';
import { addRequest, deleteRequest, getFullRequestById, getRequestById, getRequestCheck, getRequests, getRequestsByUserId, likedRequest, updateRequest } from '../../services/request_services';
import {describe, test, expect} from 'vitest';
import { RequestTagsType } from '../../types/request_tags';

describe.each([{test:'backend', frontend:false, id:'backend_test', request_id:9999}, {test:'frontend', frontend:true, id:'frontend_test', request_id:8888}])
("Request Service: $test", ({frontend, id, request_id}) =>
{
    test("get requests", async () => 
    {
        const response = await getRequests(frontend);
        expect(response.status).toBe(true);
    })

    test("add request", async () => 
    {
        const request:RequestType = {id:request_id, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:id }
        const requestTags:RequestTagsType = {request, tags:[]}

        const response = await addRequest(requestTags, frontend)
        
        expect(response.status).toBe(true);
    })

    test("get request by id", async () => 
    {
        const response = await getRequestById(request_id+'', frontend)
        expect(response.status).toBe(true);
    })

    test("get requests by user id", async () => 
    {   
        const response = await getRequestsByUserId(id, frontend)

        expect(response.status).toBe(true);
    })

    test("get full request by id", async () => 
    {
        const response = await getFullRequestById(request_id+'', id, frontend)

        expect(response.status).toBe(true);
    })

    test("check if request exists", async () => 
    {
        const response = await getRequestCheck(request_id+'', frontend)
        expect(response.status).toBe(true);
    })

    test("update request", async () => 
    {
        const request:RequestType = {id:request_id, title:'test', description:'', fileId:0, created:'', projectId:'', ownerId:id }
        const response = await updateRequest(request, frontend)
        expect(response.status).toBe(true);
    })

    test("liked requests", async () => 
    {
        const response = await likedRequest(request_id+'',id, true, frontend)

        console.log(response);
        

        expect(response.status).toBe(true);
    })

    test("delete request", async () => 
    {
       const response = await deleteRequest(request_id+'', frontend);

       expect(response.status).toBe(true);
    })
})