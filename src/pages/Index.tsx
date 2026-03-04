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

function SectionSeparator() {
  return (
    <div className="flex justify-center">
      <div className="h-px w-24 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </div>
  );
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
        <div className="absolute inset-0 grid-pattern opacity-40" />
        <div className="absolute inset-0 mesh-gradient" />
        {/* Animated gradient orb */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-primary/[0.06] blur-[120px] pointer-events-none animate-float" />
        <div className="absolute top-1/3 left-1/3 w-[300px] h-[300px] rounded-full bg-cosmic/[0.04] blur-[100px] pointer-events-none animate-float" style={{ animationDelay: "1.5s" }} />

        <motion.div
          className="container relative z-10 py-12"
          style={{ y: heroY, opacity: heroOpacity }}
        >
          <div className="mx-auto max-w-2xl text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.06] px-4 py-1.5 text-xs font-medium text-white/60 backdrop-blur-sm animate-pulse-glow"
            >
              <Zap className="h-3.5 w-3.5 text-primary" />
              Powered by Stacks + Bitcoin
            </motion.div>

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

      <SectionSeparator />

      {/* ─── How It Works ─── */}
      <motion.section
        className="py-16 bg-background"
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
            className="mt-10 relative"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {/* Desktop connector line */}
            <div className="hidden sm:block absolute top-[3.25rem] left-[16.666%] right-[16.666%] h-px border-t-2 border-dashed border-primary/20 z-0" />

            <div className="grid gap-8 sm:grid-cols-3 sm:gap-6 relative z-10">
              {howItWorks.map((step, i) => (
                <motion.div
                  key={step.title}
                  variants={childVariants}
                  className="group flex flex-col items-center text-center relative"
                >
                  {/* Mobile connector line (vertical) */}
                  {i < howItWorks.length - 1 && (
                    <div className="sm:hidden absolute top-[4.5rem] left-1/2 -translate-x-1/2 h-8 border-l-2 border-dashed border-primary/20 z-0" />
                  )}

                  {/* Step number badge */}
                  <div className="relative mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl gradient-orange shadow-lg transition-all duration-300 group-hover:glow-orange group-hover:scale-105">
                      <step.icon className="h-5 w-5 text-primary-foreground" />
                    </div>
                    <span className="absolute -top-1.5 -right-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-background border-2 border-primary text-[10px] font-bold text-primary font-mono">
                      {step.step}
                    </span>
                  </div>

                  <h3 className="font-display text-base font-semibold">{step.title}</h3>
                  <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground max-w-[220px]">{step.description}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.section>

      <SectionSeparator />

      {/* ─── Featured Campaigns ─── */}
      <motion.section
        className="py-14 bg-secondary/30"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
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
            viewport={{ once: true, amount: 0.05 }}
          >
            {featured.map((campaign, index) => (
              <div key={campaign.id} className={index >= 3 ? "hidden sm:block" : ""}>
                <CampaignCard campaign={campaign} />
              </div>
            ))}
          </motion.div>
          <div className="mt-4 text-center md:hidden">
            <Button asChild variant="ghost" size="sm" className="gap-1.5 text-sm text-primary">
              <Link to="/campaigns">View All Campaigns <ArrowRight className="h-3.5 w-3.5" /></Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <SectionSeparator />

      {/* ─── Trust Indicators ─── */}
      <motion.section
        className="py-14 bg-background"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
      >
        <div className="container max-w-4xl">
          <div className="text-center">
            <p className="text-[11px] uppercase tracking-[0.2em] text-primary font-semibold">Security</p>
            <h2 className="mt-1 font-display text-2xl font-bold">
              Built on <span className="text-gradient-orange">Bitcoin</span>
            </h2>
          </div>
          <motion.div
            className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4"
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.05 }}
          >
            {trustIndicators.map((item) => (
              <motion.div
                key={item.title}
                variants={childVariants}
                className="group rounded-xl border border-border bg-card p-4 text-center transition-all duration-300 hover:border-primary/30 hover:shadow-md hover:shadow-primary/5"
              >
                <div className="mx-auto mb-2.5 flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 transition-all duration-300 group-hover:bg-primary/20 group-hover:scale-105">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-display text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-[12px] leading-relaxed text-muted-foreground">{item.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* ─── CTA Banner ─── */}
      <motion.section
        className="gradient-hero relative overflow-hidden"
        variants={sectionVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className="absolute inset-0 grid-pattern opacity-30" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[200px] rounded-full bg-primary/[0.06] blur-[80px] pointer-events-none" />
        <div className="container relative z-10 py-16 text-center">
          <h2 className="font-display text-2xl font-bold text-white sm:text-3xl">
            Ready to build on <span className="text-gradient-orange">Bitcoin</span>?
          </h2>
          <p className="mt-3 text-sm text-white/50 max-w-md mx-auto">
            Launch your decentralized campaign today. Transparent, milestone-based funding powered by smart contracts.
          </p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            <Button asChild size="sm" className="h-9 gap-2 gradient-orange border-0 text-primary-foreground text-sm font-medium hover:opacity-90 active:scale-[0.98] transition-all">
              <Link to="/create">
                Start a Campaign <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild size="sm" variant="outline" className="h-9 border-white/15 bg-white/[0.04] text-white/80 text-sm font-medium hover:bg-white/[0.08] hover:text-white active:scale-[0.98] transition-all">
              <Link to="/campaigns">Browse Projects</Link>
            </Button>
          </div>
        </div>
      </motion.section>

      <Footer />
    </Layout>
    </PageTransition>
  );
}
