import { useEffect, useState } from "react";
import { Package } from "lucide-react";

interface Order {
  id: number;
  customer: string;
  product: string;
  time: string;
}

const mockOrders: Order[] = [
  { id: 1, customer: "Alex M.", product: "UltraBook Pro", time: "2 min ago" },
  { id: 2, customer: "Sarah K.", product: "Phone X Pro", time: "5 min ago" },
  { id: 3, customer: "Mike R.", product: "UltraBook Pro", time: "8 min ago" },
  { id: 4, customer: "Emma L.", product: "Phone X Pro", time: "12 min ago" },
];

export const LiveOrder = ({ order }: { order: Order }) => {
  const [isNew, setIsNew] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsNew(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`flex items-center gap-4 p-4 rounded-lg border border-border/50 bg-card/30 backdrop-blur-sm transition-smooth ${
        isNew ? "animate-pulse shadow-glow" : ""
      }`}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
        <Package className="w-5 h-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {order.customer} purchased <span className="text-primary">{order.product}</span>
        </p>
        <p className="text-xs text-muted-foreground">{order.time}</p>
      </div>
      {isNew && (
        <span className="flex-shrink-0 px-2 py-1 text-xs font-semibold rounded-full bg-primary/20 text-primary">
          New
        </span>
      )}
    </div>
  );
};

export const LiveOrdersList = () => {
  const [orders, setOrders] = useState(mockOrders);

  useEffect(() => {
    const interval = setInterval(() => {
      const newOrder: Order = {
        id: Date.now(),
        customer: ["Jordan P.", "Taylor S.", "Casey W.", "Morgan B."][Math.floor(Math.random() * 4)],
        product: ["UltraBook Pro", "Phone X Pro"][Math.floor(Math.random() * 2)],
        time: "Just now",
      };
      setOrders((prev) => [newOrder, ...prev.slice(0, 3)]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      {orders.map((order) => (
        <LiveOrder key={order.id} order={order} />
      ))}
    </div>
  );
};
