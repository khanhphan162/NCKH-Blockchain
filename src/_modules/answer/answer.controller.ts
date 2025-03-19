import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('answers')
@ApiTags('Answers')
export class AnswerController {
  constructor(private readonly answerService: AnswerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new answer' })
  @ApiBody({ type: CreateAnswerDto })
  @ApiResponse({ status: 201, description: 'Answer created successfully' })
  async create(@Body() createAnswerDto: CreateAnswerDto) {
    return this.answerService.createAnswer(createAnswerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all answers' })
  @ApiResponse({ status: 200, description: 'List of answers' })
  async getAll() {
    return this.answerService.getAllAnswers();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get answer by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Answer ID' })
  @ApiResponse({ status: 200, description: 'Answer found' })
  @ApiResponse({ status: 404, description: 'Answer not found' })
  async getById(@Param('id') id: string) {
    return this.answerService.getAnswerById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update an answer' })
  @ApiParam({ name: 'id', required: true, description: 'Answer ID to update' })
  @ApiBody({ type: UpdateAnswerDto })
  @ApiResponse({ status: 200, description: 'Answer updated successfully' })
  async update(@Param('id') id: string, @Body() updateAnswerDto: UpdateAnswerDto) {
    return this.answerService.updateAnswer(id, updateAnswerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an answer' })
  @ApiParam({ name: 'id', required: true, description: 'Answer ID' })
  @ApiResponse({ status: 200, description: 'Answer deleted successfully' })
  async delete(@Param('id') id: string) {
    return this.answerService.deleteAnswer(id);
  }
}
