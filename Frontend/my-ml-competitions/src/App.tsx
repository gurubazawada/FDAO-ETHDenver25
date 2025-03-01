import React, { useState } from 'react';
import { Link, Routes, Route, Navigate } from 'react-router-dom';
import CompetitorRoutes from './components/CompetitorRoutes';
import SponsorDashboard from './components/SponsorDashboard';
import Leaderboard from './components/Leaderboard';

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

// Import Material Tailwind components
import { Tabs, TabsHeader, Tab } from '@material-tailwind/react';

function App() {
  const [walletConnected, setWalletConnected] = useState(false);

  // Simulate connection event
  const handleConnect = () => {
    setWalletConnected(true);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {!walletConnected ? (
        <div className="flex items-center justify-center h-screen">
          <Wallet>
            <ConnectWallet>
              <button
                onClick={handleConnect}
                className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
              >
                Connect Wallet
              </button>
            </ConnectWallet>
          </Wallet>
        </div>
      ) : (
        <>
          <header className="bg-gray-200 shadow">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between p-4">
              <div className="mb-4 md:mb-0 relative">
                <Wallet>
                  <ConnectWallet>
                    <Avatar className="h-8 w-8" />
                    <Name />
                  </ConnectWallet>
                  <WalletDropdown>
                    {/* Extra wrapper with absolute positioning and custom styles */}
                    <div className="absolute right-0 mt-2 min-w-[250px] p-2 bg-white rounded shadow-lg z-50">
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
                    </div>
                  </WalletDropdown>
                </Wallet>
              </div>

              {/* Top-aligned navigation tabs using Material Tailwind */}
              <div className="w-full md:w-auto">
                <Tabs value="compete">
                  <TabsHeader>
                    <Tab value="compete" className="px-4 py-2">
                      <Link to="/compete">Compete</Link>
                    </Tab>
                    <Tab value="sponsor" className="px-4 py-2">
                      <Link to="/sponsor">Sponsor</Link>
                    </Tab>
                    <Tab value="leaderboard" className="px-4 py-2">
                      <Link to="/leaderboard">Leaderboard</Link>
                    </Tab>
                  </TabsHeader>
                </Tabs>
              </div>
            </div>
          </header>

          <main className="container mx-auto p-4">
            <Routes>
              <Route path="/" element={<Navigate to="/compete" />} />
              <Route path="/compete/*" element={<CompetitorRoutes />} />
              <Route path="/sponsor" element={<SponsorDashboard />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
          </main>
        </>
      )}
    </div>
  );
}

export default App;
