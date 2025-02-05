import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { SidebarItem } from "./sidebar-item";
import {
    ClerkLoading,
    ClerkLoaded,
    UserButton
} from "@clerk/nextjs"
import { Loader } from "lucide-react"

type Props = {
    className?: string;
}

export const Sidebar = ({ className }: Props) => {
    return (
        <div className={cn(
            "flex h-full lg:w-[256px] lg:fixed left-0 top-0 px-4 border-r-2 flex-col",
            className,
        )}>
            <Link href="/learn">
                <div className="pt-8 pl-4 pb-7 flex items-center gap-x-3">
                    <Image src="/logo.png" height={40} width={40} alt="Logo" />
                    <h1 className="txt-2xl font-extrabold text-sky-600 tracking-wide">Elearning</h1>
                </div>
            </Link>
            <div className="flex flex-col gap-y-2 flex-1">
                <SidebarItem
                    label="Learn"
                    href="/learn"
                    iconSrc="/logo.png"
                />
                <SidebarItem
                    label="Courses"
                    href="/2"
                    iconSrc="/logo.png"
                />
                <SidebarItem
                    label="Certificates"
                    href="/3"
                    iconSrc="/logo.png"
                />
                <SidebarItem
                    label="Shop"
                    href="/4"
                    iconSrc="/logo.png"
                />
            </div>
            <div className="p-4">
                <ClerkLoading>
                    <Loader className="h-5 w-5 text-muted-foreground animate-spin" />
                </ClerkLoading>
                <ClerkLoaded>
                    <UserButton afterSwitchSessionUrl="/" />
                </ClerkLoaded>
            </div>
        </div>
    )
}