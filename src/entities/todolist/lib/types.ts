import { RequestStatus } from '@/shared/types/types';
import { Todolist } from '../api/todolistsApi.types';

export type DomainTodolist = Todolist & {
  filter: FilterValues;
  entityStatus: RequestStatus;
  priyorite: number;
};

export type FilterValues = 'all' | 'active' | 'completed';
export type PriyoriteValues = 0 | 1 | 2 | 3 | 4;
