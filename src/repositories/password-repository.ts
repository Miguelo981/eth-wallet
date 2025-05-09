import { STORING_KEYS } from "@/constants"
import type { HashedPassword } from "@/models/crypto"
import { storageRepository } from "@/repositories/storage-repository"

const passwordActions = () => {
    const hash = async (password: string): Promise<HashedPassword> => {
        const encoder = new TextEncoder()
        const salt = crypto.getRandomValues(new Uint8Array(16))
        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        )

        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100_000,
                hash: 'SHA-256',
            },
            keyMaterial,
            256
        )

        return {
            salt: Buffer.from(salt).toString('hex'),
            hash: Buffer.from(derivedBits).toString('hex'),
        }
    }

    const verify = async (
        password: string,
        saltHex: string,
        expectedHashHex: string
    ): Promise<boolean> => {
        const encoder = new TextEncoder()
        const salt = Uint8Array.from(Buffer.from(saltHex, 'hex'))
        const expectedHash = Buffer.from(expectedHashHex, 'hex')

        const keyMaterial = await crypto.subtle.importKey(
            'raw',
            encoder.encode(password),
            { name: 'PBKDF2' },
            false,
            ['deriveBits']
        )

        const derivedBits = await crypto.subtle.deriveBits(
            {
                name: 'PBKDF2',
                salt,
                iterations: 100_000,
                hash: 'SHA-256',
            },
            keyMaterial,
            256
        )

        return Buffer.from(derivedBits).equals(expectedHash)
    }

    const getStoredHashed = (): HashedPassword | undefined => {
        const value = storageRepository.get<HashedPassword>(STORING_KEYS.HASHED_PASSWORD)

        if (!value) return

        return value
    }

    const setStoredHashed = (hashedPassword: HashedPassword) => {
        storageRepository.set(STORING_KEYS.HASHED_PASSWORD, hashedPassword)
    }

    return {
        hash,
        verify,
        getStoredHashed,
        setStoredHashed,
    } as const
}

export const passwordRepository = passwordActions()