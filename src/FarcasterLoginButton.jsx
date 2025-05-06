import React, { useEffect } from 'react';

function FarcasterLoginButton() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://neynarxyz.github.io/siwn/raw/1.2.0/index.js';
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div
      className="neynar_signin"
      data-client_id="d7647514-68a6-418f-97bd-fab16bdfde0f"
      data-success-callback="onSignInSuccess"
      data-theme="dark"
    ></div>
  );
}

export default FarcasterLoginButton;
