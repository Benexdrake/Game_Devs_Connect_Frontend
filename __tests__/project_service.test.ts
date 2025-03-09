import { addProject, deleteProject, getProjectById, getProjects, updateProject } from '../services/backend/project_services';
import { ProjectType } from '@/types/project';
import {describe, test, expect} from 'vitest';

describe("Project Service", () =>
{
    test('add project', async () =>
    {
        const project:ProjectType = {id:'dummy', name:'test', ownerId:'dummy'}
        const response = await addProject(project);
        expect(response.status).toBe(true);
    })

    // Get all Project Ids
    // test('get projects', async () =>
    // {
    //     const response = await getProjects();
    //     expect(response.status).toBe(true);
    // })

    // Get all Projects where User is Owner or Part of the Team
    // test('get projectids where user is owner or part of tean', async () =>
    // {
    //     const response = await getProjectIdsbyUserId('dummy');
    //     expect(response.status).toBe(true);
    // })

    test('get project by id', async () =>
    {
        const response = await getProjectById('dummy');
        expect(response.status).toBe(true);
    })

    test('update project', async () =>
    {
        const project:ProjectType = {id:'dummy', name:'test123', ownerId:'dummy'}
        const response = await updateProject(project);
        expect(response.status).toBe(true);
    })

    test('delete project', async () =>
    {
        const response = await deleteProject('dummy');
        expect(response.status).toBe(true);
    })
})