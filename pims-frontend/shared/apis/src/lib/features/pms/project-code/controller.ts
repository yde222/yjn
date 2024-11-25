import { InjectableApi } from '../../../api';
import {
  ReadMultipleProjectsResponseDto,
  ReadSingleProjectResponseDto,
} from '../project/dto/response';
import {
  CreateCodeEntityRequestDto,
  UpdateCodeEntityRequestDto,
} from './dto/request';

export const projectCodeApiInitializer = (api: InjectableApi) =>
  api.injectEndpoints({
    endpoints: (build) => ({
      getCodeEntity: build.query<
        ReadSingleProjectResponseDto,
        { projectId: string; codeEntityId: string }
      >({
        query: ({ projectId, codeEntityId }) =>
          `/api/v1/project/${projectId}/code-entity/${codeEntityId}`,
      }),
      getCodeEntities: build.query<
        ReadMultipleProjectsResponseDto,
        { projectId: string }
      >({
        query: ({ projectId }) => `/api/v1/project/${projectId}/code-entity`,
      }),
      addProjectCode: build.mutation<
        ReadSingleProjectResponseDto,
        CreateCodeEntityRequestDto
      >({
        query: ({ projectId, ...body }) => ({
          url: `/api/v1/project/${projectId}/code-entity`,
          method: 'POST',
          body: body,
        }),
        invalidatesTags: [{ type: 'project-code', id: 'LIST' }],
      }),
      updateProjectCode: build.mutation<
        ReadSingleProjectResponseDto,
        UpdateCodeEntityRequestDto
      >({
        query: ({ projectId, codeEntityId, ...body }) => ({
          url: `/api/v1/project/${projectId}/code-entity/${codeEntityId}`,
          method: 'PATCH',
          body: body,
        }),
        invalidatesTags: (projectCode) => [
          { type: 'project-code', id: projectCode?.id },
        ],
      }),
      deleteProjectCode: build.mutation<
        ReadSingleProjectResponseDto,
        { projectId: string; codeEntityId: string }
      >({
        query: ({ projectId, codeEntityId }) => ({
          url: `/api/v1/project/${projectId}/code-entity/${codeEntityId}`,
          method: 'DELETE',
        }),
        invalidatesTags: (projectParams) => [
          { type: 'project-code', id: projectParams?.id },
        ],
      }),
    }),
  });
