import { Menu } from "lucide-react"

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger
} from "@/components/ui/sheet"

import {Sidebar} from "@/components/sidebar"
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"

export const MobileSidebar = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Menu className="text-white"/>
            </SheetTrigger>
            <SheetContent className="p-0 z-[100]" side="left">
                <VisuallyHidden>
                    <SheetTitle>Elearning</SheetTitle>
                </VisuallyHidden>
                <Sidebar />
            </SheetContent>
        </Sheet>
    )
}