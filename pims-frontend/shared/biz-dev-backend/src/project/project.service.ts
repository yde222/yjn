import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Project } from '@biz-dev-backend/prisma/generated/zod';

@Injectable()
export class ProjectService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(dto: { name: string }) {
    const newProject = await this.prismaService.project.create({
      data: {
        name: dto.name,
      },
    });

    return newProject;
  }

  async findAll(query: { skip?: number; take?: number }) {
    const { skip = 0, take = 10 } = query;
    const projects = await this.prismaService.project.findMany({
      skip,
      take,
      include: {
        ProjectUser: true,
        ProjectRole: true,
        Task: true,
      },
    });
    return projects;
  }

  async findOne(id: string) {
    const project = await this.prismaService.project.findUnique({
      where: {
        id: id,
      },
    });

    return project;
  }

  async update(id: string, dto: Project) {
    const updatedProject = await this.prismaService.project.update({
      where: {
        id: id,
      },
      data: dto,
    });

    return updatedProject;
  }

  async remove(id: string) {
    const deletedProject = await this.prismaService.project.delete({
      where: {
        id: id,
      },
    });

    return deletedProject;
  }
}
