import { answers, materials, questions } from "@/db/schema"
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Answer } from "./answer";
import { Footer } from "./footer";

type Props = {
    questions: (typeof questions.$inferSelect & {
        answers: typeof answers.$inferSelect[];
    })[];
    disabled?: boolean;
    type: typeof materials.$inferSelect["type"];
    onNext?: () => void;
}

export const Question = ({
    questions,
    disabled,
    type,
    onNext
}: Props) => {
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
                return;
            }
        }

        const calculatedScore = calculateScore();
        setScore(calculatedScore);

        if (calculatedScore >= passingScore) {
            
            setStatus("correct");
        } else {
            setStatus("wrong");
        }
    };

    const isAllQuestionsAnswered = Object.keys(selectedAnswers).length === totalQuestions;

    return (
        <div className="flex flex-col gap-8">
            {questions.map((question) => (
                <div key={question.id} className="mb-6">
                    <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700 mb-4">
                        {question.content}
                    </h1>
                    <div className={cn(
                        "grid gap-2",
                        type === "QUIZ" && "grid-cols-1",
                        type === "ASSIGNMENT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
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
                disabled={!(isAllQuestionsAnswered || totalQuestions === 0)}
                status={status}
                onCheck={onComplete}
                lessonId={onNext ? true : false}
                score={score}
                passingScore={passingScore}
            />
        </div>
    )
}