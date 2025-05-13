"use client"

import { useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { CreateWalletStep } from "@/models/form"
import { useCreateWalletStep } from "@/hooks/useCreateWalletStep"
import { useCreateWallet } from "@/hooks/useCreateWallet"
import SeedPhraseList from "@components/SeedPhrase/SeedPhraseList"
import { Button } from "@components/ui/button"
import { CopyButton } from "@components/ui/copy-button"
import Link from "next/link"
import { Input } from "@components/ui/input"

const CreateWallet = () => {
  const { step, next, back } = useCreateWalletStep()
  const { create, mnemonic, words, password, setPassword, isCreating, isSeedCopied, setIsSeedCopied } = useCreateWallet()

  const createWallet = useCallback(async (e: React.FormEvent) => {
    e.preventDefault()
    await create()

    next()
  }, [next, create])

  return (
    <>
      <AnimatePresence mode="wait">
        {step === CreateWalletStep.SEED_PHRASE && (
          <motion.div
            key={CreateWalletStep.SEED_PHRASE}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            <h2 className="text-lg font-semibold">1. Your seed phrase</h2>
            <div className="mt-4 bg-gray-100 p-4 rounded relative">
              <CopyButton className="absolute top-2 right-2" value={mnemonic} onCopy={() => setIsSeedCopied(true)} />
              <SeedPhraseList className="space-y-2.5" words={words} />
            </div>

            <footer className="mt-auto">
              <Button onClick={next} disabled={!isSeedCopied} className="w-full">He copiado la frase</Button>
            </footer>
          </motion.div>
        )}

        {step === CreateWalletStep.CONFIRM_SEED_PHRASE && (
          <motion.div
            key={CreateWalletStep.CONFIRM_SEED_PHRASE}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            <h2 className="text-lg font-semibold">2. Are you sure?</h2>
            <p>Save the phrase, its the only way to recover your wallet.</p>
            
            <footer className="mt-auto space-y-3">
              <Button onClick={back} className="w-full" variant="outline">No I dont</Button>
              <Button onClick={next} className="w-full">I am sure</Button>
            </footer>
          </motion.div>
        )}

        {step === CreateWalletStep.PASSWORD && (
          <motion.form
            key={CreateWalletStep.PASSWORD}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
            onSubmit={createWallet}
          >
            <h2 className="text-lg font-semibold">3. Create a password</h2>
            <Input
              type="password"
              className="w-full mt-2 p-2 rounded-full"
              placeholder="Your safe pass..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-2">The password is required to unlock your wallet.</p>

            <footer className="mt-auto">
              <Button
                disabled={!password || isCreating}
                className="mt-4 w-full"
                type="submit"
                >
                {isCreating ? "Creating..." : "Create wallet"}
              </Button>
            </footer>
          </motion.form>
        )}

        {step === CreateWalletStep.DONE && (
          <motion.div
            key={CreateWalletStep.DONE}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.4 }}
            className="h-full flex flex-col"
          >
            <h2 className="text-lg font-semibold">4. Wallet created!</h2>
            <p className="mt-4">Your private key has been created successfully and stored encrypted in your browser.</p>
            <p className="mt-2 text-pretty">Login using your password to unlock your wallet.</p>

            <footer className="mt-auto">
              <Link href="/unlock">
                <Button className="mt-4 w-full">Unlock wallet</Button>
              </Link>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default CreateWallet