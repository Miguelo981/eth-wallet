"use client"

import { usePrivateKeyStore } from "@/stores/usePrivateKeyStore"
import TransactionForm from "@/components/Transaction/TransactionForm"
import Link from "next/link"
import { Button } from "@components/ui/button"
import BalanceContainer from "@/components/Balance/BalanceContainer"
import AddressContainer from "@/components/Address/AddressContainer"

export default function Dashboard() {
    const { privateKey } = usePrivateKeyStore()

    if (!privateKey) {
        return (
            <section className="max-w-xl mx-auto grid justify-items-center h-dvh items-center">
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
        <section className="max-w-sm mx-auto py-5 px-5 md:px-0 flex flex-col md:gap-6 h-dvh">
            <div className="flex flex-col items-center">
                <small>Your public address</small>
                <AddressContainer />
            </div>

            <div className="flex justify-center rounded-3xl border py-8 bg-gray-50 border-gray-300">
                {/* <h2>Your balance</h2> */}
                <BalanceContainer />
            </div>

            <div className="h-full flex flex-col">
                <h2 className="text-2xl font-bold mb-6">Send Transaction</h2>
                <TransactionForm />
            </div>
        </section>
    )
}