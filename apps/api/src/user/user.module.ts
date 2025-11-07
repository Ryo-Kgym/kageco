import { Module } from "@nestjs/common";
import { UserRouter } from "./user.router";

@Module({
  providers: [UserRouter],
  exports: [UserRouter],
})
export class UserModule {}
