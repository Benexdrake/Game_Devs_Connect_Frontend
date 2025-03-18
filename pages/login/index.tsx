import Head from 'next/head'
import LoginOutButton from "@/components/login_btn";
import { getSession, useSession } from "next-auth/react";
import { GetServerSidePropsContext } from 'next';

import styles from '@/styles/modules/login.module.css'

export default function Login() 
{
  return (
    <div className={styles.main}>
      <Head>
        <title>GDC - Login</title>
      </Head>
      <h1>Please log in to get access</h1>
      <br />
      <LoginOutButton/>
    </div>
  );
}

export async function getServerSideProps(context:GetServerSidePropsContext)
{
 const session = await getSession(context)
 
     if(session)
     {
         return {
             redirect: {
                 destination: '/',
                 permanent: false
             }
         }
     }

     return {
        props: {}
     }
}