import { describe, expect, test, vi } from "vitest";
import type { FreeeAuthGateway } from "../../../gateway/freee/freee-auth-gateway";
import { FreeeAuthUsecase } from "./freee-auth-usecase";

// Mock the FreeeAuthGateway
const mockFreeeAuthGateway: FreeeAuthGateway = {
  getAuthorizationUrl: vi.fn().mockReturnValue({
    url: "https://mock-auth-url.com",
    state: "mock-state",
  }),
  getAccessToken: vi.fn().mockResolvedValue({
    access_token: "mock-access-token",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token: "mock-refresh-token",
    scope: "accounting",
    created_at: 1234567890,
    company_id: "mock-company-id",
    external_cid: "mock-external-cid",
  }),
  refreshAccessToken: vi.fn().mockResolvedValue({
    access_token: "mock-refreshed-token",
    token_type: "Bearer",
    expires_in: 3600,
    refresh_token: "mock-new-refresh-token",
    scope: "accounting",
    created_at: 1234567890,
    company_id: "mock-company-id",
    external_cid: "mock-external-cid",
  }),
};

describe("FreeeAuthUsecase", () => {
  test("getAuthUrlタイプの入力の場合、認証URLとstateが返ること", async () => {
    const usecase = new FreeeAuthUsecase(mockFreeeAuthGateway);
    const result = await usecase.handle({
      type: "getAuthUrl",
      redirectUri: "https://example.com/callback",
    });

    expect(result).toEqual({
      type: "authUrl",
      url: "https://mock-auth-url.com",
      state: "mock-state",
    });

    // Verify the gateway method was called with the correct parameters
    expect(mockFreeeAuthGateway.getAuthorizationUrl).toHaveBeenCalledWith(
      "https://example.com/callback",
    );
  });

  test("getTokenタイプの入力の場合、アクセストークンと関連情報が返ること", async () => {
    const usecase = new FreeeAuthUsecase(mockFreeeAuthGateway);
    const result = await usecase.handle({
      type: "getToken",
      code: "test-code",
      redirectUri: "https://example.com/callback",
    });

    expect(result).toEqual({
      type: "token",
      accessToken: "mock-access-token",
      refreshToken: "mock-refresh-token",
      expiresIn: 3600,
      tokenType: "Bearer",
      scope: "accounting",
      createdAt: 1234567890,
      companyId: "mock-company-id",
      externalCid: "mock-external-cid",
    });

    // Verify the gateway method was called with the correct parameters
    expect(mockFreeeAuthGateway.getAccessToken).toHaveBeenCalledWith(
      "test-code",
      "https://example.com/callback",
    );
  });

  test("refreshTokenタイプの入力の場合、更新されたアクセストークンと関連情報が返ること", async () => {
    const usecase = new FreeeAuthUsecase(mockFreeeAuthGateway);
    const result = await usecase.handle({
      type: "refreshToken",
      refreshToken: "test-refresh-token",
    });

    expect(result).toEqual({
      type: "token",
      accessToken: "mock-refreshed-token",
      refreshToken: "mock-new-refresh-token",
      expiresIn: 3600,
      tokenType: "Bearer",
      scope: "accounting",
      createdAt: 1234567890,
      companyId: "mock-company-id",
      externalCid: "mock-external-cid",
    });

    // Verify the gateway method was called with the correct parameters
    expect(mockFreeeAuthGateway.refreshAccessToken).toHaveBeenCalledWith("test-refresh-token");
  });

  test("無効なタイプの入力の場合、「Invalid input type」エラーが発生すること", async () => {
    const usecase = new FreeeAuthUsecase(mockFreeeAuthGateway);
    // @ts-expect-error Testing invalid input
    await expect(usecase.handle({ type: "invalid" })).rejects.toThrow("Invalid input type");
  });
});
