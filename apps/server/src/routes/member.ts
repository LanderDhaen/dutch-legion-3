import { HttpApiBuilder } from "effect/http-api"
import { MemberService } from "@/services/member"
import { memberApi } from "@workspace/api/contracts"

export const memberHandlers = HttpApiBuilder.group(
  memberApi,
  "members",
  (handlers) =>
    handlers.handle("getMemberStatistics", ({ params }) =>
      MemberService.use((service) => service.getMemberStatistics(params.id))
    )
)
