"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerService = void 0;
const common_1 = require("@nestjs/common");
const answer_repository_1 = require("./answer.repository");
let AnswerService = class AnswerService {
    answerRepository;
    constructor(answerRepository) {
        this.answerRepository = answerRepository;
    }
    async createAnswer(createAnswerDto) {
        return this.answerRepository.createAnswer(createAnswerDto);
    }
    async getAllAnswers() {
        return this.answerRepository.getAllAnswers();
    }
    async getAnswerById(id) {
        const answer = await this.answerRepository.getAnswerById(id);
        if (!answer) {
            throw new common_1.NotFoundException(`Answer with ID ${id} not found`);
        }
        return answer;
    }
    async updateAnswer(id, updateAnswerDto) {
        await this.getAnswerById(id);
        return this.answerRepository.updateAnswer(id, updateAnswerDto);
    }
    async deleteAnswer(id) {
        await this.getAnswerById(id);
        return this.answerRepository.deleteAnswer(id);
    }
};
exports.AnswerService = AnswerService;
exports.AnswerService = AnswerService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [answer_repository_1.AnswerRepository])
], AnswerService);
//# sourceMappingURL=answer.service.js.map