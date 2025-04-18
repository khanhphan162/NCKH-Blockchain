import { answers, materials } from "@/db/schema";

type Props = {
    id: number;
    imageSrc: string | null;
    audioSrc: string | null;
    content: string;
    shortcut: string;
    selected?: boolean;
    onClick: () => void;
    disabled?: boolean;
    status?: "correct" | "wrong" | "none";
    type: typeof materials.$inferSelect["type"];
    answers: typeof answers.$inferSelect[];
}

export const Card = ({
    id,
    imageSrc,
    audioSrc,
    content,
    shortcut,
    onClick,
    status,
    disabled,
    type
}: Props) => {
    return (
        <div>
            Answer
        </div>
    )
}