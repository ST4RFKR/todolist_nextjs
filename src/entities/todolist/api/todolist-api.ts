import { baseApi } from '@/shared/lib/baseApi';
import { DomainTodolist } from '../lib/types';
import { Todolist } from './todolistsApi.types';
import { BaseResponse } from '@/shared/types/types';

export const todolistApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodolists: build.query<DomainTodolist[], void>({
      query: () => '/todo-lists',
      providesTags: ['Todolist'],
      transformResponse: (todolists: Todolist[]): DomainTodolist[] =>
        todolists.map((todolist: Todolist) => ({
          ...todolist,
          filter: 'all',
          entityStatus: 'idle',
          priyorite: 1,
        })),
    }),
    createTodolist: build.mutation<BaseResponse<{ item: Todolist }>, string>({
      invalidatesTags: ['Todolist'],
      query: (title) => ({
        url: '/todo-lists',
        method: 'POST',
        body: { title },
      }),
    }),
    deleteTodolist: build.mutation<BaseResponse, string>({
      invalidatesTags: ['Todolist'],
      query: (todolistId) => ({
        url: `/todo-lists/${todolistId}`,
        method: 'DELETE',
      }),
    }),
    updateTodolistTitle: build.mutation<BaseResponse, { id: string; title: string }>({
      invalidatesTags: ['Todolist'],
      query: ({ id: todolistId, title }) => ({
        url: `/todo-lists/${todolistId}`,
        method: 'PUT',
        body: { title },
      }),
    }),

    reorderTodolist: build.mutation<void, { todolistId: string; putAfterItemId: string | null }>({
      query: ({ todolistId, putAfterItemId }) => ({
        url: `todo-lists/${todolistId}/reorder`,
        method: 'PUT',
        body: { putAfterItemId },
      }),
      // Оптимистичное обновление
      onQueryStarted({ todolistId, putAfterItemId }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          todolistApi.util.updateQueryData('getTodolists', undefined, (draft) => {
            const movedItemIndex = draft.findIndex((t) => t.id === todolistId);
            if (movedItemIndex === -1) return;

            const movedItem = draft[movedItemIndex];
            draft.splice(movedItemIndex, 1);

            if (putAfterItemId === null) {
              draft.unshift(movedItem);
            } else {
              const targetIndex = draft.findIndex((t) => t.id === putAfterItemId);
              if (targetIndex !== -1) {
                draft.splice(targetIndex + 1, 0, movedItem);
              }
            }
          }),
        );

        queryFulfilled.catch(patchResult.undo);
      },
    }),
  }),
});

export const {
  useGetTodolistsQuery,
  useCreateTodolistMutation,
  useUpdateTodolistTitleMutation,
  useDeleteTodolistMutation,
  useReorderTodolistMutation,
} = todolistApi;
