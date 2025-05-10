import { useCallback, useState } from "react"
import { walletRepository } from "@/repositories/wallet-repository"
import { passwordRepository } from "@/repositories/password-repository"
import { cryptoRepository } from "@/repositories/crypto-repository"
import { Hex } from "viem"

export const useUnlockWallet = () => {
    const [error, setError] = useState<string | null>(null)

    const unlock = useCallback(async (password: string): Promise<Hex | undefined> => {
        setError(null)

        const storedPass = passwordRepository.getStoredHashed()
        if (!storedPass) {
            setError("Password is not set")
            return
        }
        
        const isPasswordValid = await passwordRepository.verify(password, storedPass.salt, storedPass.hash)
        if (!isPasswordValid) {
            setError("Password is invalid")
            return
        }

        const encryptedKey = cryptoRepository.getEncryptedKey()
        if (!encryptedKey) {
            setError("Private key is not stored correctly")
            return
        }

        const privateKey = await cryptoRepository.decryptPrivateKey(encryptedKey, password)
        return privateKey
    }, [setError])

    return {
        unlock,
        error,
    } as const
}