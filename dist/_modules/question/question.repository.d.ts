import { PrismaService } from '../../prisma/prisma.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createQuestion(data: CreateQuestionDto): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
    getAllQuestions(): Promise<{
        id: string;
        text: string;
        quizId: string;
    }[]>;
    getQuestionById(id: string): Promise<{
        id: string;
        text: string;
        quizId: string;
    } | null>;
    updateQuestion(id: string, data: UpdateQuestionDto): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
    deleteQuestion(id: string): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
}
