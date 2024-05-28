'use server'

import { ID } from "node-appwrite"
import { createAdminClient, createSessionClient } from "../appwrite"
import { cookies } from "next/headers"
import { parseStringify } from "../utils"

export const signIn = async ({email, password}: signInProps) => {
    try{
        const { account } = await createAdminClient();
        const response = await account.createEmailPasswordSession(email, password);
        const res = parseStringify(response);
        return res;
    }catch(error){
        console.log('error in user.action.ts file signin')
    }
}

export const signUp = async (userData: SignUpParams) => {
    try{
        
        const { email, password, firstName, lastName } = userData;

        const { account } = await createAdminClient();

        const newUserAccount = await account.create(
            ID.unique(), 
            email, 
            password, 
            `${firstName} ${lastName}`
        );
        const session = await account.createEmailPasswordSession(email, password);

        cookies().set("appwrite-session", session.secret, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: true,
        });

        return parseStringify(newUserAccount);
  
    }catch(error){
        console.log('error in user.action.ts file signup')
    }
}


export async function getLoggedInUser() {
    try {
      const { account } = await createSessionClient();
      return await account.get();
    } catch (error) {
      return null;
    }
  }

export const logoutAccount = async () => {
    try {
       const { account } = await createSessionClient();
       cookies().delete('appwrite-session'); 
       await account.deleteSession('current')
    } catch (error) {
        return null;
    }
}
  