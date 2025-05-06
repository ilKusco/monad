import React, { useEffect, useState } from 'react';
import { ConnectButton } from '@rainbow-me/rainbowkit';
import FarcasterLoginButton from './FarcasterLoginButton';
import { ethers } from 'ethers';
import { CONTRACT_ABI, CONTRACT_ADDRESS } from './contractABI';

function App() {
  const [farcasterUser, setFarcasterUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("farcasterUser");
    if (stored) {
      setFarcasterUser(JSON.parse(stored));
    }
  }, []);

  const mintBadge = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      const tokenURI = "https://gateway.pinata.cloud/ipfs/YOUR_JSON_CID"; // replace this

      const tx = await contract.mintBadge(
        await signer.getAddress(),
        tokenURI
      );

      await tx.wait();
      alert("✅ Badge minted!");
    } catch (err) {
      console.error(err);
      alert("❌ Mint failed");
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-purple-600 mb-4">Farcaster Passport</h1>

      <ConnectButton />
      <FarcasterLoginButton />

      {farcasterUser && (
        <div className="bg-gray-100 rounded-2xl shadow-md p-6 mt-6 w-full max-w-sm text-center">
          <img
            src={farcasterUser.pfp_url}
            alt="avatar"
            className="rounded-full w-24 h-24 mx-auto mb-4 border-4 border-purple-400"
          />
          <h2 className="text-xl font-semibold">@{farcasterUser.username}</h2>
          <p className="text-gray-600">FID: {farcasterUser.fid}</p>

          <button
            onClick={mintBadge}
            className="mt-6 bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-6 rounded-xl shadow-md"
          >
            Claim Passport Badge
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
