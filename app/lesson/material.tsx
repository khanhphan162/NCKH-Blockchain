"use client";

import { questions, answers, materials } from "@/db/schema";
import { useState, useTransition } from "react";
import { Header } from "./header";
import { Question } from "./question";
import Image from "next/image";
import { Footer } from "./footer";
import { upsertMaterialProgress } from "@/actions/material-progress";
import { toast } from "sonner";

type Props = {
    title: string;
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
    title,
    initialPercentage,
    initialHearts,
    initialLessonId,
    initialLessonMaterials,
    userSubscription
}: Props) => {
    const [pending, startTransition] = useTransition();

    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(initialPercentage);
    const [materials] = useState(initialLessonMaterials);
    const [activeIndex, setActiveIndex] = useState(() => {
        const uncompletedIndex = materials.findIndex((material) => !material.completed);
        return uncompletedIndex === -1 ? 0 : uncompletedIndex;
    });
    const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">("none");

    const material = materials[activeIndex];
    const questions = material?.questions ?? [];
    const hasQuestions = questions.length > 0;

    const onNext = () => {
        material.completed = true;
        startTransition(() => {
            upsertMaterialProgress(material.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        console.error("Missing hearts");
                        return;
                    }

                    setStatus("correct");
                    setPercentage((prev) => prev + 100 / materials.length);

                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }


                    if (activeIndex < materials.length - 1) {
                        setActiveIndex((current) => current + 1);
                    } else {
                        window.location.href = "/learn";
                    }
                })
                .catch(() => toast.error("Something when wrong. Please try again"))
        })

    }
    const onComplete = () => {
        if (!hasQuestions) {
            onNext();
            return;
        }
    }
    const renderMaterialContent = () => {
        switch (material.type) {
            case "READING":
                return (
                    <div className="prose max-w-full">
                        <div dangerouslySetInnerHTML={{ __html: material.content }} />
                    </div>
                );
            case "VIDEO":
                return (
                    <div className="w-full aspect-video mb-4">
                        {material.videoSrc && (
                            <iframe
                                src={material.videoSrc}
                                className="w-full h-full rounded-lg"
                                allow="autoplay; encrypted-media"
                                allowFullScreen
                                title="video"
                            />
                        )}
                    </div>
                );
            case "PROJECT":
                return (
                    <div className="prose max-w-full">
                        <div dangerouslySetInnerHTML={{ __html: material.content }} />
                        {material.imageSrc && (
                            <div className="my-4">
                                <Image
                                    src={material.imageSrc}
                                    alt="Project illustration"
                                    width={600}
                                    height={400}
                                    className="rounded-lg"
                                />
                            </div>
                        )}
                    </div>
                );
            default:
                return <p>{material.content}</p>;
        }
    };

    return (
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
                            {title}
                        </h1>
                        <div className="w-full">
                            {renderMaterialContent()}
                        </div>

                        {hasQuestions && (
                            <Question
                                questions={questions}
                                disabled={pending}
                                type={material.type}
                                onNext={onNext}
                            />
                        )}
                        {!hasQuestions && (
                            <Footer
                                disabled={pending}
                                status="none"
                                onCheck={onComplete}
                                lessonId={true}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}