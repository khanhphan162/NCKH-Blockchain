"use client";

import { materialOptions, materials } from "@/db/schema";
import { useState } from "react";
import { Header } from "./header";

type Props={
    initialPercentage: number;
    initialHearts: number;
    initialLessonId: number;
    initialLessonMaterials: (typeof materials.$inferSelect & {
        completed: boolean;
        materialOptions: typeof materialOptions.$inferSelect[];
    })[];
    userSubscription: any; //TODO: Replace with subcription DB type
};

export const Quiz = ({
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonMaterials,
    userSubscription
}: Props) =>{
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentages] = useState(initialPercentage);
    const[materials] = useState(initialLessonMaterials);
    const[activeIndex, setActiveIndex] = useState(()=> {
        const uncompletedIndex = materials.findIndex((material) => !material.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });

    const material = materials[activeIndex];

    const label = material.label;

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
                            {label}
                            <iframe
                                src={url}
                                allow='autoplay; encrypted-media'
                                allowFullScreen
                                title='video'
                                />
                        </h1>
                        <div>
                            {/*TODO: Challenge Component */}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}