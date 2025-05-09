import { useMemo } from "react"
import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"
import { walletRepository } from "@/repositories/wallet-repository"

export const useWalletClient = () => {
    const { privateKey } = usePrivateKeyStore()

    const account = useMemo(() => walletRepository.getAccount(privateKey), [walletRepository, privateKey])

    const publicClient = useMemo(() => walletRepository.createClient(account), [walletRepository, account])

    return {
        publicClient
    } as const
}