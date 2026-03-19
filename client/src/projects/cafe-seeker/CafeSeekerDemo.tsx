import { useState, useMemo, useEffect, useRef } from "react";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./cafe-seeker.css";
import { FORMERR } from "dns";
import { Badge } from "@/components/ui/badge";

interface Cafe {
  id: number;
  display_name: string;
  formatted_address: string;
  imgUrl: string;
  websiteUri: string;
  googleMapsUri: string;
  price_level: string;
  rating: number;
  weekdayDescriptions: Array<string>;
}

const mockCafes: Cafe[] = [
  {
    id: 1,
    display_name: "Bean & Brew",
    formatted_address: "São Paulo, Brazil",
    imgUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
    websiteUri: "https:maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "$3.50",
    rating: 5
  },
  {
    id: 2,
    display_name: "Café Central",
    formatted_address: "Madrid, Spain",
    imgUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    websiteUri: "https://maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "$4.00",
    rating: 4
  },
  {
    id: 3,
    display_name: "The Grind House",
    formatted_address: "New York, USA",
    imgUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400",
    websiteUri: "https://maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "$4.00",
    rating: 4
  }, 
  {
    id: 4,
    display_name: "Mocha Moments",
    formatted_address: "London, UK",
    imgUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400",
    websiteUri: "https://maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "€4.50",
    rating: 5
  },
  {
    id: 5,
    display_name: "Espresso Express",
    formatted_address: "Tokyo, Japan",
    imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    websiteUri: "https://maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "¥500",
    rating: 5
  },
  {
    id: 6,    
    display_name: "Aroma Café",
    formatted_address: "Paris, France",
    imgUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400",
    websiteUri: "https://maps.google.com",
    googleMapsUri: "https://maps.google.com",
    weekdayDescriptions: ["Everyday 7AM - 8PM"],
    price_level: "€4.50",
    rating: 4
  }
];

const renderRating = (rating: number) => {
  // return "☕".repeat(rating) + "○".repeat(5 - rating);
  return "⭐".repeat(Math.floor(rating))
};

// const renderWifi = (strength: number) => {
//   return "📶".repeat(Math.min(strength, 3)) + (strength > 3 ? "💪" : "");
// };

const CafeWifiDemo = () => {
  const [location, setLocation] = useState("");
  const [cafes, setCafes] = useState<Cafe[]>([]);
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<Array<string>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [noCafesFound, setNoCafesFound] = useState(false)
  const [activeSuggestion, setActiveSuggestion] = useState<number>(-1);
  const abortCtrlRef = useRef<AbortController | null>(null);
  const debounceRef = useRef<number | null>(null);

  const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";
  const googleMapsApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || "";

  // On selecting a location, fetch cafes from backend API based on selected location
  // debounce and fetch suggestions when user types
  useEffect(() => {
    if (!location || location.trim().length < 1) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    // debounce
    if (debounceRef.current) {
      window.clearTimeout(debounceRef.current);
    }
    debounceRef.current = window.setTimeout(() => {
      fetchSuggestions(location);
    }, 300);

    return () => {
      if (debounceRef.current) window.clearTimeout(debounceRef.current);
      // abort previous request
      if (abortCtrlRef.current) abortCtrlRef.current.abort();
    };
  }, [location]);

  // fetch suggestions from backend endpoint
  const fetchSuggestions = async (q: string) => {
    // const url = `${apiUrl}/api/googlemaps/autocompletecity?q=${encodeURIComponent(q)}`;
    const url = `${apiUrl}/api/googlemaps/autocompletecity`;
    try {
      if (abortCtrlRef.current) abortCtrlRef.current.abort();
      const ac = new AbortController();
      abortCtrlRef.current = ac;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // body: JSON.stringify({ input: ac.signal })
        body: JSON.stringify({ input: q })
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // Response format: { "suggestions": ["London, UK", ...] }
      let items: string[] = [];
      if (data && data.suggestions && Array.isArray(data.suggestions)) {
        items = data.suggestions;
      }
      setSuggestions(items);
      setShowSuggestions(items.length > 0);
      setActiveSuggestion(-1);
    } catch (err) {
      if ((err as any).name === 'AbortError') return;
      console.error("Autocomplete error", err);
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // fetch cafes for a given query/location
  
  const fetchCafes = async (q?: string) => {
    const query = (q ?? location).trim();
    if (!query) return;
    setLoading(true);
    setCafes([]);
    try {
      // ?q=${encodeURIComponent(query)}
      const url = `${apiUrl}/api/googlemaps/cafes`;
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        // The encodeURIComponent handles both spaces and special characters
        body: JSON.stringify({ location: encodeURIComponent(query) }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      // assume data.cafes is array matching Cafe interface
      if (Array.isArray(data.cafes)) {
        setCafes(data.cafes);
      } else if (Array.isArray(data)) {
        setCafes(data as Cafe[]);
      } else if (data.length == 0) {
        setNoCafesFound(true)
      } else {
        // fallback: use mock
        setCafes(mockCafes);
      }
    } catch (err) {
      console.error("Error fetching cafes", err);
      setCafes(mockCafes);
    } finally {
      setLoading(false);
      setShowSuggestions(false);
    }
  };

  const constructImgUrl = (photoRef: string, maxWidth: number = 400, maxHeight: number = 200) => {
    return `https://places.googleapis.com/v1/${photoRef}/media?key=${googleMapsApiKey}&maxWidthPx=${maxWidth}&maxHeightPx=${maxHeight}`;
  }

  return (
    <div className="cafe-wifi-demo">
      {/* Hero Section */}
      <div className="cafe-hero">
        <div className="cafe-hero-content">
          <h1 className="cafe-title">Cafe Seeker</h1>
          <h4 className="cafe-subtitle">Find all the cafes close to a location:</h4>
          <div className="cafe-input" style={{ position: "relative" }}>
            <input
              placeholder="Type a Location..."
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  fetchCafes();
                } else if (e.key === "ArrowDown") {
                  setActiveSuggestion((a) => Math.min(a + 1, suggestions.length - 1));
                } else if (e.key === "ArrowUp") {
                  setActiveSuggestion((a) => Math.max(a - 1, 0));
                } else if (e.key === "Escape") {
                  setShowSuggestions(false);
                }
              }}
              onFocus={() => { if (suggestions.length) setShowSuggestions(true); }}
              type="text"
            />

            <button
              aria-label="Search cafes"
              className="cafe-search-btn"
              onClick={() => fetchCafes()}
              style={{ background: "transparent", border: "none", cursor: "pointer" }}
            >
              <FontAwesomeIcon icon={faSearch} />
            </button>

            {showSuggestions && suggestions.length > 0 && (
              <ul className="cafe-suggestions" style={{ position: "absolute", top: "110%", left: 0, right: 0, zIndex: 40 }}>
                {suggestions.map((s, idx) => (
                  <li
                    key={s + idx}
                    onMouseDown={(e) => { e.preventDefault(); /* prevent blur */ setLocation(s); fetchCafes(s); }}
                    className={idx === activeSuggestion ? "active" : ""}
                    style={{ padding: "8px 10px", cursor: "pointer", background: idx === activeSuggestion ? "#eee" : "white" }}
                  >
                    {s}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="cafe-content">
        <div className="cafe-content-header">
          {!noCafesFound && !loading && cafes.length == 0 && (<h2 className="cafe-info">Your cafes will be listed here.</h2>)}
          {!noCafesFound && !loading && cafes.length > 0 && (<h2 className="cafe-info">Cafes near {location}:</h2>)}
          {!noCafesFound && loading && (<h2 className="cafe-info">Loading cafes near {location}...</h2>)}
        </div>

        <div className="cafe-results">
          {noCafesFound && (
            <h2 className="cafe-info">No cafes were found for the given location.</h2>
          )}
          {!noCafesFound && cafes && cafes.length > 0 ? (
            <div className="cafe-cards" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(240px,1fr))", gap: 16 }}>
              {cafes.map((c) => (
                <div key={c.id} className="cafe-card" style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden", background: "#4A300E" }}>
                  <img src={constructImgUrl(c.imgUrl)} alt={c.display_name} style={{ width: "100%", height: 140, objectFit: "cover" }} />
                  <div style={{ padding: 12 }}>
                    <div style={{ display:"flex", flexDirection:'column', justifyContent: 'space-between' }}>
                      <div>
                        <h3 style={{ margin: 0 }}>{c.display_name}</h3>
                        <p style={{ margin: "6px 0 0", color: "#666" }}>{c.formatted_address}</p>
                        <p style={{ margin: "8px 0 0" }}><b>Price Range:</b> {c.price_level}</p>
                        <p style={{ margin: "6px 0 0" }}><b>Rating:</b> {renderRating(c.rating)}</p>
                        <p style={{ margin: "6px 0 0" }}><b>Open Time:</b></p>
                        {c.weekdayDescriptions.map((d) => (
                          <Badge className="bg-gray-100 text-gray-800">
                            {d || 'N/A'}
                          </Badge>
                        ))}
                        </div>
                      <div>
                        <div style={{ display: "flex", gap: '10px', justifyContent: 'space-between' }}>
                          <p><a href={c.websiteUri} className="cafe-btn-secondary" target="_blank" rel="noreferrer">Website</a></p>
                          <p><a href={c.googleMapsUri} className="cafe-btn-secondary" target="_blank" rel="noreferrer">Open in Maps</a></p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            !loading && (<div className="cafe-empty" />)
          )}
        </div>

      </div>

    </div>
  );
};

export default CafeWifiDemo;    