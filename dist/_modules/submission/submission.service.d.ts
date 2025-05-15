import { SubmissionRepository } from './submission.repository';
import { CreateSubmissionDto } from './dto/create-submission.dto';
export declare class SubmissionService {
    private readonly submissionRepository;
    constructor(submissionRepository: SubmissionRepository);
    createSubmission(createSubmissionDto: CreateSubmissionDto): Promise<{
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
    }>;
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
