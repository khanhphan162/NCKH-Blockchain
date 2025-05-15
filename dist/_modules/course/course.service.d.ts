import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(createCourseDto: CreateCourseDto, instructorId: string): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        instructorId: string;
    }>;
    findAll(): Promise<({
        instructor: {
            name: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            passwordChangedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        lessons: {
            title: string;
            id: string;
            createdAt: Date;
            content: string;
            courseId: string;
        }[];
        quizzes: {
            title: string;
            id: string;
            createdAt: Date;
            courseId: string;
        }[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        instructorId: string;
    })[]>;
    findOne(id: string): Promise<{
        instructor: {
            name: string;
            email: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            id: string;
            passwordChangedAt: Date | null;
            createdAt: Date;
            updatedAt: Date;
        };
        lessons: {
            title: string;
            id: string;
            createdAt: Date;
            content: string;
            courseId: string;
        }[];
        quizzes: {
            title: string;
            id: string;
            createdAt: Date;
            courseId: string;
        }[];
    } & {
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        instructorId: string;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        instructorId: string;
    }>;
    remove(id: string): Promise<{
        description: string;
        title: string;
        id: string;
        createdAt: Date;
        instructorId: string;
    }>;
}
