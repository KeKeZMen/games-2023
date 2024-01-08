import { AuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { createHash } from "crypto";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Неверные данные");
        }

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        const isPassEquel =
          user?.password ==
          createHash("sha256").update(credentials.password).digest("hex");

        if (!isPassEquel) {
          throw new Error("Неверные данные");
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      user && (token.user = user);
      return token;
    },
    session: ({ session, token }) => {
      if (token && session.user) {
        session.user = token.user as User;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
};
