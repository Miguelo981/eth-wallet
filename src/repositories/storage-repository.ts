const storageActions = () => {
    const get = <T = unknown>(key: string): T | undefined => {
        const value = localStorage.getItem(key)
        if (!value) return

        return JSON.parse(value) as T
    }

    const set = (key: string, value: unknown) => {
        localStorage.setItem(key, JSON.stringify(value))
    }

    const remove = (key: string) => {
        localStorage.removeItem(key)
    }

    return {
        get,
        set,
        remove,
    } as const
}

export const storageRepository = storageActions()