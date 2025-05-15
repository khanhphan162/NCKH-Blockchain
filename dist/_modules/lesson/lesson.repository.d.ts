import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLesson(data: CreateLessonDto): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAllLessons(): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getLessonById(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    } | null>;
    updateLesson(id: string, data: UpdateLessonDto): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
    deleteLesson(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
}
