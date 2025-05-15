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
exports.LessonRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LessonRepository = class LessonRepository {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLesson(data) {
        return this.prisma.lesson.create({ data });
    }
    async getAllLessons() {
        return this.prisma.lesson.findMany();
    }
    async getLessonById(id) {
        return this.prisma.lesson.findUnique({ where: { id } });
    }
    async updateLesson(id, data) {
        return this.prisma.lesson.update({ where: { id }, data });
    }
    async deleteLesson(id) {
        return this.prisma.lesson.delete({ where: { id } });
    }
};
exports.LessonRepository = LessonRepository;
exports.LessonRepository = LessonRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LessonRepository);
//# sourceMappingURL=lesson.repository.js.map