import React, { useState } from "react";

import Filters from "./Filters";
import PetBrowser from "./PetBrowser";

function App() {
  const [pets, setPets] = useState([]);
  const [filters, setFilters] = useState({ type: "all" });

  const onChangeType = (type) => {
    setFilters({ type });
  };

  const onFindPetsClick = () => {
    let endpoint = "http://localhost:3001/pets";
    if (filters.type !== "all") {
      endpoint += `?type=${filters.type}`;
    }

    fetch(endpoint)
      .then(res => res.json())
      .then(data => setPets(data));
  };

  const onAdoptPet = (id) => {
    const updatedPets = pets.map(pet => 
      pet.id === id ? { ...pet, isAdopted: true } : pet
    );
    setPets(updatedPets);
  };

  return (
    <div className="ui container">
      <header>
        <h1 className="ui dividing header">React Animal Shelter</h1>
      </header>
      <div className="ui container">
        <div className="ui grid">
          <div className="four wide column">
            <Filters 
              onChangeType={onChangeType} 
              onFindPetsClick={onFindPetsClick}
              filters={filters}
            />
          </div>
          <div className="twelve wide column">
            <PetBrowser pets={pets} onAdoptPet={onAdoptPet} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;