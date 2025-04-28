import { getCookieValue } from "./cookie";

export const findFreeeAuth = async () => {
  const accessToken = await getCookieValue("freeeAccessToken");
  const companyId = await getCookieValue("freeeCompanyId");

  if (!accessToken || !companyId) {
    throw new Error("No freee authentication information available.");
  }

  return {
    accessToken,
    companyId,
  };
};
