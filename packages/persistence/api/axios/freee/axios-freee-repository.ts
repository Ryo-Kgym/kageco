import axios from "axios";
export class AxiosFreeeRepository {
  protected readonly baseUrl = "https://api.freee.co.jp/api/1";
  protected readonly companyId: number;
  protected readonly accessToken: string;

  constructor(params: { companyId: number; accessToken: string }) {
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
          accept: "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
          "X-Api-Version": "2020-06-15",
        },
      },
    );

    return response.data;
  }

  public async axiosPost<R extends object>(params: {
    endpointSuffix: `/${string}`;
    requestBody: R;
  }) {
    const response = await axios.post(
      `${this.baseUrl}${params.endpointSuffix}`,
      params.requestBody,
      {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${this.accessToken}`,
          "Content-Type": "application/json",
          "X-Api-Version": "2020-06-15",
        },
      },
    );

    return response.data;
  }
}
