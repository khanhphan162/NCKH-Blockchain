import { Injectable, NotFoundException } from '@nestjs/common';
import { LessonRepository } from './lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonService {
  constructor(private readonly lessonRepository: LessonRepository) {}

  async createLesson(createLessonDto: CreateLessonDto) {
    return this.lessonRepository.createLesson(createLessonDto);
  }

  async getAllLessons() {
    return this.lessonRepository.getAllLessons();
  }

  async getLessonById(id: string) {
    const lesson = await this.lessonRepository.getLessonById(id);
    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${id} not found`);
    }
    return lesson;
  }

  async updateLesson(id: string, updateLessonDto: UpdateLessonDto) {
    await this.getLessonById(id); 
    return this.lessonRepository.updateLesson(id, updateLessonDto);
  }

  async deleteLesson(id: string) {
    await this.getLessonById(id);
    return this.lessonRepository.deleteLesson(id);
  }
}
