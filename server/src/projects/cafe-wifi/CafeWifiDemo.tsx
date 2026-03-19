import { useState, useMemo } from "react";
import "./cafe-wifi.css";

interface Cafe {
  id: number;
  name: string;
  location: string;
  imgUrl: string;
  mapUrl: string;
  open: string;
  close: string;
  coffeePrice: string;
  coffeeQuality: number;
  seats: string;
  wifi: number;
  power: string;
}

const mockCafes: Cafe[] = [
  {
    id: 1,
    name: "Bean & Brew",
    location: "São Paulo, Brazil",
    imgUrl: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=400",
    mapUrl: "https://maps.google.com",
    open: "7AM",
    close: "8PM",
    coffeePrice: "$3.50",
    coffeeQuality: 5,
    seats: "20-30",
    wifi: 4,
    power: "Some"
  },
  {
    id: 2,
    name: "Café Central",
    location: "Madrid, Spain",
    imgUrl: "https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400",
    mapUrl: "https://maps.google.com",
    open: "8AM",
    close: "10PM",
    coffeePrice: "$4.00",
    coffeeQuality: 4,
    seats: "30-40",
    wifi: 5,
    power: "Plenty"
  },
  {
    id: 3,
    name: "The Grind House",
    location: "New York, USA",
    imgUrl: "https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=400",
    mapUrl: "https://maps.google.com",
    open: "6AM",
    close: "9PM",
    coffeePrice: "$5.00",
    coffeeQuality: 5,
    seats: "40-50",
    wifi: 5,
    power: "Plenty"
  },
  {
    id: 4,
    name: "Mocha Moments",
    location: "London, UK",
    imgUrl: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=400",
    mapUrl: "https://maps.google.com",
    open: "7:30AM",
    close: "7PM",
    coffeePrice: "£3.80",
    coffeeQuality: 4,
    seats: "15-20",
    wifi: 3,
    power: "Some"
  },
  {
    id: 5,
    name: "Espresso Express",
    location: "Tokyo, Japan",
    imgUrl: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400",
    mapUrl: "https://maps.google.com",
    open: "8AM",
    close: "11PM",
    coffeePrice: "¥500",
    coffeeQuality: 5,
    seats: "10-15",
    wifi: 5,
    power: "Plenty"
  },
  {
    id: 6,
    name: "Aroma Café",
    location: "Paris, France",
    imgUrl: "https://images.unsplash.com/photo-1559925393-8be0ec4767c8?w=400",
    mapUrl: "https://maps.google.com",
    open: "9AM",
    close: "8PM",
    coffeePrice: "€4.50",
    coffeeQuality: 5,
    seats: "25-30",
    wifi: 4,
    power: "Some"
  }
];

const renderRating = (rating: number) => {
  return "☕".repeat(rating) + "○".repeat(5 - rating);
};

const renderWifi = (strength: number) => {
  return "📶".repeat(Math.min(strength, 3)) + (strength > 3 ? "💪" : "");
};

const CafeWifiDemo = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [flippedCards, setFlippedCards] = useState<Set<number>>(new Set());
  const [randomCafe, setRandomCafe] = useState<Cafe | null>(null);
  const [showRandomModal, setShowRandomModal] = useState(false);

  const filteredCafes = useMemo(() => {
    let cafes = [...mockCafes];
    
    // Filter by search
    if (searchQuery) {
      cafes = cafes.filter(cafe => 
        cafe.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Sort based on tab
    switch (activeTab) {
      case "az":
        return cafes.sort((a, b) => a.name.localeCompare(b.name));
      case "coffee":
        return cafes.sort((a, b) => b.coffeeQuality - a.coffeeQuality);
      case "wifi":
        return cafes.sort((a, b) => b.wifi - a.wifi);
      default:
        return cafes;
    }
  }, [activeTab, searchQuery]);

  const toggleFlip = (id: number) => {
    setFlippedCards(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  const getRandomCafe = () => {
    const random = mockCafes[Math.floor(Math.random() * mockCafes.length)];
    setRandomCafe(random);
    setShowRandomModal(true);
  };

  const tabs = [
    { id: "all", label: "All Cafes" },
    { id: "az", label: "Sort by A-Z" },
    { id: "coffee", label: "Sort by Coffee Rating" },
    { id: "wifi", label: "Sort by Wifi Strength" }
  ];

  return (
    <div className="cafe-wifi-demo">
      {/* Hero Section */}
      <div className="cafe-hero">
        <div className="cafe-hero-content">
          <h1 className="cafe-title">Cafe&Wifi</h1>
          <p className="cafe-subtitle">Find places to work with good coffee and wifi.</p>
          <div className="cafe-hero-buttons">
            <button onClick={getRandomCafe} className="cafe-btn cafe-btn-primary">
              Get a Random Cafe
            </button>
            <button className="cafe-btn cafe-btn-secondary">
              Add a Cafe
            </button>
          </div>
        </div>
      </div>

      {/* Tabs Section */}
      <div className="cafe-tabs-container">
        <div className="cafe-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`cafe-tab ${activeTab === tab.id ? "active" : ""}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="cafe-content">
          <div className="cafe-content-header">
            <h3>
              {activeTab === "all" && "All Cafes recently listed"}
              {activeTab === "az" && "Cafes sorted A-Z"}
              {activeTab === "coffee" && "Cafes by Coffee Rating"}
              {activeTab === "wifi" && "Cafes by Wifi Strength"}
            </h3>
            <input
              type="text"
              placeholder="Search for cafes by name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="cafe-search"
            />
          </div>
          
          <hr className="cafe-divider" />

          <div className="cafe-list">
            {filteredCafes.map(cafe => (
              <div key={cafe.id} className="cafe-card-wrapper">
                {/* Desktop Card */}
                <div className="cafe-item desktop-card">
                  <div className="cafe-img-section">
                    <div className="cafe-img-container">
                      <img src={cafe.imgUrl} alt={cafe.name} />
                    </div>
                    <p className="cafe-actions">
                      <span className="cafe-action-link">Update</span>
                      {" | "}
                      <span className="cafe-action-link">Delete</span>
                    </p>
                  </div>
                  <div className="cafe-info-section">
                    <h4>{cafe.name}</h4>
                    <h5>{cafe.location}</h5>
                    <p><strong>Open:</strong> {cafe.open}</p>
                    <p><strong>Close:</strong> {cafe.close}</p>
                    <p><strong>Coffee price:</strong> {cafe.coffeePrice}</p>
                    <p><strong>Coffee Quality:</strong> {renderRating(cafe.coffeeQuality)}</p>
                    <p><strong>Seats:</strong> {cafe.seats}</p>
                    <p><strong>Wifi:</strong> {renderWifi(cafe.wifi)}</p>
                    <p><strong>Power:</strong> {cafe.power}</p>
                    <a href={cafe.mapUrl} target="_blank" rel="noopener noreferrer" className="cafe-map-link">
                      Location on Google Maps
                    </a>
                  </div>
                </div>

                {/* Mobile Flip Card */}
                <div 
                  className={`cafe-flip-card mobile-card ${flippedCards.has(cafe.id) ? "flipped" : ""}`}
                  onClick={() => toggleFlip(cafe.id)}
                >
                  <div className="cafe-flip-inner">
                    <div className="cafe-flip-front">
                      <div className="cafe-img-section">
                        <div className="cafe-img-container">
                          <img src={cafe.imgUrl} alt={cafe.name} />
                        </div>
                        <p className="cafe-tap-hint">Tap to see details</p>
                      </div>
                    </div>
                    <div className="cafe-flip-back">
                      <div className="cafe-info-section">
                        <h4>{cafe.name}</h4>
                        <h5>{cafe.location}</h5>
                        <p><strong>Open:</strong> {cafe.open}</p>
                        <p><strong>Close:</strong> {cafe.close}</p>
                        <p><strong>Coffee price:</strong> {cafe.coffeePrice}</p>
                        <p><strong>Coffee:</strong> {renderRating(cafe.coffeeQuality)}</p>
                        <p><strong>Wifi:</strong> {renderWifi(cafe.wifi)}</p>
                        <p><strong>Power:</strong> {cafe.power}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredCafes.length === 0 && (
            <p className="cafe-no-results">No cafes found matching your search.</p>
          )}
        </div>
      </div>

      {/* Random Cafe Modal */}
      {showRandomModal && randomCafe && (
        <div className="cafe-modal-overlay" onClick={() => setShowRandomModal(false)}>
          <div className="cafe-modal" onClick={(e) => e.stopPropagation()}>
            <button className="cafe-modal-close" onClick={() => setShowRandomModal(false)}>×</button>
            <h2>Your Random Cafe</h2>
            <div className="cafe-modal-content">
              <img src={randomCafe.imgUrl} alt={randomCafe.name} className="cafe-modal-img" />
              <h3>{randomCafe.name}</h3>
              <p className="cafe-modal-location">{randomCafe.location}</p>
              <div className="cafe-modal-details">
                <p><strong>Hours:</strong> {randomCafe.open} - {randomCafe.close}</p>
                <p><strong>Coffee:</strong> {renderRating(randomCafe.coffeeQuality)}</p>
                <p><strong>Wifi:</strong> {renderWifi(randomCafe.wifi)}</p>
                <p><strong>Power:</strong> {randomCafe.power}</p>
              </div>
              <a href={randomCafe.mapUrl} target="_blank" rel="noopener noreferrer" className="cafe-btn cafe-btn-primary">
                View on Map
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CafeWifiDemo;
