import { CodeEntity } from './query';

export type CreateCodeEntityRequestDto = Omit<
  CodeEntity,
  'id' | 'createdAt' | 'updatedAt'
>;

export type UpdateCodeEntityRequestDto = CreateCodeEntityRequestDto &
  Pick<CodeEntity, 'projectId'> & {
    codeEntityId: string;
  };
