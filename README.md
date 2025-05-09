# ETH Wallet

A modern Ethereum wallet built with Next.js, featuring secure key management and transaction capabilities.

## Prerequisites

- Node.js 18.17 or later
- pnpm 8.0 or later
- Anvil (for local development)
- Docker (for production deployment)

## Installation

1. Clone the repository:
```bash
git clone https://github.com/miguelo981/eth-wallet.git
cd eth-wallet
```

2. Install dependencies:
```bash
pnpm i
```

## Development

### Local Blockchain Setup

This project uses Anvil (from Foundry) for local development. Install it using:

```bash
curl -L https://foundry.paradigm.xyz | bash
foundryup
```

Start a local Anvil instance:
```bash
anvil
```

The default RPC URL will be `http://127.0.0.1:8545`

### Running the Development Server

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Production

### Docker Deployment

The project includes a production-ready Dockerfile. To build and run the container:

1. Build the Docker image:
```bash
docker build -t eth-wallet .
```

2. Run the container:
```bash
docker run -p 3000:3000 \
  -e NEXT_PUBLIC_ETH_RPC_PROVIDER=your_rpc_url \
  eth-wallet
```

Environment variables:
- `NEXT_PUBLIC_ETH_RPC_PROVIDER`: Your Ethereum RPC provider URL
- `PORT`: Port to run the application on (default: 3000)

### RPC Provider Setup

For production, you'll need to use a reliable RPC provider. Update the `NEXT_PUBLIC_ETH_RPC_PROVIDER` in `src/constants.ts` with your production RPC URL:

```typescript
export const CHAIN_DATA = {
    id: 1, // Mainnet
    name: 'ethereum',
    nativeCurrency: { name: 'ETH', symbol: 'ETH', decimals: 18 },
    rpcUrls: { 
        default: { 
            http: ['YOUR_RPC_URL'] 
        } 
    },
}
```

Recommended RPC providers:
- [Alchemy](https://www.alchemy.com/)
- [Infura](https://www.infura.io/)
- [QuickNode](https://www.quicknode.com/)

### Building for Production

```bash
pnpm build
```

### Running in Production

```bash
pnpm start
```

## Project Structure

```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── hooks/           # Custom React hooks
├── lib/             # Utility functions
├── models/          # TypeScript types and interfaces
├── repositories/    # Data access layer
└── stores/          # Zustand stores
```

## Key Features

- Secure private key management
- Transaction capabilities
- Modern UI with Tailwind CSS
- Type-safe with TypeScript
- State management with Zustand
- Docker support for easy deployment

## Scripts

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier
- `pnpm format:check` - Check code formatting

## Security Considerations

- Private keys are never stored in plain text
- Keys are encrypted using AES-GCM
- Password hashing with PBKDF2
- No persistence of sensitive data in localStorage
- Production-ready Docker configuration with minimal attack surface

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
