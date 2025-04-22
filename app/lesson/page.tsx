import { redirect } from "next/navigation";

import {getLesson, getUserProgress} from "@/db/queries";
import { Material } from "./material";

const LessonPage = async () => {
    const lessonData = getLesson();
    const UserProgressData = getUserProgress();

    const [
        lesson,
        userProgress,
    ] = await Promise.all([
        lessonData,
        UserProgressData,
    ])

    if (!lesson || !userProgress) {
        redirect("/learn");
    }

    const initialPercentage = lesson.materials.filter((material) => material.completed).length / lesson.materials.length * 100;

    return (
        <Material
            initialLessonId={lesson.id}
            initialLessonMaterials={lesson.materials}
            initialHearts={userProgress.hearts}
            initialPercentage={initialPercentage}
            userSubscription={null}
        />
    );
};

export default LessonPage;