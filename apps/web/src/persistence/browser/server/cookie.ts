import { cookies } from "next/headers";

export const getCookieValue = async (key: string): Promise<string | undefined> => {
  const cookieStore = await cookies();
  return cookieStore.get(key)?.value;
};
