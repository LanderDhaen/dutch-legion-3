import { api } from "../contracts"
import { Context, Layer } from "effect"
import { FetchHttpClient } from "effect/http"
import { HttpApiClient } from "effect/http-api"

export class ApiClient extends Context.Service<ApiClient>()("ApiClient", {
  make: HttpApiClient.make(api, {
    baseUrl: "http://localhost:8000",
  }),
}) {
  static readonly layer = Layer.provide(
    Layer.effect(this, this.make),
    FetchHttpClient.layer
  )
}
