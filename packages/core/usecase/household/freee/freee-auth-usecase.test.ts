import { describe, expect, test, vi } from "vitest";
import { FreeeAuthRepository } from "../../../gateway/freee/freee-auth-repository";
import { FreeeAuthUsecase } from "./freee-auth-usecase";

// Mock the FreeeAuthRepository
vi.mock("../../../gateway/freee/freee-auth-repository", () => {
  return {
    FreeeAuthRepository: vi.fn().mockImplementation(() => {
      return {
        getAuthorizationUrl: vi
          .fn()
          .mockReturnValue("https://mock-auth-url.com"),
        getAccessToken: vi.fn().mockResolvedValue({
          access_token: "mock-access-token",
          token_type: "Bearer",
          expires_in: 3600,
          refresh_token: "mock-refresh-token",
          scope: "accounting",
          created_at: 1234567890,
        }),
        refreshAccessToken: vi.fn().mockResolvedValue({
          access_token: "mock-refreshed-token",
          token_type: "Bearer",
          expires_in: 3600,
          refresh_token: "mock-new-refresh-token",
          scope: "accounting",
          created_at: 1234567890,
        }),
      };
    }),
  };
});

describe("FreeeAuthUsecase", () => {
  const clientId = "test-client-id";
  const clientSecret = "test-client-secret";

  test("should get authorization URL", async () => {
    const usecase = new FreeeAuthUsecase(clientId, clientSecret);
    const result = await usecase.handle({
      type: "getAuthUrl",
      redirectUri: "https://example.com/callback",
    });

    expect(result).toEqual({
      type: "authUrl",
      url: "https://mock-auth-url.com",
    });

    // Verify FreeeAuthRepository was constructed with the correct parameters
    expect(FreeeAuthRepository).toHaveBeenCalledWith(clientId, clientSecret);
  });

  test("should get access token", async () => {
    const usecase = new FreeeAuthUsecase(clientId, clientSecret);
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
    });
  });

  test("should refresh access token", async () => {
    const usecase = new FreeeAuthUsecase(clientId, clientSecret);
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
    });
  });

  test("should throw error for invalid input type", async () => {
    const usecase = new FreeeAuthUsecase(clientId, clientSecret);
    // @ts-expect-error Testing invalid input
    await expect(usecase.handle({ type: "invalid" })).rejects.toThrow(
      "Invalid input type",
    );
  });
});
