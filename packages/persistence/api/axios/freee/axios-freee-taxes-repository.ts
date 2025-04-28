import type { FreeeTaxesGateway } from "@/core/gateway/freee/freee-taxes-gateway";
import { AxiosFreeeRepository } from "./axios-freee-repository";

export class AxiosFreeeTaxesRepository
  extends AxiosFreeeRepository
  implements FreeeTaxesGateway
{
  async getAll() {
    try {
      return await this.axiosGet({
        endpointSuffix: `/taxes/companies/${this.companyId}`,
      });
    } catch (error) {
      console.error("Error fetching taxes:", error);
      throw new Error("Failed to fetch taxes from freee API");
    }
  }
}
