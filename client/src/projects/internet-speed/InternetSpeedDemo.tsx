import { useState, useRef } from "react";

const InternetSpeedDemo = () => {
  const [upload, setUpload] = useState(0)
  const [download, setDownload] = useState(0)
  const [text, setText] = useState("Start testing")

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const getInternetSpeed = () => {
    setText("Starting the test...")
    const buttonElement = document.getElementById('buttonStart');
    buttonElement?.setAttribute('disabled', 'true');

    try {
      fetch(`${API_URL}/api/check-internet-speed`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server error');
        }
        const data = await response.json();
        if (data) {
            setUpload(data.upload || "");
            setDownload(data.download || "");
        }
      })
      .catch(error => {
        console.error('Error during the test:', error);
        alert('Failed to get the internet speed: ' + error.message);
      })
      .finally(() => {
        buttonElement?.removeAttribute('disabled')
        setText("Start testing")
      });
    } catch {
        setText("An error occured")
        throw new Error('Failed to get the Internet Speed');
    } 
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Start the testing */}
      <div className="glass-card p-6 space-y-4">
        <h2>Click on the button below to start the testing:</h2>
        <button id="buttonStart" onClick={getInternetSpeed} className="w-full py-3 bg-accent/20 border border-accent/30 rounded-xl text-accent hover:bg-accent/30 transition-colors">
          {text}
        </button>
      </div>
      {/* Display the results */}
      <div className="glass-card p-6 space-y-4 flex flex-col justify-center">
        <div style={{ display: 'flex', gap: '10px' }}>
          <b>Upload speed:</b>
          <p>{upload} Mbps</p>
        </div>
        <div style={{ display: 'flex', gap: '10px' }}>
          <b>Download speed:</b>
          <p>{download} Mbps</p>
        </div>
      </div>
    </div>
  )
}

export default InternetSpeedDemo