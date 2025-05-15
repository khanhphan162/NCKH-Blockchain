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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswerController = void 0;
const common_1 = require("@nestjs/common");
const answer_service_1 = require("./answer.service");
const create_answer_dto_1 = require("./dto/create-answer.dto");
const update_answer_dto_1 = require("./dto/update-answer.dto");
const swagger_1 = require("@nestjs/swagger");
let AnswerController = class AnswerController {
    answerService;
    constructor(answerService) {
        this.answerService = answerService;
    }
    async create(createAnswerDto) {
        return this.answerService.createAnswer(createAnswerDto);
    }
    async getAll() {
        return this.answerService.getAllAnswers();
    }
    async getById(id) {
        return this.answerService.getAnswerById(id);
    }
    async update(id, updateAnswerDto) {
        return this.answerService.updateAnswer(id, updateAnswerDto);
    }
    async delete(id) {
        return this.answerService.deleteAnswer(id);
    }
};
exports.AnswerController = AnswerController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new answer' }),
    (0, swagger_1.ApiBody)({ type: create_answer_dto_1.CreateAnswerDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Answer created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_answer_dto_1.CreateAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all answers' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of answers' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get answer by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Answer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Answer found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Answer not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "getById", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Update an answer' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Answer ID to update' }),
    (0, swagger_1.ApiBody)({ type: update_answer_dto_1.UpdateAnswerDto }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Answer updated successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_answer_dto_1.UpdateAnswerDto]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an answer' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Answer ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Answer deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], AnswerController.prototype, "delete", null);
exports.AnswerController = AnswerController = __decorate([
    (0, common_1.Controller)('answers'),
    (0, swagger_1.ApiTags)('Answers'),
    __metadata("design:paramtypes", [answer_service_1.AnswerService])
], AnswerController);
//# sourceMappingURL=answer.controller.js.map