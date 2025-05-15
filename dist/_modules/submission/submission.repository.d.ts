import { PrismaService } from '../../prisma/prisma.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
export declare class SubmissionRepository {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createSubmission(data: CreateSubmissionDto): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }>;
    getAllSubmissions(): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }[]>;
    getSubmissionById(id: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    } | null>;
    getSubmissionsByUser(userId: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }[]>;
    deleteSubmission(id: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }>;
}
