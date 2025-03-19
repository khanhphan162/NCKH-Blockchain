import { Injectable, NotFoundException } from '@nestjs/common';
import { QuizRepository } from './quiz.repository';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';

@Injectable()
export class QuizService {
  constructor(private readonly quizRepository: QuizRepository) {}

  async createQuiz(createQuizDto: CreateQuizDto) {
    return this.quizRepository.createQuiz(createQuizDto);
  }

  async getAllQuizzes() {
    return this.quizRepository.getAllQuizzes();
  }

  async getQuizById(id: string) {
    const quiz = await this.quizRepository.getQuizById(id);
    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }
    return quiz;
  }

  async updateQuiz(id: string, updateQuizDto: UpdateQuizDto) {
    await this.getQuizById(id);
    return this.quizRepository.updateQuiz(id, updateQuizDto);
  }

  async deleteQuiz(id: string) {
    await this.getQuizById(id);
    return this.quizRepository.deleteQuiz(id);
  }
}
