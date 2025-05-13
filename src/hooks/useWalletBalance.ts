import { useCallback, useState } from 'react'
import { useWallet } from '@/hooks/useWallet'
import { usePublicClient } from '@/hooks/usePublicClient'
import { formatEther } from 'viem'

export const useWalletBalance = () => {
    const { account } = useWallet()
    const { publicClient } = usePublicClient()
    const [balance, setBalance] = useState({
        balance: BigInt(0),
        formatted: '',
    })
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const getBalance = useCallback(async () => {
        try {
            setIsLoading(true)
            setError(null)

            const balance = await publicClient.getBalance({
                address: account.address,
            })

            return setBalance({
                balance,
                formatted: formatEther(balance),
            })
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Get balance failed')
            throw err
        } finally {
            setIsLoading(false)
        }
    }, [publicClient])

    return {
        getBalance,
        isLoading,
        error,
        balance,
    } as const
} 