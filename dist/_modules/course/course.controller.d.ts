import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
export declare class CourseController {
    private readonly courseService;
    constructor(courseService: CourseService);
    create(createCourseDto: CreateCourseDto, user: any): Promise<{
        id: string;
        title: string;
        description: string;
        instructorId: string;
        createdAt: Date;
    }>;
    findAll(): Promise<({
        instructor: {
            id: string;
            createdAt: Date;
            email: string;
            name: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            passwordChangedAt: Date | null;
            updatedAt: Date;
        };
        lessons: {
            id: string;
            title: string;
            createdAt: Date;
            content: string;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            title: string;
            createdAt: Date;
            courseId: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string;
        instructorId: string;
        createdAt: Date;
    })[]>;
    findOne(id: string): Promise<{
        instructor: {
            id: string;
            createdAt: Date;
            email: string;
            name: string;
            password: string;
            role: import("@prisma/client").$Enums.Role;
            passwordChangedAt: Date | null;
            updatedAt: Date;
        };
        lessons: {
            id: string;
            title: string;
            createdAt: Date;
            content: string;
            courseId: string;
        }[];
        quizzes: {
            id: string;
            title: string;
            createdAt: Date;
            courseId: string;
        }[];
    } & {
        id: string;
        title: string;
        description: string;
        instructorId: string;
        createdAt: Date;
    }>;
    update(id: string, updateCourseDto: UpdateCourseDto): Promise<{
        id: string;
        title: string;
        description: string;
        instructorId: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        description: string;
        instructorId: string;
        createdAt: Date;
    }>;
}
