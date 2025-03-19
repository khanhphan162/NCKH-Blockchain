import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createLesson(data: CreateLessonDto) {
    return this.prisma.lesson.create({ data });
  }

  async getAllLessons() {
    return this.prisma.lesson.findMany();
  }

  async getLessonById(id: string) {
    return this.prisma.lesson.findUnique({ where: { id } });
  }

  async updateLesson(id: string, data: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data });
  }

  async deleteLesson(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
