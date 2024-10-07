// src/lib/server/appwrite.js
"use server";
import { Client, Account } from "node-appwrite";
import { cookies } from "next/headers";
import { registerSchema, loginSchema } from "@/lib/interfaces";
import { z } from "zod";
import { ID } from "node-appwrite";

export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string);

  const session = cookies().get("my-custom-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT as string)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT as string)
    .setKey(process.env.NEXT_APPWRITE_KEY as string);

  return {
    get account() {
      return new Account(client);
    },
  };
}

export async function getLoggedInUser() {
  try {
    const { account } = await createSessionClient();
    return await account.get();
  } catch (error) {
    return null;
  }
}

export async function registerUser(data: z.infer<typeof registerSchema>) {
  const { account } = await createAdminClient();

  await account.create(ID.unique(), data.email, data.password, data.fullName);
  const session = await account.createEmailPasswordSession(
    data.email,
    data.password
  );

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}

export async function loginUser(email: string, password: string) {
  const { account } = await createSessionClient();
  const session = await account.createSession(email, password);

  cookies().set("my-custom-session", session.secret, {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
    secure: true,
  });
}
