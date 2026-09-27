import { useState } from "react";
import { Search, Plus, Minus, CreditCard, ShoppingBag } from "lucide-react";
import { menu, money } from "./data";
export default function Billing({
  cart,
  stock,
  table,
  add,
  pay,
  paid,
}: {
  cart: number[];
  stock: number[];
  table: number;
  add: (index: number, amount: number) => void;
  pay: () => void;
  paid: boolean;
}) {
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const items = menu
    .map((item, index) => ({ ...item, index }))
    .filter(
      (item) =>
        (category === "All items" || category === item.category) &&
        item.name.toLowerCase().includes(query.toLowerCase()),
    );
  const subtotal = menu.reduce((sum, item, i) => sum + item.price * cart[i], 0);
  return (
    <div className="live-billing">
      <div className="live-menu">
        <div className="live-view-heading">
          <div>
            <h3>What’s the order?</h3>
            <p>Tap an item. You’re already doing it.</p>
          </div>
          <span className="demo-chip">Dine-in</span>
        </div>
        <label className="live-search">
          <Search size={17} />
          <input
            aria-label="Search menu items"
            placeholder="Search your menu…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
        <div className="live-categories" aria-label="Menu categories">
          {["All items", "Coffee", "Food", "Bakery"].map((c) => (
            <button
              key={c}
              aria-pressed={category === c}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
        </div>
        <div className="live-food-grid">
          {items.map((item) => (
            <button
              className="live-food"
              key={item.name}
              aria-label={`Add ${item.name}`}
              disabled={cart[item.index] >= stock[item.index]}
              onClick={() => add(item.index, 1)}
            >
              <img
                src={`https://images.unsplash.com/${item.image}?auto=format&fit=crop&w=360&q=80`}
                alt=""
                loading="lazy"
              />
              <strong>{item.name}</strong>
              <span>
                {money(item.price)}
                <span className="live-food-plus">
                  <Plus size={15} />
                </span>
              </span>
            </button>
          ))}
        </div>
        {!items.length && (
          <p className="demo-empty">No matches. Try another item.</p>
        )}
      </div>
      <aside className="live-cart" aria-label="Current order">
        <div className="live-cart-heading">
          <h3>Current order</h3>
          <span>Table {String(table).padStart(2, "0")}</span>
        </div>
        <div className="live-cart-items">
          {cart.some(Boolean) ? (
            menu.map(
              (item, i) =>
                cart[i] > 0 && (
                  <div className="live-cart-item" key={item.name}>
                    <div>
                      <strong>{item.name}</strong>
                      <span>{money(item.price * cart[i])}</span>
                    </div>
                    <div className="live-quantity">
                      <button
                        aria-label={`Remove ${item.name}`}
                        onClick={() => add(i, -1)}
                      >
                        <Minus size={12} />
                      </button>
                      <span>{cart[i]}</span>
                      <button
                        aria-label={`Increase ${item.name}`}
                        disabled={cart[i] >= stock[i]}
                        onClick={() => add(i, 1)}
                      >
                        <Plus size={12} />
                      </button>
                    </div>
                  </div>
                ),
            )
          ) : (
            <div className="demo-empty">
              <ShoppingBag size={25} />
              <p>
                {paid
                  ? "All sorted. Try another order."
                  : "Your next order starts with a tap."}
              </p>
            </div>
          )}
        </div>
        <div className="live-totals">
          <div>
            Subtotal<span>{money(subtotal)}</span>
          </div>
          <div>
            Demo tax (5%)<span>{money(subtotal * 0.05)}</span>
          </div>
          <div className="live-total">
            Total<strong>{money(subtotal * 1.05)}</strong>
          </div>
          <button
            className="button live-pay"
            disabled={!subtotal}
            onClick={pay}
          >
            <CreditCard size={16} /> Complete demo sale
          </button>
          <small>Sample data. No real payment.</small>
        </div>
      </aside>
    </div>
  );
}
