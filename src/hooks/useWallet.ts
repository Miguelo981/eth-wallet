import { useMemo } from "react"
import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"
import { walletRepository } from "@/repositories/wallet-repository"

export const useWallet = () => {
    const { privateKey } = usePrivateKeyStore()

    const account = useMemo(() => walletRepository.getAccount(privateKey), [privateKey])

    const publicClient = useMemo(() => walletRepository.getWalletClient(account), [account])

    return {
        publicClient,
        account,
    } as const
}