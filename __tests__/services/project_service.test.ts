import { addProject, deleteProject, getProjectById, updateProject } from '../../services/project_services';
import { ProjectType } from '@/types/project';
import {describe, test, expect} from 'vitest';

describe.each([{test:'backend', frontend:false, id:'backend_test', ownerId:'dummy1', name:'test1'}, {test:'frontend', frontend:true, id:'frontend_test', ownerId:'dummy2', name:'test2'}])
("Project Service: $test", ({frontend, id, ownerId, name}) =>
{
    test('add project', async () =>
    {
        const project:ProjectType = {id, name, ownerId}
        const response = await addProject(project, frontend);
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
        const response = await getProjectById(id, frontend);
        expect(response.status).toBe(true);
    })

    test('update project', async () =>
    {
        const project:ProjectType = {id, name, ownerId}
        const response = await updateProject(project, frontend);
        expect(response.status).toBe(true);
    })

    test('delete project', async () =>
    {
        const response = await deleteProject(id, frontend);
        expect(response.status).toBe(true);
    })
})