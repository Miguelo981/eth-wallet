import { useCallback, useState } from 'react'
import { parseEther, getAddress } from 'viem'
import { useWallet } from '@/hooks/useWallet'

export const useTransaction = () => {
    const { publicClient } = useWallet()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const sendTransaction = useCallback(async (to: string, amount: string) => {
        try {
            setIsLoading(true)
            setError(null)

            const hash = await publicClient.sendTransaction({
                to: getAddress(to),
                value: parseEther(amount),
            })

            return hash
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Transaction failed')
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [publicClient])

    return {
        sendTransaction,
        isLoading,
        error,
    } as const
} 