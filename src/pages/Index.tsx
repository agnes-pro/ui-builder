import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import { mockCampaigns, formatSTX } from "@/data/mockData";
import { ArrowRight, Shield, Target, RefreshCw, Eye, Rocket, Coins, CheckCircle, Github, Twitter } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import PageTransition from "@/components/PageTransition";

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    // Respect reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setCount(end);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
              setCount(end);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { label: "Total Raised", value: 211200, suffix: " STX" },
  { label: "Campaigns", value: 48, suffix: "" },
  { label: "Success Rate", value: 87, suffix: "%" },
];

const howItWorks = [
  {
    icon: Rocket,
    title: "Create",
    description: "Launch your campaign with milestones and a funding goal. Set clear deliverables for backers.",
  },
  {
    icon: Coins,
    title: "Fund",
    description: "Contributors back projects with STX. Funds are locked in a smart contract until milestones are met.",
  },
  {
    icon: CheckCircle,
    title: "Deliver",
    description: "Complete milestones to unlock funds progressively. Backers can claim refunds if goals aren't met.",
  },
];

const trustIndicators = [
  { icon: Shield, title: "Bitcoin Security", description: "Secured by Bitcoin's proof-of-work through the Stacks layer" },
  { icon: Target, title: "Milestone Protection", description: "Funds released only when milestones are completed" },
  { icon: RefreshCw, title: "Automatic Refunds", description: "Smart contract ensures refunds if campaign fails" },
  { icon: Eye, title: "Fully Transparent", description: "All transactions and milestones visible on-chain" },
];

const footerLinks = [
  { label: "Campaigns", href: "/campaigns" },
  { label: "Create", href: "/create" },
  { label: "My Profile", href: "/profile" },
];

export default function Index() {
  const featured = mockCampaigns.filter((c) => c.status === "active" || c.status === "funded").slice(0, 6);

  useEffect(() => {
    document.title = "sBTCFund — Decentralized Crowdfunding on Bitcoin";
  }, []);

  return (
    <PageTransition>
    <Layout>
      {/* Hero */}
      <section className="relative min-h-[90vh] flex items-center mesh-gradient gradient-hero">
        <div className="container relative z-10 py-20">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="animate-fade-in-up font-display text-5xl font-bold leading-tight tracking-tight md:text-7xl">
              Fund the Future of{" "}
              <span className="text-gradient-orange">Bitcoin</span>
            </h1>
            <p className="mt-6 animate-fade-in-up text-lg text-muted-foreground md:text-xl" style={{ animationDelay: "0.15s" }}>
              Decentralized crowdfunding powered by Stacks. Create campaigns with milestone-based fund releases, contribute STX, and build the Bitcoin ecosystem together.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="h-12 gap-2 gradient-orange border-0 text-primary-foreground text-base hover:opacity-90 animate-pulse-glow active:scale-[0.98] transition-transform">
                <Link to="/campaigns">
                  Explore Campaigns <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="h-12 border-border text-base hover:bg-secondary active:scale-[0.98] transition-transform">
                <Link to="/create">Create Campaign</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-3 gap-8 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-3xl font-bold text-foreground md:text-4xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-bold md:text-4xl">How It Works</h2>
            <p className="mt-3 text-muted-foreground">Three simple steps to fund or create a campaign</p>
          </div>
          <div className="mt-16 grid gap-8 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <div key={step.title} className="group relative rounded-xl border border-border bg-card p-8 text-center transition-all duration-300 hover:border-primary/30 hover:glow-orange hover:-translate-y-1">
                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </div>
                <h3 className="font-display text-xl font-semibold">{step.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Campaigns */}
      <section className="py-24 bg-secondary/30">
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">Featured Campaigns</h2>
              <p className="mt-3 text-muted-foreground">Discover projects building on Bitcoin</p>
            </div>
            <Button asChild variant="ghost" className="hidden gap-2 text-primary md:inline-flex">
              <Link to="/campaigns">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </div>
          <div className="mt-8 text-center md:hidden">
            <Button asChild variant="ghost" className="gap-2 text-primary">
              <Link to="/campaigns">View All Campaigns <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-24 bg-background">
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Built on <span className="text-gradient-orange">Bitcoin</span> Security
          </h2>
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {trustIndicators.map((item) => (
              <div key={item.title} className="rounded-xl border border-border bg-card p-6 text-center transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-12">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-3">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg gradient-orange">
                  <span className="text-sm font-bold text-primary-foreground">₿</span>
                </div>
                <span className="font-display text-lg font-bold">sBTC<span className="text-primary">Fund</span></span>
              </div>
              <p className="mt-3 text-sm text-muted-foreground max-w-xs">
                Decentralized crowdfunding powered by Stacks and secured by Bitcoin.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">Navigation</h4>
              <ul className="space-y-2">
                {footerLinks.map((link) => (
                  <li key={link.href}>
                    <Link to={link.href} className="text-sm text-muted-foreground hover:text-primary transition-colors">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Social & Badge */}
            <div>
              <h4 className="font-display text-sm font-semibold text-foreground mb-3">Community</h4>
              <div className="flex gap-3">
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors" aria-label="Twitter">
                  <Twitter className="h-4 w-4" />
                </a>
                <a href="#" className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground hover:text-primary hover:bg-secondary/80 transition-colors" aria-label="GitHub">
                  <Github className="h-4 w-4" />
                </a>
              </div>
              <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-xs text-muted-foreground">
                <div className="h-2 w-2 rounded-full bg-success" />
                Built on Stacks
              </div>
            </div>
          </div>

          <div className="mt-8 border-t border-border pt-6 text-center text-xs text-muted-foreground">
            © 2026 sBTCFund. Powered by Stacks · Secured by Bitcoin
          </div>
        </div>
      </footer>
    </Layout>
    </PageTransition>
  );
}
