import { answers, materials, questions } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Answer } from "./answer";
import { useState } from "react";
import { Footer } from "./footer";


type Props = {
    questions: (typeof questions.$inferSelect & {
        answers: typeof answers.$inferSelect[];
    })[];
    disabled?: boolean;
    type: typeof materials.$inferSelect["type"];
}

export const Question = ({
    questions,
    disabled,
    type
}: Props) => {
    const score = [];
    const totalQuestions = questions.length;
    return (
        <div>
            {questions.map((question, j) => {

                const [selectedAnswer, setSelectedAnswer] = useState<number>();
                const [status, setStatus] = useState<"correct" | "wrong" | "none">("none");

                const onSelect = (id: number) => {
                    if (status !== "none") return;

                    setSelectedAnswer(id);
                }
                
                const onContinue = () => {
                    if (!selectedAnswer) return;

                    if (status === "wrong"){
                        setStatus("none");
                        setSelectedAnswer(undefined);
                        return;
                    }
                    
                    if (status === "correct"){
                        // onNext();
                        setStatus("none");
                        setSelectedAnswer(undefined);
                        return;
                    }

                    const correctAnswer = question.answers.find((answer) => answer.correct);

                    if (correctAnswer && correctAnswer.id === selectedAnswer){
                        console.log("Correct answer!");
                    } else {
                        console.log("Wrong answer!");
                    }
                };
                return (
                    <div key={question.id}>
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {question.content}
                        </h1>
                        <div className={cn(
                            "grid gap-2",
                            type === "QUIZ" && "grid-cols-1",
                            type === "ASSIGNMENT" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
                        )}>
                            {question.answers.map((answer, i) => {
                                return (
                                    <div key={answer.id}>
                                        <Answer
                                            id={answer.id}
                                            content={answer.content}
                                            imageSrc={answer.imageSrc}
                                            shortcut={`${i + 1}`}
                                            selected={selectedAnswer === answer.id}
                                            onClick={() => onSelect(answer.id)}
                                            status={status}
                                            audioSrc={answer.audioSrc}
                                            disabled={disabled}
                                            type="ASSIGNMENT"
                                        />
                                    </div>
                                )
                            }
                            )}
                        </div>
                        
            
            <Footer
                            disabled={!selectedAnswer}
                            status={status}
                            onCheck={onContinue}
                        />
                    </div>
                )
            })
            }
        </div>
    )
}