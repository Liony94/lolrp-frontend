import React from 'react';
import './Inventory.css';

function Inventory() {
  const inventory = {
    items: [
      { id: 1, name: "Épée légendaire", rarity: "legendary", level: 85, equipped: true },
      { id: 2, name: "Armure du dragon", rarity: "epic", level: 80, equipped: true },
      { id: 3, name: "Potion de force", rarity: "common", quantity: 5 },
      { id: 4, name: "Amulette mystique", rarity: "rare", level: 75, equipped: false },
    ]
  };

  return (
    <div className="inventory-container">
      <h2>Inventaire</h2>
      <div className="inventory-grid">
        {inventory.items.map(item => (
          <div key={item.id} className={`inventory-item ${item.rarity} ${item.equipped ? 'equipped' : ''}`}>
            <div className="item-icon">
              {/* Placeholder pour l'icône */}
              <div className="item-level">{item.level}</div>
            </div>
            <div className="item-details">
              <h3>{item.name}</h3>
              {item.quantity && <span className="quantity">x{item.quantity}</span>}
              {item.equipped && <span className="equipped-badge">Équipé</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Inventory; 