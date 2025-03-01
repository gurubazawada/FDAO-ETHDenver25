import React, { createContext, useContext } from 'react';
import { Signer } from 'ethers';

interface EthersContextValue {
  signer?: Signer;
}

const EthersContext = createContext<EthersContextValue>({});

export const EthersProvider = ({
  signer,
  children,
}: {
  signer?: Signer;
  children: React.ReactNode;
}) => {
  return (
    <EthersContext.Provider value={{ signer }}>
      {children}
    </EthersContext.Provider>
  );
};

export const useEthers = () => useContext(EthersContext);
