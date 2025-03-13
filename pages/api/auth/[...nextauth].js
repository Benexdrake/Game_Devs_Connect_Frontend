import { getDiscordUser } from "@/services/backend/discord_service";
import NextAuth from "next-auth/next";
import DiscordProvider from "next-auth/providers/discord"

const scopes = ['identify'].join(' ')

export const authOptions = {
  providers: [
    DiscordProvider({ // Use the dedicated Discord provider
      clientId: process.env.DISCORD_ID, // No need for the +''
      clientSecret: process.env.DISCORD_SECRET, // No need for the +''
      authorization: { params: { scope: scopes } }, // Use environment variable for scopes
    }),
  ],
  callbacks: {
    async jwt({ token, account, user }) {
      if (account) {
        token.accessToken = account.access_token;
        token.refreshToken = account.refresh_token; // Include refresh token!
        token.expiresAt = account.expires_at * 1000; // Expiration in milliseconds

        // Optional: Include user ID
        token.id = user?.id;
      }
      return token;
    },
    async session({ session, token }) {
      // Fetch user data using the access token (or user ID if available)
      try {
        const user = await getDiscordUser(token.accessToken); // Your function to fetch user data
        session.user = user; // Update the session with the Discord user object
        session.accessToken = token.accessToken; // Add the access token to the session
      } catch (error) {
        console.error("Error fetching Discord user:", error);
        // Handle error, e.g., set session.user to null or a default value
        session.user = null;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET // VERY IMPORTANT! Set a secret in your environment variables
  // ... other options if needed (e.g., pages, events)
};


export default NextAuth(authOptions);
