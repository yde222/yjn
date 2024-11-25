import { type UserProjectResDto } from './UserProjectResDto';

export type UserSummaryResDto = {
  userId: string;
  userName: string;
  nickname: string;
  companyCode: string;
  authorityCode: string;
  projects: UserProjectResDto[];
};
