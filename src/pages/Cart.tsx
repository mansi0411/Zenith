import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useCart } from '@/context/CartContext';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Minus, Plus, Trash2 } from 'lucide-react';

const Cart = () => {
  const { detailedItems, totalItems, totalPrice, updateQuantity, removeItem, clearCart } = useCart();

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
              <BreadcrumbPage>Cart</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight my-6">Your Cart</h1>

        {detailedItems.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Button className="mt-6" asChild>
              <a href="/">Continue Shopping</a>
            </Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {detailedItems.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 rounded-md border">
                  <img src={item.product.image} alt={item.product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-medium">{item.product.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{item.product.category}</p>
                        {(item.size || item.color) && (
                          <p className="text-xs text-muted-foreground mt-1">
                            {item.size ? `Size: ${item.size}` : ''} {item.color ? ` • Color: ${item.color}` : ''}
                          </p>
                        )}
                      </div>
                      <button className="text-muted-foreground hover:text-destructive" onClick={() => removeItem(item.id)} aria-label="Remove item">
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>

                    <div className="mt-3 flex items-center justify-between">
                      <div className="inline-flex items-center gap-2">
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity - 1)} aria-label="Decrease quantity">
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button size="icon" variant="outline" onClick={() => updateQuantity(item.id, item.quantity + 1)} aria-label="Increase quantity">
                          <Plus className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="p-6 rounded-md border h-fit">
              <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
              <div className="flex items-center justify-between text-sm mb-2">
                <span>Items</span>
                <span>{totalItems}</span>
              </div>
              <div className="flex items-center justify-between text-sm mb-4">
                <span>Subtotal</span>
                <span>₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>
              <Button className="w-full" asChild>
                <a href="/checkout">Proceed to Checkout</a>
              </Button>
              <Button variant="ghost" className="w-full mt-2" onClick={clearCart}>Clear Cart</Button>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Cart;
