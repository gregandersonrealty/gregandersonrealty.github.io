import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function PreForeclosure() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Helmet>
          <title>Pre-Foreclosure Help in Carver County, MN | Greg Anderson</title>
          <meta name="description" content="Facing foreclosure in Carver County? Greg Anderson has worked both sides of distressed transactions for 40 years. He knows what lenders and investors won't tell you." />
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
              I've Worked Both Sides of This. Now I Work for You.
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
              I want to tell you something that most real estate agents either don't know or won't say out loud.
            </p>
            <p>
              I've spent a significant part of my career working for the other side of distressed transactions. Fannie Mae, JP Morgan Chase, Bank of America, Wells Fargo — I've managed REO portfolios for institutions like these. I've worked alongside the kinds of investors and cash buyers who send the postcards and knock on doors when they find out a homeowner is behind on payments. I know how that side of the table operates. I know what they're looking for, how they value properties, what they offer and why, and how they think about the people they're buying from.
            </p>
            <p>
              That experience changed how I work entirely.
            </p>
            <p>
              Because here's what I learned from the inside: the system is not designed to give distressed homeowners full information. Cash buyers and investors aren't villains — some of them are perfectly decent people — but they are operating in their own financial interest, and that interest is almost never aligned with yours. The less you know about your options, the better their outcome tends to be. That's not cynicism. That's just how it works.
            </p>
            <p>
              I'm not going to let that happen to someone in Carver County if I can help it.
            </p>
            <p>
              When I sit down with a homeowner who's behind on payments, facing foreclosure, or being approached by investors offering quick cash, I bring forty years of local market knowledge and a firsthand understanding of how the other side operates. I know what your property is actually worth — not what an investor needs to pay to make their margins work. I know what options exist at different points in the foreclosure timeline. I know what lenders actually want out of these situations, because I've worked with them directly, and it's rarely what homeowners assume.
            </p>
            <p>
              Here's the other side of that same credential: the major institutions I've worked with — banks, servicers, national asset management companies — call me when they have a property that absolutely has to be sold regardless of condition, regardless of circumstance, regardless of complications. Properties with deferred maintenance, title issues, difficult timelines, tenants, structural problems, or situations that most agents would walk away from. Those calls come to me because I've demonstrated, over decades, that I know how to get hard things done without drama.
            </p>
            <p>
              I tell you that not to impress you, but because it matters to where you sit right now. When you're in a distressed situation, you need someone who has actually operated at that level — who understands the mechanics, the timelines, the motivations on every side of the table, and who can navigate complexity without flinching. That's a different skill set than selling a move-up home in a good market, and it's one I've spent a career building.
            </p>
            <p>
              The most important thing I can tell you is this: do not make any decisions before you understand what your options actually are. Don't call the bank without understanding the conversation you're walking into. Don't sign anything with a cash buyer before you know what your property is actually worth. And don't assume that because you've missed payments, your leverage is gone — because it usually isn't, at least not yet.
            </p>
            <p>
              The shame that comes with financial distress is real, and I've sat with a lot of people who were carrying it. I'm not here to add to it. I'm here to give you an honest picture of where you stand and what your realistic paths forward look like — from someone who's seen this situation from every angle, and who has spent a career learning how the other side operates so I can use that knowledge for you.
            </p>
            <p>
              If you're in Carver County and you're worried about what comes next, let's talk before anything is decided. That conversation is always free, always confidential, and it might matter more than you expect.
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
