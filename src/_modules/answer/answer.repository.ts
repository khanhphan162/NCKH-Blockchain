import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createAnswer(data: CreateAnswerDto) {
    return this.prisma.answer.create({ data });
  }

  async getAllAnswers() {
    return this.prisma.answer.findMany();
  }

  async getAnswerById(id: string) {
    return this.prisma.answer.findUnique({ where: { id } });
  }

  async updateAnswer(id: string, data: UpdateAnswerDto) {
    return this.prisma.answer.update({ where: { id }, data });
  }

  async deleteAnswer(id: string) {
    return this.prisma.answer.delete({ where: { id } });
  }
}
