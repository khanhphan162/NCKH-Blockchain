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
exports.SubmissionService = void 0;
const common_1 = require("@nestjs/common");
const submission_repository_1 = require("./submission.repository");
let SubmissionService = class SubmissionService {
    submissionRepository;
    constructor(submissionRepository) {
        this.submissionRepository = submissionRepository;
    }
    async createSubmission(createSubmissionDto) {
        return this.submissionRepository.createSubmission(createSubmissionDto);
    }
    async getAllSubmissions() {
        return this.submissionRepository.getAllSubmissions();
    }
    async getSubmissionById(id) {
        const submission = await this.submissionRepository.getSubmissionById(id);
        if (!submission) {
            throw new common_1.NotFoundException(`Submission with ID ${id} not found`);
        }
        return submission;
    }
    async getSubmissionsByUser(userId) {
        return this.submissionRepository.getSubmissionsByUser(userId);
    }
    async deleteSubmission(id) {
        await this.getSubmissionById(id);
        return this.submissionRepository.deleteSubmission(id);
    }
};
exports.SubmissionService = SubmissionService;
exports.SubmissionService = SubmissionService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [submission_repository_1.SubmissionRepository])
], SubmissionService);
//# sourceMappingURL=submission.service.js.map