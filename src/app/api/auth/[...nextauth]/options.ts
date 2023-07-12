import prisma from "@/lib/db";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  secret: process.env.JWT_SECRET as string,
  callbacks: {
    async signIn({ user }) {
      if (!user?.email) return true;
      const userExists = await prisma.user.findUnique({
        where: { email: user.email as string },
      });

      if (!userExists) {
        await prisma.user.create({
          data: {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          },
        });
      }
      return true;
    },
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.sub as string;
      }
      return session;
    },
    async redirect({ baseUrl }) {
      return `${baseUrl}/`;
    },
  },
};
