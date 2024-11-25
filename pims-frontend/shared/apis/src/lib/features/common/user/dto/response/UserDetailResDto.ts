import { UserProjectResDto } from './UserProjectResDto';

export type UserDetailResDto = {
  userId: string;
  userName: string;
  nickname: string;
  companyCode: string;
  departmentCode: string;
  roleCode: string;
  authorityCode: string;
  projects: UserProjectResDto[];
};
