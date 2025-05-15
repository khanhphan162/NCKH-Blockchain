import { QuestionService } from './question.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { UpdateQuestionDto } from './dto/update-question.dto';
export declare class QuestionController {
    private readonly questionService;
    constructor(questionService: QuestionService);
    create(createQuestionDto: CreateQuestionDto): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
    getAll(): Promise<{
        id: string;
        text: string;
        quizId: string;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
    update(id: string, updateQuestionDto: UpdateQuestionDto): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        text: string;
        quizId: string;
    }>;
}
