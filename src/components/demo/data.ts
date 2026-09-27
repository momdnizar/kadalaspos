export const menu = [
  {
    name: "Cappuccino",
    category: "Coffee",
    price: 140,
    stock: 24,
    image: "photo-1572442388796-11668a67e53d",
  },
  {
    name: "Iced Latte",
    category: "Coffee",
    price: 160,
    stock: 18,
    image: "photo-1461023058943-07fcbe16d735",
  },
  {
    name: "Butter Croissant",
    category: "Bakery",
    price: 120,
    stock: 4,
    image: "photo-1555507036-ab1f4038808a",
  },
  {
    name: "Classic Burger",
    category: "Food",
    price: 220,
    stock: 16,
    image: "photo-1568901346375-23c9450c58cd",
  },
  {
    name: "Margherita Pizza",
    category: "Food",
    price: 280,
    stock: 12,
    image: "photo-1574071318508-1cdbab80d002",
  },
  {
    name: "Chocolate Cake",
    category: "Bakery",
    price: 180,
    stock: 3,
    image: "photo-1578985545062-69928b1d9587",
  },
];
export type DemoTab = "billing" | "tables" | "inventory" | "reports" | "orders";
export type DemoOrder = {
  id: number;
  table: number;
  total: number;
  count: number;
  status: "Preparing" | "Ready" | "Served";
};
export const initialOrders: DemoOrder[] = [
  { id: 1041, table: 2, total: 336, count: 2, status: "Preparing" },
  { id: 1040, table: 5, total: 462, count: 3, status: "Ready" },
];
export const money = (value: number) =>
  `₹${value.toLocaleString("en-IN", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
