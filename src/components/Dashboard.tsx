import {
  BarChart3,
  Bell,
  ChevronDown,
  Coffee,
  CreditCard,
  Grid2X2,
  LayoutDashboard,
  Package,
  Search,
  Settings,
  ShoppingBag,
  UtensilsCrossed,
  Plus,
  Minus,
} from "lucide-react";
import { useState } from "react";
import BrandMark from "./BrandMark";
export type Screen = "billing" | "tables" | "reports";
const foods = [
  {
    name: "Cappuccino",
    category: "Coffee",
    price: 140,
    image: "photo-1572442388796-11668a67e53d",
  },
  {
    name: "Iced Latte",
    category: "Coffee",
    price: 160,
    image: "photo-1461023058943-07fcbe16d735",
  },
  {
    name: "Butter Croissant",
    category: "Bakery",
    price: 120,
    image: "photo-1555507036-ab1f4038808a",
  },
  {
    name: "Classic Burger",
    category: "Food",
    price: 220,
    image: "photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Margherita Pizza",
    category: "Food",
    price: 280,
    image: "photo-1574071318508-1cdbab80d002",
  },
  {
    name: "Chocolate Cake",
    category: "Bakery",
    price: 180,
    image: "photo-1578985545062-69928b1d9587",
  },
];
export default function Dashboard({
  screen = "billing",
  compact = false,
}: {
  screen?: Screen;
  compact?: boolean;
}) {
  const [category, setCategory] = useState("All items");
  const [query, setQuery] = useState("");
  const [cart, setCart] = useState([1, 0, 1, 0, 0, 0]);
  const [paid, setPaid] = useState(false);
  const [table, setTable] = useState(4);
  const total = foods.reduce((sum, food, i) => sum + food.price * cart[i], 0);
  function add(i: number, amount = 1) {
    setPaid(false);
    setCart((old) =>
      old.map((n, j) => (j === i ? Math.max(0, n + amount) : n)),
    );
  }
  return (
    <div className={`dashboard ${compact ? "dashboard-compact" : ""}`}>
      <div className="dash-top">
        <strong>
          <BrandMark className="pos-wordmark" />
        </strong>
        <span>
          The Daily Brew <ChevronDown size={10} />
        </span>
        <div>
          <span className="online-dot" /> Online <Bell size={13} />
          <span className="avatar">AK</span>
        </div>
      </div>
      <div className="dash-body">
        <aside className="dash-sidebar">
          <span className={screen === "reports" ? "selected" : ""}>
            <LayoutDashboard />
          </span>
          <span className={screen === "billing" ? "selected" : ""}>
            <UtensilsCrossed />
          </span>
          <span className={screen === "tables" ? "selected" : ""}>
            <Grid2X2 />
          </span>
          <span>
            <ShoppingBag />
          </span>
          <span>
            <Package />
          </span>
          <span>
            <BarChart3 />
          </span>
          <span className="sidebar-bottom">
            <Settings />
          </span>
        </aside>
        <div className="dash-content">
          {screen === "billing" ? (
            <>
              <div className="dash-title">
                <div>
                  <h3>Let’s serve something good.</h3>
                  <p>A fresh day. A great service.</p>
                </div>
                <span className="date-pill">
                  Dine-in <ChevronDown size={10} />
                </span>
              </div>
              <div className="billing-columns">
                <div className="menu-products">
                  <label className="dash-search">
                    <Search size={13} />
                    <input
                      aria-label="Search menu items"
                      placeholder="Search for an item..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                    <span>⌘ K</span>
                  </label>
                  <div className="categories">
                    {["All items", "Coffee", "Food", "Bakery"].map((c) => (
                      <button
                        key={c}
                        onClick={() => setCategory(c)}
                        className={category === c ? "active" : ""}
                      >
                        {c}
                      </button>
                    ))}
                  </div>
                  <div className="food-grid">
                    {foods.map(
                      (food, i) =>
                        (category === "All items" ||
                          food.category === category) &&
                        food.name
                          .toLowerCase()
                          .includes(query.toLowerCase()) && (
                          <button
                            className="food-card"
                            key={food.name}
                            onClick={() => add(i)}
                            aria-label={`Add ${food.name}`}
                          >
                            <img
                              src={`https://images.unsplash.com/${food.image}?auto=format&fit=crop&w=240&q=80`}
                              alt={food.name}
                              loading="lazy"
                            />
                            <strong>{food.name}</strong>
                            <div>
                              <span>₹{food.price.toFixed(2)}</span>
                              <span className="food-add">
                                <Plus size={11} />
                              </span>
                            </div>
                          </button>
                        ),
                    )}
                  </div>
                  {!foods.some(
                    (f) =>
                      (category === "All items" || f.category === category) &&
                      f.name.toLowerCase().includes(query.toLowerCase()),
                  ) && (
                    <p className="empty-menu">
                      No items found. Try another search.
                    </p>
                  )}
                </div>
                <div className="order-panel">
                  <div className="order-title">
                    <strong>Current order</strong>
                    <span>#{1042}</span>
                  </div>
                  <div className="order-table">
                    <UtensilsCrossed size={12} /> Table 04 <span>2 guests</span>
                  </div>
                  <div className="order-items">
                    {foods.map(
                      (f, i) =>
                        cart[i] > 0 && (
                          <div className="order-item" key={f.name}>
                            <div>
                              <strong>{f.name}</strong>
                              <span>₹{f.price * cart[i]}.00</span>
                            </div>
                            <div className="quantity">
                              <button
                                aria-label={`Remove ${f.name}`}
                                onClick={() => add(i, -1)}
                              >
                                <Minus size={9} />
                              </button>
                              <span>{cart[i]}</span>
                              <button
                                aria-label={`Increase ${f.name}`}
                                onClick={() => add(i)}
                              >
                                <Plus size={9} />
                              </button>
                            </div>
                          </div>
                        ),
                    )}
                  </div>
                  <div className="order-summary">
                    <div>
                      Subtotal<span>₹{total.toFixed(2)}</span>
                    </div>
                    <div>
                      Tax (5%)<span>₹{(total * 0.05).toFixed(2)}</span>
                    </div>
                    <div className="order-total">
                      Total<span>₹{(total * 1.05).toFixed(2)}</span>
                    </div>
                    <button
                      className="pay-button"
                      disabled={!total || paid}
                      onClick={() => setPaid(true)}
                    >
                      <CreditCard size={12} />
                      {paid ? "Demo payment complete ✓" : "Proceed to payment"}
                    </button>
                    <small>Interactive demo · no real payments</small>
                  </div>
                </div>
              </div>
            </>
          ) : screen === "tables" ? (
            <>
              <div className="dash-title">
                <div>
                  <h3>A place for every guest.</h3>
                  <p>Your floor, at a glance.</p>
                </div>
                <span className="date-pill">Main floor</span>
              </div>
              <div className="table-legend">
                <span>
                  <i className="online-dot" /> Available
                </span>
                <span>
                  <i className="busy-dot" /> Occupied
                </span>
              </div>
              <div className="tables-grid">
                {Array.from({ length: 12 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setTable(i + 1)}
                    className={`table-card ${[1, 3, 6, 8].includes(i) ? "occupied" : ""} ${table === i + 1 ? "chosen" : ""}`}
                  >
                    <UtensilsCrossed />
                    <strong>Table {String(i + 1).padStart(2, "0")}</strong>
                    <span>
                      {[1, 3, 6, 8].includes(i)
                        ? "Occupied · 2 guests"
                        : "Available · 4 seats"}
                    </span>
                  </button>
                ))}
              </div>
              <p className="table-selection">
                Table {String(table).padStart(2, "0")} selected ·{" "}
                {[2, 4, 7, 9].includes(table)
                  ? "Order in progress"
                  : "Ready for your next guests"}
              </p>
            </>
          ) : (
            <>
              <div className="dash-title">
                <div>
                  <h3>Good things are growing.</h3>
                  <p>Here’s how your business is doing today.</p>
                </div>
                <span className="date-pill">
                  This week <ChevronDown size={10} />
                </span>
              </div>
              <div className="stat-grid">
                {[
                  ["Total sales", "₹24,580", "+12.8%"],
                  ["Orders served", "148", "+8.2%"],
                  ["Average order", "₹166", "+4.3%"],
                ].map(([title, value, change]) => (
                  <div key={title}>
                    <span>{title}</span>
                    <strong>{value}</strong>
                    <small>
                      {change} <span>vs. last week</span>
                    </small>
                  </div>
                ))}
              </div>
              <div className="chart-card">
                <strong>Sales overview</strong>
                <span>This week</span>
                <div className="bar-chart">
                  {[42, 65, 51, 78, 60, 95, 83].map((height, i) => (
                    <div key={i}>
                      <div style={{ height: `${height}%` }} />
                      <span>
                        {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              <div className="report-bottom">
                <Coffee size={17} />
                <strong>Your bestseller</strong>
                <span>Cappuccino</span>
                <span>42 orders this week</span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
