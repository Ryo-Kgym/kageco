import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TRPCModule } from "nestjs-trpc";
import { AppContext } from "./app.context";
import { AppController } from "./app.controller";
import { GroupModule } from "./group/group.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TrpcPanelController } from "./trpc/trpc-panel.controller";
import { UserModule } from "./user/user.module";

const developmentControllers = process.env.NODE_ENV === "development" ? [TrpcPanelController] : [];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.development", ".env"],
      load: [
        () => ({
          database: {
            url: process.env.APP_DATABASE_URL,
          },
        }),
      ],
    }),
    TRPCModule.forRoot({
      autoSchemaFile:
        process.env.NODE_ENV === "development" ? "../../packages/trpc/@generated" : undefined,
      context: AppContext,
    }),
    PrismaModule,
    UserModule,
    GroupModule,
  ],
  controllers: [AppController, ...developmentControllers],
  providers: [AppContext],
})
export class AppModule {}
