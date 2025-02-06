import { lessons, modules } from "@/db/schema";
import { ModuleBanner } from "./module-banner";
import { LessonButton } from "./lesson-button";

type Props = {
    id: number;
    order: number;
    title: string;
    description: string;
    lessons: (typeof lessons.$inferSelect & {
        completed: boolean;
    })[];
    activeLesson: typeof lessons.$inferSelect & {
        module: typeof modules.$inferSelect;
    } | undefined;
    activeLessonPercentage: number;
}

export const Module = ({
    id,
    order,
    title,
    description,
    lessons,
    activeLesson,
    activeLessonPercentage,
}: Props) => {

    return(
        <>
        <ModuleBanner title={title} description={description} />
        <div className="flex items-center flex-col relative">
            {lessons.map((lesson, index) => {
                const isCurrent = lesson.id === activeLesson?.id;
                const isLocked = !lesson.completed && !isCurrent;

                return (
                    <LessonButton 
                    key = {lesson.id}
                    id = {lesson.id}
                    index = {index}
                    totalCount={lessons.length - 1}
                    current={isCurrent}
                    locked={isLocked}
                    percentage={activeLessonPercentage}/>
                )
            })}
        </div>
        </>
    )
}