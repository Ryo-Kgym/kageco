import type { FreeeWalletablesGateway } from "@/core/gateway/freee/freee-walletables-gateway";
import { AxiosFreeeRepository } from "./axios-freee-repository";

export class AxiosFreeeWalletablesRepository
  extends AxiosFreeeRepository
  implements FreeeWalletablesGateway
{
  async getAll() {
    try {
      return await this.axiosGet({
        endpointSuffix: `/walletables?company_id=${this.companyId}`,
      });
    } catch (error) {
      console.error("Error fetching walletables:", error);
      throw new Error("Failed to fetch walletables from freee API");
    }
  }
}
