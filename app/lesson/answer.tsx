import { materials } from "@/db/schema"

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
}

export const Answer = ({} : Props) => {
    return(
        <div>
            Answer
        </div>
    )
}