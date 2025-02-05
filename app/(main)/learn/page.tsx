import { FeedWrapper } from "@/components/feed-wrapper"
import { StickyWrapper } from "@/components/sticky-wrapper"
import { Header } from "./header"
import { UserProgress } from "@/components/user-progress"
import { getModules, getUserProgress } from "@/db/queries"
import { redirect } from "next/navigation"
import { Unit } from "./unit"

const LearnPage = async () => {
    const userProgressData = getUserProgress();
    const modulesData = getModules();

    const [
        userProgress,
        modules,
    ] = await Promise.all([
        userProgressData,
        modulesData,
    ]);

    if (!userProgress || !userProgress.activeCourse) {
        redirect("/courses");
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
                        <Unit
                        id = {module.id}
                        order = {module.order}
                        title = {module.title}
                        description = {module.description}
                        lessons = {module.lessons}
                        activeLesson = {undefined}
                        activeLessonPercentage = {0}
                        />
                    </div>
                ))}
            </FeedWrapper>
        </div>
    )
}

export default LearnPage