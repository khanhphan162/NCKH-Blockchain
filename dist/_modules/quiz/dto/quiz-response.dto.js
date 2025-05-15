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
exports.QuizResponseDto = void 0;
const swagger_1 = require("@nestjs/swagger");
class QuizResponseDto {
    id;
    title;
    courseId;
    createdAt;
}
exports.QuizResponseDto = QuizResponseDto;
__decorate([
    (0, swagger_1.ApiProperty)({ example: "quiz-uuid", description: "Quiz ID" }),
    __metadata("design:type", String)
], QuizResponseDto.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "Quiz 1", description: "Title of the quiz" }),
    __metadata("design:type", String)
], QuizResponseDto.prototype, "title", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "course-uuid", description: "Course ID associated with the quiz" }),
    __metadata("design:type", String)
], QuizResponseDto.prototype, "courseId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: "2024-03-01T12:00:00Z", description: "Quiz created date" }),
    __metadata("design:type", Date)
], QuizResponseDto.prototype, "createdAt", void 0);
//# sourceMappingURL=quiz-response.dto.js.map