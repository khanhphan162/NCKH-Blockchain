import { QuizService } from './quiz.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizController {
    private readonly quizService;
    constructor(quizService: QuizService);
    create(createQuizDto: CreateQuizDto): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAll(): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
    update(id: string, updateQuizDto: UpdateQuizDto): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
}
