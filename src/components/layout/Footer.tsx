import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Instagram, Facebook, Twitter, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const footerSections = [
    {
      title: 'Shop',
      links: [
        { label: 'New Arrivals', href: '#' },
        { label: 'Women', href: '#' },
        { label: 'Men', href: '#' },
        { label: 'Accessories', href: '#' },
        { label: 'Sale', href: '#' },
      ],
    },
    {
      title: 'Customer Care',
      links: [
        { label: 'Contact Us', href: '#' },
        { label: 'Size Guide', href: '#' },
        { label: 'Shipping Info', href: '#' },
        { label: 'Returns & Exchanges', href: '#' },
        { label: 'FAQ', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { label: 'About Zenith', href: '#' },
        { label: 'Careers', href: '#' },
        { label: 'Sustainability', href: '#' },
        { label: 'Press', href: '#' },
        { label: 'Investors', href: '#' },
      ],
    },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Facebook, href: '#', label: 'Facebook' },
    { icon: Twitter, href: '#', label: 'Twitter' },
    { icon: Youtube, href: '#', label: 'YouTube' },
  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4">
        {/* Newsletter section */}
        <div className="py-16 border-b border-primary-foreground/20">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-2xl md:text-3xl font-display font-bold">
              Stay in the Loop
            </h3>
            <p className="text-primary-foreground/80 leading-relaxed">
              Be the first to know about new collections, exclusive offers, and fashion insights.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                placeholder="Enter your email"
                className="bg-primary-foreground/10 border-primary-foreground/30 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-accent"
              />
              <Button
                className="bg-accent text-accent-foreground hover:bg-accent/90 font-medium"
              >
                Subscribe
              </Button>
            </div>
            <p className="text-xs text-primary-foreground/60">
              By subscribing, you agree to our Privacy Policy and Terms of Service.
            </p>
          </div>
        </div>

        {/* Main footer content */}
        <div className="py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-12">
            {/* Brand section */}
            <div className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-3xl font-display font-bold mb-4">ZENITH</h2>
                <p className="text-primary-foreground/80 leading-relaxed max-w-md">
                  Elevating fashion through timeless design and exceptional quality. 
                  Where sophistication meets contemporary style.
                </p>
              </div>
              
              {/* Contact info */}
              <div className="space-y-3 text-sm">
                <div className="flex items-center gap-3">
                  <MapPin className="h-4 w-4 text-accent" />
                  <span>123 Fashion Ave, Style District, NY 10001</span>
                </div>
                <div className="flex items-center gap-3">
                  <Phone className="h-4 w-4 text-accent" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-3">
                  <Mail className="h-4 w-4 text-accent" />
                  <span>hello@zenithfashion.com</span>
                </div>
              </div>

              {/* Social links */}
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      aria-label={social.label}
                      className="flex items-center justify-center w-10 h-10 bg-primary-foreground/10 rounded-full hover:bg-accent hover:text-accent-foreground transition-all duration-300"
                    >
                      <Icon className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Footer links */}
            {footerSections.map((section) => (
              <div key={section.title}>
                <h4 className="font-semibold mb-4 text-accent">{section.title}</h4>
                <ul className="space-y-3">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="text-sm text-primary-foreground/80 hover:text-accent transition-colors duration-300"
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <Separator className="bg-primary-foreground/20" />

        {/* Bottom footer */}
        <div className="py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-primary-foreground/60">
            <div className="flex flex-col md:flex-row gap-4">
              <span>&copy; 2024 Zenith Fashion. All rights reserved.</span>
              <div className="flex gap-4">
                <a href="#" className="hover:text-accent transition-colors">
                  Privacy Policy
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Terms of Service
                </a>
                <a href="#" className="hover:text-accent transition-colors">
                  Cookie Policy
                </a>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span>Powered by passion for fashion</span>
              <span className="text-accent">✨</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};