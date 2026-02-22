import { useParams, Link } from "react-router-dom";
import Layout from "@/components/Layout";
import { mockCampaigns, mockContributions, truncateAddress, formatSTX, getDaysLeft, getProgressPercentage } from "@/data/mockData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useWallet } from "@/contexts/WalletContext";
import { useState } from "react";
import ContributeModal from "@/components/ContributeModal";
import { ArrowLeft, Calendar, Check, Circle, Clock, Copy, ExternalLink, Share2, Users } from "lucide-react";

const statusColors: Record<string, string> = {
  active: "bg-success/20 text-success border-success/30",
  funded: "bg-primary/20 text-primary border-primary/30",
  completed: "bg-cyan/20 text-cyan border-cyan/30",
  failed: "bg-destructive/20 text-destructive border-destructive/30",
};

export default function CampaignDetail() {
  const { id } = useParams();
  const campaign = mockCampaigns.find((c) => c.id === Number(id));
  const [contributeOpen, setContributeOpen] = useState(false);
  const { wallet } = useWallet();

  if (!campaign) {
    return (
      <Layout>
        <div className="container py-20 text-center">
          <h1 className="font-display text-2xl font-bold">Campaign not found</h1>
          <Button asChild variant="ghost" className="mt-4 gap-2">
            <Link to="/campaigns"><ArrowLeft className="h-4 w-4" /> Back to Campaigns</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const progress = getProgressPercentage(campaign.raisedAmount, campaign.goalAmount);
  const daysLeft = getDaysLeft(campaign.endsAt);
  const contributions = mockContributions.filter((c) => c.campaignId === campaign.id);
  const completedMilestones = campaign.milestones.filter((m) => m.completed).length;

  return (
    <Layout>
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden md:h-80">
        <img src={campaign.imageUrl} alt={campaign.title} className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      <div className="container relative -mt-20 pb-20">
        {/* Back */}
        <Button asChild variant="ghost" size="sm" className="mb-4 gap-1 text-muted-foreground">
          <Link to="/campaigns"><ArrowLeft className="h-4 w-4" /> All Campaigns</Link>
        </Button>

        {/* Header */}
        <div className="flex flex-wrap items-start gap-3">
          <Badge className={`${statusColors[campaign.status]} border capitalize`}>{campaign.status}</Badge>
          <span className="flex items-center gap-1 text-sm text-muted-foreground">
            <Calendar className="h-3.5 w-3.5" />
            Created {campaign.createdAt.toLocaleDateString()}
          </span>
        </div>
        <h1 className="mt-3 font-display text-3xl font-bold md:text-4xl">{campaign.title}</h1>
        <p className="mt-2 font-mono text-sm text-muted-foreground">
          by {truncateAddress(campaign.creator)}
          <button className="ml-2 text-primary hover:text-primary/80"><Copy className="inline h-3.5 w-3.5" /></button>
        </p>

        {/* Two-column */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_380px]">
          {/* Left */}
          <div className="space-y-10">
            {/* Description */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">About this Campaign</h2>
              <div className="prose prose-invert max-w-none text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {campaign.description}
              </div>
            </section>

            {/* Milestones */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-6">Milestones</h2>
              <div className="space-y-4">
                {campaign.milestones.map((milestone, i) => (
                  <div key={milestone.id} className={`rounded-xl border p-5 transition-all ${milestone.completed ? "border-success/30 bg-success/5" : "border-border bg-card"}`}>
                    <div className="flex items-start gap-4">
                      <div className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${milestone.completed ? "bg-success text-success-foreground" : "border-2 border-muted-foreground/30 text-muted-foreground"}`}>
                        {milestone.completed ? <Check className="h-4 w-4 text-background" /> : <span className="text-xs font-semibold">{i + 1}</span>}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold text-foreground">{milestone.description}</h4>
                          <span className="text-sm font-mono text-muted-foreground">{milestone.percentage}%</span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {milestone.completed ? "Completed" : "Pending"} · {formatSTX(Math.round(campaign.goalAmount * milestone.percentage / 100))} STX
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Recent Backers */}
            <section>
              <h2 className="font-display text-xl font-semibold mb-4">Recent Backers</h2>
              {contributions.length === 0 ? (
                <p className="text-sm text-muted-foreground">No contributions yet. Be the first!</p>
              ) : (
                <div className="space-y-3">
                  {contributions.map((c) => (
                    <div key={c.id} className="flex items-center justify-between rounded-lg border border-border bg-card p-4">
                      <div>
                        <p className="font-mono text-sm text-foreground">{truncateAddress(c.backer)}</p>
                        <p className="text-xs text-muted-foreground">{c.timestamp.toLocaleDateString()}</p>
                      </div>
                      <span className="font-semibold text-primary">{formatSTX(c.amount)} STX</span>
                    </div>
                  ))}
                </div>
              )}
            </section>
          </div>

          {/* Right sidebar */}
          <div className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            {/* Funding Card */}
            <Card className="border-border bg-card">
              <CardContent className="space-y-6 p-6">
                <div>
                  <div className="flex items-baseline justify-between">
                    <span className="font-display text-3xl font-bold text-foreground">{formatSTX(campaign.raisedAmount)}</span>
                    <span className="text-sm text-muted-foreground">of {formatSTX(campaign.goalAmount)} STX</span>
                  </div>
                  <div className="mt-3 h-3 w-full overflow-hidden rounded-full bg-secondary">
                    <div className="h-full rounded-full gradient-orange transition-all duration-700" style={{ width: `${progress}%` }} />
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{progress}% funded</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <Users className="mx-auto h-5 w-5 text-muted-foreground" />
                    <p className="mt-1 font-semibold text-foreground">{campaign.backerCount}</p>
                    <p className="text-xs text-muted-foreground">Backers</p>
                  </div>
                  <div className="rounded-lg bg-secondary p-3 text-center">
                    <Clock className="mx-auto h-5 w-5 text-muted-foreground" />
                    <p className="mt-1 font-semibold text-foreground">{daysLeft}</p>
                    <p className="text-xs text-muted-foreground">Days Left</p>
                  </div>
                </div>

                {campaign.status === "active" && (
                  <Button
                    onClick={() => setContributeOpen(true)}
                    className="w-full h-12 text-base gradient-orange border-0 text-primary-foreground hover:opacity-90 animate-pulse-glow"
                  >
                    Contribute STX
                  </Button>
                )}

                <div className="flex items-center justify-center gap-4 text-muted-foreground">
                  <button className="flex items-center gap-1 text-xs hover:text-primary">
                    <Share2 className="h-3.5 w-3.5" /> Share
                  </button>
                  <button className="flex items-center gap-1 text-xs hover:text-primary">
                    <ExternalLink className="h-3.5 w-3.5" /> Explorer
                  </button>
                </div>
              </CardContent>
            </Card>

            {/* Milestone Summary */}
            <Card className="border-border bg-card">
              <CardHeader className="pb-3">
                <CardTitle className="font-display text-base">Milestone Progress</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {campaign.milestones.map((m, i) => (
                  <div key={m.id} className="flex items-center gap-3">
                    <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs ${
                      m.completed ? "bg-success text-background" : "border border-muted-foreground/30 text-muted-foreground"
                    }`}>
                      {m.completed ? <Check className="h-3 w-3" /> : i + 1}
                    </div>
                    <span className={`text-sm ${m.completed ? "text-foreground" : "text-muted-foreground"}`}>
                      {m.description}
                    </span>
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2">
                  {completedMilestones}/{campaign.milestones.length} milestones completed
                </p>
              </CardContent>
            </Card>

            {/* Your Contribution */}
            {wallet.connected && (
              <Card className="border-primary/20 bg-card">
                <CardHeader className="pb-3">
                  <CardTitle className="font-display text-base">Your Contribution</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="font-display text-2xl font-bold text-primary">500 STX</p>
                  <p className="text-xs text-muted-foreground mt-1">Contributed on Feb 20, 2026</p>
                  {campaign.status === "failed" && (
                    <Button variant="outline" size="sm" className="mt-4 w-full border-destructive text-destructive hover:bg-destructive/10">
                      Claim Refund
                    </Button>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>

      <ContributeModal open={contributeOpen} onOpenChange={setContributeOpen} campaign={campaign} />
    </Layout>
  );
}
