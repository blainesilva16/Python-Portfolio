import { useState, useRef } from "react";

const TextToSpeechDemo = () => {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("en");
  const [accent, setAccent] = useState("us");
  const [currentAudioUrl, setCurrentAudioUrl] = useState<string | null>(null);
  const [audioPlayer, setAudioPlayer] = useState<HTMLAudioElement | null>(null);
  const [buttonText, setButtonText] = useState("Convert to Speech");
  const [buttonExtractText, setButtonExtractText] = useState("Extract Text from PDF");

  const audioRef = useRef<HTMLAudioElement>(null);
  const fileInput = document.getElementById('pdfFileInput') as HTMLInputElement;

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const accents: Record<string, { value: string; label: string }[]> = {
    en: [
      { value: "com.au", label: "English (Australia)" },
      { value: "co.uk", label: "English (United Kingdom)" },
      { value: "us", label: "English (United States)" },
      { value: "ca", label: "English (Canada)" },
      { value: "co.in", label: "English (India)" }
    ],
    es: [
      { value: "es", label: "Spanish (Spain)" },
      { value: "com.mx", label: "Spanish (Mexico)" }
    ],
    fr: [
      { value: "fr", label: "French (France)" },
      { value: "ca", label: "French (Canada)" }
    ],
    pt: [
      { value: "com.br", label: "Portuguese (Brazil)" },
      { value: "pt", label: "Portuguese (Portugal)" }
    ]
  };

  const openFileInput = () => {
    if (fileInput) {
      fileInput.click();
    }
  }

  fileInput?.addEventListener('change', async () => {
    if (fileInput.files && fileInput.files.length > 0) {
      setButtonExtractText("Extracting...");
      const buttonPDF = document.getElementById('buttonExtract');
      buttonPDF?.setAttribute('disabled', 'true');
      extractFromPDF();
      setButtonExtractText("Extract Text from PDF");
      buttonPDF?.removeAttribute('disabled');
      return
    }
    alert('No file selected');
  })

  const extractFromPDF = async () => {
    // Placeholder function for extracting text from PDF
    console.log("Extracting text from PDF...");
    const fileInput = document.getElementById('pdfFileInput') as HTMLInputElement;
    if (fileInput) {
        if (fileInput.files && fileInput.files.length > 0) {
          const file = fileInput.files[0];
          const formData = new FormData();
          formData.append('pdf_file', file);
            try {
                const response = await fetch(`${API_URL}/api/extract_pdf`, {
                    method: 'POST',
                    body: formData,
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                if (data) {
                    setText(data.text || "");
                }
                else {
                    alert('No text extracted from PDF.');
                }
            } catch (error) {
                console.error('Error extracting text from PDF:', error);
                alert('Failed to extract text from PDF: ' + error.message);
            }
        }
      };
    
  } 

  const onConvert = async () => {
    if (!text.trim()) return;
    // await convertToSpeech(text.trim());
    convertToSpeech();
  };

  const downloadAudio = () => {
    const audioElement = document.querySelector('audio');
    if (audioElement && audioElement.src) {
      const link = document.createElement('a');
      link.href = audioElement.src;
      link.download = 'speech.mp3';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  const convertToSpeech = () => {
    // Placeholder function for converting text to speech
    console.log(`Converting text to speech in ${language} with ${accent} accent.`);
    setButtonText("Converting...");
    const buttonElement = document.getElementById('convertButton');
    buttonElement?.setAttribute('disabled', 'true');

    // if (!audioPlayer) {
    //   const player = document.querySelector('audio') as HTMLAudioElement;
    //   setAudioPlayer(player);
    // }
    // Call the API to convert text to speech here
    try {
      fetch(`${API_URL}/api/convert_to_speech`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language, accent }),
      })
      .then(async response => {
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Server error');
        }
        return response.blob(); // Get the response as a Blob (binary data)
      })
      .then(blob => {
        // 1. Create the new Blob URL directly.
        const newAudioUrl = URL.createObjectURL(blob);

        // Revoke previous blob URL if needed
        if (currentAudioUrl) {
          URL.revokeObjectURL(currentAudioUrl);
        }
        
        // 2. Schedule the state update (for subsequent cleanup/rendering).
        setCurrentAudioUrl(newAudioUrl); 

        // 3. CRUCIAL: Assign the newAudioUrl to the DOM element directly.
        if (audioRef.current) {
          audioRef.current.src = newAudioUrl; 
          audioRef.current.load(); // Ensure the player reloads the new source
          audioRef.current.play().catch(error => {
            // Catch potential auto-play policy errors
            console.warn("Auto-play failed (requires user interaction):", error);
          });
        } else {
          console.warn("Audio element ref is null. Cannot play audio.");
        }
      })
      .catch(error => {
        console.error('Error during text to speech conversion:', error);
        alert('Failed to convert text to speech: ' + error.message);
        // audioPlayerContainer.style.display = 'none'; // Hide player on error
      })
      .finally(() => {
        setButtonText("Convert to Speech");
        const buttonElement = document.getElementById('convertButton');
        buttonElement?.removeAttribute('disabled');
      });
    } catch {
        throw new Error('Failed to convert text to speech');
    }
  }

  const setLangAccent = (lang: string) => {
    setLanguage(lang)
    setAccent(accents[lang][0].value)
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Text Input Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here or extract from PDF..."
            className="w-full h-60 bg-background/50 border border-border/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
        <button id="buttonExtract" onClick={openFileInput} className="w-full py-3 bg-accent/20 border border-accent/30 rounded-xl text-accent hover:bg-accent/30 transition-colors">
          Extract text from PDF
        </button>
      </div>

      {/* Options Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Select Language:</label>
            <select
              value={language}
              onChange={(e) => setLangAccent(e.target.value)}
              className="w-full bg-background/50 border border-border/30 rounded-xl p-3 text-foreground focus:outline-none focus:border-accent/50"
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="pt">Portuguese</option>
            </select>
          </div>
          <div className="space-y-2">
            <label className="text-sm text-muted-foreground">Select Accent:</label>
            <select
              value={accent}
              onChange={(e) => setAccent(e.target.value)}
              className="w-full bg-background/50 border border-border/30 rounded-xl p-3 text-foreground focus:outline-none focus:border-accent/50"
            >
              {accents[language]?.map((a) => (
                <option key={a.value} value={a.value}>{a.label}</option>
              ))}
            </select>
          </div>
        </div>

        <button id="convertButton" onClick={onConvert} className="w-full py-3 bg-primary text-primary-foreground rounded-xl hover:bg-primary/80 transition-colors font-medium">
          {buttonText}
        </button>

        <div className="border-t border-border/30 pt-4">
          <div className="bg-background/30 rounded-xl p-4 flex items-center justify-center">
            <audio ref={audioRef} controls className="w-full" style={{ filter: 'invert(1)' }}>
              <source src="" type="audio/mpeg" />
            </audio>
          </div>
        </div>

        <div className="flex gap-4">
          <button 
            onClick={() => setText("")}
            className="flex-1 py-3 bg-muted/50 border border-border/30 rounded-xl text-muted-foreground hover:bg-muted/70 transition-colors"
          >
            Clear Text
          </button>
          <button onClick={downloadAudio} className="flex-1 py-3 bg-accent/20 border border-accent/30 rounded-xl text-accent hover:bg-accent/30 transition-colors">
            Download MP3
          </button>
        </div>
      </div>
      <input type="file" id="pdfFileInput" accept=".pdf" style={{ display: "none" }}/>
    </div>
  );
}

export default TextToSpeechDemo;