import axios from "axios";
export class AxiosFreeeRepository {
  protected readonly baseUrl = "https://api.freee.co.jp/api/1";
  protected readonly companyId: string;
  protected readonly accessToken: string;

  constructor(params: { companyId: string; accessToken: string }) {
    this.companyId = params.companyId;
    this.accessToken = params.accessToken;
  }

  protected async axiosGet(params: {
    endpointSuffix: `/${string}`;
  }) {
    const response = await axios.get(
      `${this.baseUrl}${params.endpointSuffix}`,
      {
        headers: {
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    return response.data;
  }
}
