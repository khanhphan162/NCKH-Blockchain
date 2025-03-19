import { Injectable, NotFoundException } from '@nestjs/common';
import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';

@Injectable()
export class QuestionService {
  constructor(private readonly questionRepository: QuestionRepository) {}

  async createQuestion(createQuestionDto: CreateQuestionDto) {
    return this.questionRepository.createQuestion(createQuestionDto);
  }

  async getAllQuestions() {
    return this.questionRepository.getAllQuestions();
  }

  async getQuestionById(id: string) {
    const question = await this.questionRepository.getQuestionById(id);
    if (!question) {
      throw new NotFoundException(`Question with ID ${id} not found`);
    }
    return question;
  }

  async updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto) {
    await this.getQuestionById(id);
    return this.questionRepository.updateQuestion(id, updateQuestionDto);
  }

  async deleteQuestion(id: string) {
    await this.getQuestionById(id);
    return this.questionRepository.deleteQuestion(id);
  }
}
