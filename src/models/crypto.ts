export type HashedPassword = {
    salt: string
    hash: string
}

export type EncryptedKey = {
    iv: number[]
    salt: number[]
    data: number[]
}