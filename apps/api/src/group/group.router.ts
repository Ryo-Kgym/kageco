import { Query, Router } from "nestjs-trpc";

@Router({ alias: "group" })
export class GroupRouter {
  // 組織のメンバー一覧を取得
  @Query()
  async getGroupsMembers() {
    return {
      groups: [{ id: 1, name: "test" }],
    };
  }
}
