import { type ProjectResDto } from '@pims-frontend/apis/lib/features/pms/project/dto/response/ProjectResDto';

export const fetchMockProject = async (): Promise<ProjectResDto | null> => {
  // const res = await fetch(`${process.env.NEXT_PUBLIC_ADMIN_URL}/api/projects`);
  // const projects = await res.json();
  // return projects;

  // NOTE: 로그인 안했으면, return null -> 현재 로그인 로직 개발되지 않았으므로, 로그인 되었다고 간주

  return new Promise((res) => {
    const project = {
      pjtUid: 6,
      pjtNo: 'bkf123',
      pjtNm: '프로젝트1',
      pjtDesc: '프로젝트 설명',
      pjtMngRId: 'abc',
      rpnDepCd: 'CO1',
      pgsStatCd: 179,
      staYmd: '20240910',
      endYmd: '20240911',
      isTplEnabled: true,
      isSubGrpEnabled: false,
      isDeleted: true,
    } satisfies ProjectResDto;

    res(project);
  });
};
