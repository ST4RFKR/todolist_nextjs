import { baseApi } from "@/shared/lib/baseApi";


export const todolistApi = baseApi.injectEndpoints({

  endpoints: (build) => ({
   getTodolists: build.query<any, void>({
    query: () => '/todo-lists',
    providesTags: ['Todolist'],
    transformResponse: (todolists: any) => todolists.map((todolist: any) => ({...todolist, filter: 'all', entityStatus: "idle"})),
   }),
   createTodolist: build.mutation<any, { title: string }>({
    invalidatesTags: ['Todolist'],
    query: (body) => ({
      url: '/todo-lists',
      method: 'POST',
      body
    }),
   }),
   deleteTodolist: build.mutation<any, { todolistId: string }>({
    invalidatesTags: ['Todolist'],
    query: (todolistId) => ({
      url: `/todo-lists/${todolistId}`,
      method: 'DELETE',
    }),
   }),
   updateTodolistTitle: build.mutation<any, { todolistId: string; title: string } >({
    invalidatesTags: ['Todolist'],
    query: ({ todolistId, title }) => ({
      url: `/todo-lists/${todolistId}`,
      method: 'PUT',
      body: { title }
    }),
   }),
   reorderTodolists: build.mutation<any, { todolistId: string }>({
    invalidatesTags: ['Todolist'],
    query: (todolistId) => ({
      url: `/todo-lists/${todolistId}/reorder`,
      method: 'PUT',
      body: todolistId
    }),
   }),
   
  }),
  
  
});

export const  { useGetTodolistsQuery, useCreateTodolistMutation, useUpdateTodolistTitleMutation, useReorderTodolistsMutation, useDeleteTodolistMutation } = todolistApi;