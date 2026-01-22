import { Link } from "wouter";
import { Facebook, Instagram, Youtube, Mail, Phone, MapPin, Podcast, Linkedin, ExternalLink } from "lucide-react";
import { OFFICE } from "@/lib/office";
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

const socialLinks = [
  { icon: Facebook, href: "https://facebook.com/Advisors.West", label: "Facebook" },
  { icon: Instagram, href: "https://www.instagram.com/thehybridbroker/", label: "Instagram" },
  { icon: TikTok, href: "https://www.tiktok.com/@thehybridbroker", label: "TikTok" },
  { icon: Youtube, href: "https://www.youtube.com/@HelloIamGregAnderson", label: "YouTube" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/gregoryranderson", label: "LinkedIn" },
  { icon: MediumIcon, href: "https://medium.com/@thehybridbroker", label: "Medium" },
  { icon: SubstackIcon, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
];

export function Footer() {
  return (
    <footer className="bg-secondary/50 border-t border-border/50 mt-auto">
      <div className="max-w-6xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div>
            <div className="flex flex-col mb-4">
              <span className="font-display text-xl font-semibold tracking-tight text-foreground">
                Greg Anderson
              </span>
              <span className="text-sm text-primary font-medium">
                RE/MAX Advisors West
              </span>
            </div>
            <p className="text-muted-foreground text-sm leading-relaxed max-w-xs">
              MN REALTOR since 1985. Over 3,000 homes sold. Broker/Owner serving Carver County and the southwest Minneapolis suburbs.
            </p>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Quick Links</h4>
            <div className="flex flex-col gap-3">
              <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-home">
                Home
              </Link>
              <Link href="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-blog">
                Blog
              </Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-about">
                About
              </Link>
              <Link href="/admin" className="text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-footer-admin">
                Admin
              </Link>
              <a href="https://livingincarvercountypodcast.com" target="_blank" rel="noopener noreferrer" className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2" data-testid="link-footer-podcast">
                <Podcast className="w-3.5 h-3.5" />
                Living In Carver County Podcast
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-display text-lg font-medium mb-4">Contact</h4>
            <div className="flex flex-col gap-3">
              <a href="tel:+16123866155" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone-mobile">
                <Phone className="w-4 h-4" />
                Mobile: (612) 386-6155
              </a>
              <a href="tel:+19523686014" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-phone-direct">
                <Phone className="w-4 h-4" />
                Direct: (952) 368-6014
              </a>
              <a href="mailto:thehybridbroker@gmail.com" className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors" data-testid="link-email">
                <Mail className="w-4 h-4" />
                thehybridbroker@gmail.com
              </a>
              <span className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>
                  {OFFICE.addressLines[0]}
                  <br />
                  {OFFICE.addressLines[1]}
                </span>
              </span>
              <a
                href={OFFICE.googleMapsShareUrl || OFFICE.googleMapsQueryUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="link-office-maps-footer"
              >
                <ExternalLink className="w-4 h-4" />
                View on Google Maps
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/50 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} RE/MAX Advisors West. All rights reserved. Each office independently owned and operated.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-background hover:bg-primary hover:text-primary-foreground transition-colors"
                aria-label={social.label}
                data-testid={`link-social-${social.label.toLowerCase()}`}
              >
                <social.icon className="w-4 h-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
