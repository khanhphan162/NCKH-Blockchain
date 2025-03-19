import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { EnrollmentService } from './enrollment.service';
import { CreateEnrollmentDto } from './dto/create-enrollment.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBody, ApiParam } from '@nestjs/swagger';

@Controller('enrollments')
@ApiTags('Enrollments')
export class EnrollmentController {
    constructor(private readonly enrollmentService: EnrollmentService) { }

    @Post()
    @ApiOperation({ summary: 'Enroll a user in a course' })
    @ApiBody({ type: CreateEnrollmentDto })
    @ApiResponse({ status: 201, description: 'User enrolled successfully' })
    async create(@Body() createEnrollmentDto: CreateEnrollmentDto) {
        return this.enrollmentService.createEnrollment(createEnrollmentDto);
    }

    @Get()
    @ApiOperation({ summary: 'Get all enrollments' })
    @ApiResponse({ status: 200, description: 'List of enrollments' })
    async getAll() {
        return this.enrollmentService.getAllEnrollments();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get enrollment by ID' })
    @ApiParam({ name: 'id', required: true, description: 'Enrollment ID' })
    @ApiResponse({ status: 200, description: 'Enrollment found' })
    @ApiResponse({ status: 404, description: 'Enrollment not found' })
    async getById(@Param('id') id: string) {
        return this.enrollmentService.getEnrollmentById(id);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Delete an enrollment' })
    @ApiParam({ name: 'id', required: true, description: 'Enrollment ID' })
    @ApiResponse({ status: 200, description: 'Enrollment deleted successfully' })
    @ApiResponse({ status: 404, description: 'Enrollment not found' })
    async delete(@Param('id') id: string) {
        return this.enrollmentService.deleteEnrollment(id);
    }
}
