import { useState } from 'react';

// Demo component 
const DemoContent = () => {
  const [text, setText] = useState("");

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Text Input Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="space-y-2">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter text here..."
            className="w-full h-40 bg-background/50 border border-border/30 rounded-xl p-4 text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:border-accent/50 transition-colors"
          />
        </div>
      </div>

      {/* Options Area */}
      <div className="glass-card p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <h2>Enter some text...</h2>
            <p>{text.length == 0 ? "It will appear here" : text}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DemoContent