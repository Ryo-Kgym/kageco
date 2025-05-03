import { getCookieValue } from "./cookie";

export async function findFreeeAuth(options?: { required: true }): Promise<{
  accessToken: string;
  companyId: string;
}>;
export async function findFreeeAuth(options?: { required: false }): Promise<
  | {
      accessToken: string | undefined;
      companyId: string | undefined;
      isSafety: false;
    }
  | {
      accessToken: string;
      companyId: string;
      isSafety: true;
    }
>;
export async function findFreeeAuth(options?: { required: boolean }) {
  const accessToken = await getCookieValue("freeeAccessToken");
  const companyId = await getCookieValue("freeeCompanyId");

  const required = options?.required ?? true;
  const isSafety = !!accessToken && !!companyId;

  if (!required) {
    return {
      accessToken,
      companyId,
      isSafety,
    };
  }

  if (!isSafety) {
    throw new Error("No freee authentication information available.");
  }

  return {
    accessToken,
    companyId,
  };
}
