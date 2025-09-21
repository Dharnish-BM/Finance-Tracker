import React from 'react';

const TestGitHub = () => {
  const testPopup = () => {
    console.log('Testing popup...');
    const popup = window.open('https://github.com', 'test-popup', 'width=600,height=600');
    if (popup) {
      console.log('Popup opened successfully');
      alert('Popup test successful!');
    } else {
      console.log('Popup blocked');
      alert('Popup blocked! Please allow popups for this site.');
    }
  };

  const testGitHubOAuth = () => {
    const clientId = import.meta.env.VITE_GITHUB_CLIENT_ID || 'Ov23liVpmFjzBXdvMQZq';
    const redirectUri = `${window.location.origin}/auth/github/callback`;
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectUri}&scope=user:email`;
    
    console.log('Testing GitHub OAuth URL:', githubAuthUrl);
    
    // Open in same window for testing
    window.open(githubAuthUrl, '_blank');
  };

  return (
    <div className="p-4 bg-yellow-100 border border-yellow-400 rounded-lg">
      <h3 className="font-bold text-yellow-800 mb-2">GitHub OAuth Debug Tools</h3>
      <div className="space-y-2">
        <button
          onClick={testPopup}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Test Popup
        </button>
        <button
          onClick={testGitHubOAuth}
          className="bg-gray-800 text-white px-4 py-2 rounded"
        >
          Test GitHub OAuth (New Tab)
        </button>
      </div>
      <p className="text-sm text-yellow-700 mt-2">
        Check browser console for debug information
      </p>
    </div>
  );
};

export default TestGitHub;
