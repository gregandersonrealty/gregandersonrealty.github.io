import { Link } from "wouter";
import { useState } from "react";
import {
  ArrowRight,
  Home as HomeIcon,
  TrendingUp,
  Award,
  Users,
  Heart,
  Shield,
  MessageCircle,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { usePostPreviews } from "@/lib/postsApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { ConnectContactSection } from "@/components/ConnectContactSection";
import { Helmet } from "react-helmet-async";


const highlights = [
  { icon: HomeIcon,   value: "3,000+",      label: "Families Helped" },
  { icon: TrendingUp, value: "41",           label: "Years Experience" },
  { icon: Award,      value: "Lifetime Achievement Award", label: "RE/MAX" },
  { icon: Users,      value: "Since 1985",   label: "Trusted" },
];

const whyChooseMe = [
  {
    icon: Heart,
    title: "I Care About Your Story",
    description:
      "Every family is different. I take time to understand your unique needs, timeline, and dreams before we look at a single listing.",
  },
  {
    icon: Shield,
    title: "41 Years of Trust",
    description:
      "Over 3,000 families have trusted me with their biggest decision. I've earned that trust by always putting your interests first.",
  },
  {
    icon: MessageCircle,
    title: "Always Here for You",
    description:
      "Questions at 9pm? Nervous about an offer? I'm accessible, responsive, and here to guide you through every step.",
  },
];

function Tag({ label }: { label: string }) {
  return (
    <span className="inline-block text-xs font-bold uppercase tracking-widest text-destructive mb-2 leading-none">
      {label}
    </span>
  );
}

export default function Home() {
  const { data } = usePostPreviews(6, 0);
  const posts = data?.posts ?? [];
  const [connectOpen, setConnectOpen] = useState(false);

  const lead      = posts[0];
  const rightPost = posts[1];        // 1 BlogCard in right column
  const rowPosts  = posts.slice(2);  // remaining BlogCards in bottom row

  return (
    <div className="min-h-screen flex flex-col font-serif bg-background">
      <Navbar />

      <Helmet>
        <title>Greg Anderson | Carver County REALTOR® Since 1985</title>
        <meta
          name="description"
          content="Greg Anderson has helped 3,000+ families buy and sell homes in Chaska, Chanhassen, Carver, Victoria, Waconia, Cologne and Twin Cities Metro since 1985."
        />
      </Helmet>

      <main className="flex-1">

        {/* ══════════════════════════════════════════════════════════════════
            TOP ZONE
            ══════════════════════════════════════════════════════════════════ */}
        <section className="w-full border-b border-border">

          {/* Header bar */}
          <div className="flex items-center justify-between px-6 lg:px-10 py-2.5 border-b border-border">
            <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
              Free Resources &amp; Insights
            </span>
            <Link
              href="/blog"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-primary hover:gap-2 transition-all"
              data-testid="link-view-all-posts"
            >
              View All Posts <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {/* ── Row 1: Lead (left 58%) + Greg card + one BlogCard (right 42%) */}
          <div className="grid grid-cols-1 lg:grid-cols-[1.37fr_1fr] border-b border-border lg:divide-x lg:divide-border">

            {/* LEFT — lead post, big natural image */}
            <div className="border-b lg:border-b-0">
              {lead ? (
                <Link href={`/blog/${lead.id}`} className="group flex flex-col">
                  <img
                    src={lead.image}
                    alt={lead.title}
                    className="w-full h-auto block"
                  />
                  <div className="px-6 lg:px-8 py-5 flex flex-col gap-2">
                    <Tag label={lead.category} />
                    <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-tight group-hover:text-primary transition-colors">
                      {lead.title}
                    </h2>
                    <p className="text-muted-foreground text-base leading-relaxed mt-1">
                      {lead.excerpt}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">
                      {lead.date} &nbsp;·&nbsp; {lead.readTime}
                    </p>
                  </div>
                </Link>
              ) : (
                <div className="flex flex-col">
                  <div className="w-full bg-muted/40 animate-pulse" style={{ paddingTop: "56%" }} />
                  <div className="px-6 py-5 space-y-3">
                    <div className="h-2 w-24 bg-muted/60 rounded animate-pulse" />
                    <div className="h-7 w-full bg-muted/50 rounded animate-pulse" />
                    <div className="h-4 w-4/5 bg-muted/40 rounded animate-pulse" />
                  </div>
                </div>
              )}
            </div>

            {/* RIGHT — Greg card stacked above one BlogCard */}
            <div className="flex flex-col divide-y divide-border">

              {/* Greg mini card */}
              <div className="grid grid-cols-1 xl:grid-cols-[42%_58%]">
                <div className="relative min-h-[220px] xl:min-h-[250px] overflow-hidden bg-black/10">
                  <img
                    src={`${import.meta.env.BASE_URL}greg_ink.png`}
                    alt="Greg Anderson"
                    className="absolute inset-0 w-full h-full object-cover scale-[0.88]"
                    style={{ objectPosition: "center center" }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    {/* <p className="text-[10px] font-bold uppercase tracking-widest text-destructive mb-1">
                      Carver County's Trusted Realtor
                    </p> */}
                    <h1 className="font-display text-xl font-bold text-white leading-tight">
                      Greg Anderson
                    </h1>
                    <p className="text-white/80 text-xs leading-relaxed mt-0.5">
                      41 years · 3,000+ families · RE/MAX Lifetime Achievement Award
                    </p>
                  </div>
                </div>

                <div className="px-5 py-4 xl:py-5 border-t xl:border-t-0 xl:border-l border-border flex flex-col justify-between gap-5">
                  <div className="space-y-3">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                        Start Here
                      </p>
                      <p className="font-display text-lg font-bold text-foreground leading-tight">
                        Thinking about your next move?
                      </p>
                      <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                        Expert advice, clear strategy, and personalized service. Connecting friends, building community.
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1.5">
                      <span className="text-[10px] uppercase tracking-wide px-2 py-1 bg-secondary text-secondary-foreground rounded-sm">
                        41 Years
                      </span>
                      <span className="text-[10px] uppercase tracking-wide px-2 py-1 bg-secondary text-secondary-foreground rounded-sm">
                        3,000+ Families
                      </span>
                      <span className="text-[10px] uppercase tracking-wide px-2 py-1 bg-secondary text-secondary-foreground rounded-sm">
                        RE/MAX Lifetime Achievement Award
                      </span>
                    </div>
                  </div>

                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
                      Areas Served
                    </p>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      Chaska · Chanhassen · Carver · Victoria · Waconia · Cologne <br></br> · Twin Cities Metro
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setConnectOpen(true)}
                    className="inline-flex items-center justify-center gap-1.5 px-3 py-2 bg-destructive text-destructive-foreground text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-destructive/90 transition-colors cursor-pointer w-full"
                    data-testid="button-hero-connect"
                  >
                    Let's Connect <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              </div>

              {/* One standard BlogCard */}
              {rightPost && (
                <div className="p-4">
                  <BlogCard post={rightPost} />
                </div>
              )}

            </div>
          </div>

          {/* ── Row 2: remaining posts as standard BlogCards, full width */}
          {rowPosts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-6 lg:px-10 py-6">
              {rowPosts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}

        </section>

        {/* ══════════════════════════════════════════════════════════════════
            WHY GREG — 3-column strip
            ══════════════════════════════════════════════════════════════════ */}
        <section className="w-full border-b border-border">
          <div className="w-full px-6 lg:px-10 py-10">
            <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
              {whyChooseMe.map((item, index) => (
                <article key={index} className="py-8 md:py-0 md:px-10 first:pl-0 last:pr-0">
                  <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <Tag label="Why Greg" />
                  <h3 className="font-display text-xl font-bold text-foreground leading-snug mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            ABOUT GREG + SIDEBAR
            ══════════════════════════════════════════════════════════════════ */}
        <section className="w-full px-6 lg:px-10 py-14">
          <div className="grid lg:grid-cols-3 gap-12 items-start">

            <div className="lg:col-span-2">
              <img
                src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                alt="Greg Anderson — RE/MAX Advisors West"
                className="w-full h-auto block mb-7"
              />
              <Tag label="A Little About Me" />
              <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground leading-snug mb-5">
                I'm Your Neighbor, Too
              </h2>
              <p className="text-muted-foreground text-lg leading-relaxed mb-4">
                I've called Carver County home for decades. I raised my family here, I know the
                schools, the parks, the best spots for coffee. When I help you find a home, I'm
                not just looking at square footage—I'm thinking about your life here.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed mb-7">
                Whether you're buying your first home, selling a place full of memories, or
                navigating a difficult situation, I approach every conversation with patience,
                honesty, and genuine care.
              </p>
              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-primary hover:gap-3 transition-all"
                data-testid="link-learn-more"
              >
                Learn More About Me <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <aside className="lg:col-span-1 lg:border-l border-border lg:pl-10 space-y-10">
              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pb-3 mb-5 border-b border-border">
                  By the Numbers
                </h3>
                <div className="space-y-6">
                  {highlights.map((item, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                        <item.icon className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-display text-2xl font-bold text-foreground leading-none">
                          {item.value}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">{item.label}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-secondary/40 p-6 border border-border/60">
                <p className="font-display text-lg font-bold text-foreground mb-2">
                  Ready to talk about your next move?
                </p>
                <p className="text-sm text-muted-foreground mb-5">
                  Reach out — no pressure, no obligation. Just a conversation.
                </p>
                <button
                  type="button"
                  onClick={() => setConnectOpen(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-3 bg-destructive text-destructive-foreground text-sm font-bold uppercase tracking-widest rounded-sm hover:bg-destructive/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  Let's Connect <ArrowRight className="w-4 h-4" />
                </button>
              </div>

              <div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-muted-foreground pb-3 mb-4 border-b border-border">
                  Areas Served
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Chaska · Chanhassen · Victoria · Eden Prairie · Waconia · Minnetonka · and all of Carver County
                </p>
              </div>
            </aside>

          </div>
        </section>

        {/* ══════════════════════════════════════════════════════════════════
            STATS BAR
            ══════════════════════════════════════════════════════════════════ */}
        <section className="w-full py-14 bg-primary text-primary-foreground">
          <div className="w-full px-6 lg:px-10">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-7 h-7 mx-auto mb-3 opacity-80" />
                  <p className="font-display text-3xl md:text-4xl font-bold">{item.value}</p>
                  <p className="text-sm opacity-80 mt-1">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>

      {/* CONNECT DIALOG */}
      <Dialog open={connectOpen} onOpenChange={setConnectOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Let&apos;s Talk!</DialogTitle>
            <DialogDescription>
              Use one of the methods below to get in touch!
            </DialogDescription>
          </DialogHeader>
          <div data-connect-contact>
            <ConnectContactSection variant="modal" showHeading={false} />
          </div>
          <style>{`
            [data-connect-contact] button[type="submit"] { cursor: pointer; }
          `}</style>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}