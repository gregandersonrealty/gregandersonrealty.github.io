import { Link, useLocation } from "wouter";
import { Menu, X, Facebook, Instagram, Youtube, FileText, Linkedin } from "lucide-react";
import { useState } from "react";

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
  { icon: FileText, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
];

export function Navbar() {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border/50">
      <nav className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" data-testid="link-home-logo">
            <div className="flex items-center gap-3">
              <img
                src={`${import.meta.env.BASE_URL}remax_logo.png`}
                alt="RE\/MAX logo"
                className="w-8 h-8 sm:w-10 sm:h-10 rounded-full object-cover"
              />
              <div className="flex flex-col">
                <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                  Greg Anderson
                </span>
                <span className="text-xs text-primary font-medium tracking-wide">
                  RE/MAX Advisors West
                </span>
              </div>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                data-testid={`link-nav-${link.label.toLowerCase()}`}
                className={`text-sm font-medium tracking-wide transition-colors hover:text-primary ${
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
              className="text-sm font-medium tracking-wide text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-nav-podcast"
            >
              Podcast
            </a>
            
            <div className="flex items-center gap-1 ml-2 pl-4 border-l border-border/50">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/50 transition-colors"
                  aria-label={social.label}
                  data-testid={`link-nav-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          <button
            className="md:hidden p-2 -mr-2"
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

        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/50 animate-fade-in">
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  data-testid={`link-mobile-${link.label.toLowerCase()}`}
                  className={`text-base font-medium py-2 transition-colors ${
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
                className="text-base font-medium py-2 text-muted-foreground"
                data-testid="link-mobile-podcast"
              >
                Podcast
              </a>
              <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 rounded-full bg-secondary text-foreground"
                    aria-label={social.label}
                  >
                    <social.icon className="w-5 h-5" />
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
