import { HttpApiBuilder } from "effect/http-api"
import { Layer } from "effect"
import { HttpRouter } from "effect/http"
import {
  NodeHttpServer,
  NodeRuntime,
  NodeServices,
} from "@effect/platform-node"
import { createServer } from "node:http"
import { DatabaseService } from "@server/database"
import { MemberService } from "@server/services/member"
import { memberApi, memberHandlers } from "@server/routes/member"

const api = HttpApiBuilder.layer(memberApi).pipe(Layer.provide(memberHandlers))

const server = HttpRouter.serve(api).pipe(
  Layer.provide(MemberService.layer),
  Layer.provide(DatabaseService.Live),
  Layer.provide(NodeHttpServer.layer(createServer, { port: 8000 })),
  Layer.provide(NodeServices.layer)
)

NodeRuntime.runMain(Layer.launch(server))
