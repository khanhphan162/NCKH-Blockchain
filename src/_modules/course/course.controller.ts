import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, UnauthorizedException } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../_modules/guard/jwt-auth.guard';
import { RoleGuard } from '../../_modules/guard/role.guard';
import { GetUser } from '../common/decorators/get-user.decorator';

@ApiTags('Courses')
@Controller('courses')
export class CourseController {
    constructor(private readonly courseService: CourseService) { }

    @Post()
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Create a new course (Only for INSTRUCTORS)' })
    async create(@Body() createCourseDto: CreateCourseDto, @GetUser() user) {

        if (!user || !user.userId) {
            throw new UnauthorizedException("User ID is missing in token");
        }

        return this.courseService.create(createCourseDto, user.userId);
    }

    @Get()
    @ApiOperation({ summary: 'Get all courses' })
    async findAll() {
        return this.courseService.findAll();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get course by ID' })
    async findOne(@Param('id') id: string) {
        return this.courseService.findOne(id);
    }

    @Patch(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Update course' })
    async update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
        return this.courseService.update(id, updateCourseDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard, RoleGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: 'Delete course' })
    async remove(@Param('id') id: string) {
        return this.courseService.remove(id);
    }
}
