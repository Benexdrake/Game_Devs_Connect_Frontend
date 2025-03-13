import { addFile, deleteFile, getFileById, getFileIdsByOwnerId, updateFile } from '../../services/file_service';
import { FileType } from '../../types/file';
import {describe, test, expect} from 'vitest';

describe("File Service", () =>
{
    test('add file', async () =>
    {
        const file:FileType = {id:999, name:'', size:999, ownerId:'0', created:''}
        
        const response = await addFile(false, file);

        expect(response.status).toBe(true);
    })

    test('update file', async () =>
    {
        const file:FileType = {id:999, name:'aaaaa', size:999, ownerId:'0', created:''}

        const response = await updateFile(false, file);

        expect(response.status).toBe(true);
    })

    test('get file ids by owner id', async () =>
    {
        const response = await getFileIdsByOwnerId(false, '0');

        expect(response.status).toBe(true);
    })

    test('get file by id', async () =>
    {
        const response = await getFileById(false, 999);

        expect(response.status).toBe(true);
    })

    test('delete file', async () =>
    {
        const response = await deleteFile(false, 999);

        expect(response.status).toBe(true);
    })
})