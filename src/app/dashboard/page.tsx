"use client"

import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"
import TransactionForm from "@/app/pages/TransactionForm"
import Link from "next/link"
import { Button } from "@components/ui/button"

export default function Dashboard() {
    const { privateKey } = usePrivateKeyStore()

    if (!privateKey) {
        return (
            <section className="max-w-xl mx-auto grid justify-items-center h-screen items-center">
                <div className="flex flex-col">
                    <h1 className="text-3xl font-black text-wrap max-w-[15rem] text-center mb-6">Please unlock your wallet first</h1>

                    <Link href="/unlock">
                        <Button className="w-full">Unlock</Button>
                    </Link>
                </div>
            </section>
        )
    }

    return (
        <section className="max-w-sm mx-auto py-5 px-5 md:px-0 flex flex-col h-screen">
            <h1 className="text-2xl font-bold mb-6">Send Transaction</h1>
            <TransactionForm />
        </section>
    )
}