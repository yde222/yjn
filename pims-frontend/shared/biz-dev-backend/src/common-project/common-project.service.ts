import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { ProjectReqDto } from './project.req.dto';
import { ProjectResDto } from './project.res.dto';
import { CommonProject } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { format } from 'date-fns';

@Injectable()
export class CommonProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async seedingProject() {
    const newFakeProjects = faker.helpers.multiple(
      () =>
        ({
          pjtNo: faker.string.alphanumeric({ length: 8 }),
          pjtNm: faker.company.name(),
          pjtMngRId: faker.string.uuid(),
          rpnDepCd: faker.string.uuid(), //관리부서ID
          pgsStatCd: faker.helpers.arrayElement([
            'PJT_STAT_01',
            'PJT_STAT_02',
            'PJT_STAT_03',
            'PJT_STAT_04',
          ]),
          staYmd: format(faker.date.past(), 'yyyyMMdd'),
          endYmd: format(faker.date.future(), 'yyyyMMdd'),
          tplEnabled: faker.datatype.boolean(),
          subGrpEnabled: faker.datatype.boolean(),
          deleted: false,
        }) satisfies ProjectResDto,
      {
        count: 20,
      },
    );

    const projects = await this.prismaService.commonProject.createMany({
      data: newFakeProjects.map((project) => ({
        pjtNo: project.pjtNo,
        pjtNm: project.pjtNm,
        pjtMngRId: project.pjtMngRId,
        rpnDepCd: project.rpnDepCd,
        pgsStatCd: project.pgsStatCd,
        staYmd: project.staYmd,
        endYmd: project.endYmd,
        isTplEnabled: project.tplEnabled,
        isSubGrpEnabled: project.subGrpEnabled,
        isDeleted: project.deleted,
      })),
    });

    return projects;
  }

  async createProject(dto: ProjectReqDto): Promise<ProjectResDto> {
    const newProject = await this.prismaService.commonProject.create({
      data: {
        pjtNo: dto.pjtNo,
        pjtNm: dto.pjtNm,
        pjtMngRId: dto.pjtMngRId,
        rpnDepCd: dto.rpnDepCd,
        pgsStatCd: dto.pgsStatCd,
        staYmd: dto.staYmd,
        endYmd: dto.endYmd,
        isTplEnabled: dto.tplEnabled,
        isSubGrpEnabled: dto.subGrpEnabled,
        isDeleted: dto.deleted,
      },
    });

    return newProject;
  }

  async getProject(pjtUid: CommonProject['pjtUid']): Promise<ProjectResDto> {
    const project = await this.prismaService.commonProject.findUnique({
      where: {
        pjtUid,
      },
    });

    return project;
  }

  async updateProject(
    pjtUid: CommonProject['pjtUid'],
    dto: ProjectReqDto,
  ): Promise<ProjectResDto> {
    const updatedProject = await this.prismaService.commonProject.update({
      where: {
        pjtUid,
      },
      data: {
        pjtNo: dto.pjtNo,
        pjtNm: dto.pjtNm,
        pjtMngRId: dto.pjtMngRId,
        rpnDepCd: dto.rpnDepCd,
        pgsStatCd: dto.pgsStatCd,
        staYmd: dto.staYmd,
        endYmd: dto.endYmd,
        isTplEnabled: dto.tplEnabled,
        isSubGrpEnabled: dto.subGrpEnabled,
        isDeleted: dto.deleted,
      },
    });

    return {
      pjtNo: updatedProject.pjtNo,
      pjtNm: updatedProject.pjtNm,
      pjtMngRId: updatedProject.pjtMngRId,
      rpnDepCd: updatedProject.rpnDepCd,
      pgsStatCd: updatedProject.pgsStatCd,
      staYmd: updatedProject.staYmd,
      endYmd: updatedProject.endYmd,
      tplEnabled: updatedProject.isTplEnabled,
      subGrpEnabled: updatedProject.isSubGrpEnabled,
      deleted: updatedProject.isDeleted,
    };
  }

  async getProjectList(keyword: string): Promise<ProjectResDto[]> {
    const projects = await this.prismaService.commonProject.findMany({
      where: {
        pjtNm: {
          contains: keyword,
        },
      },
    });

    return projects.map((project) => ({
      pjtUid: project.pjtUid,
      pjtNo: project.pjtNo,
      pjtNm: project.pjtNm,
      pjtMngRId: project.pjtMngRId,
      rpnDepCd: project.rpnDepCd,
      pgsStatCd: project.pgsStatCd,
      staYmd: project.staYmd,
      endYmd: project.endYmd,
      tplEnabled: project.isTplEnabled,
      subGrpEnabled: project.isSubGrpEnabled,
      deleted: project.isDeleted,
    }));
  }

  async updateProjectStat(
    pjtUid: CommonProject['pjtUid'],
    pgsStatCd: CommonProject['pgsStatCd'],
  ): Promise<ProjectResDto> {
    const updatedProject = await this.prismaService.commonProject.update({
      where: {
        pjtUid,
      },
      data: {
        pgsStatCd,
      },
    });

    return {
      pjtNo: updatedProject.pjtNo,
      pjtNm: updatedProject.pjtNm,
      pjtMngRId: updatedProject.pjtMngRId,
      rpnDepCd: updatedProject.rpnDepCd,
      pgsStatCd: updatedProject.pgsStatCd,
      staYmd: updatedProject.staYmd,
      endYmd: updatedProject.endYmd,
      tplEnabled: updatedProject.isTplEnabled,
      subGrpEnabled: updatedProject.isSubGrpEnabled,
      deleted: updatedProject.isDeleted,
    };
  }
}
