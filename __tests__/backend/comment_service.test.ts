import { addComment, deleteComment, getComment, getCommentCount, getCommentIds, updateComment } from '../../services/backend/comment_service';
import { CommentType } from '../../types/comment';
import {describe, test, expect} from 'vitest';

describe("Comment Service", () =>
{
    test('add comment', async () =>
    {
        const comment:CommentType = {id:999, message:'', ownerId:'', fileId:0, parentId:0, created:'', deleted:false}

        const response = await addComment(comment);

        expect(response.status).toBe(true);
    })

    test('get comment ids', async () =>
    {
        const response = await getCommentIds('0');
        
        expect(response.status).toBe(true);
    })
    
    test('get comment by id', async () =>
    {
        const response = await getComment('999')

        expect(response.status).toBe(true);
            
    })

    test('get comment count', async () =>
    {   
        const response = await getCommentCount('0');

        expect(response.status).toBe(true);
    })

    test('update comment', async () =>
    {
        const comment:CommentType = {id:999, message:'HALLO WELT', ownerId:'', fileId:0, parentId:0, created:'', deleted:false}

        const response = await updateComment(comment);

        expect(response.status).toBe(true);
    })

    test('delete comment', async () =>
    {
        const response = await deleteComment('999');

        expect(response.status).toBe(true)        
    })
})