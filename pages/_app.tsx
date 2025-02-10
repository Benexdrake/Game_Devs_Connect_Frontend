import MainLayout from "@/components/main_layout";
import "@/styles/globals.css";
import { GetServerSidePropsContext } from "next";
import { getServerSession } from "next-auth";
import { SessionProvider } from "next-auth/react";
import type { AppProps } from "next/app";
import { authOptions } from "./api/auth/[...nextauth]";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <MainLayout>
        <Component {...pageProps} />
      </MainLayout>
    </SessionProvider>
  ) 
}