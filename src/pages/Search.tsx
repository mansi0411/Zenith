import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { useSearchParams } from 'react-router-dom';
import { products } from '@/data/products';
import { ProductCard } from '@/components/product/ProductCard';

const Search = () => {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();

  const results = q
    ? products.filter((p) => {
        const txt = `${p.name} ${p.brand ?? ''} ${p.category}`.toLowerCase();
        return txt.includes(q.toLowerCase());
      })
    : [];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl md:text-4xl font-display font-bold tracking-tight mb-6">Search</h1>
        <p className="text-muted-foreground mb-6">{q ? `Results for "${q}"` : 'Type in the search bar to find products.'}</p>

        {q && results.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">No results found</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {results.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Search;
