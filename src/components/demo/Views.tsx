import { Check, Plus, UtensilsCrossed } from "lucide-react";
import { menu, money } from "./data";
import type { DemoOrder } from "./data";
export function Tables({
  table,
  orders,
  select,
}: {
  table: number;
  orders: DemoOrder[];
  select: (table: number) => void;
}) {
  return (
    <div className="live-view">
      <div className="live-view-heading">
        <div>
          <h3>Your floor. At a glance.</h3>
          <p>Select a table to start billing.</p>
        </div>
        <span className="demo-chip">Main floor</span>
      </div>
      <div className="live-table-grid">
        {Array.from({ length: 12 }, (_, i) => {
          const occupied = orders.some(
            (o) => o.table === i + 1 && o.status !== "Served",
          );
          return (
            <button
              key={i}
              className={`live-table ${occupied ? "is-occupied" : ""} ${table === i + 1 ? "is-selected" : ""}`}
              aria-label={`Select Table ${String(i + 1).padStart(2, "0")}`}
              onClick={() => select(i + 1)}
            >
              <UtensilsCrossed size={23} />
              <strong>Table {String(i + 1).padStart(2, "0")}</strong>
              <span>{occupied ? "Occupied" : "Available"} · 4 seats</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
export function Inventory({
  stock,
  restock,
}: {
  stock: number[];
  restock: (index: number) => void;
}) {
  return (
    <div className="live-view">
      <div className="live-view-heading">
        <div>
          <h3>Stay stocked.</h3>
          <p>Sales update stock. Try a restock.</p>
        </div>
        <span className="demo-chip">
          {stock.filter((n) => n < 5).length} low-stock items
        </span>
      </div>
      <div className="live-stock-list">
        {menu.map((item, i) => (
          <div className="live-stock-row" key={item.name}>
            <div>
              <strong>{item.name}</strong>
              <span>{item.category}</span>
            </div>
            <span className={`stock-count ${stock[i] < 5 ? "is-low" : ""}`}>
              {stock[i]} in stock
            </span>
            <button
              className="demo-outline"
              aria-label={`Restock ${item.name}`}
              onClick={() => restock(i)}
            >
              <Plus size={14} /> Add 10
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export function Reports({ orders }: { orders: DemoOrder[] }) {
  const revenue = orders.reduce((sum, order) => sum + order.total, 0);
  return (
    <div className="live-view">
      <div className="live-view-heading">
        <div>
          <h3>Your numbers. Made clear.</h3>
          <p>Complete a demo sale to see these update.</p>
        </div>
        <span className="demo-chip">Sample day</span>
      </div>
      <div className="live-stats">
        {[
          ["Sales", money(revenue)],
          ["Orders", String(orders.length)],
          ["Average order", money(orders.length ? revenue / orders.length : 0)],
        ].map(([label, value]) => (
          <div key={label}>
            <span>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <div className="live-chart">
        <h4>Today’s sales</h4>
        <div
          className="live-bars"
          role="img"
          aria-label={`Example hourly sales chart. Current demo sales total ${money(revenue)}.`}
        >
          {[
            28,
            44,
            37,
            68,
            51,
            Math.min(100, 60 + (orders.length - 2) * 8),
          ].map((height, i) => (
            <div key={i}>
              <div style={{ height: `${height}%` }} />
              <span>
                {["9 am", "10 am", "11 am", "12 pm", "1 pm", "Now"][i]}
              </span>
            </div>
          ))}
        </div>
        <small>Illustrative trend · totals reflect your demo sales</small>
      </div>
    </div>
  );
}
export function Orders({
  orders,
  advance,
}: {
  orders: DemoOrder[];
  advance: (id: number) => void;
}) {
  return (
    <div className="live-view">
      <div className="live-view-heading">
        <div>
          <h3>Every order, in hand.</h3>
          <p>Move an order from preparing to served.</p>
        </div>
        <span className="demo-chip">
          {orders.filter((o) => o.status !== "Served").length} active
        </span>
      </div>
      <div className="live-orders">
        {[...orders].reverse().map((order) => (
          <div className="live-order-card" key={order.id}>
            <div>
              <strong>#{order.id}</strong>
              <span
                className={`order-status status-${order.status.toLowerCase()}`}
              >
                {order.status}
              </span>
            </div>
            <h4>Table {String(order.table).padStart(2, "0")}</h4>
            <p>
              {order.count} items · {money(order.total)}
            </p>
            <button
              className="demo-outline"
              disabled={order.status === "Served"}
              onClick={() => advance(order.id)}
            >
              <Check size={14} />
              {order.status === "Preparing"
                ? "Mark ready"
                : order.status === "Ready"
                  ? "Mark served"
                  : "Served"}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
