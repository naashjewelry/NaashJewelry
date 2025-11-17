import React, { useState } from 'react';

/**
 * Composant NaashJewelry — version robuste qui ne casse pas si
 * il manque des images. Colle ce fichier dans src/JewelryShop.js
 */

const products = [
  { id: 1, name: 'Collier Serpent Signature', price: 120, shortDesc: 'Chaîne fine plaqué or 14k.', image: '/images/necklace1.jpg' },
  { id: 2, name: 'Bague Éclat Lunaire', price: 80, shortDesc: 'Bague en argent sterling avec pierre.', image: '/images/ring1.jpg' },
  { id: 3, name: "Boucles d'oreilles Soleil", price: 60, shortDesc: 'Boucles pendantes, plaqué or.', image: '/images/earrings1.jpg' }
];

export default function JewelryShop({ brandName = 'NaashJewelry' }) {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart(prev => [...prev, product]);
  };

  // remplace l'image par une zone neutre si l'image ne se charge pas
  const handleImgError = (e) => {
    e.target.style.display = 'none';
    const placeholder = document.createElement('div');
    placeholder.style.width = '100%';
    placeholder.style.height = '200px';
    placeholder.style.background = '#f3f3f3';
    placeholder.style.display = 'flex';
    placeholder.style.alignItems = 'center';
    placeholder.style.justifyContent = 'center';
    placeholder.style.color = '#888';
    placeholder.innerText = 'Image non disponible';
    e.target.parentNode.insertBefore(placeholder, e.target.nextSibling);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'Arial, sans-serif' }}>
      <h1 style={{ fontSize: 28, marginBottom: 16 }}>{brandName}</h1>

      <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
        {products.map(p => (
          <div key={p.id} style={{ width: 260, border: '1px solid #e6e6e6', borderRadius: 8, padding: 12 }}>
            <div style={{ width: '100%', height: 200, overflow: 'hidden', borderRadius: 6, marginBottom: 10 }}>
              <img
                src={p.image}
                alt={p.name}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={handleImgError}
              />
            </div>
            <h2 style={{ fontSize: 16, margin: '6px 0' }}>{p.name}</h2>
            <p style={{ fontSize: 13, color: '#555', margin: '6px 0' }}>{p.shortDesc}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
              <strong>{p.price}€</strong>
              <button
                onClick={() => addToCart(p)}
                style={{ background: '#000', color: '#fff', padding: '8px 10px', border: 'none', borderRadius: 6, cursor: 'pointer' }}
              >
                Ajouter
              </button>
            </div>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div style={{ marginTop: 24, borderTop: '1px solid #eee', paddingTop: 12 }}>
          <h3>Panier</h3>
          {cart.map((item, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0' }}>
              <span>{item.name}</span>
              <span>{item.price}€</span>
            </div>
          ))}
          <div style={{ fontWeight: 700, marginTop: 8 }}>
            Total : {cart.reduce((s, it) => s + it.price, 0)}€
          </div>
        </div>
      )}
    </div>
  );
}
