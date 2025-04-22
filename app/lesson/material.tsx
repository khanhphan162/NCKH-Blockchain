"use client";

import { questions, answers, materials } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { ContentBubble } from "./content-bubble";
import { Question } from "./question";

type Props={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonMaterials: (typeof materials.$inferSelect & {
        completed: boolean;
        questions: (typeof questions.$inferSelect & {
            answers: typeof answers.$inferSelect[];
        })[];
    })[];
    userSubscription: any; //TODO: Replace with subcription DB type
};

export const Material = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonMaterials,
    userSubscription
}: Props) =>{
    const [pending, startTransition] = useTransition();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentages] = useState(initialPercentage);
    const[materials] = useState(initialLessonMaterials);
    const[activeIndex, setActiveIndex] = useState(()=> {
        const uncompletedIndex = materials.findIndex((material) => !material.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const material = materials[activeIndex];
    const questions = material?.questions ?? [];

    const onNext = () => {
        const updatedMaterials = [...materials];
        updatedMaterials[activeIndex].completed = true;
        
        const completedCount = updatedMaterials.filter(material => material.completed).length;
        const newPercentage = (completedCount / updatedMaterials.length) * 100;
        setPercentages(newPercentage);
        
        if (activeIndex < materials.length - 1) {
            setActiveIndex((current) => current + 1);
        } else {
            window.location.href = "/learn";
        }
    }

    const content = material.type === "ASSIGNMENT" ? "Complete the assignment" : material.content;

    const url = material.videoSrc!;

    return(
        <>
            <Header
                hearts={hearts}
                percentage={percentage}
                hasActiveSubscription={!!userSubscription?.isActive}
            />
            <div className="flex-1">
                <div className="h-full flex items-center justify-center">
                    <div className="lg:min-h-[350px] lg:w-[600px] w-full px-6 lg:px-0 flex flex-col gap-y-12">
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {content}
                        </h1>
                        <div>
                            {material.type === "ASSIGNMENT" && (
                                <ContentBubble content={material.content} />
                            )}
                            <Question
                                questions={questions}
                                disabled={false}
                                type={material.type}
                                onNext={onNext}
                            />
                            {/* {                            
                            <iframe
                                src={url}
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='video'
                                />
                            } */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}