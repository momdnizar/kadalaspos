import { useState } from "react";
import {
  ReceiptText,
  Grid2X2,
  Package,
  ChartNoAxesCombined,
  ClipboardList,
  RotateCcw,
  ArrowRight,
  X,
  Check,
} from "lucide-react";
import BrandMark from "./BrandMark";
import Billing from "./demo/Billing";
import { Tables, Inventory, Reports, Orders } from "./demo/Views";
import { menu, initialOrders, money } from "./demo/data";
import type { DemoTab } from "./demo/data";
const tabs = [
  { id: "billing", label: "Billing", icon: ReceiptText },
  { id: "tables", label: "Tables", icon: Grid2X2 },
  { id: "inventory", label: "Inventory", icon: Package },
  { id: "reports", label: "Reports", icon: ChartNoAxesCombined },
  { id: "orders", label: "Orders", icon: ClipboardList },
] as const;
const tourSteps: { tab: DemoTab; title: string; text: string }[] = [
  {
    tab: "billing",
    title: "01 · Make a sale",
    text: "Tap a menu item, then complete your demo sale.",
  },
  {
    tab: "tables",
    title: "02 · Pick a table",
    text: "Select any table. Your order follows you.",
  },
  {
    tab: "reports",
    title: "03 · See the result",
    text: "Your sales appear here. Explore the rest at your pace.",
  },
];
export default function ProductExperience({
  tour,
  setTour,
}: {
  tour: number | null;
  setTour: (step: number | null) => void;
}) {
  const [selectedTab, setTab] = useState<DemoTab>("billing");
  const tab = tour === null ? selectedTab : tourSteps[tour].tab;
  const [cart, setCart] = useState([1, 0, 1, 0, 0, 0]);
  const [stock, setStock] = useState(menu.map((item) => item.stock));
  const [orders, setOrders] = useState(initialOrders);
  const [table, setTable] = useState(4);
  const [message, setMessage] = useState("");
  const [paid, setPaid] = useState(false);
  const [resetVersion, setResetVersion] = useState(0);
  function changeTab(next: DemoTab) {
    setTab(next);
    setTour(null);
  }
  function pay() {
    const total =
      menu.reduce((sum, item, i) => sum + item.price * cart[i], 0) * 1.05;
    if (!total) return;
    const id = 1042 + orders.length - initialOrders.length;
    setOrders((old) => [
      ...old,
      {
        id,
        table,
        total,
        count: cart.reduce((a, b) => a + b, 0),
        status: "Preparing",
      },
    ]);
    setStock((old) => old.map((n, i) => n - cart[i]));
    setCart(menu.map(() => 0));
    setPaid(true);
    setMessage(
      `Sale #${id} complete · ${money(total)}. Stock and reports updated.`,
    );
  }
  function reset() {
    setResetVersion((version) => version + 1);
    setCart([1, 0, 1, 0, 0, 0]);
    setStock(menu.map((item) => item.stock));
    setOrders(initialOrders);
    setTable(4);
    setPaid(false);
    changeTab("billing");
    setMessage("Demo reset. All yours.");
  }
  return (
    <section
      id="demo"
      className="product-experience container"
      aria-labelledby="demo-heading"
      tabIndex={-1}
    >
      <div className="experience-caption">
        <h2 id="demo-heading">
          <span className="live-dot" /> This is your POS. Give it a go.
        </h2>
        <span>No sign-up. No card. Just try.</span>
      </div>
      <div className="live-pos">
        <div className="live-topbar">
          <BrandMark className="live-wordmark" />
          <span className="live-business">
            The Daily Brew <span>Demo workspace</span>
          </span>
          <button className="demo-reset" onClick={reset}>
            <RotateCcw size={14} />
            <span>Reset demo</span>
          </button>
        </div>
        <div
          className="live-tabs"
          role="tablist"
          aria-label="Explore POS functions"
        >
          {tabs.map(({ id, label, icon: Icon }, i) => (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-controls="demo-panel"
              aria-selected={tab === id}
              tabIndex={tab === id ? 0 : -1}
              onClick={() => changeTab(id)}
              onKeyDown={(e) => {
                if (!["ArrowLeft", "ArrowRight", "Home", "End"].includes(e.key))
                  return;
                e.preventDefault();
                const next =
                  e.key === "Home"
                    ? 0
                    : e.key === "End"
                      ? tabs.length - 1
                      : (i + (e.key === "ArrowRight" ? 1 : -1) + tabs.length) %
                        tabs.length;
                changeTab(tabs[next].id);
                document.getElementById(`tab-${tabs[next].id}`)?.focus();
              }}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>
        {tour !== null && (
          <div className="live-tour">
            <div>
              <strong>{tourSteps[tour].title}</strong>
              <p>{tourSteps[tour].text}</p>
            </div>
            <button
              className="demo-outline"
              onClick={() => {
                if (tour === 2) {
                  setTab("reports");
                  setTour(null);
                } else setTour(tour + 1);
              }}
            >
              {tour === 2 ? "Explore freely" : "Next"}
              <ArrowRight size={14} />
            </button>
            <button
              className="tour-close"
              aria-label="Close walkthrough"
              onClick={() => {
                setTab(tab);
                setTour(null);
              }}
            >
              <X size={17} />
            </button>
          </div>
        )}
        <div
          id="demo-panel"
          className="live-panel"
          role="tabpanel"
          aria-labelledby={`tab-${tab}`}
          tabIndex={0}
        >
          {tab === "billing" && (
            <Billing
              key={resetVersion}
              cart={cart}
              stock={stock}
              table={table}
              paid={paid}
              add={(i, amount) => {
                setCart((old) =>
                  old.map((n, j) =>
                    j === i ? Math.max(0, Math.min(stock[i], n + amount)) : n,
                  ),
                );
                setPaid(false);
                setMessage("");
              }}
              pay={pay}
            />
          )}
          {tab === "tables" && (
            <Tables
              table={table}
              orders={orders}
              select={(n) => {
                setTable(n);
                changeTab("billing");
                setMessage(
                  `Table ${String(n).padStart(2, "0")} selected. Add an item to begin.`,
                );
              }}
            />
          )}
          {tab === "inventory" && (
            <Inventory
              stock={stock}
              restock={(i) => {
                setStock((old) => old.map((n, j) => (j === i ? n + 10 : n)));
                setMessage(`${menu[i].name}: 10 added to stock.`);
              }}
            />
          )}
          {tab === "reports" && <Reports orders={orders} />}
          {tab === "orders" && (
            <Orders
              orders={orders}
              advance={(id) => {
                setOrders((old) =>
                  old.map((o) =>
                    o.id === id
                      ? {
                          ...o,
                          status: o.status === "Preparing" ? "Ready" : "Served",
                        }
                      : o,
                  ),
                );
                setMessage(`Order #${id} updated.`);
              }}
            />
          )}
        </div>
        <div className="live-status" role="status">
          {message ? (
            <>
              <Check size={14} />
              {message}
            </>
          ) : (
            <>
              <span className="live-dot" />
              Interactive demo · changes stay in this session
            </>
          )}
        </div>
      </div>
      <div className="experience-footnote">
        <span>One screen. Your whole day.</span>
        <a href="#product">
          Explore all features <ArrowRight size={13} />
        </a>
      </div>
    </section>
  );
}
