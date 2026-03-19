import { useState } from "react";
import "./pallete-generator.css";
import { faCopy, faCloudUpload } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const PaletteGeneratorDemo = () => {
    const [infoText, setInfoText] = useState("Upload an image to see the main colors extracted from it.");
    const [imageSrc, setImageSrc] = useState<string | null>(null);
    const [colors, setColors] = useState<Array<{ hex: string; rgb: string }>>(Array.from({ length: 10 }, () => ({ hex: "#ffffff", rgb: "rgb(255,255,255)" })));
    const [selectedColor, setSelectedColor] = useState<{ hex: string; rgb: string } | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

    // Function to display the uploaded image (stores data URL in state)
    const displayImage = (file: File) => {
        const reader = new FileReader();
        reader.onload = function (e) {
            if (e.target && e.target.result) {
                setImageSrc(e.target.result as string);
            }
        };
        reader.readAsDataURL(file);
        sendImageToBackend(file);
    };

  // Function to handle image upload and send to backend
    const sendImageToBackend = async (file: File) => {
        try {
            const formData = new FormData();
            formData.append("image", file);
            formData.append("sections", "10"); // Optional
            setInfoText("Generating Palette...");

            const res = await fetch(`${API_URL}/api/get-dominant-colors`, {
                method: "POST",
                body: formData,
            });
            const data = await res.json();
            setInfoText("Click on a color to see info");
            // Expecting data.colors to be array of {hex, rgb}
            if (Array.isArray(data.colors) && data.colors.length) {
                // ensure we have exactly 10 entries
                const padded = data.colors.slice(0, 10);
                while (padded.length < 10) padded.push({ hex: "#ffffff", rgb: "rgb(255,255,255)" });
                setColors(padded as Array<{ hex: string; rgb: string }>);
                setSelectedColor(null);
            } else {
                setInfoText("No colors returned from server.");
            }
        } catch (err) {
            console.error("Color extraction failed", err);
            setInfoText("Failed to generate palette. Please try again.");
        }
    };

    // Function to show colors (update React state)
    const showColors = (newColors: Array<{ hex: string; rgb: string }>) => {
        const padded = newColors.slice(0, 10);
        while (padded.length < 10) padded.push({ hex: "#ffffff", rgb: "rgb(255,255,255)" });
        setColors(padded);
        setSelectedColor(null);
        setInfoText("Click on a color to see info");
    };

    // Function for the remove button
    const removeImage = () => {
        setImageSrc(null);
        setColors(Array.from({ length: 10 }, () => ({ hex: "#ffffff", rgb: "rgb(255,255,255)" })));
        setSelectedColor(null);
        setInfoText("Upload an image to see the main colors extracted from it.");
        setIsDragOver(false);
        const inputFile = document.getElementById("input-file") as HTMLInputElement | null;
        if (inputFile) inputFile.value = "";
    }

    // Handlers for file input and drag/drop
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const f = e.target.files && e.target.files[0];
        if (f) displayImage(f);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const files = e.dataTransfer.files;
        if (files && files.length) {
            displayImage(files[0]);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = () => setIsDragOver(false);

  // Function to copy text from a given element ID to clipboard
  const copyText = (elementId: string) => {
    const textElement = document.getElementById(elementId);
    if (textElement) {
        const textToCopy = textElement.textContent || "";
        navigator.clipboard.writeText(textToCopy).then(() => {
            alert("Copied to clipboard: " + textToCopy);
        }).catch((err) => {
            alert("Failed to copy text: " + err);
        }
        );
    }
  }

  return (
    <div className="grid md:grid-cols-2 gap-6 palette-demo-container">
      {/* Input Area */}
        <div className="p-6 space-y-4">
          <div className="hero">              
            {imageSrc ? (
              <>
                <div className="image-display">
                  <img src={imageSrc} alt="Uploaded" id="uploaded-image" style={{ maxWidth: "100%", maxHeight: 300, borderRadius: 10 }} />
                  <button id="remove-btn" type="button" onClick={removeImage}>Remove Image</button>
                </div>
              </>
            ) : (
              <>
                <label
                  htmlFor="input-file"
                  id="drop-area"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={isDragOver ? "drag-over" : ""}
                >
                  <input type="file" accept="image/*" id="input-file" hidden onChange={handleFileChange} />
                  <div id="img-view">
                    <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor" className="bi bi-cloud-arrow-up" viewBox="0 0 16 16">
                      <path fillRule="evenodd" d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"/>
                      <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z"/>
                    </svg>
                    <h4>Drag and drop or click here<br/>to upload image</h4>
                    <span>Upload any images from desktop</span>
                  </div>
                </label>
              </>
            )}                   
                    {/* {imageSrc ? (
                        <button id="remove-btn" type="button" onClick={removeImage}>Remove Image</button>
                    ) : null} */}                      
            </div>
        </div>
        {/* Output Area */}
        <div className="p-6 space-y-4">
            <h3>10 main colors on the image:</h3>
            <div className="squares">
                {/* Loop for generating the square divs from state */}
                {colors.map((c, i) => (
                    <div
                      key={i}
                      id={`color${i + 1}`}
                      className="square"
                      style={{ backgroundColor: c.hex, cursor: "pointer" }}
                      onClick={() => { setSelectedColor(c); setInfoText(""); }}
                    />
                ))}
            </div>
            <h4>{infoText}</h4>
            <div id="color-info" className="color-info" >
                <div id="color-details" style={{ display: selectedColor ? "block" : "none" }}>
                    <p className="p-margin"><b>HEX code:</b> <span id="hex-code">{selectedColor ? selectedColor.hex : ""}</span> <a href="#" onClick={(e) => { e.preventDefault(); if (selectedColor) navigator.clipboard.writeText(selectedColor.hex); }}><FontAwesomeIcon icon={faCopy}/></a></p>
                    <p className="p-margin"><b>RGB code:</b> <span id="rgb-code">{selectedColor ? selectedColor.rgb : ""}</span> <a href="#" onClick={(e) => { e.preventDefault(); if (selectedColor) navigator.clipboard.writeText(selectedColor.rgb); }}><FontAwesomeIcon icon={faCopy}/></a></p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PaletteGeneratorDemo;