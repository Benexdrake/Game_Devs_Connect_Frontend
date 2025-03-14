import { addFile, deleteFile, getFileById, getFileIdsByOwnerId, updateFile } from '../../services/file_service';
import { FileType } from '../../types/file';
import {describe, test, expect} from 'vitest';

describe.each([{test:'backend', frontend:false, id:999, ownerId:'0'}, {test:'frontend', frontend:true, id:999, ownerId:'0'}])
("File Service: $test", ({id, ownerId, frontend}) =>
{
    test('add file', async () =>
    {
        const file:FileType = {id, name:'', size:999, ownerId, created:''}
        
        const response = await addFile(file, frontend);

        expect(response.status).toBe(true);
    })

    test('update file', async () =>
    {
        const file:FileType = {id, name:'aaaaa', size:999, ownerId, created:''}

        const response = await updateFile(file, frontend);

        expect(response.status).toBe(true);
    })

    test('get file ids by owner id', async () =>
    {
        const response = await getFileIdsByOwnerId(ownerId, frontend);

        expect(response.status).toBe(true);
    })

    test('get file by id', async () =>
    {
        const response = await getFileById(999, frontend);

        expect(response.status).toBe(true);
    })

    test('delete file', async () =>
    {
        const response = await deleteFile(999, frontend);

        expect(response.status).toBe(true);
    })
})