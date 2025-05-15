import { QuizRepository } from './quiz.repository';
import { CreateQuizDto } from './dto/create-quiz.dto';
import { UpdateQuizDto } from './dto/update-quiz.dto';
export declare class QuizService {
    private readonly quizRepository;
    constructor(quizRepository: QuizRepository);
    createQuiz(createQuizDto: CreateQuizDto): Promise<{
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
    }>;
    updateQuiz(id: string, updateQuizDto: UpdateQuizDto): Promise<{
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
