import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  description: string;
  image: string;
}

export const ProductCard = ({ id, name, price, description, image }: ProductCardProps) => {
  const { addItem } = useCart();

  const handleBuy = () => {
    addItem({ id, name, price, image });
  };

  const handleWishlist = () => {
    toast.success(`${name} added to wishlist!`);
  };

  return (
    <Card className="gradient-card shadow-card border-border/50 overflow-hidden group hover:shadow-glow transition-smooth">
      <div className="aspect-video overflow-hidden bg-muted/30">
        <img
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-smooth"
        />
      </div>
      <div className="p-6 space-y-4">
        <div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{name}</h3>
          <p className="text-muted-foreground mb-3">{description}</p>
          <p className="text-3xl font-bold gradient-primary bg-clip-text text-transparent">
            ${price.toFixed(2)}
          </p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="buy" 
            size="lg" 
            className="flex-1"
            onClick={handleBuy}
          >
            <ShoppingCart className="w-4 h-4" />
            Buy Now
          </Button>
          <Button 
            variant="wishlist" 
            size="lg"
            onClick={handleWishlist}
          >
            <Heart className="w-4 h-4" />
            Wishlist
          </Button>
        </div>
      </div>
    </Card>
  );
};
