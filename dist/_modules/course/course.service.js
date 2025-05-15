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
exports.CourseService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CourseService = class CourseService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createCourseDto, instructorId) {
        const instructor = await this.prisma.user.findUnique({
            where: { id: instructorId },
        });
        if (!instructor) {
            throw new common_1.NotFoundException('Instructor not found');
        }
        if (instructor.role !== 'INSTRUCTOR') {
            throw new common_1.ForbiddenException('Only INSTRUCTORS can create courses');
        }
        return this.prisma.course.create({
            data: {
                title: createCourseDto.title,
                description: createCourseDto.description,
                instructor: { connect: { id: instructorId } },
            },
        });
    }
    async findAll() {
        return this.prisma.course.findMany({
            include: { instructor: true, lessons: true, quizzes: true },
        });
    }
    async findOne(id) {
        const course = await this.prisma.course.findUnique({
            where: { id },
            include: { instructor: true, lessons: true, quizzes: true },
        });
        if (!course)
            throw new common_1.NotFoundException('Course not found');
        return course;
    }
    async update(id, updateCourseDto) {
        return this.prisma.course.update({
            where: { id },
            data: updateCourseDto,
        });
    }
    async remove(id) {
        return this.prisma.course.delete({ where: { id } });
    }
};
exports.CourseService = CourseService;
exports.CourseService = CourseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseService);
//# sourceMappingURL=course.service.js.map