"use client"

import { useCallback, useState } from "react"
import { useRouter } from 'next/navigation'
import { useUnlockWallet } from "@/hooks/useUnlockWallet"
import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"
import { Button } from "@components/ui/button"
import { Input } from "@components/ui/input"

const UnlockWallet = () => {
    const { push } = useRouter()
    const [password, setPassword] = useState("")
    const { unlock, error } = useUnlockWallet()
    const { setPrivateKey } = usePrivateKeyStore()

    const unlockWallet = useCallback(async (e: React.FormEvent) => {
        e.preventDefault()
        const privateKey = await unlock(password)

        if (!privateKey) return

        setPrivateKey(privateKey)
        push('/dashboard')
    }, [setPrivateKey, password])

    return (
        <form className="flex flex-col h-full" onSubmit={unlockWallet}>
            <Input
                type="password"
                className="w-full mt-2 rounded-full"
                placeholder="Your safe pass..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            { error && <small className="text-red-500 mt-1">Password is not correct</small> }
            <p className="mt-2">The password is required to unlock your wallet.</p>

            <footer className="mt-auto">
                <Button
                    disabled={!password}
                    className="mt-4 w-full"
                    type="submit"
                >
                    Unlock
                </Button>
            </footer>
        </form>
    )
}

export default UnlockWallet