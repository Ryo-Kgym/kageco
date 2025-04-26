import { FreeeAuthRepository } from "../../../gateway/freee/freee-auth-repository";
import type { FreeeGateway } from "../../../gateway/freee/freee-gateway";
import type { HouseholdUsecase } from "../HouseholdUsecase";

export class FreeeAuthUsecase
  implements HouseholdUsecase<FreeeAuthInput, FreeeAuthOutput>
{
  private readonly freeeGateway: FreeeGateway;

  constructor(clientId: string, clientSecret: string) {
    this.freeeGateway = new FreeeAuthRepository(clientId, clientSecret);
  }

  async handle(input: FreeeAuthInput): Promise<FreeeAuthOutput> {
    switch (input.type) {
      case "getAuthUrl": {
        const authUrlResult = this.freeeGateway.getAuthorizationUrl(input.redirectUri);
        return {
          type: "authUrl",
          url: authUrlResult.url,
          state: authUrlResult.state,
        };
      }
      case "getToken": {
        const tokenResponse = await this.freeeGateway.getAccessToken(
          input.code,
          input.redirectUri,
        );
        return {
          type: "token",
          accessToken: tokenResponse.access_token,
          refreshToken: tokenResponse.refresh_token,
          expiresIn: tokenResponse.expires_in,
          tokenType: tokenResponse.token_type,
          scope: tokenResponse.scope,
          createdAt: tokenResponse.created_at,
        };
      }
      case "refreshToken": {
        const refreshResponse = await this.freeeGateway.refreshAccessToken(
          input.refreshToken,
        );
        return {
          type: "token",
          accessToken: refreshResponse.access_token,
          refreshToken: refreshResponse.refresh_token,
          expiresIn: refreshResponse.expires_in,
          tokenType: refreshResponse.token_type,
          scope: refreshResponse.scope,
          createdAt: refreshResponse.created_at,
        };
      }
      default:
        throw new Error("Invalid input type");
    }
  }
}

export type FreeeAuthInput =
  | {
      type: "getAuthUrl";
      redirectUri: string;
    }
  | {
      type: "getToken";
      code: string;
      redirectUri: string;
    }
  | {
      type: "refreshToken";
      refreshToken: string;
    };

export type FreeeAuthOutput =
  | {
      type: "authUrl";
      url: string;
      state: string;
    }
  | {
      type: "token";
      accessToken: string;
      refreshToken: string;
      expiresIn: number;
      tokenType: string;
      scope: string;
      createdAt: number;
    };
