import { answers, materials, questions } from "@/db/schema"
import { cn } from "@/lib/utils";
import { Card } from "./card";
import { stringify } from "querystring";
import { Answer } from "./answer";


type Props = {
    questions: (typeof questions.$inferSelect & {
        answers: typeof answers.$inferSelect[];
    })[];
    onSelect: (id: number) => void;
    status: "correct" | "wrong" | "none";
    selectedAnswer?: number;
    disabled?: boolean;
    type: typeof materials.$inferSelect["type"];
}

export const Question = ({
    questions,
    onSelect,
    status,
    selectedAnswer,
    disabled,
    type
}: Props) => {
    return (
        <div className={cn(
            "grid gap-2",
            type === "ASSIGNMENT" && "grid-cols-1",
            type === "QUIZ" && "grid-cols-2 lg:grid-cols-[repeat(auto-fit,minmax(0,1fr))]"
        )}>
            {questions.map((question, i) => {
                return (
                    <div>
                        <h1 className="text-lg lg:text-3xl text-center lg:text-start font-bold text-neutral-700">
                            {question.content}
                        </h1>
                        {question.answers.map((answer, j) => {
                            return (<div>
                                <Answer
                                    key={answer.id}
                                    id={answer.id}
                                    content={answer.content}
                                    imageSrc={answer.imageSrc}
                                    shortcut={`${i + 1}`}
                                    selected={selectedAnswer === answer.id}
                                    onClick={() => onSelect(answer.id)}
                                    status={status}
                                    audioSrc={answer.audioSrc}
                                    disabled={disabled}
                                    type={type}
                                />
                            </div>
                            )
                        }
                        )}
                    </div>
                )
            })
            }
        </div>
    )
}