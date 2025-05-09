import { STORING_KEYS } from "@/constants"
import type { EncryptedKey } from "@/models/crypto"
import { storageRepository } from "@/repositories/storage-repository"
import type { Hex } from "viem"

const cryptoActions = () => {
    const encryptPrivateKey = async (privateKey: string, password: string): Promise<EncryptedKey> => {
        const enc = new TextEncoder()
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        )

        const salt = crypto.getRandomValues(new Uint8Array(16))
        const iv = crypto.getRandomValues(new Uint8Array(12))

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100_000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['encrypt']
        )

        const encrypted = await crypto.subtle.encrypt(
            { name: 'AES-GCM', iv },
            key,
            enc.encode(privateKey)
        )

        return {
            iv: Array.from(iv),
            salt: Array.from(salt),
            data: Array.from(new Uint8Array(encrypted))
        }
    }

    const decryptPrivateKey = async (encryptedKey: EncryptedKey, password: string): Promise<Hex> => {
        const enc = new TextEncoder()
        const dec = new TextDecoder()

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            enc.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveKey']
        )

        const key = await crypto.subtle.deriveKey(
            {
                name: 'PBKDF2',
                salt: new Uint8Array(encryptedKey.salt),
                iterations: 100_000,
                hash: 'SHA-256'
            },
            keyMaterial,
            { name: 'AES-GCM', length: 256 },
            false,
            ['decrypt']
        )

        const decrypted = await crypto.subtle.decrypt(
            { name: 'AES-GCM', iv: new Uint8Array(encryptedKey.iv) },
            key,
            new Uint8Array(encryptedKey.data)
        )

        return dec.decode(decrypted) as Hex
    }

    const getEncryptedKey = (): EncryptedKey | undefined => {
        return storageRepository.get<EncryptedKey>(STORING_KEYS.PRIVATE_KEY)
    }

    const storeEncryptedKey = (encryptedKey: EncryptedKey) => {
        storageRepository.set(STORING_KEYS.PRIVATE_KEY, encryptedKey)
    }

    return {
        encryptPrivateKey,
        decryptPrivateKey,
        getEncryptedKey,
        storeEncryptedKey,
    } as const
}

export const cryptoRepository = cryptoActions()