import WalletCreate from "@/app/pages/CreateWallet";

export default function Create() {

  return (
    <div className="max-w-sm mx-auto py-5 px-5 md:px-0 flex flex-col h-screen">
      <h1 className="text-3xl font-bold">Create Wallet</h1>
      <WalletCreate />
    </div>
  );
}
