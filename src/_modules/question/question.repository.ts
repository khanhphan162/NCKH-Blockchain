import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuestion(data: CreateQuestionDto) {
    return this.prisma.question.create({ data });
  }

  async getAllQuestions() {
    return this.prisma.question.findMany();
  }

  async getQuestionById(id: string) {
    return this.prisma.question.findUnique({ where: { id } });
  }

  async updateQuestion(id: string, data: UpdateQuestionDto) {
    return this.prisma.question.update({ where: { id }, data });
  }

  async deleteQuestion(id: string) {
    return this.prisma.question.delete({ where: { id } });
  }
}
