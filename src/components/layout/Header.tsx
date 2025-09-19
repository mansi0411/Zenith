import { useState } from 'react';
import { Search, ShoppingBag, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

interface HeaderProps {
  cartItemsCount?: number;
  wishlistCount?: number;
  onCartClick?: () => void;
  onWishlistClick?: () => void;
}

export const Header = ({ 
  cartItemsCount, 
  wishlistCount, 
  onCartClick, 
  onWishlistClick 
}: HeaderProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { totalItems } = useCart();
  const { count: wishlistCountCtx } = useWishlist();
  const cartItemsCountDisplay = cartItemsCount ?? totalItems;
  const wishlistCountDisplay = wishlistCount ?? wishlistCountCtx;

  const navItems = [
    { label: 'Women', href: '/women' },
    { label: 'Men', href: '/men' },
    { label: 'Accessories', href: '/accessories' },
    { label: 'Lookbook', href: '/lookbook' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      {/* Top banner */}
      <div className="bg-primary text-primary-foreground text-center py-2 text-sm">
        Free shipping on orders over ₹2000 | New arrivals weekly
      </div>

      <div className="container mx-auto px-4">
        {/* Main header */}
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>

          {/* Logo */}
          <div className="flex-shrink-0">
<Link to="/" className="text-2xl font-display font-bold tracking-tight hover:text-accent transition-colors">
              ZENITH
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
{navItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="text-sm font-medium transition-colors hover:text-accent"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Search bar - Desktop */}
          <div className="hidden lg:flex items-center max-w-md flex-1 mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
<Input
                type="search"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') navigate(`/search?q=${encodeURIComponent(searchQuery)}`); }}
                className="pl-10 bg-muted/50 border-0 focus-visible:ring-1"
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center space-x-2">
            {/* Search button - Mobile */}
<Button variant="ghost" size="icon" className="lg:hidden" onClick={() => navigate(`/search?q=${encodeURIComponent(searchQuery)}`)}>
              <Search className="h-5 w-5" />
            </Button>


            {/* Wishlist */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
onClick={() => (onWishlistClick ? onWishlistClick() : navigate('/wishlist'))}
            >
              <Heart className="h-5 w-5" />
              {wishlistCountDisplay > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-destructive">
                  {wishlistCountDisplay}
                </Badge>
              )}
            </Button>

            {/* Shopping cart */}
            <Button 
              variant="ghost" 
              size="icon" 
              className="relative"
onClick={() => (onCartClick ? onCartClick() : navigate('/cart'))}
            >
              <ShoppingBag className="h-5 w-5" />
              {cartItemsCountDisplay > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs bg-primary">
                  {cartItemsCountDisplay}
                </Badge>
              )}
            </Button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="py-4 space-y-4">
              {/* Mobile search */}
              <div className="px-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
<Input
                    type="search"
                    placeholder="Search..."
                    className="pl-10"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { setIsMenuOpen(false); navigate(`/search?q=${encodeURIComponent(searchQuery)}`); } }}
                  />
                </div>
              </div>
              
              {/* Mobile nav items */}
              <nav className="space-y-2 px-4">
                {navItems.map((item) => (
<Link
                      key={item.label}
                      to={item.href}
                      className="block py-2 text-sm font-medium text-foreground hover:text-accent transition-colors"
                    >
                      {item.label}
                    </Link>
                ))}
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};