"use client"

import { useEffect, useMemo } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@components/ui/button"
import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"

const HomePage = () => {
    const { push } = useRouter()
    const { privateKey } = usePrivateKeyStore()

    const isUnlocked = useMemo(() => !!privateKey, [privateKey])

    useEffect(() => {
        if (!isUnlocked) return

        push("/unlock")
    }, [push, isUnlocked])

    return (
        <div className="max-w-xl mx-auto">
            <Link href="/create">
                <Button role="link" color="primary" className="w-full">Create</Button>
            </Link>

            {
                isUnlocked ?
                    <Link href="/unlock">
                        <Button role="link" color="primary" className="w-full">Unlock</Button>
                    </Link>
                    : null
            }
        </div>
    );
}

export default HomePage