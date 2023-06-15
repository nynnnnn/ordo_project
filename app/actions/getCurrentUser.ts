import jwtDecode from "jwt-decode";
import { getServerSession } from "next-auth/next"
import { cookies } from "next/headers";
import { cUser } from "../types";

// import { authOptions } from "@/pages/api/auth/[...nextauth]";
// import prisma from "@/app/libs/prismadb";

export async function getSession() {
  return cookies().get('access_token')?.value;
  // return await getServerSession(authOptions)
}

export default async function getCurrentUser() {
  try {
    const session:any = await getSession();

    const jwtdecode:cUser = jwtDecode(session);

    // console.log(jwtdecode.username);

    if (!jwtdecode.username) {
      return null;
    }

    if (!jwtdecode) {
      return null;
    }



    // if (!session?.user?.email) {
    //   return null;
    // }

    // const currentUser = await prisma.user.findUnique({
    //   where: {
    //     email: session.user.email as string,
    //   }
    // });

    // if (!currentUser) {
    //   return null;
    // }

    // const currentUser:any = null;

    return {
      ...jwtdecode,
      username: jwtdecode.username || "",
      iat: jwtdecode.iat || "",
      exp: jwtdecode.exp || ""
      // ...currentUser,
      // createdAt: currentUser.createdAt.toISOString(),
      // updatedAt: currentUser.updatedAt.toISOString(),
      // emailVerified: 
      //   currentUser.emailVerified?.toISOString() || null,
    };
  } catch (error: any) {
    return null;
  }
}

