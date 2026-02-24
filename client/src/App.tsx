import { lazy, Suspense, useEffect } from "react";
import { Switch, Route, Router, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Home loads eagerly — it's the first thing users see
import Home from "@/pages/Home";

// All other pages load lazily — only downloaded when the user navigates there
const Blog = lazy(() => import("@/pages/Blog"));
const BlogPost = lazy(() => import("@/pages/BlogPost"));
const About = lazy(() => import("@/pages/About"));
const Admin = lazy(() => import("@/pages/Admin"));
const AddPost = lazy(() => import("@/pages/AddPost"));
const NotFound = lazy(() => import("@/pages/not-found"));
const ProbateEstate = lazy(() => import("@/pages/ProbateEstate"));
const PreForeclosure = lazy(() => import("@/pages/PreForeclosure"));
const Downsizing = lazy(() => import("@/pages/Downsizing"));
const CarverCountyMarket = lazy(() => import("@/pages/CarverCountyMarket"));
const PodcastPage = lazy(() => import("@/pages/PodcastPage"));

function ScrollToTop() {
  const [location] = useLocation();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (location.includes("#")) return;

    requestAnimationFrame(() => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
    });
  }, [location]);

  return null;
}

function Routes() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/blog" component={Blog} />
        <Route path="/blog/:id" component={BlogPost} />
        <Route path="/about" component={About} />
        <Route path="/admin" component={Admin} />
        <Route path="/admin/add" component={AddPost} />
        <Route path="/admin/edit/:id" component={AddPost} />
        <Route path="/probate-estate-real-estate" component={ProbateEstate} />
        <Route path="/pre-foreclosure-distressed-property" component={PreForeclosure} />
        <Route path="/downsizing" component={Downsizing} />
        <Route path="/carver-county-market" component={CarverCountyMarket} />
        <Route path="/living-in-carver-county-podcast" component={PodcastPage} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  const basePath = import.meta.env.DEV ? "" : import.meta.env.BASE_URL.replace(/\/$/, "") || "";
  
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router base={basePath}>
          <ScrollToTop />
          <Routes />
        </Router>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;