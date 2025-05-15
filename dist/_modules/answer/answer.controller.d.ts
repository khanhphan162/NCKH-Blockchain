import { AnswerService } from './answer.service';
import { CreateAnswerDto } from './dto/create-answer.dto';
import { UpdateAnswerDto } from './dto/update-answer.dto';
export declare class AnswerController {
    private readonly answerService;
    constructor(answerService: AnswerService);
    create(createAnswerDto: CreateAnswerDto): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
    getAll(): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }[]>;
    getById(id: string): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
    update(id: string, updateAnswerDto: UpdateAnswerDto): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        text: string;
        isCorrect: boolean;
        questionId: string;
    }>;
}
