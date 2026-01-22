import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OfficeLocationSection } from "@/components/OfficeLocationSection";
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Youtube, Award, Users, Home, Heart, Quote, Star } from "lucide-react";
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
  { icon: Youtube, href: "https://www.youtube.com/@HelloIamGregAnderson", label: "YouTube" },
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

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">

        <OfficeLocationSection className="py-20 md:py-28 bg-secondary/30" />

        {/* Contact Section - Simplified */}
        <section className="py-20 md:py-28">
          <div className="max-w-3xl mx-auto px-6 lg:px-8 text-center">
            <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6">
              Let's Talk About Your Goals
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed mb-10">
              Whether you're ready to move forward or just exploring your options, I'm here to help. No pressure, no obligations—just an honest conversation about what's right for you.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                <a
                  href="tel:+16123866155"
                  className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  data-testid="link-contact-phone-mobile"
                >
                  <Phone className="w-5 h-5" />
                  Mobile: (612) 386-6155
                </a>
                <a
                  href="tel:+19523686014"
                  className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                  data-testid="link-contact-phone-direct"
                >
                  <Phone className="w-5 h-5" />
                  Direct: (952) 368-6014
                </a>
              </div>
              <a
                href="mailto:thehybridbroker@gmail.com"
                className="flex items-center gap-3 px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                data-testid="link-contact-email"
              >
                <Mail className="w-5 h-5" />
                thehybridbroker@gmail.com
              </a>
            </div>

            <div className="flex items-center justify-center gap-2 text-muted-foreground mb-8">
              <MapPin className="w-4 h-4" />
              <span>207 Chestnut St, Ste. 100, Chaska, MN 55318</span>
            </div>

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
