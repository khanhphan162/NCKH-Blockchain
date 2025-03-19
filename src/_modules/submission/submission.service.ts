import { Injectable, NotFoundException } from '@nestjs/common';
import { SubmissionRepository } from './submission.repository';
import { CreateSubmissionDto } from './dto/create-submission.dto';

@Injectable()
export class SubmissionService {
  constructor(private readonly submissionRepository: SubmissionRepository) {}

  async createSubmission(createSubmissionDto: CreateSubmissionDto) {
    return this.submissionRepository.createSubmission(createSubmissionDto);
  }

  async getAllSubmissions() {
    return this.submissionRepository.getAllSubmissions();
  }

  async getSubmissionById(id: string) {
    const submission = await this.submissionRepository.getSubmissionById(id);
    if (!submission) {
      throw new NotFoundException(`Submission with ID ${id} not found`);
    }
    return submission;
  }

  async getSubmissionsByUser(userId: string) {
    return this.submissionRepository.getSubmissionsByUser(userId);
  }

  async deleteSubmission(id: string) {
    await this.getSubmissionById(id);
    return this.submissionRepository.deleteSubmission(id);
  }
}
