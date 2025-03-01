import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import RoleSelection from './components/RoleSelection';
import CompetitorRoutes from './components/CompetitorRoutes';
import SponsorDashboard from './components/SponsorDashboard';

import {
  ConnectWallet,
  Wallet,
  WalletDropdown,
  WalletDropdownLink,
  WalletDropdownDisconnect,
} from '@coinbase/onchainkit/wallet';
import {
  Address,
  Avatar,
  Name,
  Identity,
  EthBalance,
} from '@coinbase/onchainkit/identity';

function App() {
  const [role, setRole] = useState<"competitor" | "sponsor" | null>(null);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-black">
      <header className="p-4 bg-gray-200 shadow">
        <div className="flex justify-end">
          <Wallet>
            <ConnectWallet>
              <Avatar className="h-6 w-6" />
              <Name />
            </ConnectWallet>
            <WalletDropdown>
              <Identity className="px-4 pt-3 pb-2" hasCopyAddressOnClick>
                <Avatar />
                <Name />
                <Address />
                <EthBalance />
              </Identity>
              <WalletDropdownLink
                icon="wallet"
                href="https://keys.coinbase.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Wallet
              </WalletDropdownLink>
              <WalletDropdownDisconnect />
            </WalletDropdown>
          </Wallet>
        </div>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-4">
        {/* If role hasn't been selected, show role selection UI */}
        {!role ? (
          <RoleSelection onSelectRole={setRole} />
        ) : role === "competitor" ? (
          <CompetitorRoutes />
        ) : (
          <SponsorDashboard />
        )}
      </main>
    </div>
  );
}

export default App;
