import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import productDress from '@/assets/product-dress.jpg';
import productBlazer from '@/assets/product-blazer.jpg';
import productJeans from '@/assets/product-jeans.jpg';

const categories = [
  {
    id: 'women',
    title: 'Women',
    subtitle: 'Elegant & Sophisticated',
    image: productDress,
    description: 'Discover our curated collection of contemporary women\'s fashion',
    href: '/women',
  },
  {
    id: 'men',
    title: 'Men',
    subtitle: 'Sharp & Refined',
    image: productBlazer,
    description: 'Modern menswear that combines comfort with style',
    href: '/men',
  },
  {
    id: 'accessories',
    title: 'Accessories',
    subtitle: 'Perfect Finishing Touches',
    image: productJeans,
    description: 'Premium accessories to complete your look',
    href: '/accessories',
  },
];

export const CategoryShowcase = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Section header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-display font-bold tracking-tight">
            Shop by Category
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed">
            Explore our carefully curated collections designed for the modern lifestyle
          </p>
        </div>

        {/* Categories grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="group relative overflow-hidden rounded-lg bg-card transition-all duration-500 hover:shadow-xl"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Image container */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                
                {/* Content overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 text-white">
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <p className="text-sm text-accent font-medium tracking-wide uppercase">
                        {category.subtitle}
                      </p>
                      <h3 className="text-3xl font-display font-bold">
                        {category.title}
                      </h3>
                    </div>
                    
                    <p className="text-sm text-white/90 leading-relaxed">
                      {category.description}
                    </p>
                    
<Button
                      variant="outline"
                      className="mt-4 bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white hover:text-black transition-all duration-300 group/btn"
                      asChild
                    >
                      <Link to={category.href} aria-label={`Shop ${category.title}`}>
                        Shop {category.title}
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Special offer banner */}
        <div className="mt-16 relative overflow-hidden rounded-lg bg-primary text-primary-foreground">
          <div className="absolute inset-0 bg-gradient-to-r from-primary to-accent opacity-90" />
          <div className="relative z-10 p-8 md:p-12 text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Join Zenith Club & Save 20%
            </h3>
            <p className="text-lg mb-6 text-primary-foreground/90 max-w-2xl mx-auto">
              Get exclusive access to new collections, special offers, and styling tips. 
              Plus, enjoy free shipping on all orders.
            </p>
            <Button
              size="lg"
              variant="outline"
              className="bg-transparent border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary transition-all duration-300"
            >
              Join Now - It's Free
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};