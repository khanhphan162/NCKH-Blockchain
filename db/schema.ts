import { desc, relations } from "drizzle-orm";
import {boolean, integer, pgEnum, pgTable, serial, text} from "drizzle-orm/pg-core";

export const courses = pgTable("courses", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    imageSrc: text("image_src").notNull(),
});

export const coursesRelations = relations(courses, ({ many}) => ({
    userProgress: many(userProgress),
    modules: many(modules),
}));

export const modules = pgTable("modules", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(), // module 1
    description: text("description").notNull(), // Introduction to the course
    courseId: integer("course_id").references(() => courses.id,
    {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

export const modulesRelations = relations(modules, ({many, one}) => ({
    course: one(courses, {
        fields: [modules.courseId],
        references: [courses.id],
    }),
    lessons: many(lessons),
}));

export const lessons = pgTable("lessons", {
    id: serial("id").primaryKey(),
    title: text("title").notNull(),
    moduleId: integer("module_id").references(() => modules.id,
    {onDelete: "cascade"}).notNull(),
    order: integer("order").notNull(),
});

export const lessonsRelations = relations(lessons, ({one, many}) => ({
    module: one(modules, {
        fields: [lessons.moduleId],
        references: [modules.id],
    }),
    materials: many(materials),
}));
export const materialsEnum = pgEnum("type", ["VIDEO", "QUIZ", "ASSIGNMENT", "PROJECT"]);

export const materials = pgTable("materials", {
    id: serial("id").primaryKey(),
    lessonId: integer("lesson_id").references(() => lessons.id,
    {onDelete: "cascade"}).notNull(),
    type: materialsEnum("type").notNull(),
    label: text("label").notNull(),
    order: integer("order").notNull(),
});

export const materialsRelations = relations(materials, ({one, many}) => ({
    lesson: one(lessons, {
        fields: [materials.lessonId],
        references: [lessons.id],
    }),
    materialOptions: many(materialOptions),
    materialProgress: many(materialProgress),
}));

export const materialOptions = pgTable("material_options", {
    id: serial("id").primaryKey(),
    materialId: integer("lesson_id").references(() => materials.id,
    {onDelete: "cascade"}).notNull(),
    text: text("label").notNull(),
    correct: boolean("correct").notNull(),
    imageSrc: text("image_src"),
    audioSrc: text("audio_src"),
});

export const materialOptionsRelations = relations(materialOptions, ({one}) => ({
    material: one(materials, {
        fields: [materialOptions.materialId],
        references: [materials.id],
    }),
}));

export const materialProgress = pgTable("material_progress", {
    id: serial("id").primaryKey(),
    userId: text("user_id").notNull(), // TODO: Confirm this doesn't break
    materialId: integer("lesson_id").references(() => materials.id,
    {onDelete: "cascade"}).notNull(),
    completed: boolean("completed").notNull().default(false),
});

export const materialProgressRelations = relations(materialProgress, ({one}) => ({
    material: one(materials, {
        fields: [materialProgress.materialId],
        references: [materials.id],
    }),
}));

export const userProgress = pgTable("user_progress", {
    userId: text("user_id").primaryKey(),
    userName: text("user_name").notNull().default("User"),
    userImageSrc: text("user_image_src").notNull().default("/user.png"),
    activeCourseId: integer("active_course_id").references(() => courses.id,
    {onDelete: "cascade"}),
    hearts: integer("hearts").notNull().default(5),
    points: integer("points").notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one}) => ({
    activeCourse: one(courses, {
        fields: [userProgress.activeCourseId],
        references: [courses.id],
    }),
}));