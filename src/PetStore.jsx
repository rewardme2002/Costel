import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";

const products = [
  {
    name: "Zgarda personalizată pentru pisici",
    category: "Accesorii",
    description: "Zgarda cu nume gravat și cod QR pentru identificare.",
    price: 49.0,
    tag: "personalizat"
  },
  {
    name: "Mobilier eco pentru pisici - model Sfera",
    category: "Mobilier",
    description: "Piesă de mobilier sustenabilă, din lemn reciclat.",
    price: 289.0,
    tag: "ecologic"
  },
  {
    name: "Dozator inteligent hrană pisici - WiFi",
    category: "Gadgeturi",
    description: "Controlează programul de hrănire prin aplicație.",
    price: 399.0,
    tag: "smart"
  },
  {
    name: "Nisip igienic bio pentru pisici - 10L",
    category: "Igienă",
    description: "Nisip natural, compostabil, fără parfumuri toxice.",
    price: 36.0,
    tag: "ecologic"
  },
  {
    name: "Jucărie interactivă - LED & mișcare automată",
    category: "Jucării",
    description: "Stimulează pisica prin lumină și mișcare aleatoare.",
    price: 89.0,
    tag: "smart"
  }
];

export default function PetStore() {
  const [cart, setCart] = useState([]);
  const [points, setPoints] = useState(0);

  const addToCart = (product) => {
    setCart([...cart, product]);
    setPoints(points + Math.round(product.price / 10)); // 1 punct la 10 RON
  };

  const totalPrice = cart.reduce((total, item) => total + item.price, 0);
  const discount = Math.min(points, 50); // max 50 RON reducere
  const finalPrice = totalPrice - discount;

  return (
    <div className="p-4 max-w-5xl mx-auto font-sans">
      <header className="text-center py-6">
        <h1 className="text-4xl font-bold text-purple-700 mb-2">PisicExpress.ro</h1>
        <p className="text-gray-600">Produse inteligente, ecologice și personalizate pentru pisici fericite.</p>
      </header>

      <div className="flex flex-wrap gap-3 justify-center my-4">
        <FilterButton label="Toate" tag="" />
        <FilterButton label="Gadgeturi inteligente" tag="smart" />
        <FilterButton label="Produse ecologice" tag="ecologic" />
        <FilterButton label="Accesorii personalizate" tag="personalizat" />
      </div>

      <ProductGrid products={products} addToCart={addToCart} />

      <section className="mt-10 border-t pt-6">
        <h2 className="text-2xl font-semibold mb-4">Coșul tău</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Coșul este gol.</p>
        ) : (
          <>
            <ul className="mb-4">
              {cart.map((item, index) => (
                <li key={index} className="flex justify-between text-sm mb-1">
                  <span>{item.name}</span>
                  <span>{item.price.toFixed(2)} RON</span>
                </li>
              ))}
            </ul>
            <p className="text-sm text-green-700 mb-2">Puncte acumulate: <strong>{points}</strong> (valoare reducere: {discount} RON)</p>
            <p className="font-bold">Total: {finalPrice.toFixed(2)} RON</p>
            <button className="mt-3 bg-purple-600 text-white px-4 py-2 rounded-md">Finalizează comanda</button>
          </>
        )}
      </section>

      <footer className="text-center text-sm text-gray-400 mt-10">
        © 2025 PisicExpress.ro - Toate drepturile rezervate.
      </footer>
    </div>
  );
}

function ProductGrid({ products, addToCart }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {products.map((product, index) => (
        <div key={index} className="bg-white p-4 shadow-md rounded-xl hover:shadow-lg transition-all">
          <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
          <p className="text-gray-500 text-sm mb-3">{product.description}</p>
          <div className="flex items-center justify-between">
            <span className="font-bold text-purple-600">{product.price.toFixed(2)} RON</span>
            <button
              onClick={() => addToCart(product)}
              className="border border-purple-500 text-purple-700 px-2 py-1 rounded-md text-sm flex items-center"
            >
              <ShoppingCart className="h-4 w-4 mr-1" /> Adaugă
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

function FilterButton({ label, tag }) {
  return (
    <button className="bg-gray-100 hover:bg-purple-100 text-sm px-4 py-1 rounded-full text-gray-700">
      {label}
    </button>
  );
}
