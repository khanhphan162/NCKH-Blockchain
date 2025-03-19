import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('questions')
@ApiTags('Questions')
export class QuestionController {
  constructor(private readonly questionService: QuestionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new question' })
  @ApiBody({ type: CreateQuestionDto })
  @ApiResponse({ status: 201, description: 'Question created successfully' })
  async create(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionService.createQuestion(createQuestionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all questions' })
  @ApiResponse({ status: 200, description: 'List of questions' })
  async getAll() {
    return this.questionService.getAllQuestions();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get question by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question found' })
  @ApiResponse({ status: 404, description: 'Question not found' })
  async getById(@Param('id') id: string) {
    return this.questionService.getQuestionById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a question' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID to update' })
  @ApiBody({ type: UpdateQuestionDto })
  @ApiResponse({ status: 200, description: 'Question updated successfully' })
  async update(@Param('id') id: string, @Body() updateQuestionDto: UpdateQuestionDto) {
    return this.questionService.updateQuestion(id, updateQuestionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a question' })
  @ApiParam({ name: 'id', required: true, description: 'Question ID' })
  @ApiResponse({ status: 200, description: 'Question deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.questionService.deleteQuestion(id);
  }
}
