import { answers, materials, questions } from "@/db/schema"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Answer } from "./answer";
import { Footer } from "./footer";
import { useAudio } from "react-use";

type Props = {
    questions: (typeof questions.$inferSelect & {
        answers: typeof answers.$inferSelect[];
    })[];
    disabled?: boolean;
    type: typeof materials.$inferSelect["type"];
    onNext?: () => void;
    onWrongAnswer?: () => void;
    lessonId?: number;
}

export const Question = ({
    questions,
    disabled,
    type,
    onNext,
    onWrongAnswer,
    lessonId,
}: Props) => {
    const [correctAudio, _c, correctControls] = useAudio({ src: "/correct.wav" });
    const [incorrectAudio, _i, incorrectControls] = useAudio({ src: "/incorrect.wav" });

    const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
    const [status, setStatus] = useState<"correct" | "wrong" | "none" | "completed">("none");
    const [score, setScore] = useState(0);
    const totalQuestions = questions.length;
    const passingScore = 80;

    const onSelect = (questionId: number, answerId: number) => {
        if (status !== "none") return;

        setSelectedAnswers(prev => ({
            ...prev,
            [questionId]: answerId
        }));
    }

    const calculateScore = () => {
        let correctCount = 0;

        questions.forEach(question => {
            const selectedAnswerId = selectedAnswers[question.id];
            if (!selectedAnswerId) return;

            const correctAnswer = question.answers.find(answer => answer.correct);
            if (correctAnswer && correctAnswer.id === selectedAnswerId) {
                correctCount++;
            }
        });

        const percentage = (correctCount / totalQuestions) * 100;
        return Math.round(percentage);
    }

    const onComplete = () => {
        if (status !== "none") {
            if (status === "wrong") {
                setStatus("none");
                setSelectedAnswers({});
                return;
            }

            if (status === "correct") {
                onNext && onNext();
                setStatus("none");
                setSelectedAnswers({});
                return;
            }
        }

        const calculatedScore = calculateScore();
        setScore(calculatedScore);

        const newStatus = calculatedScore >= passingScore ? "correct" : "wrong";
        if (newStatus === "wrong") {
            incorrectControls.play();
            onWrongAnswer && onWrongAnswer();
        }
        else {
            correctControls.play();
        }
        setStatus(newStatus);
    }

    const isAllQuestionsAnswered = Object.keys(selectedAnswers).length === totalQuestions;

    return (
        <div className="flex flex-col gap-8">
            {incorrectAudio}
            {correctAudio}
            {questions.map((question) => (
                <div key={question.id} className="mb-6">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 mb-4">
                        {question.content}
                    </h1>
                    <div className={cn("grid gap-2"
                    )}>
                        {question.answers.map((answer, i) => (
                            <div key={answer.id}>
                                <Answer
                                    id={answer.id}
                                    content={answer.content}
                                    imageSrc={answer.imageSrc}
                                    shortcut={`${i + 1}`}
                                    selected={selectedAnswers[question.id] === answer.id}
                                    onClick={() => onSelect(question.id, answer.id)}
                                    status={status}
                                    audioSrc={answer.audioSrc}
                                    disabled={disabled || status === "completed"}
                                    type={type}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            ))}

            <Footer
                disabled={!isAllQuestionsAnswered}
                status={status}
                onCheck={onComplete}
                lessonId={lessonId}
                score={score}
                passingScore={passingScore}
            />
        </div>
    )
}