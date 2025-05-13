import { useMemo } from "react"
import { useWallet } from "@/hooks/useWallet"
import { CopyButton } from "@/components/ui/copy-button"

const AddressContainer = () => {
    const { account } = useWallet()

    const truncatedAddress = useMemo(() => account.address.slice(0, 6) + '...' + account.address.slice(account.address.length - 6), [account.address])

    return (
        <section className="flex items-center gap-1">
            <p title={account.address} className="font-semibold text-lg">{truncatedAddress}</p>
            <CopyButton value={account.address} />
        </section>
    )
}

export default AddressContainer