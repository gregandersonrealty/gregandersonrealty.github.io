import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { OfficeLocationSection } from "@/components/OfficeLocationSection";
import { ConnectContactSection } from "@/components/ConnectContactSection";
import { ArrowRight, Facebook, Instagram, Youtube, Linkedin, Users, Home, Heart, Star } from "lucide-react";
import { MediumIcon, SubstackIcon } from "@/components/icons/SocialIcons";
import { Helmet } from "react-helmet-async";

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
        <Helmet>
          <title>About Greg Anderson | Carver County REALTOR® Since 1985</title>
          <meta name="description" content="Greg Anderson has lived and worked in Carver County since 1985. 3,000+ homes sold. Probate, distressed property, downsizing, and deep local market knowledge." />
        </Helmet>

        {/* <OfficeLocationSection className="py-20 md:py-28 bg-secondary/30" /> */}

        {/* Bio Section */}
        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-16 md:py-20">
          <header className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              About Greg Anderson
            </h1>
          </header>

          <div className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-6">
            <p>
              I've lived and worked in Carver County since 1985. That's not a line I lead with to impress anyone — it's just the most honest way to explain who I am and why I do things the way I do.
            </p>
            <p>
              I grew up in this business here, in this specific place, at a time when Chaska was still a small town and most of what's west of Eden Prairie was cornfields and possibility. I've watched this county grow from the inside, transaction by transaction, neighborhood by neighborhood, for four decades. I've sold over 3,000 homes across Carver County and the southwest metro — traditional sales, new construction, distressed properties, estates, and everything in between. But the number that matters most to me isn't the 3,000 homes. It's the relationships that came with them.
            </p>
            <p>
              This community is my community. My kids grew up here. My neighbors are here. The people I run into at the hardware store and the coffee shop are often the same people I've helped buy or sell a home, or whose parents I helped, or whose kids I'll help next. That's not a marketing angle. That's just what forty years in one place looks like.
            </p>
            <p>
              Which is part of why I started{" "}
              <Link
                href="/living-in-carver-county-podcast"
                className="underline text-foreground hover:text-primary transition-colors"
              >
                The Living In Carver County Podcast
              </Link>
              . When local newspapers disappeared, something real went with them — the place where a community talked to itself about things that matter and couldn't fit on a bumper sticker or in a Facebook thread. The podcast is my attempt to fill a little of that space. I talk to educators, elected officials, business owners, nonprofit leaders, and people who are quietly doing important work here. It's an insider's conversation about the best place I know to live, work, and raise a family. Real estate comes up sometimes. Mostly it's just about this place and the people who make it worth living in.
            </p>
            <p>
              On the professional side, I've spent my career building a reputation for handling the situations other agents find complicated.{" "}
              <Link
                href="/probate-estate-real-estate"
                className="underline text-foreground hover:text-primary transition-colors"
              >
                Estate attorneys and probate courts
              </Link>{" "}
              in this area call me when a family situation has gotten difficult and they need someone who can step in, manage the process professionally, and get it done without making things worse. Major financial institutions — Fannie Mae, JP Morgan Chase, Bank of America, Wells Fargo — have trusted me to{" "}
              <Link
                href="/pre-foreclosure-distressed-property"
                className="underline text-foreground hover:text-primary transition-colors"
              >
                handle their most challenging assets
              </Link>{" "}
              because they know I can get hard things done. Families navigating foreclosure call me because I've worked the other side of those transactions, and I use everything I learned there to{" "}
              <Link
                href="/pre-foreclosure-distressed-property"
                className="underline text-foreground hover:text-primary transition-colors"
              >
                level the field for homeowners
              </Link>{" "}
              who deserve better information than the market usually gives them.
            </p>
            <p>
              I'm not the right agent for every situation. But for the complicated ones — the ones where experience, relationships, and a genuine understanding of this community actually matter — I've spent forty years becoming exactly the right person to call.
            </p>
            <p>
              If you want to talk about{" "}
              <Link
                href="/carver-county-market"
                className="underline text-foreground hover:text-primary transition-colors"
              >
                what's actually happening in Carver County real estate
              </Link>
              , or just about Carver County, I'm always available. No pitch, no pressure. Just a neighbor who's been paying close attention for a long time.
            </p>
          </div>

          {/* Areas of Focus */}
          <div className="mt-12">
            <p className="font-display text-lg font-semibold mb-4">Areas of Focus</p>
            <div className="space-y-2 text-base">
              <div>
                <Link
                  href="/probate-estate-real-estate"
                  className="underline text-foreground hover:text-primary transition-colors"
                  data-testid="link-focus-probate"
                >
                  Probate, Estate &amp; Life Transition Real Estate
                </Link>
              </div>
              <div>
                <Link
                  href="/pre-foreclosure-distressed-property"
                  className="underline text-foreground hover:text-primary transition-colors"
                  data-testid="link-focus-foreclosure"
                >
                  Pre-Foreclosure &amp; Distressed Property
                </Link>
              </div>
              <div>
                <Link
                  href="/downsizing"
                  className="underline text-foreground hover:text-primary transition-colors"
                  data-testid="link-focus-downsizing"
                >
                  Downsizing
                </Link>
              </div>
              <div>
                <Link
                  href="/carver-county-market"
                  className="underline text-foreground hover:text-primary transition-colors"
                  data-testid="link-focus-market"
                >
                  The Carver County Market
                </Link>
              </div>
              <div>
                <Link
                  href="/living-in-carver-county-podcast"
                  className="underline text-foreground hover:text-primary transition-colors"
                  data-testid="link-focus-podcast"
                >
                  The Living In Carver County Podcast
                </Link>
              </div>
            </div>
          </div>

          {/* Footer separator + standardized footer */}
          <div className="mt-12 pt-10 border-t border-border/50">
            <div className="text-sm text-muted-foreground space-y-3">
              <p>Greg Anderson, REALTOR® | RE/MAX Advisors West</p>
              <p>Serving Chaska, Chanhassen, Victoria, Waconia &amp; all of Carver County since 1985. 3,000+ homes sold.</p>
              <p>
                The Living In Carver County Podcast — connecting friends, building community.{" "}
                Available on{" "}
                <a href="https://open.spotify.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Spotify</a>,{" "}
                <a href="https://podcasts.apple.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Apple Podcasts</a>,{" "}
                <a href="https://www.youtube.com/@HelloIamGregAnderson" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">YouTube</a>,{" "}
                and everywhere you listen.
              </p>
              <p>
                <a href="https://helloiamgreganderson.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">HelloIamGregAnderson.com</a>
                {" | "}
                <a href="https://helloiamgreganderson.substack.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">HelloIamGregAnderson.substack.com</a>
                {" | "}
                <a href="https://www.linkedin.com/in/gregoryranderson" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">LinkedIn: gregoryranderson</a>
              </p>
              <p>Have a question about the Carver County market? I'm always happy to talk — no pressure, no pitch, just forty years of local experience.</p>
            </div>
          </div>
        </article>

        {/* Contact form
        <section className="py-20 md:py-28 min-h-[70vh] flex items-center bg-secondary/20">
          <div className="max-w-6xl mx-auto px-6 lg:px-8 w-full">
            <div className="flex justify-center">
              <div className="w-full max-w-4xl">
                <ConnectContactSection title="Let's Talk" description="" />
              </div>
            </div>
          </div>
        </section> */}

        {/* Social links */}
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
