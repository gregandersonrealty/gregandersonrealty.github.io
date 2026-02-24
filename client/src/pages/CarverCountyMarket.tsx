import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function CarverCountyMarket() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Helmet>
          <title>Carver County Real Estate Market | Greg Anderson Since 1985</title>
          <meta name="description" content="Greg Anderson has tracked the Carver County real estate market through every cycle since 1985. Local knowledge that goes well beyond what any database can tell you." />
        </Helmet>
        <div className="max-w-3xl mx-auto px-6 lg:px-8 pt-8">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
            data-testid="link-back-about"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Link>
        </div>

        <article className="max-w-3xl mx-auto px-6 lg:px-8 py-12">
          <header className="mb-4">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              Forty Years of Watching This Market. Here's What I Actually Know.
            </h1>
          </header>

          <div className="mb-10">
            <Link
              href="/about"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-primary transition-colors"
              data-testid="link-about-greg"
            >
              Learn more about Greg Anderson
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-6">
            <p>
              I moved into this market in 1985, when Chaska was a small town and Chanhassen was mostly farmland west of Eden Prairie. I've watched the Highway 212 corridor transform from a two-lane road through fields into one of the most active development corridors in the southwest metro. I've sold homes through multiple recessions, a housing crisis that nearly collapsed the industry, a pandemic that turned the market completely upside down, and every kind of interest rate environment you can imagine.
            </p>
            <p>
              None of that makes me a fortune teller. But it does make me someone who's seen enough market cycles to know what actually matters and what's just noise.
            </p>
            <p>
              Carver County is not a generic Twin Cities suburb. It's a collection of genuinely distinct communities, each with its own character, its own price dynamics, and its own reasons people choose to live there. The median home price in Chaska tells you almost nothing useful about what a home on a specific street near Lake Bavaria is worth compared to a similar-looking house in Historic Downtown. Those distinctions are real and they affect your outcome significantly, whether you're buying or selling.
            </p>
            <p>
              Generic metro agents often miss these distinctions because they don't have the transaction volume here to develop real pattern recognition. I do. Over 3,000 transactions in and around this county means I have a feel for this market that goes well beyond what any database can tell you.
            </p>
            <p>
              I track new development activity, infrastructure changes, school boundary shifts, and neighborhood-level trends on a continuous basis. I've watched communities like Victoria grow from a quiet township into a sought-after address, and I've seen what that kind of growth does to surrounding values over time. That kind of longitudinal knowledge doesn't show up in a CMA — it shows up in the advice you get before you make a decision.
            </p>
            <p>
              Through The Living In Carver County Podcast, I share what I'm seeing in this market on a regular basis — not polished corporate commentary, just honest observations from someone who's been paying close attention here for a very long time. If you want to understand what's actually happening in Carver County real estate, that's a good place to start.
            </p>
            <p>
              And if you have a specific question about a specific neighborhood, street, or situation — I'm always happy to talk.
            </p>
          </div>

          <div className="my-10 border-t border-border/50" />

          <footer className="text-sm text-muted-foreground space-y-3">
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
              <a href="https://helloisamgreganderson.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">HelloIamGregAnderson.com</a>
              {" | "}
              <a href="https://helloisamgreganderson.substack.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">HelloIamGregAnderson.substack.com</a>
              {" | "}
              <a href="https://www.linkedin.com/in/gregoryranderson" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">LinkedIn: gregoryranderson</a>
            </p>
            <p>Have a question about the Carver County market? I'm always happy to talk — no pressure, no pitch, just forty years of local experience.</p>
          </footer>
        </article>
      </main>

      <Footer />
    </div>
  );
}
