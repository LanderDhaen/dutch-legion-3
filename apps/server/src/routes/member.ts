import { HttpApiBuilder } from "effect/http-api"
import { MemberService } from "@/services/member"
import { api } from "@workspace/api/contracts"

export const memberHandlers = HttpApiBuilder.group(api, "members", (handlers) =>
  handlers.handle("getMemberStatistics", ({ params }) =>
    MemberService.use((service) => service.getMemberStatistics(params.id))
  )
)
