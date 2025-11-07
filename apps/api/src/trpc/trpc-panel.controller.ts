import { All, Controller, Inject, type OnModuleInit } from "@nestjs/common";
import type { AnyRouter } from "@trpc/server";
import { AppRouterHost } from "nestjs-trpc";
import { renderTrpcPanel } from "trpc-panel";

@Controller()
export class TrpcPanelController implements OnModuleInit {
  private appRouter!: AnyRouter;

  constructor(@Inject(AppRouterHost) private readonly appRouterHost: AppRouterHost) {}

  onModuleInit() {
    this.appRouter = this.appRouterHost.appRouter;
  }

  @All("/panel")
  panel(): string {
    return renderTrpcPanel(this.appRouter, {
      url: "http://localhost:4000/trpc",
    });
  }
}
