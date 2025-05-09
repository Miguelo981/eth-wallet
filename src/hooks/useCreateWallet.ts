import { useCallback, useMemo, useState } from "react"
import { walletRepository } from "@/repositories/wallet-repository"
import { passwordRepository } from "@/repositories/password-repository"
import { cryptoRepository } from "@/repositories/crypto-repository"

export const useCreateWallet = () => {
    const [mnemonic] = useState(() => walletRepository.generateNmemonic())
    const [isSeedCopied, setIsSeedCopied] = useState(false)
    const [password, setPassword] = useState("")
    const [isCreating, setIsCreating] = useState(false)

    const create = useCallback(async () => {
        setIsCreating(true)
    
        const seed = walletRepository.generateSeed(mnemonic, password)
        const privateKey = walletRepository.generatePrivateKey(seed)
    
        const hashed = await passwordRepository.hash(password)
        const encrypted = await cryptoRepository.encryptPrivateKey(privateKey, password)
    
        passwordRepository.setStoredHashed(hashed)
        cryptoRepository.storeEncryptedKey(encrypted)
    
    }, [walletRepository, passwordRepository, cryptoRepository, mnemonic, password])

    const words = useMemo(() => mnemonic.split(" "), [mnemonic])

    return {
        words,
        mnemonic,
        password,
        setPassword,
        create,
        isCreating,
        isSeedCopied,
        setIsSeedCopied,
    } as const
}