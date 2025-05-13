import { generateMnemonic, mnemonicToSeedSync } from '@scure/bip39'
import { HDKey } from '@scure/bip32'
import { type Account, bytesToHex, createWalletClient, createPublicClient, type Hex, http } from 'viem'
import { privateKeyToAccount } from 'viem/accounts'
import { SupportedLang } from '@/models/lang'
import { DEFAULT_ETHEREUM_DERIVATION_INDEX, DEFAULT_SUPPORTED_LANG, ETH_CHAIN, WORD_LIST } from '@/constants'
import { getEthereumDerivationPath } from '@/utils/eth'

const walletActions = () => {
    const generateNmemonic = (lang: SupportedLang = DEFAULT_SUPPORTED_LANG) => {
        const wordlist = WORD_LIST[lang]

        return generateMnemonic(wordlist)
    }

    const generateSeed = (mnemonic: string, passphrase?: string) => {
        return mnemonicToSeedSync(mnemonic, passphrase)
    }

    const generatePrivateKey = (seed: Uint8Array, index: number = DEFAULT_ETHEREUM_DERIVATION_INDEX): Hex => {
        const hdkey = HDKey.fromMasterSeed(seed)
        const childKey = hdkey.derive(getEthereumDerivationPath(index))

        if (!childKey.privateKey) throw new Error('Private key not available')

        const hex: Hex = bytesToHex(childKey.privateKey)
        if (hex.length !== 66) throw new Error('Private key must be 32 bytes (64 hex characters)')

        return hex
    }

    const getAccount = (privateKey: Hex): Account => {
        return privateKeyToAccount(privateKey)
    }

    const getWalletClient = (account: Account) => {
        const walletClient = createWalletClient({
            account,
            chain: ETH_CHAIN,
            transport: http(),
        })

        return walletClient
    }

    const getPublicClient = () => {
        const publicClient = createPublicClient({
            chain: ETH_CHAIN,
            transport: http(),
        })

        return publicClient
    }

    return {
        generateNmemonic,
        generateSeed,
        generatePrivateKey,
        getAccount,
        getWalletClient,
        getPublicClient,
    } as const
}

export const walletRepository = walletActions()