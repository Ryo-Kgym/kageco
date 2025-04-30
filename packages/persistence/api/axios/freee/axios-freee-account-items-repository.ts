import type { FreeeAccountItemsGateway } from "@/core/gateway/freee/freee-account-items-gateway";
import { AxiosFreeeRepository } from "./axios-freee-repository";

export class AxiosFreeeAccountItemsRepository
  extends AxiosFreeeRepository
  implements FreeeAccountItemsGateway
{
  getAll: FreeeAccountItemsGateway["getAll"] = async () => {
    try {
      return await super.axiosGet({
        endpointSuffix: `/account_items?company_id=${this.companyId}&available=true`,
      });
    } catch (error) {
      console.error("Error fetching account items:", error);
      throw new Error("Failed to fetch account items from freee API");
    }
  };
}
