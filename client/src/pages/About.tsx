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
  "Chaska",
  "Chanhassen",
  "Victoria",
  "Eden Prairie",
  "Carver",
  "Waconia",
  "Mayer",
  "Cologne",
];

const designations = [
  "41 Years",
  "Trusted Advisor",
  "Top 1% MN",
  "Luxury Specialist",
  "Certified Negotiator",
  "Community Expert",
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
        <OfficeLocationSection className="py-20 md:py-28 bg-secondary/30" />

        {/* Inline + centered contact form (no modal) */}
        <section className="py-20 md:py-28 min-h-[70vh] flex items-center">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <ConnectContactSection title="Let’s Talk" description="" />
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
