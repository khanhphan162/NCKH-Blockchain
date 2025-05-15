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
exports.LessonService = void 0;
const common_1 = require("@nestjs/common");
const lesson_repository_1 = require("./lesson.repository");
let LessonService = class LessonService {
    lessonRepository;
    constructor(lessonRepository) {
        this.lessonRepository = lessonRepository;
    }
    async createLesson(createLessonDto) {
        return this.lessonRepository.createLesson(createLessonDto);
    }
    async getAllLessons() {
        return this.lessonRepository.getAllLessons();
    }
    async getLessonById(id) {
        const lesson = await this.lessonRepository.getLessonById(id);
        if (!lesson) {
            throw new common_1.NotFoundException(`Lesson with ID ${id} not found`);
        }
        return lesson;
    }
    async updateLesson(id, updateLessonDto) {
        await this.getLessonById(id);
        return this.lessonRepository.updateLesson(id, updateLessonDto);
    }
    async deleteLesson(id) {
        await this.getLessonById(id);
        return this.lessonRepository.deleteLesson(id);
    }
};
exports.LessonService = LessonService;
exports.LessonService = LessonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [lesson_repository_1.LessonRepository])
], LessonService);
//# sourceMappingURL=lesson.service.js.map