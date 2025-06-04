import { baseApi } from "@/shared/lib/baseApi";
import { DomainTask, GetTasksResponse, UpdateTaskModel } from "./tasksApi.types";


export const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTask: build.query<GetTasksResponse, string>({
      providesTags: ['Task'],
      query: (todolistId) => `/todo-lists/${todolistId}/tasks`,
    }),
    createTask: build.mutation<DomainTask, { todolistId: string; title: string }>({
      invalidatesTags: ['Task'],
      query: ({ todolistId, title }) => ({
        url: `/todo-lists/${todolistId}/tasks`,
        method: 'POST',
        body: { title }
      }),
    }),
    deleteTask: build.mutation<void, { todolistId: string; taskId: string }>({
      invalidatesTags: ['Task'],
      query: ({ todolistId, taskId }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'DELETE',
      }),
    }),
    updateTask: build.mutation<DomainTask, { 
      todolistId: string; 
      taskId: string; 
      model: Partial<UpdateTaskModel> 
    }>({
      invalidatesTags: ['Task'],
      query: ({ todolistId, taskId, model }) => ({
        url: `/todo-lists/${todolistId}/tasks/${taskId}`,
        method: 'PUT',
        body: model
      }),
    })
  }),
});

export const { 
  useGetTaskQuery, 
  useCreateTaskMutation, 
  useDeleteTaskMutation, 
  useUpdateTaskMutation 
} = taskApi;