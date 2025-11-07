import { Module } from "@nestjs/common";
import { TrpcModule } from "./trpc/trpc.module";

@Module({
  imports: [TrpcModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
