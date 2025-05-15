import { AnswerRepository } from './answer.repository';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerService {
    private readonly answerRepository;
    constructor(answerRepository: AnswerRepository);
    createAnswer(createAnswerDto: CreateAnswerDto): Promise<{
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
    }>;
    updateAnswer(id: string, updateAnswerDto: UpdateAnswerDto): Promise<{
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
