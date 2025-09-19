import { useParams } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Heart } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = id ? getProductById(id) : undefined;
  const { addItem } = useCart();
  const { toggle, has } = useWishlist();
  const { toast } = useToast();

  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0]);
  const [qty, setQty] = useState(1);

  const inWishlist = product ? has(product.id) : false;

  const handleAddToCart = () => {
    if (product) {
      addItem(product.id, { quantity: qty, size, color });
      toast({ title: 'Added to Cart', description: `${product.name} added to your cart.` });
    }
  };

  const handleToggleWishlist = () => {
    if (product) {
      const wasInWishlist = inWishlist;
      toggle(product.id);
      toast({
        title: wasInWishlist ? 'Removed from Wishlist' : 'Added to Wishlist',
        description: wasInWishlist 
          ? `${product.name} removed from your wishlist.`
          : `${product.name} added to your wishlist.`,
      });
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-16 text-center">Product not found.</main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/">Home</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href={`/${product.category}`}>{product.category}</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>{product.name}</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 mt-6">
          {/* Image with hover zoom */}
          <div className="group relative overflow-hidden rounded-md border bg-card">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-[520px] object-cover transition-transform duration-500 group-hover:scale-110"
            />
          </div>

          {/* Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-display font-bold">{product.name}</h1>
              <p className="text-muted-foreground capitalize">{product.brand} • {product.category}</p>
            </div>

            <div className="flex items-center gap-3">
              <div className="text-3xl font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
              {product.originalPrice && (
                <div className="text-muted-foreground line-through">₹{product.originalPrice.toLocaleString('en-IN')}</div>
              )}
            </div>

            {product.sizes && product.sizes.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <Button key={s} variant={size === s ? 'default' : 'outline'} onClick={() => setSize(s)}>
                      {s}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {product.colors && product.colors.length > 0 && (
              <div>
                <h3 className="font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c}
                      className={`w-8 h-8 rounded-full border ${color === c ? 'ring-2 ring-primary' : ''}`}
                      style={{ backgroundColor: c }}
                      onClick={() => setColor(c)}
                      aria-label={`Select color ${c}`}
                    />
                  ))}
                </div>
              </div>
            )}

            <div>
              <h3 className="font-medium mb-2">Quantity</h3>
              <div className="inline-flex items-center gap-3">
                <Button variant="outline" onClick={() => setQty(Math.max(1, qty - 1))}>-</Button>
                <span className="w-8 text-center">{qty}</span>
                <Button variant="outline" onClick={() => setQty(qty + 1)}>+</Button>
              </div>
            </div>

            <div className="flex gap-3 pt-2">
              <Button onClick={handleAddToCart}>Add to Cart</Button>
              <Button 
                variant="outline" 
                onClick={handleToggleWishlist}
                className="flex items-center gap-2"
              >
                <Heart
                  className={cn(
                    "h-4 w-4 transition-colors",
                    inWishlist ? "fill-destructive text-destructive" : "text-foreground"
                  )}
                />
                {inWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
