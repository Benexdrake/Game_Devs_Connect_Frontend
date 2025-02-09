import { getDiscordUser } from "@/services/discord_service";
import NextAuth from "next-auth/next";
import Providers from 'next-auth/providers/discord'

const scopes = ['identify'].join(' ')

export const authOptions =
{
  providers: [
      Providers({
          clientId: process.env.DISCORD_ID+'',
          clientSecret: process.env.DISCORD_SECRET+'',
          authorization: {params:{scope: scopes}},
          token: "https://discord.com/api/oauth2/token",
          userinfo: "https://discord.com/api/users/@me",
      })
  ],
  callbacks: {
      jwt({ token, account, user }) 
      {
        if (account) {
          token.accessToken = account.access_token
          token.id = user?.id
        }
        return token
      },
      async session({ session, token }) {
          await getDiscordUser(token.accessToken);
          
          return session;
        },
    }
}

export default NextAuth(authOptions);

// import NextAuth from "next-auth"
// import GithubProvider from "next-auth/providers/github"

// export const authOptions = {
//   // Configure one or more authentication providers
//   providers: [
//     GithubProvider({
//       clientId: process.env.GITHUB_ID as string,
//       clientSecret: process.env.GITHUB_SECRET as string,
//     }),
//     // ...add more providers here
//   ],
// }

// export default NextAuth(authOptions)