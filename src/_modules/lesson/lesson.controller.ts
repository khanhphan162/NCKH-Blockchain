import { Controller, Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';

@Controller('lessons')
@ApiTags('Lessons')
export class LessonController {
  constructor(private readonly lessonService: LessonService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new lesson' })
  @ApiBody({ type: CreateLessonDto })
  @ApiResponse({ status: 201, description: 'Lesson created successfully' })
  async create(@Body() createLessonDto: CreateLessonDto) {
    return this.lessonService.createLesson(createLessonDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all lessons' })
  @ApiResponse({ status: 200, description: 'List of lessons' })
  async getAll() {
    return this.lessonService.getAllLessons();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get lesson by ID' })
  @ApiParam({ name: 'id', required: true, description: 'Lesson ID' })
  @ApiResponse({ status: 200, description: 'Lesson found' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async getById(@Param('id') id: string) {
    return this.lessonService.getLessonById(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a lesson' })
  @ApiParam({ name: 'id', required: true, description: 'Lesson ID' })
  @ApiBody({ type: UpdateLessonDto })
  @ApiResponse({ status: 200, description: 'Lesson updated successfully' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async update(@Param('id') id: string, @Body() updateLessonDto: UpdateLessonDto) {
    return this.lessonService.updateLesson(id, updateLessonDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a lesson' })
  @ApiParam({ name: 'id', required: true, description: 'Lesson ID' })
  @ApiResponse({ status: 200, description: 'Lesson deleted successfully' })
  @ApiResponse({ status: 404, description: 'Lesson not found' })
  async delete(@Param('id') id: string) {
    return this.lessonService.deleteLesson(id);
  }
}
