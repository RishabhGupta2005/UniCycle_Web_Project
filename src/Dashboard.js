import React, { useState, useEffect } from 'react';

function Dashboard({ userData, onLogout }) {
  const [activeCycles, setActiveCycles] = useState([]);
  const [activeTab, setActiveTab] = useState('available');
  const [rentalHistory, setRentalHistory] = useState([]);
  
  // Pricing data
  const pricingRates = {
    'Mountain Bike': { firstHour: 2.00, additionalHour: 1.50, dailyMax: 10.00 },
    'City Cruiser': { firstHour: 1.50, additionalHour: 1.00, dailyMax: 8.00 },
    'Hybrid Bike': { firstHour: 2.50, additionalHour: 1.75, dailyMax: 12.00 },
    'Road Bike': { firstHour: 3.00, additionalHour: 2.00, dailyMax: 15.00 },
    'Folding Bike': { firstHour: 2.00, additionalHour: 1.25, dailyMax: 9.00 }
  };
  
  const availableCycles = [
    { id: 1, name: 'Mountain Bike', location: 'PRP', batteryLevel: '80%', type: 'Mountain Bike', image: '/mountain-bike.png' },
    { id: 2, name: 'City Cruiser', location: 'Library', batteryLevel: '95%', type: 'City Cruiser', image: '/city-cruiser.png' },
    { id: 3, name: 'Hybrid Bike', location: 'Foodies', batteryLevel: '70%', type: 'Hybrid Bike', image: '/hybrid-bike.png' },
    { id: 4, name: 'Road Bike', location: 'Men\'s Hostel', batteryLevel: '85%', type: 'Road Bike', image: '/road-bike.png' },
    { id: 5, name: 'Folding Bike', location: 'SJT', batteryLevel: '90%', type: 'Folding Bike', image: '/fold-bike.png' }
  ];
  

  // Update active rentals every minute to refresh pricing
  useEffect(() => {
    const interval = setInterval(() => {
      if (activeCycles.length > 0) {
        setActiveCycles(currentCycles => 
          currentCycles.map(cycle => ({
            ...cycle,
            currentPrice: calculatePrice(cycle)
          }))
        );
      }
    }, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, [activeCycles]);

  const calculatePrice = (cycle) => {
    if (!cycle.startTime) return 0;
    
    const now = new Date();
    const rentalStart = new Date(cycle.startTime);
    const hoursElapsed = (now - rentalStart) / (1000 * 60 * 60);
    const rates = pricingRates[cycle.type];
    
    let price;
    if (hoursElapsed <= 1) {
      price = rates.firstHour;
    } else {
      price = rates.firstHour + (rates.additionalHour * (Math.ceil(hoursElapsed) - 1));
    }
    
    // Apply daily maximum cap
    return Math.min(price, rates.dailyMax).toFixed(2);
  };

  const handleRentCycle = (cycle) => {
    const rentalTime = new Date();
    const rentalWithTime = {
      ...cycle,
      startTime: rentalTime.toISOString(),
      currentPrice: pricingRates[cycle.type].firstHour.toFixed(2)
    };
    
    setActiveCycles([...activeCycles, rentalWithTime]);
    alert(`You have rented ${cycle.name} from ${cycle.location}. Pricing starts at Rs ${pricingRates[cycle.type].firstHour.toFixed(2)} for the first hour.`);
  };

  const handleReturnCycle = (cycleId) => {
    const cycle = activeCycles.find(c => c.id === cycleId);
    const rentalEnd = new Date();
    const historyEntry = {
      ...cycle,
      endTime: rentalEnd.toISOString(),
      totalPrice: calculatePrice(cycle),
      rentalDuration: `${formatDuration(new Date(cycle.startTime), rentalEnd)}`
    };
    
    setRentalHistory([historyEntry, ...rentalHistory]);
    setActiveCycles(activeCycles.filter(c => c.id !== cycleId));
    alert(`Cycle returned successfully. Total charge: Rs ${historyEntry.totalPrice}. Thank you for using UniCycle!`);
  };

  const formatDuration = (startTime, endTime) => {
    const diffInMs = endTime - startTime;
    const hours = Math.floor(diffInMs / (1000 * 60 * 60));
    const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));
    
    return `${hours}h ${minutes}m`;
  };

  const renderUserNavbar = () => (
    <nav className="user-navbar">
      <div className="logo">UniCycle</div>
      <div className="user-info">
        <span className="welcome-text">Welcome, {userData.name}</span>
        <span className="reg-number">Reg #: {userData.regNumber}</span>
      </div>
      <ul className="nav-tabs">
        <li 
          className={activeTab === 'available' ? 'active' : ''} 
          onClick={() => setActiveTab('available')}
        >
          Available Cycles
        </li>
        <li 
          className={activeTab === 'active' ? 'active' : ''} 
          onClick={() => setActiveTab('active')}
        >
          My Active Rentals
        </li>
        <li 
          className={activeTab === 'history' ? 'active' : ''} 
          onClick={() => setActiveTab('history')}
        >
          Rental History
        </li>
      </ul>
      <button className="logout-btn" onClick={onLogout}>Logout</button>
    </nav>
  );

  const renderAvailableCycles = () => (
    <div className="available-cycles">
      <h2>Available Cycles</h2>
      <div className="cycle-grid">
        {availableCycles
          .filter(cycle => !activeCycles.some(ac => ac.id === cycle.id))
          .map(cycle => (
            <div className="cycle-card" key={cycle.id}>
              <div className="cycle-image">
                <img src={cycle.image} alt={cycle.name} className="cycle-photo" />
              </div>
              <div className="cycle-details">
                <h3>{cycle.name}</h3>
                <p><strong>Location:</strong> {cycle.location}</p>
                <p><strong>Battery:</strong> {cycle.batteryLevel}</p>
                <p><strong>First Hour:</strong> Rs {pricingRates[cycle.type].firstHour.toFixed(2)}</p>
                <p><strong>Additional Hour:</strong> Rs {pricingRates[cycle.type].additionalHour.toFixed(2)}</p>
                <button 
                  className="rent-btn"
                  onClick={() => handleRentCycle(cycle)}
                >
                  Rent Now
                </button>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
  

  const renderActiveRentals = () => (
    <div className="active-rentals">
      <h2>My Active Rentals</h2>
      {activeCycles.length === 0 ? (
        <div className="no-rentals">
          <p>You have no active rentals.</p>
          <button onClick={() => setActiveTab('available')} className="browse-btn">
            Browse Available Cycles
          </button>
        </div>
      ) : (
        <div className="rental-list">
          {activeCycles.map(cycle => {
            const startTime = new Date(cycle.startTime);
            const currentPrice = calculatePrice(cycle);
            const rentalDuration = formatDuration(startTime, new Date());
            
            return (
              <div className="rental-item" key={cycle.id}>
                <div className="rental-image">
                <img src={cycle.image} alt={cycle.name} className="cycle-photo" />
                </div>
                <div className="rental-details">
                  <h3>{cycle.name}</h3>
                  <p><strong>Picked up from:</strong> {cycle.location}</p>
                  <p><strong>Rental started:</strong> {startTime.toLocaleString()}</p>
                  <p><strong>Duration:</strong> {rentalDuration}</p>
                  <div className="price-info">
                    <p><strong>Current charge:</strong> <span className="price">Rs {currentPrice}</span></p>
                    <p><strong>Daily maximum:</strong> Rs {pricingRates[cycle.type].dailyMax.toFixed(2)}</p>
                  </div>
                  <button 
                    className="return-btn"
                    onClick={() => handleReturnCycle(cycle.id)}
                  >
                    Return Cycle
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderRentalHistory = () => (
    <div className="rental-history">
      <h2>Rental History</h2>
      {rentalHistory.length === 0 ? (
        <div className="history-empty">
          <p>Your rental history will appear here.</p>
        </div>
      ) : (
        <div className="history-list">
          {rentalHistory.map((rental, index) => {
            const startTime = new Date(rental.startTime);
            const endTime = new Date(rental.endTime);
            
            return (
              <div className="history-item" key={index}>
                <div className="history-header">
                  <h3>{rental.name}</h3>
                  <span className="history-price">${rental.totalPrice}</span>
                </div>
                <div className="history-details">
                  <p><strong>Location:</strong> {rental.location}</p>
                  <p><strong>Start Time:</strong> {startTime.toLocaleString()}</p>
                  <p><strong>End Time:</strong> {endTime.toLocaleString()}</p>
                  <p><strong>Duration:</strong> {rental.rentalDuration}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'active':
        return renderActiveRentals();
      case 'history':
        return renderRentalHistory();
      case 'available':
      default:
        return renderAvailableCycles();
    }
  };

  return (
    <div className="dashboard-container">
      {renderUserNavbar()}
      <main className="dashboard-content">
        {renderActiveTab()}
      </main>
      <footer className="dashboard-footer">
        <p>&copy; {new Date().getFullYear()} UniCycle. All Rights Reserved.</p>
      </footer>
    </div>
  );
}

export default Dashboard;