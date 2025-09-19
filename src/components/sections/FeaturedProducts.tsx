import { ProductCard } from '@/components/product/ProductCard';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { products } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useNavigate } from 'react-router-dom';

const featuredProducts = products.slice(0, 8);

export const FeaturedProducts = () => {
  const { toast } = useToast();
  const { addItem } = useCart();
  const { toggle } = useWishlist();
  const navigate = useNavigate();

  const handleAddToCart = (productId: string) => {
    addItem(productId, { quantity: 1 });
    const product = featuredProducts.find(p => p.id === productId);
    if (product) toast({ title: 'Added to cart', description: `${product.name} has been added to your cart.` });
  };

  const handleToggleWishlist = (productId: string) => {
    toggle(productId);
    const product = featuredProducts.find(p => p.id === productId);
    if (product) toast({ title: 'Wishlist updated', description: `${product.name} wishlist status changed.` });
  };

  const handleQuickView = (productId: string) => {
    navigate(`/product/${productId}`);
  };

  return (
    <section className="py-20 bg-background" data-section="featured-products">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Featured Collection
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Curated pieces that define contemporary elegance. Each item is carefully selected 
            to elevate your wardrobe with timeless sophistication.
          </p>
        </div>

        {/* Products grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-12">
          {featuredProducts.map((product) => (
            <div key={product.id} className="animate-slide-up">
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onToggleWishlist={handleToggleWishlist}
                onQuickView={handleQuickView}
                className="h-full"
              />
            </div>
          ))}
        </div>

        {/* View all button */}
        <div className="text-center">
<Button 
            size="lg" 
            variant="outline" 
            className="group px-8 py-4 text-lg font-medium border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
            asChild
          >
            <a href="/women">View All Products</a>
          </Button>
        </div>
      </div>
    </section>
  );
};