import { baseApi } from "@/shared/lib/baseApi";
import { DomainTodolist } from "../lib/types";
import { Todolist } from "./todolistsApi.types";
import { BaseResponse } from "@/shared/types/types";



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
  }))
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
      body: { title }
    }),
   }),
  
  }),
  
  
});

export const  { useGetTodolistsQuery, useCreateTodolistMutation, useUpdateTodolistTitleMutation, useDeleteTodolistMutation } = todolistApi;