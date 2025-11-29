import { ProductCard } from "@/components/ProductCard";
import { LiveOrdersList } from "@/components/LiveOrder";
import { Zap } from "lucide-react";
import { toast } from "sonner";
import laptopImage from "@/assets/laptop.jpg";
import phoneImage from "@/assets/phone.jpg";

const Index = () => {
  const handleBuy = (productName: string) => {
    toast.success(`${productName} added to cart!`, {
      description: "Proceed to checkout to complete your purchase.",
    });
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 backdrop-blur-lg sticky top-0 z-50 bg-background/80">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-primary flex items-center justify-center">
              <Zap className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">TechStore</h1>
              <p className="text-xs text-muted-foreground">Premium Tech Devices</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 space-y-16">
        {/* Hero Section */}
        <section className="text-center space-y-4">
          <h2 className="text-5xl md:text-6xl font-bold">
            <span className="gradient-primary bg-clip-text text-transparent">
              Next-Gen
            </span>{" "}
            <span className="text-foreground">Tech</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Discover cutting-edge devices designed for the future
          </p>
        </section>

        {/* Product Grid */}
        <section>
          <h3 className="text-3xl font-bold mb-8 text-foreground">Featured Products</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <ProductCard
              name="UltraBook Pro"
              price="$1,299"
              description="Powerful performance with stunning display and all-day battery life"
              image={laptopImage}
              onBuy={() => handleBuy("UltraBook Pro")}
            />
            <ProductCard
              name="Phone X Pro"
              price="$899"
              description="Advanced camera system, lightning-fast processor, and immersive display"
              image={phoneImage}
              onBuy={() => handleBuy("Phone X Pro")}
            />
          </div>
        </section>

        {/* Recent Live Orders */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <h3 className="text-3xl font-bold text-foreground">Recent Live Orders</h3>
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-primary"></span>
            </span>
          </div>
          <LiveOrdersList />
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-16">
        <div className="container mx-auto px-4 py-8">
          <p className="text-center text-muted-foreground text-sm">
            © 2024 TechStore. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
