import type { SupportedLang } from "@/models/lang"
import { CreateWalletStep } from "@/models/form"
import { wordlist as english } from '@scure/bip39/wordlists/english'
import { wordlist as spanish } from '@scure/bip39/wordlists/spanish'
import { wordlist as french } from '@scure/bip39/wordlists/french'
import { wordlist as italian } from '@scure/bip39/wordlists/italian'
import { wordlist as japanese } from '@scure/bip39/wordlists/japanese'
import { wordlist as korean } from '@scure/bip39/wordlists/korean'
import { wordlist as czech } from '@scure/bip39/wordlists/czech'
import { wordlist as portuguese } from '@scure/bip39/wordlists/portuguese'
import { wordlist as traditional_chinese } from '@scure/bip39/wordlists/traditional-chinese'
import { wordlist as simplified_chinese } from '@scure/bip39/wordlists/simplified-chinese'
import { anvil, Chain, mainnet } from "viem/chains"

export const ETHEREUM_DEFAULT_DERIVATION_PATH = "m/44'/60'/0'/0/"
export const DEFAULT_ETHEREUM_DERIVATION_INDEX = 0

export const WORD_LIST: Record<SupportedLang, string[]> = {
    english,
    spanish,
    french,
    italian,
    japanese,
    korean,
    czech,
    portuguese,
    traditional_chinese,
    simplified_chinese
} as const

export const DEFAULT_SUPPORTED_LANG: SupportedLang = 'english'

export const ETH_RPC_PROVIDER = process.env.NEXT_PUBLIC_ETH_RPC_PROVIDER!

export const MAINNET: Chain = {
    ...mainnet,
    rpcUrls: { default: { http: [ETH_RPC_PROVIDER] } },
} as const

export const ETH_CHAIN = process.env.NODE_ENV === 'development' ? anvil : MAINNET

export const STORING_KEYS = {
    HASHED_PASSWORD: 'wallet-hash-password',
    PRIVATE_KEY: 'wallet-private-key',
} as const

export const CREATE_WALLET_STEPS = [
    CreateWalletStep.SEED_PHRASE,
    CreateWalletStep.CONFIRM_SEED_PHRASE,
    CreateWalletStep.PASSWORD,
    CreateWalletStep.DONE
] as const