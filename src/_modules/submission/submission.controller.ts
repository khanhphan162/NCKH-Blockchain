import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('submissions')
@ApiTags('Submissions')
export class SubmissionController {
  constructor(private readonly submissionService: SubmissionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new submission' })
  @ApiBody({ type: CreateSubmissionDto })
  @ApiResponse({ status: 201, description: 'Submission created successfully' })
  async create(@Body() createSubmissionDto: CreateSubmissionDto) {
    return this.submissionService.createSubmission(createSubmissionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all submissions' })
  @ApiResponse({ status: 200, description: 'List of submissions' })
  async getAll() {
    return this.submissionService.getAllSubmissions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get submission by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Submission ID' })
  @ApiResponse({ status: 200, description: 'Submission found' })
  @ApiResponse({ status: 404, description: 'Submission not found' })
  async getById(@Param('id') id: string) {
    return this.submissionService.getSubmissionById(id);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Get submissions by user' })
  @ApiParam({ name: 'userId', required: true, description: 'User ID' })
  @ApiResponse({ status: 200, description: 'List of submissions for a user' })
  async getByUser(@Param('userId') userId: string) {
    return this.submissionService.getSubmissionsByUser(userId);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a submission' })
  @ApiParam({ name: 'id', required: true, description: 'Submission ID' })
  @ApiResponse({ status: 200, description: 'Submission deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.submissionService.deleteSubmission(id);
  }
}
