import axios from "axios";
import { addDiscordUser, getDiscordUser } from "../../../services/discord_service";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord"
const scopes = ['identify'].join(' ')

export const authOptions = 
{
  providers: [
    DiscordProvider({
      clientId: process.env.DISCORD_ID,
      clientSecret: process.env.DISCORD_SECRET,
      authorization: { params: { scope: scopes } },
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token;
        token.expiresAt = account.expires_at * 1000;

        await addDiscordUser(token);
        
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) 
    {
      try {
        console.log('GET User');
        const user = await getDiscordUser(token);

      //   const params = {
      //     username: "Logger",
      //     avatar_url: "",
      //     content: `User ${user.username} logged in!`
      // }

      //   await axios.post('https://discord.com/api/webhooks/1351116177027633183/5AOB68peP5U0-WENLSDpVY1W5UErUL2uxz_4Oef3iNRt8pEnSnGGXW9Hbch6SmTsDXsU', params)
        
        session.user = user;
        session.accessToken = token.accessToken;
      } catch (error) {
        console.error("Error fetching Discord user:", error);
        session.user = null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET
};


export default NextAuth(authOptions);
