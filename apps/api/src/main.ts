import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableCors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "Accept"],
  });
  await app.listen(4000);
  console.log("NestJS + tRPCサーバーが http://localhost:4000 で起動しました");
}
bootstrap();
