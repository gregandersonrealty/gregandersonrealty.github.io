import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft } from "lucide-react";

export default function Downsizing() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
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
          <header className="mb-10">
            <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-semibold leading-tight">
              The Move That Makes Sense on Paper (and Gets Complicated in Real Life)
            </h1>
          </header>

          <div className="prose prose-lg max-w-none text-foreground leading-relaxed space-y-6">
            <p>
              Downsizing is one of those decisions that sounds simple until you actually start making it. The math looks obvious — sell the big house, buy something smaller, free up equity, simplify your life. Reasonable people do this math every day and then spend two years not moving because the real decision isn't about square footage at all.
            </p>
            <p>
              I've helped a lot of people through this transition, and I've learned to stop being surprised by how emotionally complex it is. The house you're leaving probably isn't just a house. It's where your kids grew up, where you hosted thirty years of holidays, where you know exactly which step creaks at night. Letting go of that is not a financial transaction. It's something closer to a chapter ending, and it deserves to be treated that way.
            </p>
            <p>
              That said — and I say this with genuine care — waiting too long has real costs that most people underestimate. The right time to make a planned move is before you have to make an emergency one. The inventory of single-level homes in Carver County that genuinely work for people long-term is more limited than most buyers expect, and the good ones move quickly. Your options at 68 are meaningfully different than your options at 78, and the gap between those two moments can close faster than it looks.
            </p>
            <p>
              I've been helping people downsize in Chaska, Chanhassen, Victoria, and Waconia since the mid-1980s. I know this market well enough to tell you which developments actually deliver on low-maintenance living and which ones just look that way in the brochure. I know which neighborhoods have the walkability, the community feel, and the proximity to the things that matter as life changes. And I know how to talk through all of this with you and your family without making anyone feel rushed or managed.
            </p>
            <p>
              The first conversation is usually the most useful one, and it's always free. If you're starting to think about what a move like this might actually look like for you, I'm a good person to have that conversation with early.
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
