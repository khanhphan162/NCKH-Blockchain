"use client";

import { Header } from "./header";
import { Footer } from "./footer";
import { Question } from "./question";
import { ResultCard } from "./result-card";

import { reduceHearts } from "@/actions/user-progress";
import { questions, answers, materials } from "@/db/schema";
import { upsertMaterialProgress } from "@/actions/material-progress";
import { useHeartsModal } from "@/store/use-hearts-modal";
import { usePracticeModal } from "@/store/use-practice-modal";

import {useAudio, useWindowSize, useMount } from "react-use";
import Confetti from "react-confetti";
import Image from "next/image";
import { toast } from "sonner";
import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

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
    const {open : openHeartsModal } = useHeartsModal();
    const {open : openPracticeModal } = usePracticeModal();

    useMount(()=>{
        if (initialPercentage === 100){
            openPracticeModal();
        }
    })

    const {width, height} = useWindowSize();

    const router = useRouter();

    const [finishAudio] = useAudio({src: "/finish.mp3", autoPlay: true });

    const [pending, startTransition] = useTransition();

    const [lessonId] = useState(initialLessonId);
    const [hearts, setHearts] = useState(initialHearts);
    const [percentage, setPercentage] = useState(() => {
        return initialPercentage === 100 ? 0 : initialPercentage;
    });
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
                        openHeartsModal();
                        return;
                    }

                    setPercentage((prev) => prev + 100 / materials.length);
                    setActiveIndex((current) => current + 1);
                    if (initialPercentage === 100) {
                        setHearts((prev) => Math.min(prev + 1, 5));
                    }
                })
                .catch(() => toast.error("Something when wrong. Please try again"))
        })
    }

    const onWrongAnswer = () => {
        startTransition(() => {
            reduceHearts(material.id)
                .then((response) => {
                    if (response?.error === "hearts") {
                        openHeartsModal();
                        return;
                    }

                    setStatus("wrong");

                    if (hearts === 0){
                        openHeartsModal();
                        return;
                    }

                    if (!response?.error) {
                        setHearts((prev) => Math.max(prev - 1, 0));
                    }
                })
                .catch(() => toast.error("Something went wrong. Please try again."))
        })
    }
    
    const onComplete = () => {
        if (!hasQuestions) {
            onNext();
            return;
        }
    }
    
    if (!material){
        return(
            <>
                {finishAudio}
                <Confetti
                    width={width}
                    height={height}
                    recycle={false}
                    numberOfPieces={500}
                    tweenDuration={10000}
                />
                <div className="flex flex-col gap-y-4 lg:gap-y-8 max-w-lg mx-auto text-center items-center justify-center h-full">
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="hidden lg:block"
                        height={100}
                        width={100}
                    />
                    <Image
                        src="/finish.svg"
                        alt="Finish"
                        className="block lg:hidden"
                        height={50}
                        width={50}
                    />
                    <h1 className="text-xl lg:text-3xl font-bold text-neutral-700">
                        Congratulations!<br/>You&apos;ve completed the lesson.
                    </h1>
                    <div className="flex items-center gap-x-4 w-full">
                        <ResultCard
                            variant="points"
                            value={materials.length * 10}
                        />
                        <ResultCard
                            variant="hearts"
                            value={hearts}
                        />
                    </div>
                </div>
                <Footer
                    disabled={pending}
                    status="completed"
                    onCheck={() => router.push("/learn")}
                    lessonId={lessonId}
                />
            </>
        )
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
                                onWrongAnswer={onWrongAnswer}
                                lessonId={lessonId}
                            />
                        )}
                        {!hasQuestions && (
                            <Footer
                                disabled={pending}
                                status="none"
                                onCheck={onComplete}
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    )
}