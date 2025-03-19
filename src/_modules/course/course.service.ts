import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto, instructorId: string) {
   
    const instructor = await this.prisma.user.findUnique({
      where: { id: instructorId },
    });

    if (!instructor) {
      throw new NotFoundException('Instructor not found');
    }

    if (instructor.role !== 'INSTRUCTOR') {
      throw new ForbiddenException('Only INSTRUCTORS can create courses');
    }

    return this.prisma.course.create({
      data: {
        title: createCourseDto.title,
        description: createCourseDto.description,
        instructor: { connect: { id: instructorId } }, 
      },
    });
  }

  async findAll() {
    return this.prisma.course.findMany({
      include: { instructor: true, lessons: true, quizzes: true },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: { instructor: true, lessons: true, quizzes: true },
    });

    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, updateCourseDto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string) {
    return this.prisma.course.delete({ where: { id } });
  }
}
