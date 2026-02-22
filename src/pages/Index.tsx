import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { mockCampaigns } from "@/data/mockData";
import { ArrowRight, Shield, Target, RefreshCw, Eye, Rocket, Coins, CheckCircle, ChevronDown, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
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

function FloatingParticles() {
  const particles = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    x: `${15 + i * 15}%`,
    y: `${20 + (i % 3) * 25}%`,
    size: 3 + (i % 3) * 2,
    duration: 6 + i * 1.5,
    delay: i * 0.8,
  }));

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-primary/20"
          style={{ left: p.x, top: p.y, width: p.size, height: p.size }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.6, 0.2] }}
          transition={{ duration: p.duration, repeat: Infinity, delay: p.delay, ease: "easeInOut" }}
        />
      ))}
    </div>
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

export default function Index() {
  const featured = mockCampaigns.filter((c) => c.status === "active" || c.status === "funded").slice(0, 6);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  return (
    <PageTransition>
    <Layout>
      <SEOHead
        title="sBTCFund — Decentralized Crowdfunding on Bitcoin"
        description="Decentralized crowdfunding powered by Stacks. Create campaigns with milestone-based fund releases, contribute STX, and build the Bitcoin ecosystem."
      />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[70vh] flex items-center mesh-gradient gradient-hero overflow-hidden">
        <FloatingParticles />
        <motion.div
          className="container relative z-10 py-16"
          style={{ y: heroY, opacity: heroOpacity, scale: heroScale }}
        >
          <div className="mx-auto max-w-3xl text-center">
            <div className="animate-fade-in-up mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium text-white/60">
              <Zap className="h-3 w-3 text-primary" />
              Powered by Stacks + Bitcoin
            </div>

            <h1 className="animate-fade-in-up font-display text-4xl font-bold leading-tight tracking-tight text-white md:text-5xl">
              Fund the Future of{" "}
              <span className="text-gradient-orange">Bitcoin</span>
            </h1>
            <p className="mt-4 animate-fade-in-up text-base text-white/60 md:text-lg" style={{ animationDelay: "0.15s" }}>
              Decentralized crowdfunding powered by Stacks. Create campaigns with milestone-based fund releases, contribute STX, and build the Bitcoin ecosystem together.
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: "0.3s" }}>
              <Button asChild size="lg" className="h-10 gap-2 gradient-orange border-0 text-primary-foreground text-sm hover:opacity-90 animate-pulse-glow active:scale-[0.98] transition-transform">
                <Link to="/campaigns">
                  Explore Campaigns <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" className="h-10 bg-transparent border border-white/20 text-white text-sm hover:bg-white/10 active:scale-[0.98] transition-transform">
                <Link to="/create">Create Campaign</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-8 grid grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: "0.45s" }}>
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="font-display text-2xl font-bold text-white md:text-3xl">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-1 text-sm text-white/60">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/50"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <span className="text-xs">Scroll</span>
          <ChevronDown className="h-4 w-4" />
        </motion.div>
      </section>

      {/* How It Works */}
      <motion.section
        className="py-12 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-2xl font-bold md:text-3xl">How It Works</h2>
            <p className="mt-2 text-muted-foreground">Three simple steps to fund or create a campaign</p>
          </div>
          <motion.div
            className="mt-8 grid gap-6 md:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {howItWorks.map((step, i) => (
              <motion.div key={step.title} variants={childVariants} className="group relative rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:border-primary/30 hover:glow-orange hover:-translate-y-1">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10">
                  <step.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="mb-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                  Step {i + 1}
                </div>
                <h3 className="font-display text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{step.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Featured Campaigns */}
      <motion.section
        className="py-12 bg-secondary/30"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="font-display text-2xl font-bold md:text-3xl">Featured Campaigns</h2>
              <p className="mt-2 text-muted-foreground">Discover projects building on Bitcoin</p>
            </div>
            <Button asChild variant="ghost" className="hidden gap-2 text-primary md:inline-flex">
              <Link to="/campaigns">View All <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
          <motion.div
            className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featured.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </motion.div>
          <div className="mt-6 text-center md:hidden">
            <Button asChild variant="ghost" className="gap-2 text-primary">
              <Link to="/campaigns">View All Campaigns <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* Trust Indicators */}
      <motion.section
        className="py-12 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container">
          <h2 className="text-center font-display text-3xl font-bold md:text-4xl">
            Built on <span className="text-gradient-orange">Bitcoin</span> Security
          </h2>
          <motion.div
            className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trustIndicators.map((item) => (
              <motion.div key={item.title} variants={childVariants} className="rounded-xl border border-border bg-card p-5 text-center transition-all duration-300 hover:border-primary/30 hover:-translate-y-1">
                <div className="mx-auto mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      <Footer />
    </Layout>
    </PageTransition>
  );
}
