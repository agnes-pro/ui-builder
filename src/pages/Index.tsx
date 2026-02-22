import { Link } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import CampaignCard from "@/components/CampaignCard";
import Layout from "@/components/Layout";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { mockCampaigns } from "@/data/mockData";
import { ArrowRight, Shield, Target, RefreshCw, Eye, Rocket, Coins, CheckCircle, Zap } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import PageTransition from "@/components/PageTransition";

const sectionVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" as const } },
};

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const childVariants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: "easeOut" as const } },
};

function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) { setCount(end); return; }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const steps = 60;
          const increment = end / steps;
          let current = 0;
          const timer = setInterval(() => {
            current += increment;
            if (current >= end) { setCount(end); clearInterval(timer); }
            else setCount(Math.floor(current));
          }, 2000 / steps);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>;
}

const stats = [
  { label: "Total Raised", value: 211200, suffix: " STX" },
  { label: "Campaigns", value: 48, suffix: "" },
  { label: "Success Rate", value: 87, suffix: "%" },
];

const howItWorks = [
  { icon: Rocket, title: "Create", description: "Launch your campaign with milestones and a clear funding goal.", step: "01" },
  { icon: Coins, title: "Fund", description: "Contributors back projects with STX. Funds are locked in a smart contract.", step: "02" },
  { icon: CheckCircle, title: "Deliver", description: "Complete milestones to unlock funds. Backers get refunds if goals aren't met.", step: "03" },
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
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <PageTransition>
    <Layout>
      <SEOHead
        title="sBTCFund — Decentralized Crowdfunding on Bitcoin"
        description="Decentralized crowdfunding powered by Stacks. Create campaigns with milestone-based fund releases, contribute STX, and build the Bitcoin ecosystem."
      />

      {/* ─── Hero ─── */}
      <section ref={heroRef} className="relative min-h-[60vh] sm:min-h-[70vh] flex items-center gradient-hero overflow-hidden">
        {/* Grid pattern */}
        <div className="absolute inset-0 grid-pattern opacity-40" />
        {/* Mesh gradient blobs */}
        <div className="absolute inset-0 mesh-gradient" />
        {/* Subtle radial glow behind hero text */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-primary/[0.04] blur-[100px] pointer-events-none" />

        <motion.div
          className="container relative z-10 py-12"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.05] px-3 py-1 text-xs font-medium text-white/50 backdrop-blur-sm">
              <Zap className="h-3 w-3 text-primary" />
              Powered by Stacks + Bitcoin
            </div>

            <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl">
              Fund the Future of{" "}
              <span className="text-gradient-orange">Bitcoin</span>
            </h1>

            <p className="mt-4 text-[15px] leading-relaxed text-white/50 sm:text-base">
              Decentralized crowdfunding with milestone-based fund releases. Contribute STX and build the Bitcoin ecosystem together.
            </p>

            <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
              <Button asChild size="sm" className="h-9 gap-2 gradient-orange border-0 text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all">
                <Link to="/campaigns">
                  Explore Campaigns <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="h-9 border-white/15 bg-white/[0.04] text-white/80 text-sm font-medium hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all">
                <Link to="/create">Create Campaign</Link>
              </Button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center gap-0">
              {stats.map((stat, i) => (
                <div key={stat.label} className={`flex-1 text-center ${i > 0 ? "border-l border-white/10" : ""}`}>
                  <div className="font-display text-xl font-bold text-white sm:text-2xl tabular-nums">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="mt-0.5 text-[11px] uppercase tracking-widest text-white/35 font-medium">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── How It Works ─── */}
      <motion.section
        className="py-14 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">How It Works</p>
            <h2 className="mt-1 font-display text-2xl font-bold">Three simple steps</h2>
          </div>
          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {howItWorks.map((step) => (
              <motion.div
                key={step.title}
                variants={childVariants}
                className="group relative rounded-xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <step.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground">{step.step}</span>
                    <h3 className="font-display text-sm font-semibold">{step.title}</h3>
                    <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">{step.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── Featured Campaigns ─── */}
      <motion.section
        className="py-14 bg-secondary/30"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
      >
        <div className="container">
          <div className="flex items-end justify-between">
            <div>
              <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Featured</p>
              <h2 className="mt-1 font-display text-2xl font-bold">Active Campaigns</h2>
            </div>
            <Button asChild variant="ghost" size="sm" className="hidden gap-1.5 text-sm text-primary md:inline-flex">
              <Link to="/campaigns">View All <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
          <motion.div
            className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {featured.map((campaign) => (
              <CampaignCard key={campaign.id} campaign={campaign} />
            ))}
          </motion.div>
          <div className="mt-4 text-center md:hidden">
            <Button asChild variant="ghost" size="sm" className="gap-1.5 text-sm text-primary">
              <Link to="/campaigns">View All Campaigns <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </motion.section>

      {/* ─── Trust Indicators ─── */}
      <motion.section
        className="py-14 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Security</p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Built on <span className="text-gradient-orange">Bitcoin</span>
            </h2>
          </div>
          <motion.div
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {trustIndicators.map((item) => (
              <motion.div
                key={item.title}
                variants={childVariants}
                className="rounded-xl border border-border bg-card p-4 text-center transition-all duration-200 hover:border-primary/20 hover:shadow-sm"
              >
                <div className="mx-auto mb-2.5 flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                  <item.icon className="h-4 w-4 text-primary" />
                </div>
                <h3 className="font-display text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.description}</p>
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
