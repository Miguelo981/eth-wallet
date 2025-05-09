import type { Hex } from 'viem'
import { create } from 'zustand'

type Store = {
    privateKey: Hex,
    setPrivateKey: (privateKey: Hex) => void,
}

export const usePrivateKeyStore = create<Store>((set) => ({
    privateKey: '' as Hex,
    setPrivateKey: (privateKey: Hex) => set({ privateKey }),
}))