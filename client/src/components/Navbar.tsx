import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, Youtube, Linkedin } from "lucide-react";
import { useState } from "react";
import { MediumIcon, SubstackIcon } from "@/components/icons/SocialIcons";

function TikTok({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M19.321 5.562a5.124 5.124 0 0 1-3.003-1.003A5.125 5.125 0 0 1 14.27 1h-3.45v14.24a2.897 2.897 0 1 1-2.897-2.897c.258 0 .508.036.748.1V8.9a6.3 6.3 0 0 0-.748-.045A6.341 6.341 0 1 0 14.27 15.2V7.91a8.58 8.58 0 0 0 5.05 1.617V5.562z" />
    </svg>
  );
}

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "About" },
];

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/Advisors.West", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/thehybridbroker/", label: "Instagram" },
  { icon: TikTok, href: "https://www.tiktok.com/@thehybridbroker", label: "TikTok" },
  { icon: Youtube, href: "https://www.youtube.com/@HelloIamGregAnderson", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gregoryranderson", label: "LinkedIn" },
  { icon: MediumIcon, href: "https://medium.com/@thehybridbroker", label: "Medium" },
  { icon: SubstackIcon, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  function scrollToTop() {
    if (typeof window === "undefined") return;
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  function handleNavLinkClick(href: string) {
    return (e: React.MouseEvent) => {
      if (href === location) {
        e.preventDefault();
        scrollToTop();
      }
      setMobileMenuOpen(false);
    };
  }

  return (
    <header className="sticky top-0 z-50 bg-background border-b border-border">
      <nav className="w-full">
        {/* Top bar: Logo & Branding */}
        <div className="flex items-center justify-between px-6 lg:px-10 py-4 border-b border-border">
          <Link href="/" onClick={handleNavLinkClick("/")} data-testid="link-home-logo" className="flex items-center gap-3">
            <img
              src={`${import.meta.env.BASE_URL}remax_logo.png`}
              alt="RE\/MAX logo"
              className="w-9 h-9 rounded-full object-cover"
            />
            <div className="flex flex-col">
              <span className="font-display text-lg font-bold tracking-tight text-foreground">
                Greg Anderson
              </span>
              <span className="text-[10px] text-primary font-bold uppercase tracking-widest">
                RE/MAX Advisors West
              </span>
            </div>
          </Link>

          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            data-testid="button-mobile-menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-stretch border-b border-border divide-x divide-border">
          {/* Main nav links */}
          <div className="flex items-center">
            {navLinks.map((link, index) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={handleNavLinkClick(link.href)}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`px-6 py-3 text-xs font-bold uppercase tracking-widest transition-colors border-b-2 ${
                  location === link.href
                    ? "text-primary border-b-primary"
                    : "text-muted-foreground border-b-transparent hover:text-foreground"
                }`}
              >
                {link.label}
              </Link>
            ))}
            <a
              href="https://livingincarvercountypodcast.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              data-testid="link-nav-podcast"
            >
              Podcast
            </a>
          </div>

          {/* Right spacer */}
          <div className="flex-1" />

          {/* Social links */}
          <div className="flex items-center gap-0 pl-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 text-muted-foreground hover:text-primary hover:bg-secondary/30 transition-colors border-r border-border/30 last:border-r-0"
                aria-label={social.label}
                data-testid={`link-nav-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border animate-fade-in">
            <div className="flex flex-col divide-y divide-border/50 px-6 py-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={handleNavLinkClick(link.href)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className={`py-3 text-xs font-bold uppercase tracking-widest transition-colors ${
                    location === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://livingincarvercountypodcast.com"
                target="_blank"
                rel="noopener noreferrer"
                className="py-3 text-xs font-bold uppercase tracking-widest text-muted-foreground"
                data-testid="link-mobile-podcast"
              >
                Podcast
              </a>
              <div className="flex items-center gap-2 pt-4 mt-2 border-t border-border/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                    aria-label={social.label}
                  >
                    <social.icon className="w-4 h-4" />
                  </a>
                ))}
              </div>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
