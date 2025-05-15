import { LessonRepository } from './lesson.repository';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonService {
    private readonly lessonRepository;
    constructor(lessonRepository: LessonRepository);
    createLesson(createLessonDto: CreateLessonDto): Promise<{
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
    }>;
    updateLesson(id: string, updateLessonDto: UpdateLessonDto): Promise<{
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
