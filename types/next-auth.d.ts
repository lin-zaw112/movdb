import type { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session extends DefaultSession {
    accessToken: string | any;
    user: {
      address: string;
      id: string | any;
    } & DefaultUser;
  }
  interface Profile extends Profile {
    id: string | number;
  }
}
