import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";

export default function PodcastPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        <Helmet>
          <title>The Living In Carver County Podcast | Greg Anderson</title>
          <meta name="description" content="The Living In Carver County Podcast is an insider's conversation with the educators, officials, business owners, and community leaders who make Carver County a great place to live." />
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
              The Conversations Carver County Isn't Having Anywhere Else
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
              Somewhere along the way, local newspapers disappeared. Not just here — everywhere. And when they left, they took something with them that most people didn't notice was gone until it was: the place where a community actually talked to itself.
            </p>
            <p>
              Facebook fills some of that space, sort of. But Facebook is better at starting arguments than finishing them, and there are only so many things you can say in a thread before it goes sideways. Some conversations need more room than that. Some topics deserve more than a hot take and a string of comments.
            </p>
            <p>
              That's why I started The Living In Carver County Podcast.
            </p>
            <p>
              I'm not a journalist. I'm a guy who's lived and worked in this community since 1985, and I have opinions about it, and I know a lot of people here who have interesting things to say. Think of it as an insider's conversation with the people who make Carver County the best place to live, work, and raise a family. Educators, elected officials, business owners, people who run the nonprofits that hold communities together — the people who are actually doing the work here and usually don't get nearly enough of a platform to talk about it.
            </p>
            <p>
              The podcast is just me creating a space for those conversations — the kind you'd have at the hardware store or over coffee, except recorded so more people can be part of it. Things that matter to people who actually live here. Local issues, local history, local changes. Development that's coming. History people have forgotten. Community institutions doing good work quietly. Tensions that exist and don't get discussed calmly anywhere.
            </p>
            <p>
              Real estate comes up sometimes, because it's part of life here and I know it well. But this isn't a real estate show. It never was. It's a community conversation hosted by someone who's been paying close attention to this place for a long time — and who genuinely believes that connecting people to each other is one of the most useful things you can do in a community.
            </p>
            <p>
              Connecting friends, building community. That's the whole idea.
            </p>
            <p>
              If you grew up here, if you just moved here, if you're thinking about moving here — pull up a chair. These are your neighbors talking about your community. That's what it is and that's all it needs to be.
            </p>
            <p>
              The Living In Carver County Podcast is available on Spotify, Apple Podcasts, YouTube, and everywhere you listen.
            </p>
          </div>

          {/* Listen CTA */}
          <div className="mt-10 pt-8 border-t border-border/50">
            <a
              href="https://livingincarvercountypodcast.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
              data-testid="link-podcast-listen"
            >
              Listen to the Living In Carver County Podcast
              <ArrowRight className="w-4 h-4" />
            </a>
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
