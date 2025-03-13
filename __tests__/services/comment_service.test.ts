import { addComment, deleteComment, getComment, getCommentCount, getCommentIds, updateComment } from '../../services/comment_service';
import { CommentType } from '../../types/comment';
import {describe, test, expect} from 'vitest';

describe.each([{test:'backend', frontend:false, id:'backend_test', commentId:999}, {test:'frontend', frontend:true, id:'frontend_test', commentId:999}])
("Comment Service: $test", ({frontend, id, commentId}) =>
{
    test('add comment', async () =>
    {
        const comment:CommentType = {id:commentId, message:'', ownerId:'', fileId:0, parentId:0, created:'', deleted:false}

        const response = await addComment(comment, frontend);

        expect(response.status).toBe(true);
    })

    test('get comment ids', async () =>
    {
        const response = await getCommentIds('0', frontend);
        
        expect(response.status).toBe(true);
    })
    
    test('get comment by id', async () =>
    {
        const response = await getComment(commentId+'', frontend)

        expect(response.status).toBe(true);
            
    })

    test('get comment count', async () =>
    {   
        const response = await getCommentCount('0', frontend);

        expect(response.status).toBe(true);
    })

    test('update comment', async () =>
    {
        const comment:CommentType = {id:commentId, message:'HALLO WELT', ownerId:'', fileId:0, parentId:0, created:'', deleted:false}

        const response = await updateComment(comment, frontend);

        expect(response.status).toBe(true);
    })

    test('delete comment', async () =>
    {
        const response = await deleteComment(commentId+'', frontend);

        expect(response.status).toBe(true)        
    })
})