import { QuestionRepository } from './question.repository';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionService {
    private readonly questionRepository;
    constructor(questionRepository: QuestionRepository);
    createQuestion(createQuestionDto: CreateQuestionDto): Promise<{
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
    }>;
    updateQuestion(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
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
