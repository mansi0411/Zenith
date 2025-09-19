import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';
import productDress from '@/assets/product-dress.jpg';
import productBlazer from '@/assets/product-blazer.jpg';
import productJeans from '@/assets/product-jeans.jpg';
import heroFashion from '@/assets/hero-fashion.jpg';

const lookbookOutfits = [
  {
    id: 1,
    title: "Office Chic",
    description: "Professional yet stylish",
    image: productBlazer,
    price: 5999,
    items: ["Blazer", "Trousers", "Heels"]
  },
  {
    id: 2,
    title: "Weekend Casual",
    description: "Comfortable and trendy",
    image: productJeans,
    price: 3299,
    items: ["Jeans", "Top", "Sneakers"]
  },
  {
    id: 3,
    title: "Evening Elegance",
    description: "Sophisticated night out",
    image: productDress,
    price: 7999,
    items: ["Dress", "Clutch", "Jewelry"]
  },
  {
    id: 4,
    title: "Street Style",
    description: "Urban and edgy",
    image: heroFashion,
    price: 4599,
    items: ["Jacket", "Jeans", "Boots"]
  },
  {
    id: 5,
    title: "Summer Vibes",
    description: "Light and breezy",
    image: productDress,
    price: 2999,
    items: ["Dress", "Sandals", "Hat"]
  },
  {
    id: 6,
    title: "Business Formal",
    description: "Executive presence",
    image: productBlazer,
    price: 8999,
    items: ["Suit", "Shirt", "Accessories"]
  }
];

const Lookbook = () => {
  const [cartItemsCount, setCartItemsCount] = useState(0);
  const [wishlistCount, setWishlistCount] = useState(0);
  const { toast } = useToast();

  const handleCartClick = () => {
    toast({
      title: "Shopping Cart",
      description: "Cart functionality coming soon!",
    });
  };

  const handleWishlistClick = () => {
    toast({
      title: "Wishlist", 
      description: "Wishlist functionality coming soon!",
    });
  };

  const handleShopLook = (outfit: any) => {
    toast({
      title: "Shop the Look",
      description: `${outfit.title} outfit added to your cart!`,
    });
    setCartItemsCount(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background">
      <Header
        cartItemsCount={cartItemsCount}
        wishlistCount={wishlistCount}
        onCartClick={handleCartClick}
        onWishlistClick={handleWishlistClick}
      />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Explore Lookbook
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover curated styled outfits for every occasion
            </p>
          </div>
        </section>

        {/* Lookbook Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {lookbookOutfits.map((outfit) => (
                <div key={outfit.id} className="group bg-card rounded-lg overflow-hidden shadow-lg">
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden">
                    <img
                      src={outfit.image}
                      alt={outfit.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  </div>
                  
                  {/* Content */}
                  <div className="p-6 space-y-4">
                    <div>
                      <h3 className="text-xl font-display font-bold mb-2">
                        {outfit.title}
                      </h3>
                      <p className="text-muted-foreground text-sm mb-3">
                        {outfit.description}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {outfit.items.map((item, index) => (
                          <span 
                            key={index}
                            className="px-2 py-1 bg-muted rounded-full text-xs"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold">
                        ₹{outfit.price.toLocaleString()}
                      </span>
<Button
                        onClick={() => handleShopLook(outfit)}
                        variant="static"
                      >
                        Shop Look
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Lookbook;