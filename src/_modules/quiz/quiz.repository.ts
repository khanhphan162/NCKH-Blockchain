import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createQuiz(data: CreateQuizDto) {
    return this.prisma.quiz.create({ data });
  }

  async getAllQuizzes() {
    return this.prisma.quiz.findMany();
  }

  async getQuizById(id: string) {
    return this.prisma.quiz.findUnique({ where: { id } });
  }

  async updateQuiz(id: string, data: UpdateQuizDto) {
    return this.prisma.quiz.update({ where: { id }, data });
  }

  async deleteQuiz(id: string) {
    return this.prisma.quiz.delete({ where: { id } });
  }
}
