import { PrismaService } from '../../prisma/prisma.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createAnswer(data: CreateAnswerDto): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
    getAllAnswers(): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }[]>;
    getAnswerById(id: string): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    } | null>;
    updateAnswer(id: string, data: UpdateAnswerDto): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
    deleteAnswer(id: string): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
}
