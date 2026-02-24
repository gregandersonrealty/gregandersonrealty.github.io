import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function ProbateEstate() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Helmet>
          <title>Probate & Estate Real Estate in Carver County | Greg Anderson</title>
          <meta name="description" content="Greg Anderson helps families navigate probate, estate sales, and life transitions in Carver County, MN. Court-appointed, connected, and experienced since 1985." />
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
              When a Home Has to Change Hands — For Any Reason
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
              Most people think of probate when they hear "estate real estate," and yes, I handle a lot of those. But the truth is, the situation I'm describing on this page happens in a lot of ways that don't involve a death at all.
            </p>
            <p>
              Sometimes it's a parent moving into memory care or assisted living, and the family suddenly realizes the house needs to be dealt with and nobody knows where to start. Sometimes it's a parent moving in with an adult child across the country, and the house has been lived in for forty years and is full — genuinely full — of a lifetime of accumulated belongings. Sometimes it's a formal probate situation with attorneys, timelines, and a personal representative trying to satisfy legal obligations while managing grieving siblings who don't agree on anything.
            </p>
            <p>
              All of these situations have one thing in common: the real estate piece is almost never the only thing going on, and it almost never feels like a normal transaction.
            </p>
            <p>
              I've been in those houses. I know what it looks like when a family is trying to clear out fifty years of accumulated life before they can even think about getting a property ready to show. I know the particular kind of overwhelm that comes from standing in a garage full of tools, a basement full of furniture, and a spare bedroom full of things nobody can quite bring themselves to throw away yet — while also dealing with grief, or guilt, or family dynamics, or all three at once.
            </p>
            <p>
              The real estate part I can handle directly. But I've also built relationships over the years with people who can help with the rest of it — estate sale professionals, senior move managers, donation coordinators, junk removal services that actually show up when they say they will. My job is to connect the right people to the right resources at the right time, not to hand you a listing agreement and leave you to figure out the rest.
            </p>
            <p>
              On the probate side specifically, I work closely with estate attorneys and personal representatives who need a real estate partner who understands what they actually need — accurate pricing from the start, clean documentation, honest assessments of condition and value, and clear communication with everyone involved. That includes adult children who may be in different states with different opinions and different emotional relationships to the property.
            </p>
            <p>
              And when those relationships break down entirely? When siblings can't agree, communication has stopped, and the estate is stalled because nobody trusts anyone in the room? That's when the courts step in and appoint a neutral professional to manage the real estate piece. I get those appointments. Probate attorneys and judges in this area know that when a situation has become genuinely difficult — when the people involved can't get out of their own way — I'm someone who can step in, manage the process professionally, and get it done without taking sides or making things worse.
            </p>
            <p>
              There's a reason attorneys call me before they call anyone else in those situations. The professional that professionals call — that's a role I've earned over a long time, and I don't take it lightly.
            </p>
            <p>
              If you're navigating any version of this — a formal estate, a parent's transition, a family trying to figure out next steps on a property that's been in the family for decades, or a situation that's become contentious — I'm a useful person to talk to early. Not because I'll push you toward a decision, but because I've helped a lot of families find the path through this, and I can usually help you see the options more clearly before anything has to be decided.
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
