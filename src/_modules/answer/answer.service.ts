import { Injectable, NotFoundException } from '@nestjs/common';
import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';

@Injectable()
export class AnswerService {
  constructor(private readonly answerRepository: AnswerRepository) {}

  async createAnswer(createAnswerDto: CreateAnswerDto) {
    return this.answerRepository.createAnswer(createAnswerDto);
  }

  async getAllAnswers() {
    return this.answerRepository.getAllAnswers();
  }

  async getAnswerById(id: string) {
    const answer = await this.answerRepository.getAnswerById(id);
    if (!answer) {
      throw new NotFoundException(`Answer with ID ${id} not found`);
    }
    return answer;
  }

  async updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto) {
    await this.getAnswerById(id);
    return this.answerRepository.updateAnswer(id, updateAnswerDto);
  }

  async deleteAnswer(id: string) {
    await this.getAnswerById(id);
    return this.answerRepository.deleteAnswer(id);
  }
}
