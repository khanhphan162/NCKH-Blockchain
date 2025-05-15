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
exports.EnrollmentController = void 0;
const common_1 = require("@nestjs/common");
const enrollment_service_1 = require("./enrollment.service");
const create_enrollment_dto_1 = require("./dto/create-enrollment.dto");
const swagger_1 = require("@nestjs/swagger");
let EnrollmentController = class EnrollmentController {
    enrollmentService;
    constructor(enrollmentService) {
        this.enrollmentService = enrollmentService;
    }
    async create(createEnrollmentDto) {
        return this.enrollmentService.createEnrollment(createEnrollmentDto);
    }
    async getAll() {
        return this.enrollmentService.getAllEnrollments();
    }
    async getById(id) {
        return this.enrollmentService.getEnrollmentById(id);
    }
    async delete(id) {
        return this.enrollmentService.deleteEnrollment(id);
    }
};
exports.EnrollmentController = EnrollmentController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: 'Enroll a user in a course' }),
    (0, swagger_1.ApiBody)({ type: create_enrollment_dto_1.CreateEnrollmentDto }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'User enrolled successfully' }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_enrollment_dto_1.CreateEnrollmentDto]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: 'Get all enrollments' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'List of enrollments' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Get enrollment by ID' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Enrollment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment found' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "getById", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, swagger_1.ApiOperation)({ summary: 'Delete an enrollment' }),
    (0, swagger_1.ApiParam)({ name: 'id', required: true, description: 'Enrollment ID' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Enrollment deleted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Enrollment not found' }),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], EnrollmentController.prototype, "delete", null);
exports.EnrollmentController = EnrollmentController = __decorate([
    (0, common_1.Controller)('enrollments'),
    (0, swagger_1.ApiTags)('Enrollments'),
    __metadata("design:paramtypes", [enrollment_service_1.EnrollmentService])
], EnrollmentController);
//# sourceMappingURL=enrollment.controller.js.map