import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('quizzes')
@ApiTags('Quizzes')
export class QuizController {
  constructor(private readonly quizService: QuizService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new quiz' })
  @ApiBody({ type: CreateQuizDto })
  @ApiResponse({ status: 201, description: 'Quiz created successfully' })
  async create(@Body() createQuizDto: CreateQuizDto) {
    return this.quizService.createQuiz(createQuizDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all quizzes' })
  @ApiResponse({ status: 200, description: 'List of quizzes' })
  async getAll() {
    return this.quizService.getAllQuizzes();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get quiz by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID' })
  @ApiResponse({ status: 200, description: 'Quiz found' })
  @ApiResponse({ status: 404, description: 'Quiz not found' })
  async getById(@Param('id') id: string) {
    return this.quizService.getQuizById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a quiz' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID to update' })
  @ApiBody({ type: UpdateQuizDto })
  @ApiResponse({ status: 200, description: 'Quiz updated successfully' })
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    return this.quizService.updateQuiz(id, updateQuizDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a quiz' })
  @ApiParam({ name: 'id', required: true, description: 'Quiz ID' })
  @ApiResponse({ status: 200, description: 'Quiz deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.quizService.deleteQuiz(id);
  }
}
