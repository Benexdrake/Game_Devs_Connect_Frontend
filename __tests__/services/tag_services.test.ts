import {describe, test, expect} from 'vitest';
import { TagType } from '../../types/tag';
import { addTag, deleteTag, getTags, getTagsByRequestId, updateTag } from '../../services/tag_service';

describe.each([{test:'backend', frontend:false, id:99, name:'backend_test'}, {test:'frontend', frontend:true, id:88, name:'frontend_test'}])
("Tag Services: $test", ({frontend, id, name}) =>
{
    test("get tags", async () =>
    {
        const response = await getTags(frontend)

        expect(response.status).toBe(true);
    })

    // add tag
    test("add tag", async () =>
    {
       const tag:TagType = {id, name}
       
       const response = await addTag(tag, frontend);

       expect(response.status).toBe(true);
    })

    // get tags by request id
    test("get tags by request id", async () =>
    {
        const response = await getTagsByRequestId(id+'', frontend)
        
        expect(response.status).toBe(true);
    })

    // update tag
    test("update tag", async () =>
    {
       const tag:TagType = {id, name:name+'123'}
       
       const response = await updateTag(tag, frontend);

       expect(response.status).toBe(true);
    })

    // delete tag
    test("delete tag", async () =>
    {
       const response = await deleteTag(id+'', frontend);

       expect(response.status).toBe(true);
    })
})