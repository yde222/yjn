import { CommonQueryDto } from '@biz-dev-backend/common.query.dto';
import { faker } from '@faker-js/faker';
import { Injectable } from '@nestjs/common';
import { CommonUser } from '@prisma/client';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CommonUserService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(query: CommonQueryDto) {
    if (query.page === -1 || query.limit === -1) {
      return this.prismaService.commonUser.findMany();
    }
    return this.prismaService.commonUser.findMany({
      skip: query.page * +query.limit,
      take: query.limit,
    });
  }

  async getOne(userId: string) {
    return this.prismaService.commonUser.findUnique({
      where: {
        userId,
      },
    });
  }

  async create(body: any) {
    return this.prismaService.commonUser.create({
      data: body,
    });
  }

  async delete(userId: string) {
    return this.prismaService.commonUser.delete({
      where: {
        userId,
      },
    });
  }

  async update(userId: string, body: any) {
    return this.prismaService.commonUser.update({
      where: {
        userId,
      },
      data: body,
    });
  }

  createFakeCommonUsers() {
    const companyName = faker.company.name();
    const newCommonUser = {
      userId: faker.string.uuid(),
      userName: faker.internet.userName(),
      nickname: faker.person.fullName(),
      companyCode:
        companyName.slice(0, 3).toUpperCase() +
        '_' +
        faker.number.int({
          min: 1000,
          max: 9999,
        }),
      companyName: companyName,
      authority: faker.helpers.arrayElement([
        'system-admin',
        'field-admin',
        'member',
      ]),
      departmentCode: faker.string.uuid(),
      departmentName: faker.commerce.department(),
      projects: faker.helpers
        .arrayElements([
          '프로젝트A',
          '프로젝트B',
          '프로젝트C',
          '프로젝트D',
          '프로젝트E',
          '프로젝트F',
          '프로젝트G',
        ])
        .join('||'),
    } satisfies CommonUser;

    return newCommonUser;
  }

  async seeding() {
    const fakeCommonUsers = faker.helpers.multiple(this.createFakeCommonUsers, {
      count: 20,
    });
    return this.prismaService.commonUser.createMany({
      data: fakeCommonUsers,
    });
  }

  async deleteAll() {
    return this.prismaService.commonUser.deleteMany({
      where: {
        userId: {
          not: '',
        },
      },
    });
  }

  async getMockHistory() {
    const fakeHistories = [...Array.from({ length: 120 })].map((_, index) => ({
      no: index + 1,
      ip: faker.internet.ipv4(),
      initialConnectedDate: faker.date.recent(),
      lastConnectedDate: faker.date.recent(),
      passwordUpdateDate: faker.date.recent(),
    }));

    return fakeHistories;
  }
}
