import { ETH_CHAIN } from "@/constants"

type BalancePreviewProps = {
    balance: string,
    symbol?: string
}

const BalancePreview = ({ balance, symbol = ETH_CHAIN.nativeCurrency.symbol }: BalancePreviewProps) => {
    return (
        <p className="font-black text-5xl flex items-end gap-1">{balance} <span className="text-2xl">{symbol}</span></p>
    )
}

export default BalancePreview