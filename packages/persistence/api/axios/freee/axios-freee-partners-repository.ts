import type { FreeePartnersGateway } from "@/core/gateway/freee/freee-partners-gateway";
import { AxiosFreeeRepository } from "./axios-freee-repository";

export class AxiosFreeePartnersRepository
  extends AxiosFreeeRepository
  implements FreeePartnersGateway
{
  getAll: FreeePartnersGateway["getAll"] = async () => {
    try {
      return await super.axiosGet({
        endpointSuffix: `/partners?company_id=${this.companyId}`,
      });
    } catch (error) {
      console.error("Error fetching partners:", error);
      throw new Error("Failed to fetch partners from freee API");
    }
  };
}
