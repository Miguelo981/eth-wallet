"use client"

import { useCallback, useState } from 'react'
import { useTransaction } from '@/hooks/useTransaction'
import { Button } from '@components/ui/button'
import { Input } from '@components/ui/input'
import { Label } from '@components/ui/label'
import { toast } from 'sonner'

const TransactionForm = () => {
    const [to, setTo] = useState('')
    const [amount, setAmount] = useState('')
    const { sendTransaction, isLoading, error } = useTransaction()

    const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        try {
            const hash = await sendTransaction(to, amount)
            if (!hash) return

            setTo('')
            setAmount('')
            toast.success(`Transaction sent with hash: ${hash}`)
        } catch (err) {
            console.error(err)
        }
    }, [to, amount, sendTransaction])

    return (
        <form onSubmit={handleSubmit} className="space-y-4 flex flex-col h-full">
            <div>
                <Label htmlFor="to" className="block text-sm font-medium text-gray-700">
                    Recipient Address
                </Label>
                <Input
                    type="text"
                    id="to"
                    value={to}
                    onChange={(e) => setTo(e.target.value)}
                    className="mt-1 block w-full rounded-full"
                    placeholder="0x..."
                    required
                />
            </div>

            <div>
                <Label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                    Amount (ETH)
                </Label>
                <Input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="mt-1 block w-full rounded-full"
                    placeholder="0.0"
                    step="0.01"
                    min="0"
                    required
                />
            </div>

            {error && (
                <small className="text-red-500 text-sm">
                    {error}
                </small>
            )}

            <footer className='mt-auto'>
                <Button
                    type="submit"
                    disabled={isLoading || !to || !amount}
                    className="w-full"
                >
                    {isLoading ? 'Sending...' : 'Send Transaction'}
                </Button>
            </footer>
        </form>
    )
}

export default TransactionForm 