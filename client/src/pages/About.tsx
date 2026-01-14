import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowRight, Mail, Phone, MapPin, Facebook, Instagram, Youtube, FileText, Award, Users, Home, Heart, Quote, Star } from "lucide-react";

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
  { icon: FileText, href: "https://substack.com/@helloiamgreganderson", label: "Substack" },
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
        {/* Hero */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-primary font-medium tracking-wide mb-4">Your Neighbor & Trusted Advisor</p>
                <h1 className="font-display text-4xl md:text-5xl font-semibold mb-6 leading-tight">
                  Hi, I'm Greg Anderson
                </h1>
                <p className="text-xl text-muted-foreground leading-relaxed mb-6">
                  For over four decades, I've had the privilege of helping families find their perfect home right here in Carver County—the same community where I live and raised my own family.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Buying or selling a home is one of life's biggest decisions. I believe you deserve someone who listens first, explains everything clearly, and genuinely cares about getting it right for <em>you</em>—not just closing a deal.
                </p>
                <div className="flex flex-wrap gap-2">
                  {designations.map((d) => (
                    <span key={d} className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                      {d}
                    </span>
                  ))}
                </div>
              </div>
              <div className="relative">
                <img
                  src="foodtruck_greg.jpg"
                  alt="Greg Anderson - RE/MAX Advisors West"
                  className="w-full rounded-2xl shadow-xl"
                />
                <div className="absolute -bottom-4 -right-4 md:-bottom-6 md:-right-6 bg-primary text-primary-foreground p-4 md:p-6 rounded-xl shadow-lg">
                  <p className="font-display text-2xl md:text-3xl font-bold">1985</p>
                  <p className="text-sm opacity-90">Licensed Since</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-16 bg-card border-y border-border/50">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                    <stat.icon className="w-7 h-7" />
                  </div>
                  <p className="font-display text-3xl font-bold text-foreground mb-1">
                    {stat.value}
                  </p>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* My Promise */}
        <section className="py-20 md:py-28">
          <div className="max-w-4xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-primary font-medium tracking-wide mb-3">My Promise to You</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold">
                What You Can Expect
              </h2>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-display text-xl font-bold">1</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">Honest Guidance</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  I'll always tell you what you need to hear, not just what you want to hear. Your interests come first—always.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-display text-xl font-bold">2</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">Clear Communication</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  No jargon, no surprises. I explain every step so you feel confident and informed throughout the entire process.
                </p>
              </div>
              <div className="text-center p-6">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary font-display text-xl font-bold">3</span>
                </div>
                <h3 className="font-display text-lg font-semibold mb-3">Personal Attention</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  You're not a transaction number. I take time to understand your unique situation and find solutions that fit your life.
                </p>
              </div>
            </div>
          </div>
        </section>


        {/* Why Local Matters */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div>
                <p className="text-primary font-medium tracking-wide mb-3">Local Expertise</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  I Know These Neighborhoods Like My Own
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Chaska's $452,000 median doesn't tell the whole story. There's a $900,000+ variation between Historic Downtown charm and Lake Bavaria estates. Generic metro agents miss these nuances. I don't.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Four decades of watching every development, every infrastructure change, every market cycle means I can tell you not just <em>what's</em> happening—but <em>why</em> it matters for your family.
                </p>
                <div className="flex flex-wrap gap-2">
                  {serviceAreas.map((area) => (
                    <span key={area} className="px-4 py-2 bg-secondary rounded-full text-sm font-medium text-secondary-foreground">
                      {area}
                    </span>
                  ))}
                </div>
              </div>
              <div className="bg-secondary/50 rounded-2xl p-8 md:p-10">
                <h3 className="font-display text-xl font-semibold mb-6">I Can Help You With</h3>
                <ul className="space-y-4">
                  {[
                    "Finding your family's perfect home",
                    "Selling for maximum value",
                    "First-time buyer guidance",
                    "Investment properties",
                    "New construction",
                    "Navigating difficult situations with care",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center mt-0.5 flex-shrink-0">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-foreground">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Recognition */}
        <section className="py-16 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-8">
              <Award className="w-8 h-8 text-primary mx-auto mb-3" />
              <h3 className="font-display text-xl font-semibold">Recognized Excellence</h3>
            </div>
            <div className="flex flex-wrap justify-center gap-3 text-sm">
              {["RE/MAX Circle of Legends", "Lifetime Achievement", "Hall of Fame", "Featured in Star Tribune", "REALTOR Magazine"].map((award) => (
                <span key={award} className="px-4 py-2 bg-card rounded-full border border-border/50 text-muted-foreground">
                  {award}
                </span>
              ))}
            </div>
          </div>
        </section>

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
              <a
                href="tel:+19525551234"
                className="flex items-center gap-3 px-6 py-4 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
                data-testid="link-contact-phone"
              >
                <Phone className="w-5 h-5" />
                Call Me Directly
              </a>
              <a
                href="mailto:greg@advisorswest.com"
                className="flex items-center gap-3 px-6 py-4 bg-secondary text-secondary-foreground rounded-xl font-medium hover:bg-secondary/80 transition-colors"
                data-testid="link-contact-email"
              >
                <Mail className="w-5 h-5" />
                greg@advisorswest.com
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
