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
exports.SubmissionController = void 0;
const common_1 = require("@nestjs/common");
const submission_service_1 = require("./submission.service");
const create_submission_dto_1 = require("./dto/create-submission.dto");
const swagger_1 = require("@nestjs/swagger");
let SubmissionController = class SubmissionController {
    submissionService;
    constructor(submissionService) {
        this.submissionService = submissionService;
    }
    async create(createSubmissionDto) {
        return this.submissionService.createSubmission(createSubmissionDto);
    }
    async getAll() {
        return this.submissionService.getAllSubmissions();
    }
    async getById(id) {
        return this.submissionService.getSubmissionById(id);
    }
    async getByUser(userId) {
        return this.submissionService.getSubmissionsByUser(userId);
    }
    async delete(id) {
        return this.submissionService.deleteSubmission(id);
    }
};
exports.SubmissionController = SubmissionController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Create a new submission' }),
    (0, swagger_1.ApiBody)({ type: create_submission_dto_1.CreateSubmissionDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'Submission created successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_submission_dto_1.CreateSubmissionDto]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all submissions' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of submissions' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submission by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Submission ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Submission found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Submission not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getById", null);
__decorate([
    (0, common_1.Get)('user/:userId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get submissions by user' }),
    (0, swagger_1.ApiParam)({ name: 'userId', required: true, description: 'User ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of submissions for a user' }),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "getByUser", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete a submission' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Submission ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Submission deleted successfully' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SubmissionController.prototype, "delete", null);
exports.SubmissionController = SubmissionController = __decorate([
    (0, common_1.Controller)('submissions'),
    (0, swagger_1.ApiTags)('Submissions'),
    __metadata("design:paramtypes", [submission_service_1.SubmissionService])
], SubmissionController);
//# sourceMappingURL=submission.controller.js.map