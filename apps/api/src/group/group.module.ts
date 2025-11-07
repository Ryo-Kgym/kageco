import { Module } from "@nestjs/common";
import { GroupRouter } from "./group.router";

@Module({
  providers: [GroupRouter],
  exports: [GroupRouter],
})
export class GroupModule {}
