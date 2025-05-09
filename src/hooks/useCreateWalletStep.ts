import { useCallback, useState } from "react"
import { CREATE_WALLET_STEPS } from "@/constants"
import { CreateWalletStep } from "@/models/form"

export const useCreateWalletStep = () => {
    const [step, setStep] = useState<CreateWalletStep>(CreateWalletStep.SEED_PHRASE)

    const next = useCallback(() => {
        const idx = CREATE_WALLET_STEPS.indexOf(step)
        if (idx < CREATE_WALLET_STEPS.length - 1) setStep(CREATE_WALLET_STEPS[idx + 1])
    }, [CREATE_WALLET_STEPS, step])

    const back = useCallback(() => {
        const idx = CREATE_WALLET_STEPS.indexOf(step)
        if (idx > 0) setStep(CREATE_WALLET_STEPS[idx - 1])
    }, [CREATE_WALLET_STEPS, step])

    return {
        step,
        next,
        back,
    } as const
}