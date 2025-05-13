import { useMemo } from "react"
import { walletRepository } from "@/repositories/wallet-repository"

export const usePublicClient = () => {
    const publicClient = useMemo(() => walletRepository.getPublicClient(), [])

    return {
        publicClient,
    } as const
}