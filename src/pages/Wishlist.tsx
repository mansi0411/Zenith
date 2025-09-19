import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { products } from '@/data/products';

const Wishlist = () => {
  const { ids, remove, count } = useWishlist();
  const { addItem } = useCart();

  const wishlistProducts = products.filter(p => ids.has(p.id));

  const moveToCart = (productId: string) => {
    addItem(productId, { quantity: 1 });
    remove(productId);
  };

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
              <BreadcrumbPage>Wishlist</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight my-6">Your Wishlist</h1>

        {count === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your wishlist is empty.</p>
            <Button className="mt-6" asChild>
              <a href="/">Browse Products</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlistProducts.map((product) => (
              <div key={product.id} className="rounded-md border overflow-hidden">
                <img src={product.image} alt={product.name} className="w-full h-56 object-cover" />
                <div className="p-4 space-y-2">
                  <h3 className="font-medium">{product.name}</h3>
                  <div className="font-semibold">₹{product.price.toLocaleString('en-IN')}</div>
                  <div className="flex gap-2">
                    <Button onClick={() => moveToCart(product.id)}>Move to Cart</Button>
                    <Button variant="outline" onClick={() => remove(product.id)}>Remove</Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wishlist;
