import {describe, test, expect} from 'vitest';
import { TagType } from '../types/tag';
import { addTag, deleteTag, getTags, getTagsByRequestId, updateTag } from '../services/backend/tag_service';

describe("Tag Services", () =>
{
    test("get tags", async () =>
    {
        const response = await getTags()

        expect(response.status).toBe(true);
    })

    // get tags by request id
    test("get tags by request id", async () =>
    {
        const requestId = '1';

        const response = await getTagsByRequestId(requestId)
        console.log(response.data);
        
        expect(response.status).toBe(true);
    })

    // add tag
    test("add tag", async () =>
    {
       const tag:TagType = {id:999, name:'test'}
       
       const response = await addTag(tag);

       expect(response.status).toBe(true);
    })

    // update tag
    test("update tag", async () =>
    {
       const tag:TagType = {id:999,name:'test123'}
       
       const response = await updateTag(tag);

       expect(response.status).toBe(true);
    })

    // delete tag
    test("delete tag", async () =>
    {
       const tagId = '999';
       
       const response = await deleteTag(tagId);

       expect(response.status).toBe(true);
    })
})