import { useState } from "react";
import "./number-facts.css";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";

const NumberFactsDemo = () => {
  const [number, setNumber] = useState("");
  const [date, setDate] = useState("");
  const [factTypeNumber, setFactTypeNumber] = useState("trivia");
  const [factTypeRandom, setFactTypeRandom] = useState("trivia");
  const [fact, setFact] = useState<string | null>("Try it out!");
  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  const fetchFactByNumber = async () => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append('number', number);
    // formData.append('type', factTypeNumber);
    try {
      const res = await fetch(
        `${API_URL}/api/number-facts/number`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ number: number, type: factTypeNumber }),
            // body: formData,
        }
        );
        const data = await res.json();
        setFact(data.fact);
    } catch (error) {
      setFact("Error fetching fact. Please try again.");
    }
    setLoading(false);
  }
 
  const fetchFactByDate = async () => {
    setLoading(true);
    const month = date.split("-")[1];
    const day = date.split("-")[2];
    console.log("Month:", month, "Day:", day);
    // const formData = new FormData();
    // formData.append('month', month);
    // formData.append('day', day);
    try {
        const res = await fetch(
        `${API_URL}/api/number-facts/date`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ month: month, day: day }),
            // body: formData,
        }
        );
        const data = await res.json();
        setFact(data.fact);
    } catch (error) {
      setFact("Error fetching fact. Please try again.");
    }
    setLoading(false);
  }

  const fetchRandomFact = async () => {
    setLoading(true);
    // const formData = new FormData();
    // formData.append('type', factTypeRandom);
    try {
        const res = await fetch(
        `${API_URL}/api/number-facts/random`, {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ type: factTypeRandom }),
            // body: formData,
        }
        );
        const data = await res.json();
        setFact(data.fact);
    } catch (error) {
      setFact("Error fetching fact. Please try again.");
    }
    setLoading(false);
  }

  return (
    <div className="grid md:grid-cols-2 gap-6">
      {/* Input Area */}
        <div className="glass-card p-6 space-y-4">
          <h3>Enter a number to get Interesting Info about:</h3>
          <div className="menu-item">
            <h6>Enter a number:</h6>
            <input 
              type="number" 
              name="number" 
              id="inputNumber" 
              placeholder="Number..." 
              required 
              className="input-type"
              value={number}
              onChange={(e => setNumber(e.target.value))}
            />
            <h6>Select Type:</h6>
            <select 
              id="typeSelect" 
              className="select-type"
              value={factTypeNumber}
              onChange={(e) => setFactTypeNumber(e.target.value)}
            >
                <option value="trivia">Trivia</option>
                <option value="year">Year</option>
                <option value="math">Math</option>
            </select>
            <button onClick={fetchFactByNumber} className="button-check">Check</button>
          </div>
          <h6>Or enter a date to get Interesting Info about:</h6>
          <div className="menu-item">
            <h6>Select date:</h6>
            <input 
              type="date" 
              name="date" 
              id="inputDate" 
              required 
              className="input-type"
              value={date}
              onChange={(e => setDate(e.target.value))}
            />
            <button onClick={fetchFactByDate} className="button-check">Check</button>
          </div>
          <h6>Or a random fact:</h6>
          <div className="menu-item">           
            <h6>Select Type:</h6>
            <select 
              id="randomSelect" 
              className="select-type"
              value={factTypeRandom}
              onChange={(e) => setFactTypeRandom(e.target.value)}
            >
                <option value="trivia">Trivia</option>
                <option value="year">Year</option>
                <option value="date">Date</option>
                <option value="math">Math</option>
            </select>
            <button onClick={fetchRandomFact} className="button-check">Check</button>
          </div>
        </div>
        {/* Output Area */}
        <div className="glass-card p-6 space-y-4">
            <h3>Fact:</h3>
            <div id="factOutput" className="text-foreground text-lg">
                {loading ? "Loading..." : fact}
            </div>
        </div>
    </div>
  )
}

export default NumberFactsDemo;