import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createQuiz(data: CreateQuizDto): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
    getAllQuizzes(): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }[]>;
    getQuizById(id: string): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    } | null>;
    updateQuiz(id: string, data: UpdateQuizDto): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
    deleteQuiz(id: string): Promise<{
        id: string;
        title: string;
        courseId: string;
        createdAt: Date;
    }>;
}
