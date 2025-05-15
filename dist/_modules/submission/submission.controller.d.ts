import { SubmissionService } from './submission.service';
import { CreateSubmissionDto } from './dto/create-submission.dto';
export declare class SubmissionController {
    private readonly submissionService;
    constructor(submissionService: SubmissionService);
    create(createSubmissionDto: CreateSubmissionDto): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }>;
    getAll(): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }>;
    getByUser(userId: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }[]>;
    delete(id: string): Promise<{
        id: string;
        userId: string;
        quizId: string;
        score: number;
        createdAt: Date;
    }>;
}
