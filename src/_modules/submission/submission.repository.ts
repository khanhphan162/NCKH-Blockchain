import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createSubmission(data: CreateSubmissionDto) {
    return this.prisma.submission.create({ data });
  }

  async getAllSubmissions() {
    return this.prisma.submission.findMany();
  }

  async getSubmissionById(id: string) {
    return this.prisma.submission.findUnique({ where: { id } });
  }

  async getSubmissionsByUser(userId: string) {
    return this.prisma.submission.findMany({ where: { userId } });
  }

  async deleteSubmission(id: string) {
    return this.prisma.submission.delete({ where: { id } });
  }
}
