import { RequestStatus } from "@/shared/types/types"
import { Todolist } from "../api/todolistsApi.types"

export type DomainTodolist = Todolist & {
  filter: FilterValues
  entityStatus: RequestStatus
}

export type FilterValues = "all" | "active" | "completed"
