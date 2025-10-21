import { cookies } from "next/headers";
import { nextServerApi } from "./api";
import { User } from "@/types/note";

export const checkServerSession = async () => {
  const cookieStore = await cookies();
  const res = await nextServerApi.get("/auth/session", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return res;
};

export const getServerMe = async (): Promise<User> => {
  const cookieStore = await cookies();
  const { data } = await nextServerApi.get("/users/me", {
    headers: {
      Cookie: cookieStore.toString(),
    },
  });
  return data;
};
