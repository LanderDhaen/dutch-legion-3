import { api } from "./index"

export const getMemberHistory = async (id: string) => {
  return await api.members({ id }).statistics.get()
}
