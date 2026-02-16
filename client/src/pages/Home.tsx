import { Link } from "wouter";
import { useState } from "react";
import { ArrowRight, Home as HomeIcon, TrendingUp, Award, Users, Heart, Shield, MessageCircle } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BlogCard } from "@/components/BlogCard";
import { usePostPreviews } from "@/lib/postsApi";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ConnectContactSection } from "@/components/ConnectContactSection";

const highlights = [
  { icon: HomeIcon, value: "3,000+", label: "Families Helped" },
  { icon: TrendingUp, value: "41", label: "Years Experience" },
  { icon: Award, value: "Hall of Fame", label: "RE/MAX" },
  { icon: Users, value: "Since 1985", label: "Trusted" },
];

const whyChooseMe = [
  {
    icon: Heart,
    title: "I Care About Your Story",
    description: "Every family is different. I take time to understand your unique needs, timeline, and dreams before we look at a single listing.",
  },
  {
    icon: Shield,
    title: "41 Years of Trust",
    description: "Over 3,000 families have trusted me with their biggest decision. I've earned that trust by always putting your interests first.",
  },
  {
    icon: MessageCircle,
    title: "Always Here for You",
    description: "Questions at 9pm? Nervous about an offer? I'm accessible, responsive, and here to guide you through every step.",
  },
];

export default function Home() {
  // Only fetch 3 posts for the home page
  const { data: posts = [] } = usePostPreviews(3);
  const [connectOpen, setConnectOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden">
          <div className="absolute inset-0">
            <img
              src={`${import.meta.env.BASE_URL}wide_greg.jpg`}
              alt="Beautiful home in Carver County, Minnesota"
              className="w-full h-full object-cover object-[center_38%]"
            />
            {/* Darken the right side of the image so text is readable when placed on the right */}
            <div className="absolute inset-0 bg-gradient-to-l from-background/78 via-background/40 to-background/8" />
          </div>

          <div className="relative max-w-6xl mx-auto px-6 lg:px-8 py-1 md:py-2 lg:py-3 flex items-center min-h-[7vh] md:min-h-[9vh]">
            {/* Right-aligned on all sizes */}
            <div className="w-full md:max-w-md animate-fade-up ml-auto text-right">
              <p className="text-primary font-medium tracking-wide mb-2">
                Carver County's Trusted Realtor
              </p>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-1 w-full">
                Hello I Am
              </h1>
              <h1 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground leading-tight mb-2 w-full">
                Greg Anderson
              </h1>
              <p className="text-base md:text-lg text-foreground/95 leading-relaxed mb-2 rounded-xl bg-background/45 backdrop-blur-sm px-4 py-3 shadow-sm">
                I'm Greg Anderson—your neighbor, your advocate, and your guide through one of life's biggest decisions. Let's find the right home for your family, together.
              </p>
              <div className="flex flex-wrap gap-4 justify-end md:w-full">
                <button
                  type="button"
                  onClick={() => setConnectOpen(true)}
                  className="inline-flex items-center gap-2 px-5 py-3 bg-destructive text-destructive-foreground rounded-lg font-medium hover:bg-destructive/90 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  data-testid="button-hero-connect"
                >
                  Let's Connect
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </section>

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


        {/* Latest Content */}
        <section className="py-10 md:py-12">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
              <div>
                <p className="text-primary font-medium tracking-wide mb-2">Free Resources</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold">
                  Helpful Insights for You
                </h2>
              </div>
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                data-testid="link-view-all-posts"
              >
                View All Posts
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Me */}
        <section className="py-20 md:py-28">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-14">
              <p className="text-primary font-medium tracking-wide mb-3">Why Families Choose Me</p>
              <h2 className="font-display text-3xl md:text-4xl font-semibold max-w-2xl mx-auto">
                More Than a Realtor—A Partner You Can Trust
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {whyChooseMe.map((item, index) => (
                <div key={index} className="bg-card p-8 rounded-2xl border border-border/50 hover:shadow-lg transition-shadow">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-6">
                    <item.icon className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="font-display text-xl font-semibold mb-3">{item.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Personal Introduction */}
        <section className="py-20 md:py-28 bg-secondary/30">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center">
              <div className="order-2 md:order-1">
                <p className="text-primary font-medium tracking-wide mb-4">A Little About Me</p>
                <h2 className="font-display text-3xl md:text-4xl font-semibold mb-6 leading-tight">
                  I'm Your Neighbor, Too
                </h2>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  I've called Carver County home for decades. I raised my family here, I know the schools, the parks, the best spots for coffee. When I help you find a home, I'm not just looking at square footage—I'm thinking about your life here.
                </p>
                <p className="text-muted-foreground leading-relaxed mb-8">
                  Whether you're buying your first home, selling a place full of memories, or navigating a difficult situation, I approach every conversation with patience, honesty, and genuine care.
                </p>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 text-primary font-medium hover:gap-3 transition-all"
                  data-testid="link-learn-more"
                >
                  Learn More About Me
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <img
                    src={`${import.meta.env.BASE_URL}foodtruck_greg.jpg`}
                    alt="Greg Anderson - RE/MAX Advisors West"
                    className="w-full rounded-2xl shadow-lg"
                  />
                  <div className="absolute -bottom-6 -left-6 bg-card p-6 rounded-xl shadow-lg border border-border/50 max-w-xs hidden lg:block">
                    <p className="font-display text-lg font-semibold text-foreground mb-1">Serving</p>
                    <p className="text-sm text-muted-foreground">Chaska, Chanhassen, Victoria, Eden Prairie & more</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>



        {/* Stats Bar */}
        <section className="py-12 bg-primary text-primary-foreground">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {highlights.map((item, index) => (
                <div key={index} className="text-center">
                  <item.icon className="w-6 h-6 mx-auto mb-2 opacity-80" />
                  <p className="font-display text-2xl md:text-3xl font-semibold">{item.value}</p>
                  <p className="text-sm opacity-80">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}