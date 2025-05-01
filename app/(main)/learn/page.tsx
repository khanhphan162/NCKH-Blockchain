import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/user-progress"
import { 
    getCourseProgress, 
    getLessonPercentage, 
    getModules, 
    getUserProgress 
} from "@/db/queries"
import { redirect } from "next/navigation"
import { Module } from "./module"
import { lessons, modules as modulesSchema} from "@/db/schema"
import { markCourseAsCompleted } from "@/actions/user-progress"

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const courseProgressData = getCourseProgress();
    const lessonPercentageData = getLessonPercentage();
    const modulesData = getModules();

    const [
        userProgress,
        modules,
        courseProgress,
        lessonPercentage,
    ] = await Promise.all([
        userProgressData,
        modulesData,
        courseProgressData,
        lessonPercentageData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
    }

    if (!courseProgress){
        redirect("/courses");
    }

    if (courseProgress.isCourseCompleted){
        markCourseAsCompleted();
    }

    return (
        <div className="flex flex-row-reverse gap-[48px] px-6">
            <StickyWrapper>
                <UserProgress
                    activeCourse={userProgress.activeCourse}
                    hearts={userProgress.hearts}
                    points={userProgress.points}
                    hasActiveSubscription={false}
                />
            </StickyWrapper>
            <FeedWrapper>
                <Header title={userProgress.activeCourse.title}/>
                {modules.map((module) => (
                    <div key = {module.id} className="mb-10">
                        <Module
                        id = {module.id}
                        order = {module.order}
                        title = {module.title}
                        description = {module.description}
                        lessons = {module.lessons}
                        activeLesson = {courseProgress.activeLesson as typeof lessons.$inferSelect & {
                            module: typeof modulesSchema.$inferSelect;
                        } | undefined}
                        activeLessonPercentage = {lessonPercentage}
                        />
                    </div>
                ))}
                {courseProgress.isCourseCompleted && (
                    <div className="text-center text-green-500 font-bold text-xl">
                        Congratulations! You have completed the course.
                    </div>
                )}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage