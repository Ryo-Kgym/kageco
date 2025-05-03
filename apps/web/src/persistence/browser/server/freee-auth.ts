import { getCookieValue } from "./cookie";

export async function findFreeeAuth(options?: { required: true }): Promise<{
  accessToken: string;
  companyId: number;
}>;
export async function findFreeeAuth(options?: { required: false }): Promise<
  | {
      accessToken: string | undefined;
      companyId: number | undefined;
      isSafety: false;
    }
  | {
      accessToken: string;
      companyId: number;
      isSafety: true;
    }
>;
export async function findFreeeAuth(options?: { required: boolean }) {
  const accessToken = await getCookieValue("freeeAccessToken");
  const optCompanyId = await getCookieValue("freeeCompanyId");

  const required = options?.required ?? true;
  const isSafety = !!accessToken && !!optCompanyId;
  const companyId = optCompanyId ? Number(optCompanyId) : undefined;

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
