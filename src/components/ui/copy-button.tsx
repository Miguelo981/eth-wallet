"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"
import { Button } from "@components/ui/button"
import { cn } from "@/lib/utils"

interface CopyButtonProps extends React.ComponentProps<typeof Button> {
    value: string
    onCopy?: () => void
}

export function CopyButton({
    value,
    onCopy,
    className,
    ...props
}: CopyButtonProps) {
    const [hasCopied, setHasCopied] = useState(false)

    const copy = async () => {
        await navigator.clipboard.writeText(value)
        setHasCopied(true)
        onCopy?.()

        setTimeout(() => {
            setHasCopied(false)
        }, 2000)
    }

    return (
        <Button
            size="icon"
            variant="ghost"
            className={cn(
                "relative z-10 h-8 w-8 hover:bg-accent hover:text-accent-foreground",
                className
            )}
            onClick={copy}
            {...props}
        >
            <span className="sr-only">Copy</span>
            {hasCopied ? (
                <Check className="h-4 w-4" />
            ) : (
                <Copy className="h-4 w-4" />
            )}
        </Button>
    )
} 