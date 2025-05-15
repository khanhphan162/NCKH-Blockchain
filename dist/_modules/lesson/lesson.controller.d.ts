import { LessonService } from './lesson.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';
export declare class LessonController {
    private readonly lessonService;
    constructor(lessonService: LessonService);
    create(createLessonDto: CreateLessonDto): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAll(): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
    update(id: string, updateLessonDto: UpdateLessonDto): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        content: string;
        courseId: string;
        createdAt: Date;
    }>;
}
