import { Module } from "@nestjs/common";
import { GroupModule } from "../group/group.module";
import { UserModule } from "../user/user.module";
import { TrpcRouter } from "./trpc.router";
import { TrpcService } from "./trpc.service";

@Module({
  imports: [UserModule, GroupModule],
  providers: [TrpcService, TrpcRouter],
  exports: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
