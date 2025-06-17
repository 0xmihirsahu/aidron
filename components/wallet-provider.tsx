'use client';

// Internal components
import { toast } from 'sonner';
import { AptosWalletAdapterProvider } from '@aptos-labs/wallet-adapter-react';
import type { PropsWithChildren } from 'react';
import { Network } from '@aptos-labs/ts-sdk';

export function WalletProvider({ children }: PropsWithChildren) {
  return (
    <AptosWalletAdapterProvider
      autoConnect={true}
      dappConfig={{ network: 'testnet' as Network }}
      onError={(error) => {
        toast.error(error || 'Unknown wallet error');
      }}
    >
      {children}
    </AptosWalletAdapterProvider>
  );
}
