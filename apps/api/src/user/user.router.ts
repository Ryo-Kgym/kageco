import { Query, Router } from "nestjs-trpc";

@Router({ alias: "user" })
export class UserRouter {
  @Query()
  async getUser() {
    return {
      user: [{ id: 1, name: "test" }],
    };
  }
}
