import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ProductCard } from '@/components/product/ProductCard';
import { products } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';

const Men = () => {
  const [sortBy, setSortBy] = useState<string>('name');
  const [priceFilter, setPriceFilter] = useState<string>('all');
  
  const menProducts = products.filter(p => p.category === 'men');
  
  // Filter by price
  const filteredProducts = menProducts.filter(product => {
    if (priceFilter === 'under-2000') return product.price < 2000;
    if (priceFilter === '2000-5000') return product.price >= 2000 && product.price <= 5000;
    if (priceFilter === 'over-5000') return product.price > 5000;
    return true;
  });
  
  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-8">
        {/* Hero Section */}
        <section className="bg-muted/30 py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight mb-4">
              Men's Collection
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Sharp & Refined fashion for the modern gentleman
            </p>
          </div>
        </section>

        {/* Products Section with Filters */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            {/* Filters */}
            <div className="flex flex-wrap gap-4 items-center mb-8">
              <div>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="name">Name</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex gap-2">
                <Button
                  variant={priceFilter === 'all' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('all')}
                >
                  All
                </Button>
                <Button
                  variant={priceFilter === 'under-2000' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('under-2000')}
                >
                  Under ₹2,000
                </Button>
                <Button
                  variant={priceFilter === '2000-5000' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('2000-5000')}
                >
                  ₹2,000 - ₹5,000
                </Button>
                <Button
                  variant={priceFilter === 'over-5000' ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setPriceFilter('over-5000')}
                >
                  Over ₹5,000
                </Button>
              </div>
              
              <Badge variant="secondary">{sortedProducts.length} products</Badge>
            </div>
            
            {/* Products Grid */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-muted-foreground mb-4">No products found matching your criteria.</p>
                <Button onClick={() => { setPriceFilter('all'); setSortBy('name'); }}>
                  Clear Filters
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {sortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Men;