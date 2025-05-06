import '@rainbow-me/rainbowkit/styles.css';
import {
  RainbowKitProvider,
  getDefaultWallets
} from '@rainbow-me/rainbowkit';
import {
  WagmiConfig,
  createClient,
  configureChains,
} from 'wagmi';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';

const monadTestnet = {
  id: 10143,
  name: 'Monad Testnet',
  network: 'monad-testnet',
  nativeCurrency: {
    decimals: 18,
    name: 'MON',
    symbol: 'MON',
  },
  rpcUrls: {
    default: {
      http: ['https://rpc.testnet.monad.xyz']
    }
  },
  blockExplorers: {
    default: { name: 'Monad Explorer', url: 'https://testnet.monadexplorer.com' }
  },
  testnet: true,
};

const { chains, provider } = configureChains(
  [monadTestnet],
  [
    jsonRpcProvider({
      rpc: () => ({ http: 'https://testnet-rpc.monad.xyz' }),
    }),
    publicProvider()
  ]
);

const { connectors } = getDefaultWallets({
    appName: 'Farcaster Passport',
    chains, // questo DEVE essere presente!
});
  

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});

export function WalletProvider({ children }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        {children}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
