import { addProject, deleteProject, getProjectById, updateProject } from "@/services/project_services";
import { addRequest, deleteRequest, getRequestById, getRequests, updateRequest } from "@/services/request_services";
import { addUser, deleteUser, getUserById, getUsers, updateUser } from "@/services/user_services";

export default function Home() 
{

  return (
    <>

    </>
  );
}

export async function getServerSideProps()
{
  // const user = {
  //   id: "1",
  //   username: "string111",
  //   avatar: "string",
  //   accountType: "string",
  //   banner: "string",
  //   discordUrl: "string",
  //   xUrl: "string",
  //   websiteUrl: "string",
  //   email: "string",
  //   projectId: "string"
  // }

  // console.log('GET USERS:',await getUsers());
  // console.log('GET USER:',await getUserById('string'));
  // console.log('POST USER:',await addUser(user));
  // console.log('PUT USER:',await updateUser(user));
  // console.log('DELETE USER:',await deleteUser('1'));

  // const project = {
  //   id: "1",
  //   header: "string",
  //   title: "string",
  //   description: "string",
  //   userIds: [
  //     "string"
  //   ],
  //   elementIds: [
  //     "string"
  //   ]
  // }

  // console.log('POST PROJECT', await addProject(project));
  // console.log('GET PROJECT:', await getProjectById('1'));
  // console.log('PUT PROJECT', await updateProject(project));
  // console.log('DELETE PROJECT', await deleteProject('1'));

  // const request = {
  //   id: "string",
  //   title: "string",
  //   description: "string",
  //   fileUrl: "string",
  //   created: "2025-02-09T15:12:21.791Z",
  //   projectId: "string",
  //   userId: "string"
  // }

  // console.log('GET REQUESTS:', await getRequests());
  // console.log('POST REQUEST:', await addRequest(request));
  // console.log('GET REQUEST:', await getRequestById('string'));
  // console.log('PUT REQUEST:', await updateRequest(request));
  // console.log('DELETE REQUEST:', await deleteRequest('string'));
  
     


    return {
        props: {

        }
    }
}