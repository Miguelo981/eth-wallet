import { useWalletBalance } from "@/hooks/useWalletBalance"
import { useEffect } from "react"
import BalancePreview from "@/components/Balance/BalancePreview"

const BalanceContainer = () => {
    const { balance, getBalance, isLoading, error } = useWalletBalance()

    useEffect(() => {
        getBalance()
    }, [])

    return (
        <>
            {
                isLoading ? (
                    <p>Loading balance...</p>
                ) : error ? (
                    <p>Error: {error}</p>
                ) : (
                   <BalancePreview balance={balance.formatted} />
                )
            }
        </>
    )
}

export default BalanceContainer