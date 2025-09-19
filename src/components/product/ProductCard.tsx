import { useState, useRef } from 'react';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { useNavigate } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  isNew?: boolean;
  isOnSale?: boolean;
  rating?: number;
  colors?: string[];
}

interface ProductCardProps {
  product: Product;
  className?: string;
  // Remove all callback props to prevent double calls
}

export const ProductCard = ({
  product,
  className,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { addItem } = useCart();
  const { has, toggle } = useWishlist();
  const { toast } = useToast();
  const navigate = useNavigate();
  const inWishlist = has(product.id);
  const lastAddTimeRef = useRef<number>(0);

  const discountPercentage = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Prevent rapid successive calls (debounce)
    const now = Date.now();
    if (now - lastAddTimeRef.current < 1000) {
      console.log('Preventing duplicate add to cart call');
      return;
    }
    lastAddTimeRef.current = now;
    
    // Prevent if already adding
    if (isAdding) {
      console.log('Already adding to cart, ignoring');
      return;
    }
    
    setIsAdding(true);
    console.log('Adding to cart:', product.id);
    
    try {
      // Add item to cart - ONLY call this once
      addItem(product.id, { quantity: 1 });
      
      // Show toast notification
      toast({ 
        title: 'Added to Cart', 
        description: `${product.name} added to your cart.` 
      });
    } catch (error) {
      console.error('Error adding to cart:', error);
    }
    
    // Reset adding state after delay
    setTimeout(() => {
      setIsAdding(false);
    }, 1000);
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const wasInWishlist = inWishlist;
    toggle(product.id);
    
    toast({
      title: wasInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
      description: wasInWishlist 
        ? `${product.name} removed from your wishlist.`
        : `${product.name} added to your wishlist.`,
    });
  };

  const handleQuickView = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigate(`/product/${product.id}`);
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <div
      className={cn(
        "group relative bg-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer",
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
    >
      {/* Image container */}
      <div className="relative aspect-[3/4] bg-muted overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className={cn(
            "w-full h-full object-cover transition-all duration-500 group-hover:scale-105",
            imageLoaded ? "opacity-100" : "opacity-0"
          )}
          onLoad={() => setImageLoaded(true)}
        />
        
        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-muted animate-pulse" />
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-primary text-primary-foreground">New</Badge>
          )}
          {product.isOnSale && discountPercentage > 0 && (
            <Badge className="bg-destructive text-destructive-foreground">
              -{discountPercentage}%
            </Badge>
          )}
        </div>

        {/* Wishlist button - Always visible */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-3 right-3 bg-background/90 backdrop-blur-sm hover:bg-background transition-all duration-300 opacity-100 scale-100"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={cn(
              "h-4 w-4 transition-colors",
              inWishlist ? "fill-red-500 text-red-500" : "text-foreground hover:text-red-500"
            )}
          />
        </Button>

        {/* Hover overlay with actions */}
        <div
          className={cn(
            "absolute inset-0 bg-black/20 flex items-center justify-center gap-2 transition-all duration-300",
            isHovered ? "opacity-100" : "opacity-0"
          )}
        >
          <Button
            size="sm"
            className={cn(
              "bg-primary text-primary-foreground hover:bg-primary/90",
              isAdding && "opacity-50 cursor-not-allowed"
            )}
            onClick={handleAddToCart}
            disabled={isAdding}
          >
            <ShoppingBag className="h-4 w-4 mr-2" />
            {isAdding ? 'Adding...' : 'Add to Cart'}
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="bg-background/90 backdrop-blur-sm"
            onClick={handleQuickView}
          >
            <Eye className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Product info */}
      <div className="p-4 space-y-2">
        <div className="text-xs text-muted-foreground uppercase tracking-wide">
          {product.category}
        </div>
        
        <h3 className="font-medium text-sm leading-tight group-hover:text-accent transition-colors">
          {product.name}
        </h3>

        {/* Colors */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex gap-1">
            {product.colors.slice(0, 3).map((color, index) => (
              <div
                key={index}
                className="w-3 h-3 rounded-full border border-border"
                style={{ backgroundColor: color }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="text-xs text-muted-foreground">
                +{product.colors.length - 3}
              </div>
            )}
          </div>
        )}

        {/* Pricing */}
        <div className="flex items-center gap-2">
          <span className="font-semibold text-foreground">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ₹{product.originalPrice.toLocaleString('en-IN')}
            </span>
          )}
        </div>

        {/* Rating */}
        {product.rating && (
          <div className="flex items-center gap-1">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <span
                  key={i}
                  className={cn(
                    "text-xs",
                    i < Math.floor(product.rating!) ? "text-accent" : "text-muted-foreground"
                  )}
                >
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-muted-foreground">
              ({product.rating})
            </span>
          </div>
        )}
      </div>
    </div>
  );
};