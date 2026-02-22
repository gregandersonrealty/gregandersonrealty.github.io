import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OfficeLocationSection } from "@/components/OfficeLocationSection";
import { ConnectContactSection } from "@/components/ConnectContactSection";
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin, Users, Home, Heart, Star } from "lucide-react";
import { MediumIcon, SubstackIcon } from "@/components/icons/SocialIcons";

const stats = [
  { icon: Home, value: "3,000+", label: "Families Helped" },
  { icon: Users, value: "41", label: "Years of Trust" },
  { icon: Star, value: "Top 1%", label: "MN Realtors" },
  { icon: Heart, value: "100%", label: "Client Focused" },
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

const serviceAreas = [
  "Chaska", "Chanhassen", "Victoria", "Eden Prairie",
  "Carver", "Waconia", "Mayer", "Cologne",
];

const designations = [
  "41 Years", "Trusted Advisor", "Top 1% MN",
  "Luxury Specialist", "Certified Negotiator", "Community Expert",
];

function TikTok({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M19.321 5.562a5.124 5.124 0 0 1-3.003-1.003A5.125 5.125 0 0 1 14.27 1h-3.45v14.24a2.897 2.897 0 1 1-2.897-2.897c.258 0 .508.036.748.1V8.9a6.3 6.3 0 0 0-.748-.045A6.341 6.341 0 1 0 14.27 15.2V7.91a8.58 8.58 0 0 0 5.05 1.617V5.562z" />
    </svg>
  );
}

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Pillar Pages / Services Section */}
        <section className="py-20 md:py-24 bg-secondary/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-medium tracking-wide mb-3">Areas of Expertise</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                How I Can Help You
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Link
                href="/probate-estate-real-estate"
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/20"
                data-testid="link-pillar-probate"
              >
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  Probate, Estate &amp; Life Transition Real Estate
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Court-appointed. Connected. Experienced since 1985. I help families navigate probate, estate sales, and life transitions with care and clarity.
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/pre-foreclosure-distressed-property"
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/20"
                data-testid="link-pillar-foreclosure"
              >
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  Pre-Foreclosure &amp; Distressed Property
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  I've worked both sides of distressed transactions for 40 years. I know what lenders and investors won't tell you — and I use that knowledge for you.
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/downsizing"
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/20"
                data-testid="link-pillar-downsizing"
              >
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  Downsizing
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  The math looks obvious. The decision isn't. I've helped hundreds of Carver County homeowners navigate this transition since 1985.
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/carver-county-market"
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/20"
                data-testid="link-pillar-market"
              >
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  The Carver County Market
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  Local knowledge that goes well beyond what any database can tell you — built from 40 years and 3,000+ transactions in this specific market.
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>

              <Link
                href="/living-in-carver-county-podcast"
                className="group bg-card border border-border/50 rounded-2xl p-8 hover:shadow-lg transition-all hover:border-primary/20 md:col-span-2 lg:col-span-1"
                data-testid="link-pillar-podcast"
              >
                <h3 className="font-display text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  The Living In Carver County Podcast
                </h3>
                <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                  An insider's conversation with the educators, officials, business owners, and community leaders who make Carver County a great place to live.
                </p>
                <span className="inline-flex items-center gap-1.5 text-primary text-sm font-medium group-hover:gap-2.5 transition-all">
                  Learn more <ArrowRight className="w-4 h-4" />
                </span>
              </Link>
            </div>
          </div>
        </section>

        <OfficeLocationSection className="py-20 md:py-28 bg-secondary/30" />

        {/* Inline + centered contact form (no modal) */}
        <section className="py-20 md:py-28 min-h-[70vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <ConnectContactSection title="Let's Talk" description="" />
              </div>
            </div>
          </div>
        </section>

        

        <section className="py-14">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-full bg-secondary hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-colors"
                  aria-label={social.label}
                  data-testid={`link-about-social-${social.label.toLowerCase()}`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>

            <div className="mt-10 pt-10 border-t border-border/50">
              <a
                href="https://livingincarvercountypodcast.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                data-testid="link-podcast-cta"
              >
                Listen to the Living In Carver County Podcast
                <ArrowRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
